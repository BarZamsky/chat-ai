import { createBrowserRouter } from "react-router-dom"
import { HomePage } from "./pages/HomePage";
import { PastPromptPage } from "./pages/PastPromptPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/chat/:chatId",
    Component: PastPromptPage,
  }
]);
