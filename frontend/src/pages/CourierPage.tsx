import {
  Edit,
  PlusCircle,
  Search,
  Trash2
} from 'lucide-react';
import { useState } from 'react';
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

const CourierPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for couriers
  const couriers = [
    { id: 'CUR-1234', sender: 'John Doe', receiver: 'Alice Smith', origin: 'New York', destination: 'Boston', status: 'In Transit', date: '2025-04-20', weight: '2.5kg' },
    { id: 'CUR-5678', sender: 'Mary Johnson', receiver: 'Bob Brown', origin: 'Chicago', destination: 'Detroit', status: 'Delivered', date: '2025-04-19', weight: '1.8kg' },
    { id: 'CUR-9012', sender: 'David Wilson', receiver: 'Sarah Lee', origin: 'Los Angeles', destination: 'San Francisco', status: 'Processing', date: '2025-04-21', weight: '3.2kg' },
    { id: 'CUR-3456', sender: 'Emma Davis', receiver: 'Michael Clark', origin: 'Miami', destination: 'Orlando', status: 'Out for Delivery', date: '2025-04-20', weight: '4.5kg' },
    { id: 'CUR-7890', sender: 'James Taylor', receiver: 'Jennifer White', origin: 'Houston', destination: 'Dallas', status: 'In Transit', date: '2025-04-21', weight: '1.3kg' },
  ];

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
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Filter</Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead className="hidden md:table-cell">Origin</TableHead>
              <TableHead className="hidden md:table-cell">Destination</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {couriers.map((courier) => (
              <TableRow key={courier.id}>
                <TableCell className="font-medium">{courier.id}</TableCell>
                <TableCell>{courier.sender}</TableCell>
                <TableCell>{courier.receiver}</TableCell>
                <TableCell className="hidden md:table-cell">{courier.origin}</TableCell>
                <TableCell className="hidden md:table-cell">{courier.destination}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    courier.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    courier.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                    courier.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {courier.status}
                  </span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{courier.date}</TableCell>
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
              <label className="text-sm font-medium">Sender Name</label>
              <Input />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Receiver Name</label>
              <Input />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Origin</label>
              <Input />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Weight (kg)</label>
              <Input type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select defaultValue="processing">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Save Courier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourierPage;