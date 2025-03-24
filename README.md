# Blog-Nest

## 🚀 Blog Platform Built with Next.js 14 & TypeScript

A modern, responsive blog platform built using **Next.js 14** with **TypeScript**, **MongoDB** for data storage, **JWT** for authentication, and **bcrypt** for password hashing. Styled with **Tailwind CSS**.

---

## 📁 Project Structure

```
blog-Nest/
├── app/                # Application-related files (pages, API routes, etc.)
├── components/         # Reusable UI components
├── db/                 # Database connection and configurations
├── lib/                # Utility functions and helpers
├── models/             # Mongoose models for database entities
├── public/             # Static assets
├── .eslintrc.json      # ESLint configuration
├── .gitignore          # Files to be ignored by Git
├── README.md           # Project documentation
├── next.config.mjs     # Next.js configuration
├── package-lock.json   # Lock file for dependencies
├── package.json        # Project metadata and dependencies
├── postcss.config.mjs  # PostCSS configuration for Tailwind CSS
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

---

## 🔧 Setup Instructions

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Saheelsutar/blog-Nest.git
cd blog-Nest
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file in the root directory and add:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
Generate a secure JWT secret key using:
```sh
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### **4️⃣ Run the Development Server**
```sh
npm run dev
```
The application will be available at `http://localhost:3000`

---

## 🔑 Authentication
- Uses **JWT (JSON Web Token)** for secure authentication.
- Passwords are **hashed using bcrypt** before storing in the database.

---

## 📦 Dependencies Installed
```sh
npx create-next-app@14
npm i mongoose@latest
npm i bcryptjs jsonwebtoken
npm i @types/jsonwebtoken @types/bcryptjs
npm i cloudinary
```

---

## ✅ Features
✔ **Next.js 14 with TypeScript** for a robust development experience.  
✔ **MongoDB (via Mongoose)** for scalable and efficient data storage.  
✔ **JWT Authentication** for secure user sessions.  
✔ **Bcrypt.js** for secure password hashing.  
✔ **Tailwind CSS** for beautiful, responsive UI.  
✔ **Fully Responsive** design for mobile and desktop.  
✔ **Fully Responsive** Implemented Cloudinary to handle image uploads and retrieval, improving media management and scalability.

---


