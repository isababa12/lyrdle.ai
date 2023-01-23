import { Navigate } from "react-router-dom";
import { useToken } from "../authApi";

function Logout() {
  const logout = useToken()[2];
  logout();
  return <Navigate to="/" />;
}

export default Logout;
