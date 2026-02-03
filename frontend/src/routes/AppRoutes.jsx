import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";
import MainLayout from "../components/layout/MainLayout";
import Home from "@/pages/Home";
import PublishRideInfo from "@/pages/PublishRideInfo";
import Footer from "@/components/layout/Footer";
import PublishRide from "@/features/publish/components/PublishRide";
import SearchResults from "@/pages/SearchResults";
import AdminRoutes from "@/admin/routes/AdminRoutes";
import RequestVehicleApproval from "@/pages/RequestVehicleApproval";
import RideDetails from "@/pages/RideDetails";
import BookingSuccess from "@/pages/BookingSuccess";
import PublishRideCheck from "@/pages/PublishRideCheck";
import StripeOnboardingSuccess from "@/pages/StripeOnboardingSuccess";
import MyRides from "@/pages/MyRides";
import MyRideDetails from "@/pages/MyRideDetails";
import MyPublicationDetails from "@/features/rides/pages/MyPublicationDetails";
// import ChatPage from "@/features/chat/pages/ChatPage";
import ChatsPage from "@/features/chat/pages/ChatsPage";
import ChatWindowPage from "@/features/chat/pages/ChatWindowPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
              <Footer />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <div className="p-6">Profile</div>
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/publish-info"
          element={
            <MainLayout>
              <PublishRideInfo />
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <MainLayout>
                <PublishRideCheck />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/request/:vehicleTypeId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <RequestVehicleApproval />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/search/:fromLabel/:fromLat/:fromLng/:toLabel/:toLat/:toLng/:date/:passengers"
          element={
            <MainLayout>
              <SearchResults />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchResults />
            </MainLayout>
          }
        />

        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route
          path="/rides/:rideId"
          element={
            <MainLayout>
              <RideDetails />
              <Footer />
            </MainLayout>
          }
        />
        <Route
          path="/booking-success/:bookingId"
          element={<BookingSuccess />}
        />
        <Route
          path="/payouts/success"
          element={
            <MainLayout>
              <StripeOnboardingSuccess />
            </MainLayout>
          }
        />

        <Route
          path="/my-rides"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyRides />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-rides/:bookingId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyRideDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-publications/:rideId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyPublicationDetails />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/chat/:conversationId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatPage />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/chats"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatsPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats/:conversationId/:user"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatWindowPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chats/new/:userId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ChatWindowPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
