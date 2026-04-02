# Travalia - Modern Travel Management System 🌍✈️

Travalia is a full-stack travel management web application designed to provide a seamless booking and browsing experience for travelers. It features a dynamic administrative backend and a responsive, interactive frontend.

---

## 🔗 Live Demo :
https://travalia.sourovdev.space

🌐 **Admin Panel:**  
https://travalia.sourovdev.space/admin/login  

🔑 **Admin Credentials:**  
- **Email:** admin@travelia.com  
- **Password:** 12345  

---

## 🏗 System Architecture

The project follows a **Client-Server Architecture**:

- **Frontend**: A Single Page Application (SPA) built with React/Vite that communicates with the backend via RESTful APIs.  
- **Backend**: A Node.js and Express server handling business logic, authentication, and database interactions.  
- **Database**: MySQL used for structured data storage (Tours, Bookings, Users, Blogs).  
- **External Services**: Integrated with Firebase for real-time member synchronization.  

---

## 🚀 Key Features

- **Dynamic Tour Packages**: Fetch and display real-time travel packages from the MySQL database.  
- **Package Filtering**: Highlighted "Recommended Trips" using (`is_recommended = 1`).  
- **Booking System**: Complete workflow for users to book travel packages.  
- **Blog & Content Management**: Admin-controlled travel blog system.  
- **Contact & Lead Generation**: Integrated contact form for inquiries.  
- **Admin Dashboard**: Full CRUD system for managing tours, bookings, users, and content.  

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (MariaDB) |
| **Sync** | Firebase |
| **Communication** | REST API, Axios, CORS |
| **Documentation** | LaTeX |

---

## 💻 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MySQL Server
- NPM or Yarn

---

1. Clone the Repository
```bash
git clone https://github.com/yourusername/travalia.git
cd travalia

```

 2. Backend Configuration

Navigate to the backend folder
```bash
cd backend
npm install
```
Create a .env file in the backend root directory:

Navigate to the backend folder
```bash
PORT=5000
DB_HOST=127.0.0.1
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=sourovdev_travalia
```
3. Database Setup
```bash
is_recommended = 1
```

4. Frontend Configuration
Navigate to the frontend folder:
```bash
cd frontend
npm install
```

Run development server:
```bash
npm run dev
```
Run development server:
```bash
npm run dev
```
