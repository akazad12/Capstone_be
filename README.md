# Capstone Backend API

This repository contains the backend API for the **Capstone Stock Portfolio Tracker** project. It’s a RESTful API built with **Node.js**, **Express**, and **MongoDB** that supports authentication, user watchlists, assets, portfolio tracking, transactions, and live stock pricing integration.

## Features

- User registration and authentication  
- CRUD operations for portfolios and watchlists  
- Manage stock assets stored in the database  
- Fetch live stock prices via external API (e.g., Finnhub)  
- Modular route organization with Express routers  
- Middleware support for CORS and error handling  

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database + ODM |
| Axios | HTTP client for external API calls |
| JWT | Token‑based authentication |
| dotenv | Environment variable management |
| cors | Cross‑origin requests support |  

---

## Setup & Requirements

 **Node.js** (v18+ recommended)  
 **npm** (comes with Node.js)  
 **MongoDB** (local install or MongoDB Atlas)  
 **Finnhub API key** (for live stock prices)

---

### 🔁 Installation

1. **Clone the repository**
```bash
git clone https://github.com/akazad12/Capstone_be.git
cd Capstone_be
```
2. **Clone the repository**
```bash
npm install
```
3. **Creat .env file**
```env
PORT=3000
MONGO_URI=<your-mongodb-uri>
FKEY=<your-finnhub-api-key>
JWT_SECRET=<secret-for-jwt>
```
4. **Run Server**
```bash
npm run dev
```
## API Routes (Overview)

These paths are mounted in `server.js`.

| Route Prefix | Purpose |
|--------------|---------|
| `/api/users` | User authentication & profile |
| `/api/assets` | Manage stock assets |
| `/api/portfolio` | Portfolio endpoints |
| `/api/transactions` | Transactions (buys/sells) |
| `/api/users/:userId/watchlist` | User’s watchlist |

### Examples

- `GET /api/users/:id/watchlist` – fetch a user’s watchlist  
- `POST /api/assets` – add a new stock asset  
- `GET /api/assets/:id` – get asset metadata  
- `POST /api/users/:userId/watchlist/:assetId` – add asset to watchlist  

*Adjust the routes as implemented — they are defined in separate files within `routes/`.*

---

## Sample Requests

**Get User Watchlist**
```http
GET /api/users/1234/watchlist
```
**Add Aset to Watchlist**
```http
GET /api/users/1234/watchlist
```
**Get User Watchlist**
```http
GET /api/users/1234/watchlist
```

