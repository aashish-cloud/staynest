# StayNest 🏠

StayNest is a comprehensive property rental platform built with Next.js, TypeScript, Prisma, MongoDB, NextAuth, Stripe, and Zustand. It offers advanced search, booking, and property management features, ensuring a seamless experience for both users and property managers.

## Features

- User Authentication: 🔐 Secure login and registration using NextAuth.
- Property Search: 🔍 Advanced search functionality for users to find rental properties.
- Booking System: 🗓 Users can book properties with real-time availability and secure payment processing via Stripe.
- Property Management: 🏢 Property managers can list, manage, and update their properties.
- State Management: ⚡️ Efficient state management with Zustand.
- Form Handling: 📝 Robust form handling with Zod and React Hook Form.
- Concurrency Control: 🔄 Ensured data integrity and concurrency control during bookings with transaction handling and concurrent request testing.

## Technologies Used

- Next.js: 🚀 A React framework for server-side rendering and static site generation.
- TypeScript: 🛠 A statically typed superset of JavaScript for better development experience and code quality.
- Prisma: 🗃 An ORM for interacting with MongoDB.
- MongoDB: 📊 A NoSQL database used for storing application data.
- NextAuth: 🔑 Authentication library for Next.js applications.
- Stripe: 💳 Payment processing platform for handling secure transactions.
- Zustand: 🐻 A small, fast, and scalable bearbones state-management solution.
- Zod: 📜 A TypeScript-first schema declaration and validation library.
- React Hook Form: 📋 A library for handling forms in React with ease.

## Installation

To get started with StayNest, follow these steps:

1. Clone the Repository:

    
    git clone https://github.com/aashish-cloud/staynest.git
    

2. Navigate to the Project Directory:

    
    cd staynest
    

3. Install Dependencies:

    
    npm install
    

4. Configure Environment Variables:

    Create a .env.local file in the root directory of the project and add the following environment variables:

    
    MONGODB_URI=your_mongodb_uri
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    STRIPE_SECRET_KEY=your_stripe_secret_key
    

    Replace the placeholder values with your actual credentials.

5. Run Migrations:

    
    npx prisma migrate dev
    

6. Start the Development Server:

    
    npm run dev
    

    The application should now be running at http://localhost:3000.

## Usage

- Authentication: 🔐 Users can register and log in using the authentication system powered by NextAuth.
- Property Search: 🔍 Navigate to the search page to find rental properties based on various criteria.
- Booking: 🗓 Users can select a property and proceed with the booking process using Stripe for secure payments.
- Property Management: 🏢 Property managers can access a dashboard to manage their properties and bookings.

## Concurrency Control

StayNest ensures data integrity and handles concurrent requests effectively. Concurrency control is managed through transaction handling during bookings, validated by rigorous concurrent request testing. 🔄 This approach ensures that multiple users can book properties simultaneously without data conflicts or inconsistencies.
