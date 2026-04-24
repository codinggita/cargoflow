import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="book" element={<div className="p-4 bg-white rounded-lg border border-cardBorder shadow-sm">Book Cargo Page (Coming Soon)</div>} />
          <Route path="bookings" element={<div className="p-4 bg-white rounded-lg border border-cardBorder shadow-sm">Bookings Page (Coming Soon)</div>} />
          <Route path="fleet" element={<div className="p-4 bg-white rounded-lg border border-cardBorder shadow-sm">Fleet Page (Coming Soon)</div>} />
          <Route path="analytics" element={<div className="p-4 bg-white rounded-lg border border-cardBorder shadow-sm">Analytics Page (Coming Soon)</div>} />
          <Route path="tracking" element={<div className="p-4 bg-white rounded-lg border border-cardBorder shadow-sm">Tracking Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
