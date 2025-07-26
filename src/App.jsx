import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Authentication from "./pages/Authentication";
import HomePage from "./pages/HomePage";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import LessonPage from "./pages/LessonPage";
import LevelPage from "./pages/LevelPage";
import Page1 from "./pages/page1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/level",
    element: <LevelPage />,
  },
  {
    path: "/lesson",
    element: <LessonPage />,
  },
  {
    path: "/leaderboard",
    element: <LeaderBoardPage />,
  },
  {
    path: "/authenticate",
    element: <Authentication />,
  },
  {
    path: "/page",
    element: <Page1 />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;