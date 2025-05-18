import express from 'express';
import mysql from 'mysql2';
import cors from 'cors'; 

const app = express();
const port = 3001; // Change this to your desired port

// Middleware
app.use(cors());
app.use(express.json());

// Database initialization
// Replace with your database connection details
const db = mysql.createConnection({
  host: 'your-database-host',
  user: 'your-database-username',
  password: 'your-database-password',
  database: 'your-database-name'
});

// Connection to the database
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// API endpoint to fetch couriers
app.get('/api/couriers', (req, res) => {
  db.query('SELECT * FROM courier', (err, results) => {
    if (err) {
      console.error('Error fetching couriers:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// API endpoint to add a new courier
app.post('/api/couriers', async (req, res) => {
  const { SenderId, ReceiverId, Weight, Status, TrackingNumber, Shipment_Date, Sender_Name, Sender_Phone, Sender_Address, Receiver_Name, Receiver_Phone, Receiver_Address } = req.body;

  // Insert into sender table if SenderId does not exist
  const insertSenderQuery = 'INSERT INTO sender (SenderId, Sender_Name, Sender_Phone, Sender_Address) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Sender_Name = VALUES(Sender_Name), Sender_Phone = VALUES(Sender_Phone), Sender_Address = VALUES(Sender_Address)';
  await db.promise().query(insertSenderQuery, [SenderId, Sender_Name, Sender_Phone, Sender_Address]);

  // Insert into receiver table if ReceiverId does not exist
  const insertReceiverQuery = 'INSERT INTO receiver (ReceiverId, Receiver_Name, Receiver_Phone, Receiver_Address) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE Receiver_Name = VALUES(Receiver_Name), Receiver_Phone = VALUES(Receiver_Phone), Receiver_Address = VALUES(Receiver_Address)';
  await db.promise().query(insertReceiverQuery, [ReceiverId, Receiver_Name, Receiver_Phone, Receiver_Address]);

  // Insert into courier table
  const insertCourierQuery = 'INSERT INTO courier (SenderId, ReceiverId, Weight, Status, TrackingNumber, Shipment_Date) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(insertCourierQuery, [SenderId, ReceiverId, Weight, Status, TrackingNumber, Shipment_Date], (err, results) => {
    if (err) {
      console.error('Error adding courier:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(201).json({ message: 'Courier added successfully', id: results.insertId });
  });
});

// API endpoint to fetch customers
app.get('/api/customers', (req, res) => {
  db.query('SELECT * FROM customer', (err, results) => {
    if (err) {
      console.error('Error fetching customers:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// API endpoint to add a new customer
app.post('/api/customers', (req, res) => {
  const { Customer_Name, Customer_Address, Customer_Phone } = req.body;

  const insertCustomerQuery = 'INSERT INTO customer (Customer_Name, Customer_Address, Customer_Phone) VALUES (?, ?, ?)';
  db.query(insertCustomerQuery, [Customer_Name, Customer_Address, Customer_Phone], (err, results) => {
    if (err) {
      console.error('Error adding customer:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(201).json({ message: 'Customer added successfully', id: results.insertId });
  });
});

// API endpoint to fetch payments
app.get('/api/payments', (req, res) => {
  db.query('SELECT * FROM payment', (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// API endpoint to add a new payment
app.post('/api/payments', (req, res) => {
  const { Transaction_Date, Amount, Payment_Method, CustomerId } = req.body;

  const insertPaymentQuery = 'INSERT INTO payment (Transaction_Date, Amount, Payment_Method, CustomerId) VALUES (?, ?, ?, ?)';
  db.query(insertPaymentQuery, [Transaction_Date, Amount, Payment_Method, CustomerId], (err, results) => {
    if (err) {
      console.error('Error adding payment:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(201).json({ message: 'Payment added successfully', id: results.insertId });
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
