import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./react/Home";
import Details from "./react/Details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details/:Month/:Credit/:Debit",
    element: <Details />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
