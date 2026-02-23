# 📦 Inventory Management System (MERN Stack)

A full-stack Inventory Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application allows users to manage products, track stock levels, handle sales and orders, update in real-time using WebSockets, and maintain user profiles.

---

## 🚀 Features

### ✅ Core Functionalities
- 🔄 **Real-Time Data Sync** via WebSockets (Socket.IO)
- 📦 **Product Management**: Add, edit, delete, and view products with categories and stock tracking
- 🧾 **Order Management**: Create and manage customer orders
- 💰 **Sales Tracking**: View daily/weekly/monthly sales and revenue
- 📊 **Stock Monitoring**: Low-stock alerts, live inventory levels
- 👤 **User Profile Pages**: Update profile info, view activity and role
- 🔐 **Authentication & Authorization**: Secure login, JWT-based auth, admin vs staff roles
- 📈 **Dashboard Analytics**: Key performance indicators (KPIs), charts, and summaries

---

## 🧰 Tech Stack

| Tech             | Description                       |
|------------------|-----------------------------------|
| MongoDB          | NoSQL database                    |
| Express.js       | Backend framework for Node.js     |
| React.js         | Frontend UI library               |
| Node.js          | Backend runtime                   |
| Socket.IO        | Real-time communication           |
| Mongoose         | ODM for MongoDB                   |
| Redux Toolkit    | State management on frontend      |
| Tailwind CSS     | Modern, utility-first CSS         |
| JWT              | Authentication & session management |

---
## 📦 Installation

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/inventory-management-mern.git
cd inventory-management-mern
```
```
# Backend
cd server
npm install
```
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory
JWT_SECRET=your_jwt_secret

```
```
cd ../client
npm install
```

```
# Backend
cd server
npm run dev
```
