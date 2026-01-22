import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import VehicleTypes from "../pages/VehicleTypes";
import AdminLayout from "../components/AdminLayout";
import AdminProtectedRoute from "@/routes/AdminProtectedRoute";
import PendingVehicles from "../pages/PendingVehicles";
import RevenueDashboard from "../revenue/pages/RevenueDashboard";
import SeatTemplatesByType from "../pages/SeatTemplatesByType";
import VehicleBrandsByType from "../pages/VehicleBrandsByType";
import VehicleModelsByBrand from "../pages/VehicleModelsByBrand";
import AdminRides from "../rides/pages/AdminRides";
import AdminRideDetails from "../rides/pages/AdminRideDetails";

export default function AdminRoutes() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vehicle-types" element={<VehicleTypes />} />
          <Route
            path="/vehicle-types/:vehicleTypeId/seats/:vehicleTypeName"
            element={<SeatTemplatesByType />}
          />
          <Route
            path="/vehicle-types/:vehicleTypeId/brands/:vehicleTypeName"
            element={<VehicleBrandsByType />}
          />
          <Route
            path="/vehicle-brands/:brandId/models/:brandName"
            element={<VehicleModelsByBrand />}
          />
          <Route path="/pending-vehicles" element={<PendingVehicles />} />
          <Route path="/revenue" element={<RevenueDashboard />} />
          <Route path="/rides" element={<AdminRides />} />
          <Route path="/rides/:rideId" element={<AdminRideDetails />} />
        </Routes>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
