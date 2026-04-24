import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Truck, AlertTriangle, CheckCircle, PackageSearch, Plus, Map } from 'lucide-react';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [fleetUtils, setFleetUtils] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, bookingsRes, fleetRes, alertsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/analytics/overview'),
          axios.get('http://localhost:5000/api/bookings?limit=5'),
          axios.get('http://localhost:5000/api/fleet/utilization'),
          axios.get('http://localhost:5000/api/alerts')
        ]);
        
        setMetrics(analyticsRes.data.data);
        setBookings(bookingsRes.data.data);
        setFleetUtils(fleetRes.data.data);
        setAlerts(alertsRes.data.data);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex h-64 items-center justify-center text-primary">Loading CargoFlow Dashboard...</div>;
  }

  const getStatusStyle = (status) => {
    switch(status) {
      case 'in-transit': return 'bg-[#e4f5ee] text-[#0F6E56] border-[#b2deca]';
      case 'pending': return 'bg-[#faeeda] text-[#854F0B] border-[#fac775]';
      case 'delivered': return 'bg-[#eaf3de] text-[#3B6D11] border-[#c0dd97]';
      case 'cancelled': return 'bg-[#fce8e8] text-[#E24B4A] border-[#f5b8b8]';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Shipments', value: metrics?.activeShipments || 0, subLeft: 'attention needed', subRight: metrics?.attentionNeeded || 0, color: 'bg-primary' },
          { label: 'Bookings Today', value: metrics?.bookingsToday || 0, subLeft: 'vs yesterday', subRight: metrics?.bookingsComparison, color: 'bg-lightGreen' },
          { label: 'Revenue MTD', value: metrics?.revenueMtd || '$0', subLeft: 'growth', subRight: metrics?.revenueGrowth, color: 'bg-darkGreen' },
          { label: 'On-time Rate', value: `${metrics?.onTimeRate || 0}%`, subLeft: 'Target: 95%', subRight: '', color: (metrics?.onTimeRate < 95 ? 'bg-amberWarning' : 'bg-primary') }
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-[10px] border border-cardBorder overflow-hidden shadow-sm relative">
            <div className={`h-[3px] w-full ${card.color}`}></div>
            <div className="p-4">
              <div className="text-[11px] text-textMuted uppercase font-semibold tracking-wider">{card.label}</div>
              <div className="text-2xl font-bold text-textPrimary mt-1">{card.value}</div>
              <div className="flex items-center gap-1 mt-2 text-[12px]">
                <span className={card.color === 'bg-amberWarning' ? 'text-amberDark font-medium' : 'text-primary font-medium'}>{card.subRight}</span>
                <span className="text-textMuted">{card.subLeft}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: 2fr + 1fr */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COMPONENT: Live Shipments */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-textPrimary flex items-center gap-2">
            <Truck className="w-5 h-5 text-primary" /> Live Shipments
          </h2>
          <div className="bg-white rounded-[10px] border border-cardBorder shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-cardBorder">
                  <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-textMuted font-semibold">Booking ID</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-textMuted font-semibold">Route</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-textMuted font-semibold">Vehicle</th>
                  <th className="py-3 px-4 text-[10px] uppercase tracking-wider text-textMuted font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cardBorder">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-darkGreen">{b.bookingId}</td>
                    <td className="py-4 px-4 text-sm text-textSecondary">{b.pickupLocation} → {b.deliveryLocation}</td>
                    <td className="py-4 px-4 text-sm text-textMuted">{b.vehicleId?.name} <span className="text-xs">({b.vehicleType})</span></td>
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusStyle(b.status)}`}>
                        {b.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && <div className="p-8 text-center text-textMuted">No recent bookings found.</div>}
          </div>
        </div>

        {/* RIGHT COLUMN: Fleet Utils, Alerts, Actions */}
        <div className="space-y-6">
          
          {/* Quick Actions */}
          <div className="bg-white p-4 rounded-[10px] border border-cardBorder shadow-sm flex flex-col gap-3">
            <button className="w-full bg-primary hover:bg-darkGreen text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> New Booking
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="border border-cardBorder bg-[#f0faf5] hover:bg-[#e4f5ee] text-darkGreen py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <Map className="w-4 h-4" /> Track
              </button>
              <button className="border border-cardBorder bg-[#f0faf5] hover:bg-[#e4f5ee] text-darkGreen py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                <Truck className="w-4 h-4" /> Fleet
              </button>
            </div>
          </div>

          {/* Fleet Utilization */}
          <div className="bg-white p-4 rounded-[10px] border border-cardBorder shadow-sm">
            <h3 className="text-sm font-bold text-textPrimary mb-4">Fleet Utilization</h3>
            <div className="space-y-4">
              {fleetUtils.map((f, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-textSecondary uppercase">{f.type}</span>
                    <span className="text-textMuted font-medium">{f.percentage}% · {f.active}/{f.total}</span>
                  </div>
                  <div className="w-full h-[6px] bg-[#e4f5ee] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-primary to-lightGreen" 
                      style={{ width: `${f.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white p-4 rounded-[10px] border border-cardBorder shadow-sm">
            <h3 className="text-sm font-bold text-textPrimary mb-3 flex items-center gap-2">
               Alerts
            </h3>
            <div className="space-y-3">
              {alerts.slice(0, 3).map((a, i) => (
                <div key={i} className="flex gap-3 items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${a.type === 'error' ? 'bg-redAlert' : a.type === 'warning' ? 'bg-amberWarning' : 'bg-successGreen'}`}></div>
                  <div>
                    <p className="text-xs text-textSecondary leading-snug">{a.message}</p>
                    <p className="text-[10px] text-textMuted mt-1">Just now</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
