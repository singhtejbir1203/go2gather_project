import { useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { connectSocket } from "./socket/socket";
import { useEffect } from "react";

function App() {
  const { user } = useSelector((s) => s.auth);
  useEffect(() => {
    if (user?.token) {
      connectSocket(user.token);
    }
  }, [user]);

  return <AppRoutes />;
}

export default App;
