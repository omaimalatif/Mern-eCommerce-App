# ScentSational – MERN E-Commerce Website

## Project Overview

ScentSational is a full-stack luxury fragrance and wax candle e-commerce website developed using the MERN Stack. The platform allows users to browse products, create an account, log in securely, manage their shopping cart, and place orders. The project follows a client-server architecture with a React frontend and an Express.js backend connected to MongoDB Atlas.

## Live Deployment

### Frontend (Netlify)

https://magnificent-brioche-a0a986.netlify.app

### Backend API (Railway)

https://beautiful-liberation-production-452f.up.railway.app/api

---

## Tech Stack

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- MongoDB Atlas
- Mongoose

### Deployment

- Netlify (Frontend)
- Railway (Backend)
- MongoDB Atlas (Database)

---

## Features

### User Features

- User Registration
- Secure Login using JWT
- Guest User Support
- Product Listing
- Product Details
- Shopping Cart
- Checkout
- Order Placement
- Responsive User Interface

### Admin Features

- Add Products
- Update Products
- Delete Products
- Manage Product Inventory

---

## Project Structure

```
Mern-Ecommerce-App/

│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/omaimalatif/Mern-ECommerce-App.git

cd Mern-ECommerce-App
```

---

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

Create a `.env` file inside the backend folder.

Example:

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

PORT=8080
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create a `.env` file inside the frontend folder.

```env
VITE_API_URL=http://localhost:8080
```

---

## Deployment Process

### Backend Deployment

- Backend was deployed on Railway.
- MongoDB Atlas was used as the production database.
- Environment variables were configured on Railway.
- CORS was configured to allow requests from the deployed frontend.

### Frontend Deployment

- Frontend was deployed on Netlify.
- Environment variable `VITE_API_URL` was configured to point to the Railway backend.
- Automatic deployment from GitHub was enabled.

---

## API Endpoints

### Users

```
POST /api/users/register

POST /api/users/login

GET /api/users/guest
```

### Products

```
GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id
```

### Cart

```
GET /api/cart

POST /api/cart

PUT /api/cart/:id

DELETE /api/cart/:id
```

### Orders

```
POST /api/orders

GET /api/orders
```

---

## Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Environment Variables for Sensitive Information

---

## Challenges Faced

During development and deployment, several challenges were encountered:

### GitHub Repository Management

- Removed accidentally exposed environment variables.
- Configured `.gitignore` correctly to prevent `.env` files from being committed.

### MongoDB Atlas Connection

- Configured the production database connection.
- Resolved connection issues during Railway deployment.

### Railway Deployment

- Configured environment variables.
- Ensured the backend server listened on the Railway-assigned PORT.
- Verified API accessibility after deployment.

### Netlify Deployment

- Configured build settings.
- Added frontend environment variables.
- Connected Netlify with the GitHub repository for automatic deployments.

### CORS Issues

One of the major deployment challenges was Cross-Origin Resource Sharing (CORS). The frontend initially could not communicate with the backend due to blocked requests.

This was resolved by:

- Adding the deployed Netlify URL to the Express CORS configuration.
- Redeploying the backend after updating the allowed origins.
- Updating the frontend environment variable to use the correct Railway backend URL.

### Environment Variables

Separate environment variables were maintained for local development and production to ensure secure handling of API URLs, database credentials, and authentication secrets.

---

## Future Improvements

- Payment Gateway Integration
- Wishlist
- Product Reviews
- Admin Dashboard
- Order Tracking
- Product Search
- Product Filtering
- Email Verification
- Password Reset
- Performance Optimization

---

## Author

**Omaima Latif**

GitHub:
https://github.com/omaimalatif

Project Repository:
https://github.com/omaimalatif/Mern-ECommerce-App
