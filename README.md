# Ultraviolet Gaming Platform

A modern, real-time gaming platform built with Next.js, featuring chess with Stockfish AI integration, user authentication, and more.

![Project Banner](/public/banner.png)

## 🚀 Features

- **Chess Game Engine**: Powered by Stockfish.js for AI gameplay
- **User Authentication**: Secure JWT-based authentication system
- **Real-time Gameplay**: WebSocket integration for live multiplayer matches
- **Responsive Design**: Works on desktop and mobile devices
- **User Profiles**: Track game history, ratings, and statistics

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework for server-rendered applications
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management
- **Axios** - HTTP client for API requests
- **WebSocket** - Real-time game updates

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and real-time features
- **JWT** - Secure authentication
- **WebSocket** - Real-time game state synchronization

### Infrastructure
- **Docker** - Containerization
- **Nginx** - Reverse proxy
- **GitHub Actions** - CI/CD pipeline

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.9+
- Docker and Docker Compose
- Redis
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/John-hack321/ultraviolet_gaming_frontend.git
   cd ultraviolet_gaming_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8001
   # Add other environment variables as needed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 🏗 Project Structure

```
src/
├── app/                  # App router
│   ├── api/             # API routes
│   ├── components/       # Reusable components
│   ├── context/         # React context providers
│   └── styles/          # Global styles
├── public/              # Static files
└── types/               # TypeScript type definitions
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in `localStorage` for persistence across page refreshes.

### Authentication Flow
1. User logs in with email/password
2. Backend verifies credentials and returns JWT
3. Token is stored in `localStorage`
4. Subsequent requests include token in the Authorization header

## 🤖 Chess Engine Integration

The chess functionality is powered by Stockfish.js, a strong open-source chess engine compiled to WebAssembly for optimal performance in the browser.

## 🧪 Testing

Run the test suite with:
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FJohn-hack321%2Fultraviolet_gaming_frontend)

### Manual Deployment
1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stockfish.js team for the powerful chess engine
- Next.js and Vercel for the amazing framework and hosting
- The open-source community for countless libraries and tools
