import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
let internalToken = null;
let internalCookie = null;

export function getToken() {
  return internalToken;
}

export async function getTokenInternal() {
  const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    // console.log(response);
    if (response.ok) {
      const data = await response.json();
      internalToken = data.access_token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

export async function getCookie() {
  const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      internalCookie = data
      return internalCookie;
    }
  } catch (e) {}
  return false;
}

function handleErrorMessage(error) {
  if ("error" in error) {
    error = error.error;
    try {
      error = JSON.parse(error);
      if ("__all__" in error) {
        error = error.__all__;
      }
    } catch {}
  }
  if (Array.isArray(error)) {
    error = error.join("<br>");
  } else if (typeof error === "object") {
    error = Object.entries(error).reduce(
      (acc, x) => `${acc}<br>${x[0]}: ${x[1]}`,
      ""
    );
  }
  return error;
}

export const AuthContext = createContext({
  token: null,
  setToken: () => null,
  cookie: null,
  setCookie: () => null,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [cookie, setCookie] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken, cookie, setCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export function useToken() {
  const { token, setToken, cookie, setCookie } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
      const cookie = await getCookie();
      setCookie(cookie);
    }
    if (!token) {
      fetchToken();
    }
  }, [setToken, token, setCookie, cookie]);

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
      await fetch(url, { method: "delete", credentials: "include" });
      internalToken = null;
      setToken(null);
      internalCookie = null;
      setCookie(null);
      navigate("/");
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_USERS_API_HOST}/token`;
    const form = new FormData();

    form.append("username", username);
    form.append("password", password);

    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });

    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      const cookie = await getCookie();
      setCookie(cookie);
      return;
    } else {
      let error = await response.json();
      return handleErrorMessage(error);
    }
  }

  async function signup(username, password, email) {
    const url = `${process.env.REACT_APP_USERS_API_HOST}/api/users`;
    const response = await fetch(url, {
      method: "post",
      body: JSON.stringify({
        username,
        password,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  async function update(username, password, email) {
    const url = `${process.env.REACT_APP_USERS_API_HOST}/api/users/{user_id}`;
    const response = await fetch(url, {
      method: "put",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  return [token, login, logout, signup, update, cookie];
}
