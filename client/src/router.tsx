import { createBrowserRouter } from "react-router";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ConvoListPage } from "@/pages/ConvoListPage";
import { ConvoPage } from "@/pages/ConvoPage";
import { ProfilePage } from "@/pages/ProfilePage";

export const router = createBrowserRouter([
  { path: "/", element: <ConvoListPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/convo/:id", element: <ConvoPage /> },
]);