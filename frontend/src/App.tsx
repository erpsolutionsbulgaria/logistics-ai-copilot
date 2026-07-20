import { Navigate, Route, Routes } from "react-router";

import AppLayout from "./layouts/AppLayout";
import ShipmentDetailsPage from "./pages/ShipmentDetailsPage";
import ShipmentsPage from "./pages/ShipmentsPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={<Navigate to="/shipments" replace />}
        />

        <Route
          path="/shipments"
          element={<ShipmentsPage />}
        />

        <Route
          path="/shipments/:shipmentId"
          element={<ShipmentDetailsPage />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/shipments" replace />}
      />
    </Routes>
  );
}

export default App;