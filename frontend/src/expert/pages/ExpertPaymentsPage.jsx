import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ExpertPaymentsPage = () => {
  // Dummy data (replace with real API data)
  const balance = {
    lifetimeEarnings: 12500,
    pending: 3000,
    inWithdrawal: 2000,
  };

  const transactions = [
    { id: 1, type: 'Call Completed', amount: 150, date: '2025-05-01', status: 'Completed' },
    { id: 2, type: 'Withdrawal Request', amount: -500, date: '2025-04-28', status: 'Processing' },
    { id: 3, type: 'Call Completed', amount: 200, date: '2025-04-25', status: 'Completed' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lifetime Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{balance.lifetimeEarnings}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">₹{balance.pending}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>In Withdrawal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">₹{balance.inWithdrawal}</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Summary</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(txn => (
                <TableRow key={txn.id}>
                  <TableCell>{txn.id}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell className={txn.amount > 0 ? "text-green-600" : "text-red-600"}>
                    ₹{txn.amount}
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertPaymentsPage;
