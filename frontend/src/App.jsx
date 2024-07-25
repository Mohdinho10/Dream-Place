import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import { SocketProvider } from "./context/SocketContext";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/AppLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { lazy } from "react";
const HomePage = lazy(() => import("./pages/HomePage"));
const ListingsPage = lazy(() => import("./pages/ListingsPage"));
const ListingPage = lazy(() => import("./pages/ListingPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfileUpdatePage = lazy(() => import("./pages/ProfileUpdatePage"));
const NewPostPage = lazy(() => import("./pages/NewPostPage"));

// import HomePage from "./pages/HomePage";
// import ListingsPage from "./pages/ListingsPage";
// import ListingPage from "./pages/ListingPage";
// import ProfilePage from "./pages/ProfilePage";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import ProfileUpdatePage from "./pages/ProfileUpdatePage";
// import NewPostPage from "./pages/NewPostPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <UserProvider>
        <SocketProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/list" element={<ListingsPage />} />
                <Route path="/list/:id" element={<ListingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/profile/update"
                    element={<ProfileUpdatePage />}
                  />
                  <Route path="/addPost" element={<NewPostPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SocketProvider>
      </UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        closeOnClick
        pauseOnHover={false}
      />
    </QueryClientProvider>
  );
}

export default App;
