import { useToken } from "../authApi";

function Logout() {
  const logout = useToken()[2];
  logout();
}
export default Logout;
