import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import "./index.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home/Home"
import Games from "./pages/videogames/Games"
import GamesDetails from "./pages/GamesDetails/GamesDetails"
import Publishers from "./pages/Publishers/Publishers"
import PublisherDetails from "./pages/PublisherDetails/PublisherDetails"
import TagGames from "./pages/TagGames/TagGames"
import GenreGames from "./pages/GenreGames/GenreGames.jsx"
import ErrorPage from "./pages/ErrorPage/ErrorPage"

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Games", element: <Games /> },
      { path: "/gamesDetails/:id", element: <GamesDetails /> },
      { path: "/publishers", element: <Publishers /> },
      { path: "/publisher/:id", element: <PublisherDetails /> },
      { path: "/tag/:tag", element: <TagGames /> },
      { path: "/genre/:genre", element: <GenreGames /> },
    ],
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

