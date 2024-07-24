import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingPage from "./pages/ListingPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserProvider } from "./context/UserContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import NewPostPage from "./pages/NewPostPage";
import { SocketProvider } from "./context/SocketContext";

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
