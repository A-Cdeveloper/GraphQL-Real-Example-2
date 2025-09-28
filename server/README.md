# GraphQL Backend Server

A modern GraphQL backend built with Next.js 15, Apollo Server 5, Prisma ORM, and JWT authentication.

## 🚀 Features

- **GraphQL API** with Apollo Server 5
- **Authentication** with JWT tokens and HttpOnly cookies
- **Database** with Prisma ORM and MySQL
- **Input Validation** with Zod schemas
- **Security** with CORS, rate limiting, and security headers
- **TypeScript** for type safety

## 📋 Prerequisites

- Node.js 18+ 
- MySQL database
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment setup:**
   Create `.env` file in the root directory:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"
   JWT_SECRET="your-32-character-secret-key"
   REFRESH_SECRET="your-32-character-refresh-secret"
   NODE_ENV="development"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

3. **Database setup:**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # Seed database
   npx prisma db seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 📚 API Documentation

### GraphQL Endpoint
- **URL:** `http://localhost:3000/api/graphql`
- **Playground:** Available in development mode

### REST API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token  
- `POST /api/auth/logout` - User logout

### GraphQL Schema

#### Queries
- `getAllCars(limit: Int): CarsResponse!` - Get all cars
- `getCarById(id: ID!): Car!` - Get car by ID
- `getAllBrands: BrandsResponse!` - Get all brands
- `getBrandById(id: ID!): Brand!` - Get brand by ID

#### Mutations
- `createCar(input: CreateCarInput!): Car!` - Create new car
- `updateCar(id: ID!, input: UpdateCarInput!): Car!` - Update car
- `deleteCar(id: ID!): Car!` - Delete car
- `createBrand(input: CreateBrandInput!): Brand!` - Create new brand
- `updateBrand(id: ID!, input: UpdateBrandInput!): Brand!` - Update brand
- `deleteBrand(id: ID!): Brand!` - Delete brand

## 🗄️ Database Schema

### Models
- **User** - Authentication and user management
- **Brand** - Car brands (BMW, Mercedes, etc.)
- **Color** - Car colors
- **Car** - Cars with brand and color relations

## 🔐 Authentication Flow

1. **Login:** User provides email/password → receives access token + refresh token
2. **Access:** Include JWT token in Authorization header for protected routes
3. **Refresh:** Use refresh token to get new access token when expired
4. **Logout:** Invalidate refresh token

## 🛡️ Security Features

- JWT token authentication
- HttpOnly cookies for web clients
- CORS protection
- Rate limiting (100 requests per 15 minutes)
- Security headers (XSS, CSRF protection)
- Input validation with Zod
- SQL injection protection via Prisma

## 📁 Project Structure

```
server/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/          # Authentication routes
│   │   │   └── graphql/       # GraphQL endpoint
│   │   └── page.tsx
│   └── lib/
│       ├── auth/              # JWT utilities
│       ├── graphql/           # GraphQL schema & resolvers
│       ├── prisma.ts          # Database client
│       ├── errors.ts          # Error handling
│       └── env.ts             # Environment validation
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Database seeding
└── package.json
```

## 🧪 Testing

Test the API using GraphQL Playground or tools like Postman:

```graphql
query GetAllCars {
  getAllCars {
    items {
      carId
      carName
      brand {
        brandName
      }
      color {
        colorName
      }
    }
    total
  }
}
```

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform:**
   - Vercel (recommended for Next.js)
   - Railway
   - DigitalOcean
   - AWS

3. **Environment variables:**
   Make sure to set all required environment variables in your deployment platform.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio (database GUI)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.