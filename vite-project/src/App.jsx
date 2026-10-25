
import { Routes, Route } from 'react-router'

import Login from './login.jsx'
import AppLayout from './layout/AppLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PurchaseRequestForm from './pages/purchaseOrder/PurchaseRequisitionForm.jsx'
import PurchaseOrders from './pages/purchaseOrder/PurchaseOrders.jsx'
import PurchaseOrderDetails from './pages/purchaseOrder/PurchaseOrderDetails.jsx'
import DeliveryRequest from './pages/purchaseOrder/DeliveryRequest.jsx'
import SupplierPage from './pages/SupplierPage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import NotFound from './pages/NotFound.jsx'

import './App.css'

function App() {
  return (
    <Routes>
      {/* Login page - outside AppLayout */}
      <Route path='/login' element={<Login />} />

      {/* Existing application pages */}
      <Route path="/" element={<AppLayout />}>
       <Route index element={<Dashboard />} />

        <Route
          path="purchaseOrder/PurchaseRequestForm"
          element={<PurchaseRequestForm />}
        />

        <Route
          path="purchaseOrder/PurchaseOrders"
          element={<PurchaseOrders />}
        />

        <Route
          path="purchaseOrder/PurchaseOrderDetails/:id"
          element={<PurchaseOrderDetails />}
        />

        <Route
          path="purchaseOrder/DeliveryRequest"
          element={<DeliveryRequest />}
        />

        <Route path="SupplierPage" element={<SupplierPage />} />

        <Route path="ReportPage" element={<ReportPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
