import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const currentPath = window.location.pathname;

  return (
    <div>
      {currentPath === "/login" && <Login />}
      {currentPath === "/register" && <Register />}
      {currentPath !== "/login" && currentPath !== "/register" && <Home />}
    </div>
  );
}

export default App;
