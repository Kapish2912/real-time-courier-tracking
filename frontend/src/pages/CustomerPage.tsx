import { Edit, Mail, Phone, PlusCircle, Search, Trash2 } from 'lucide-react';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../components/ui/table";

const CustomersPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for customers
  const customers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '+1 123-456-7890', address: '123 Main St, New York, NY', shipments: 12, joined: '2024-01-15' },
    { id: 2, name: 'Mary Johnson', email: 'mary.j@example.com', phone: '+1 234-567-8901', address: '456 Elm St, Chicago, IL', shipments: 8, joined: '2024-02-20' },
    { id: 3, name: 'David Wilson', email: 'david.w@example.com', phone: '+1 345-678-9012', address: '789 Oak St, Los Angeles, CA', shipments: 15, joined: '2023-11-05' },
    { id: 4, name: 'Emma Davis', email: 'emma.d@example.com', phone: '+1 456-789-0123', address: '321 Pine St, Miami, FL', shipments: 5, joined: '2024-03-10' },
    { id: 5, name: 'James Taylor', email: 'james.t@example.com', phone: '+1 567-890-1234', address: '654 Cedar St, Houston, TX', shipments: 9, joined: '2023-12-15' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Management</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search customers..." className="pl-8" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">Phone</TableHead>
              <TableHead className="hidden lg:table-cell">Address</TableHead>
              <TableHead>Shipments</TableHead>
              <TableHead className="hidden md:table-cell">Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                <TableCell className="hidden sm:table-cell">{customer.phone}</TableCell>
                <TableCell className="hidden lg:table-cell">{customer.address}</TableCell>
                <TableCell>{customer.shipments}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.joined}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" title="Email">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Call">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Delete">
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter the details for the new customer.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input type="tel" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Input />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>Save Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;