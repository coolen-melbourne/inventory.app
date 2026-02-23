const express = require("express");
const { MongoDBconfig } = require('./libs/mongoconfig');
const { Server } = require("socket.io");
const http = require("http");
const cors = require('cors');
const cookieParser = require("cookie-parser");

const authrouter = require('./Routers/authRouther');
const productrouter = require('./Routers/ProductRouter');
const orderrouter = require('./Routers/orderRouter');
const categoryrouter = require("./Routers/categoryRouter")
const notificationrouter = require('./Routers/notificationRouters');
const activityrouter = require('./Routers/activityRouter');
const inventoryrouter = require('./Routers/inventoryRouter');
const salesrouter = require('./Routers/salesRouter');
const supplierrouter = require('./Routers/supplierrouter');
const stocktransactionrouter = require('./Routers/stocktransactionrouter');

require("dotenv").config();
const PORT = process.env.PORT || 3003;

const app = express();
const server = http.createServer(app);

// Socket.IO va REST API CORS uchun umumiy ro'yxat
const allowedOrigins = [
  "http://localhost:3000",
  "https://advanced-inventory-management-system.vercel.app",
  "https://advanced-inventory-management-system-v1.onrender.com" // Yangi domen qo'shildi
];

// Socket.IO CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

// REST API CORS
app.use(cors({
  origin: function (origin, callback) {
    // Agar origin ro'yxatda bo'lsa yoki so'rov postmandan kelsa (origin undefined)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS tomonidan ruxsat berilmagan'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(express.json({ limit: "10mb" }));
app.set("io", io);
app.use(cookieParser());

// Routers
app.use('/api/auth', authrouter);
app.use('/api/product', productrouter);
app.use('/api/order', orderrouter);
app.use('/api/category', categoryrouter);
app.use('/api/notification', notificationrouter);
app.use('/api/activitylogs', activityrouter(app));
app.use('/api/inventory', inventoryrouter);
app.use('/api/sales', salesrouter);
app.use('/api/supplier', supplierrouter);
app.use("/api/stocktransaction", stocktransactionrouter);

// Server ishga tushishi
server.listen(PORT, () => {
  MongoDBconfig();
  console.log(`Server is running at http://localhost:${PORT}`);
});

module.exports = { io, server };