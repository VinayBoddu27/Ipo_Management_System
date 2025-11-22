# IPO Management System

A full-stack web application designed to streamline and automate the end-to-end process of managing Initial Public Offerings (IPOs). This system allows companies to publish IPOs, investors to apply, and admins to oversee allotments, transactions, compliance, and notifications. The project is designed with MongoDB as the backend database and Express/Node/Frontend (HTML/CSS/JS) on the client side.

---

## 🚀 Features

### **For Investors**

* Select IPO and validate PAN number
* Apply for IPOs
* View application status
* Check allotment results (Allotted / Not Allotted)
* View transaction history

### **For Companies**

* Register company profile
* Publish new IPO issues
* Update IPO details, price, listing & closing dates

### **For Admin**

* Manage companies, investors, brokers, IPO issues
* Run allotment logic
* Approve / reject applications
* Post notifications
* Compliance tracking

---

## 🏗️ Project Structure

```
IPO_Management_System/
 ├── backend/
 │   ├── models/
 │   ├── routes/
 │   ├── config/
 │   └── server.js
 ├── frontend/
 │   ├── index.html
 │   ├── selectIPO.html
 │   ├── success.html
 │   └── notAllotted.html
 └── README.md
```

---

## 📦 Database Tables (MongoDB Collections)

### 1. **Companies**

Stores company details, IPO information, registration data.

### 2. **IPO_Issues**

Stores IPO details like opening/closing dates, price band, lot size, and status.

### 3. **Investors**

Investor PAN, personal details, applied IPOs.

### 4. **Applications**

Tracks investor applications for each IPO.

### 5. **Allotments**

Stores allotment results per investor.

### 6. **Transactions**

Tracks payment, refunds, allotment charges.

### 7. **Admin**

Admin login credentials & role-based permissions.

### 8. **Brokers**

Broker profiles, commission, applications routed via brokers.

### 9. **Compliance**

SEBI compliance logs, issue reports, audit trails.

### 10. **Notifications**

System alerts: allotment release, issue closure, updates.

---

## 🔌 Database Connection (MongoDB)

```
const express = require('express');
const mongoose = require('mongoose');

const url = "mongodb://localhost/mahesh";

const app = express();
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on('open', () => {
    console.log("Connected...");
});
```

---

## 📷 UI Flow (Screens Included)

### **1️⃣ IPO Selection Page**

User selects the IPO name and enters PAN.

### **2️⃣ PAN Validation & IPO Confirmation Page**

User sees confirmation message.

### **3️⃣ Congratulations Page**

Shown when IPO is allotted.

### **4️⃣ Not Allotted Page**

Shown when investor is not allotted.

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Version Control:** Git & GitHub

---

## 📥 Installation & Setup

### Clone the repository

```
git clone https://github.com/your-username/IPO_Management_System.git
cd IPO_Management_System
```

### Install Backend Dependencies

```
cd backend
npm install
```

### Run the Backend Server

```
node server.js
```

### Open Frontend

Open `index.html` in any browser.

---

## 🧠 Future Enhancements

* JWT-based authentication
* Payment gateway integration
* Automated allotment algorithm
* Admin dashboard UI
* Cloud deployment (Render / AWS / Vercel)

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📜 License

This project is open-source under the MIT License.

---

## 👨‍💻 Author

**Vinay Kumar Boddu**
Developer | Researcher | Learner

---

If you'd like, I can also:

* Add code examples for every collection
* Add API documentation for all routes
* Create a full admin dashboard UI
* Prepare the complete GitHub project structure
