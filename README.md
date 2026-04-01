# Travalia - Modern Travel Management System

Travalia is a full-stack travel management web application designed to provide a seamless booking and browsing experience for travelers. It features a dynamic administrative backend and a responsive, interactive frontend.

## 🏗 System Architecture

The project follows a **Client-Server Architecture**:
* **Frontend**: A Single Page Application (SPA) built with React/Vite that communicates with the backend via RESTful APIs.
* **Backend**: A Node.js and Express server handling business logic, authentication, and database interactions.
* **Database**: MySQL used for structured data storage (Tours, Bookings, Users, Blogs).
* **External Services**: Integrated with Firebase for real-time member synchronization.

## 🚀 Key Features

* **Dynamic Tour Packages**: Fetch and display real-time travel packages from the MySQL database.
* **Package Filtering**: Highlighted "Recommended Trips" based on specific database flags (`is_recommended`).
* **Booking System**: Complete workflow for users to book specific travel dates and packages.
* **Blog & Content Management**: A dedicated section for travel stories and updates managed via the backend.
* **Contact & Lead Generation**: Integrated contact forms for user inquiries.
* **Admin Control**: CRUD operations for managing members, bookings, and site content.

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (MariaDB) |
| **Sync** | Firebase (Member Synchronization) |
| **Communication** | REST API, Axios, CORS |
| **Documentation** | LaTeX (for professional resumes/reports) |

## 💻 Installation & Setup

### Prerequisites
* Node.js (v18+ recommended)
* MySQL Server
* NPM or Yarn

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/travalia.git](https://github.com/yourusername/travalia.git)
cd travalia

```
