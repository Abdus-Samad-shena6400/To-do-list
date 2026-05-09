import { useLocation } from "react-router-dom";
import App from "../App";

export default function AppWrapper(props) {
  const location = useLocation();
  return <App {...props} location={location} />;
}