import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard"; // Update this path to match where you saved the file

// Import other page components
import CourierPage from './pages/CourierPage';
import CustomerPage from './pages/CustomerPage';
import PaymentsPage from './pages/PaymentsPage';
import TrackPage from './pages/TrackPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        } />
        
        {/* Updated routes with actual components */}
        <Route path="/courier" element={<MainLayout><CourierPage /></MainLayout>} />
        <Route path="/customers" element={<MainLayout><CustomerPage /></MainLayout>} />
        <Route path="/payments" element={<MainLayout><PaymentsPage /></MainLayout>} />
        <Route path="/track" element={<MainLayout><TrackPage /></MainLayout>} />
        <Route path="/branches" element={<MainLayout />} />
        <Route path="/employees" element={<MainLayout />} />
        <Route path="/delivery-agents" element={<MainLayout />} />
        <Route path="/profile" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;