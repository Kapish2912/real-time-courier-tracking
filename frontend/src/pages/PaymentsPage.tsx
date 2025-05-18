import { useEffect, useState } from 'react';
import { CreditCard, Search } from 'lucide-react';
import React from 'react';
import { Button } from "../components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../components/ui/dialog";

// Define the Payment type
interface Payment {
  PaymentId: number;
  Transaction_Date: string;
  Amount: string;
  Payment_Method: string;
  CustomerId: number;
}

const PaymentsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState({
    Transaction_Date: '',
    Amount: '',
    Payment_Method: '',
    CustomerId: ''
  });

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/payments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Payment[] = await response.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPayment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPayment),
      });

      if (!response.ok) {
        throw new Error('Failed to add payment');
      }

      const result = await response.json();
      console.log(result);
      setIsDialogOpen(false);
      setNewPayment({ Transaction_Date: '', Amount: '', Payment_Method: '', CustomerId: '' });
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <CreditCard className="mr-2 h-4 w-4" /> Record Payment
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search payments..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Transaction Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Customer ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.PaymentId}>
                <TableCell>{payment.PaymentId}</TableCell>
                <TableCell>{payment.Transaction_Date}</TableCell>
                <TableCell>{payment.Amount}</TableCell>
                <TableCell>{payment.Payment_Method}</TableCell>
                <TableCell>{payment.CustomerId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
            <DialogDescription>
              Enter the details for the new payment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Date</label>
              <Input type="date" name="Transaction_Date" value={newPayment.Transaction_Date} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount</label>
              <Input name="Amount" value={newPayment.Amount} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Input name="Payment_Method" value={newPayment.Payment_Method} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer ID</label>
              <Input name="CustomerId" value={newPayment.CustomerId} onChange={handleInputChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsPage;