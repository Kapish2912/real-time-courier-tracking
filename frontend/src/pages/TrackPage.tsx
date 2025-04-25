import { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Search, Package, Truck, MapPin, CheckCircle } from 'lucide-react';

const TrackPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Mock tracking data
  const trackingInfo = {
    id: 'CUR-5678',
    status: 'In Transit',
    estimatedDelivery: 'April 26, 2025',
    sender: 'John Doe',
    receiver: 'Alice Smith',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    weight: '2.5kg',
    events: [
      { date: 'April 25, 2025 - 08:30 AM', location: 'New York Sorting Center', status: 'In Transit', description: 'Package is on the way to destination' },
      { date: 'April 24, 2025 - 02:15 PM', location: 'New York Branch', status: 'Processed', description: 'Package has been processed at origin facility' },
      { date: 'April 24, 2025 - 10:45 AM', location: 'New York Branch', status: 'Received', description: 'Package has been received by courier' },
      { date: 'April 23, 2025 - 04:20 PM', location: 'Shipper', status: 'Created', description: 'Shipping label created, package ready for pickup' },
    ]
  };

  const handleTrack = () => {
    if (trackingId.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Track Your Package</h2>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p className="text-gray-600">Enter your tracking number to check the current status of your shipment.</p>
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Enter tracking number (e.g., CUR-1234)" 
                  className="pl-8" 
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                />
              </div>
              <Button onClick={handleTrack}>Track</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {isTracking && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">Shipment: {trackingInfo.id}</h3>
                  <p className="text-sm text-gray-500">
                    Estimated Delivery: {trackingInfo.estimatedDelivery}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {trackingInfo.status}
                  </span>
                </div>
              </div>

              <div className="my-6">
                <div className="relative">
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 h-1 absolute top-4"></div>
                  
                  {/* Status steps */}
                  <div className="flex justify-between relative">
                    <div className="text-center">
                      <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Package className="text-white w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">Picked Up</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                        <MapPin className="text-white w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">Processing</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Truck className="text-white w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">In Transit</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle className="text-white w-4 h-4" />
                      </div>
                      <p className="text-xs font-medium">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm font-medium">From:</p>
                  <p className="text-sm">{trackingInfo.sender}</p>
                  <p className="text-sm text-gray-500">{trackingInfo.origin}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">To:</p>
                  <p className="text-sm">{trackingInfo.receiver}</p>
                  <p className="text-sm text-gray-500">{trackingInfo.destination}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-bold mb-4">Tracking History</h3>
              <div className="space-y-4">
                {trackingInfo.events.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 relative">
                      <div className={`w-3 h-3 rounded-full mt-1.5 ${index === 0 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                      {index !== trackingInfo.events.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 absolute left-1.5 top-3"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{event.status}</p>
                      <p className="text-xs text-gray-500">{event.date}</p>
                      <p className="text-sm">{event.location}</p>
                      <p className="text-xs text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrackPage;