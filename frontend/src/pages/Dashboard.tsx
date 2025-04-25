import { Package, TrendingUp, TruckElectric, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Dashboard = () => {
  // Simulate data that would come from an API
  const [dashboardData] = useState({
    activeShipments: 128,
    deliveredToday: 24,
    newCustomers: 16,
    revenue: 12548,
    recentShipments: [
      { id: 'CUR-2451', route: 'New York → Los Angeles', status: 'Delivered', date: new Date().toLocaleDateString() },
      { id: 'CUR-3927', route: 'Chicago → Miami', status: 'In Transit', date: new Date().toLocaleDateString() },
      { id: 'CUR-5713', route: 'Houston → Seattle', status: 'Processing', date: new Date().toLocaleDateString() },
      { id: 'CUR-8642', route: 'Boston → Denver', status: 'Delivered', date: new Date().toLocaleDateString() },
      { id: 'CUR-1239', route: 'Atlanta → Phoenix', status: 'In Transit', date: new Date().toLocaleDateString() },
    ],
    branches: [
      { name: 'New York', shipments: 42, staff: 8 },
      { name: 'Chicago', shipments: 35, staff: 6 },
      { name: 'Los Angeles', shipments: 28, staff: 7 },
      { name: 'Miami', shipments: 19, staff: 5 },
      { name: 'Houston', shipments: 25, staff: 9 },
    ],
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeShipments}</div>
            <p className="text-xs text-gray-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
            <TruckElectric className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.deliveredToday}</div>
            <p className="text-xs text-gray-500">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            <User className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.newCustomers}</div>
            <p className="text-xs text-gray-500">+4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.revenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500">+6% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dashboardData.recentShipments.map((shipment, index) => (
                <Link to={`/track/${shipment.id}`} key={index}>
                  <div className="flex justify-between items-center border-b py-4 hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-medium">{shipment.id}</p>
                      <p className="text-sm text-gray-500">{shipment.route}</p>
                    </div>
                    <div className="text-right">
                      <p className={
                        shipment.status === 'Delivered' ? 'text-green-500' :
                        shipment.status === 'In Transit' ? 'text-blue-500' :
                        'text-yellow-500'
                      }>
                        {shipment.status}
                      </p>
                      <p className="text-sm text-gray-500">{shipment.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Branch Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dashboardData.branches.map((branch, index) => (
                <div key={index} className="flex justify-between items-center border-b py-4">
                  <p className="font-medium">{branch.name}</p>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Shipments</p>
                      <p className="font-medium text-right">{branch.shipments}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Staff</p>
                      <p className="font-medium text-right">{branch.staff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;