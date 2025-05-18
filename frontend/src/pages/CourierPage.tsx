import { useEffect, useState } from 'react';
import {
  Edit,
  PlusCircle,
  Search,
  Trash2
} from 'lucide-react';
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";

// Define the Courier type
// This should match the structure of your courier data
interface Courier {
  CourierId: number;
  Weight: number;
  Status: string;
  TrackingNumber: string;
  ReceiverId: number;
  SenderId: number;
  Shipment_Date: string; 
}

const CourierPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [newCourier, setNewCourier] = useState({
    SenderId: '',
    ReceiverId: '',
    Weight: '',
    Status: 'in-transit',
    TrackingNumber: '',
    Shipment_Date: '',
    Sender_Name: '',
    Sender_Phone: '',
    Sender_Address: '',
    Receiver_Name: '',
    Receiver_Phone: '',
    Receiver_Address: ''
  });

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/couriers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Courier[] = await response.json(); // Ensure data is typed
        setCouriers(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching couriers:', error);
      }
    };

    fetchCouriers(); // Call the fetch function
  }, []); // Empty dependency array means this runs once on mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCourier(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/couriers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourier),
      });

      if (!response.ok) {
        throw new Error('Failed to add courier');
      }

      const result = await response.json();
      console.log(result); 
      setIsDialogOpen(false); 
      setNewCourier({ 
        SenderId: '', 
        ReceiverId: '', 
        Weight: '', 
        Status: 'in-transit', 
        TrackingNumber: '', 
        Shipment_Date: '', 
        Sender_Name: '', 
        Sender_Phone: '', 
        Sender_Address: '', 
        Receiver_Name: '', 
        Receiver_Phone: '', 
        Receiver_Address: '' 
      }); 
    } catch (error) {
      console.error('Error adding courier:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Courier Management</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Courier
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search courier..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="in-transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Number</TableHead>
              <TableHead>Weight (kg)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Shipment Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couriers.map((courier) => (
              <TableRow key={courier.TrackingNumber}>
                <TableCell className="font-medium">{courier.TrackingNumber}</TableCell>
                <TableCell>{courier.Weight}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    courier.Status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    courier.Status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    courier.Status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {courier.Status}
                  </span>
                </TableCell>
                <TableCell>{courier.Shipment_Date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Courier</DialogTitle>
            <DialogDescription>
              Enter the details for the new courier package.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sender ID</label>
              <Input name="SenderId" value={newCourier.SenderId} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Receiver ID</label>
              <Input name="ReceiverId" value={newCourier.ReceiverId} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (kg)</label>
              <Input type="number" step="0.1" name="Weight" value={newCourier.Weight} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select name="Status" value={newCourier.Status} onValueChange={(value) => setNewCourier(prevState => ({ ...prevState, Status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sender Name</label>
              <Input name="Sender_Name" value={newCourier.Sender_Name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sender Phone</label>
              <Input name="Sender_Phone" value={newCourier.Sender_Phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sender Address</label>
              <Input name="Sender_Address" value={newCourier.Sender_Address} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Receiver Name</label>
              <Input name="Receiver_Name" value={newCourier.Receiver_Name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Receiver Phone</label>
              <Input name="Receiver_Phone" value={newCourier.Receiver_Phone} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Receiver Address</label>
              <Input name="Receiver_Address" value={newCourier.Receiver_Address} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tracking Number</label>
              <Input name="TrackingNumber" value={newCourier.TrackingNumber} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Shipment Date</label>
              <Input type="date" name="Shipment_Date" value={newCourier.Shipment_Date} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Courier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourierPage;