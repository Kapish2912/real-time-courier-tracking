import { CreditCard, Receipt, Search } from 'lucide-react';
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

const PaymentsPage = () => {
  // Mock data for payments
  const payments = [
    { id: 'PAY-1234', customer: 'John Doe', courier: 'CUR-5678', amount: '$45.99', status: 'Paid', method: 'Credit Card', date: '2025-04-20' },
    { id: 'PAY-5678', customer: 'Mary Johnson', courier: 'CUR-9012', amount: '$32.50', status: 'Paid', method: 'PayPal', date: '2025-04-19' },
    { id: 'PAY-9012', customer: 'David Wilson', courier: 'CUR-3456', amount: '$55.75', status: 'Pending', method: 'Bank Transfer', date: '2025-04-21' },
    { id: 'PAY-3456', customer: 'Emma Davis', courier: 'CUR-7890', amount: '$28.25', status: 'Paid', method: 'Credit Card', date: '2025-04-18' },
    { id: 'PAY-7890', customer: 'James Taylor', courier: 'CUR-1234', amount: '$61.00', status: 'Failed', method: 'Credit Card', date: '2025-04-17' },
  ];

  // State for filtering
  const [filterStatus, setFilterStatus] = React.useState<string>('All');

  // Filtered payments based on status
  const filteredPayments = filterStatus === 'All' 
    ? payments 
    : payments.filter(payment => payment.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => console.log('Generating report...')}>
            <Receipt className="mr-2 h-4 w-4" /> Generate Report
          </Button>
          <Button>
            <CreditCard className="mr-2 h-4 w-4" /> Record Payment
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search payments..." className="pl-8" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select onValueChange={setFilterStatus} value={filterStatus}>
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
              <TableHead>Customer</TableHead>
              <TableHead>Courier</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>{payment.customer}</TableCell>
                <TableCell>{payment.courier}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>
                  <span className={
                    payment.status === 'Paid' ? 'text-green-600' :
                    payment.status === 'Pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }>
                    {payment.status}
                  </span>
                </TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell>{payment.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentsPage;