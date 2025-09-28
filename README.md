# GraphQL Full-Stack Project

A modern full-stack application with GraphQL backend and React frontend.

## 📁 Project Structure

This is a monorepo containing multiple applications:

### 🖥️ Backend
- **[server/](./server/)** - GraphQL API server built with Next.js 15, Apollo Server 5, Prisma ORM, and JWT authentication

### 🎨 Frontend  
- **client/** - React frontend application (coming soon)

## 🚀 Quick Start

### Backend Setup
Navigate to the server directory and follow the setup instructions:

```bash
cd server/
```

See [server/README.md](./server/README.md) for detailed backend setup and API documentation.

### Frontend Setup
*Coming soon - React frontend application*

## 🛠️ Tech Stack

### Backend
- **Framework:** Next.js 15 (App Router)
- **GraphQL:** Apollo Server 5
- **Database:** MySQL with Prisma ORM
- **Authentication:** JWT + HttpOnly cookies
- **Validation:** Zod schemas
- **Language:** TypeScript

### Frontend
- **Framework:** React (coming soon)
- **Build Tool:** Vite (coming soon)
- **Language:** TypeScript (coming soon)

## 📋 Prerequisites

- Node.js 18+
- MySQL database
- npm or yarn

## 🗄️ Database

The project uses MySQL with Prisma ORM. The database schema includes:

- **Users** - Authentication and user management
- **Brands** - Car brands (BMW, Mercedes, Audi, etc.)
- **Colors** - Car colors
- **Cars** - Cars with brand and color relations

## 🔐 Authentication

The application uses a hybrid authentication approach:

- **JWT tokens** for API authentication
- **HttpOnly cookies** for web browser security
- **Refresh tokens** for token renewal

## 📚 API Documentation

### GraphQL
- **Endpoint:** `http://localhost:3000/api/graphql`
- **Playground:** Available in development mode

### REST API
- **Authentication:** `/api/auth/*`
- **Login, Refresh, Logout** endpoints

For detailed API documentation, see [server/README.md](./server/README.md).

## 🚀 Development

### Backend Development
```bash
cd server/
npm install
npm run dev
```

### Frontend Development
*Coming soon*

## 🧪 Testing

### Backend Testing
Test the GraphQL API using the built-in playground at `http://localhost:3000/api/graphql` or tools like Postman.

### Frontend Testing
*Coming soon*

## 🚀 Deployment

### Backend Deployment
The backend is ready for deployment on platforms like:
- Vercel (recommended)
- Railway
- DigitalOcean
- AWS

### Frontend Deployment
*Coming soon*

## 📁 Repository Structure

```
11_GraphQL/
├── README.md                 # This file
├── .gitignore               # Git ignore rules
├── server/                  # Backend application
│   ├── README.md           # Backend documentation
│   ├── src/                # Source code
│   ├── prisma/             # Database schema & migrations
│   └── package.json        # Backend dependencies
└── client/                 # Frontend application (coming soon)
    └── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Backend Documentation](./server/README.md)
- [Frontend Documentation](./client/README.md) *(coming soon)*
