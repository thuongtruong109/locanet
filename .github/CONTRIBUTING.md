## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/thuongtruong109/locanet.git
   cd locanet
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   NUXT_PUBLIC_MEDIUM_API_URL=
   NUXT_PUBLIC_LARGE_API_URL=
   NUXT_PUBLIC_SUNSET_API_URL=
   NUXT_PUBLIC_IPV6_API_URL=
   NUXT_PUBLIC_COUNTRY_API_URL=
   ```

4. **Development Server**

   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## 📖 Usage

### Web Interface

Visit the deployed application at [https://locanet.vercel.app](https://locanet.vercel.app) or run locally to:

1. **View IP Information**: Automatically detects and displays your current IP address
2. **Explore Location Data**: See detailed geolocation information including coordinates, timezone, and ISP
3. **Interactive Maps**: Visualize your location on interactive maps
4. **Network Analytics**: Access comprehensive network and location intelligence

### API Endpoints

#### Get Client IP

```http
GET /api/ip
```

Returns the client's IP address with proper handling of proxies and CDNs.

**Response:**

```json
"192.168.1.1"
```

## 🏗️ Project Structure

```
locanet/
├── app/
│   ├── components/          # Vue components
│   │   ├── Info.vue        # Main information display
│   │   ├── Map.vue         # Interactive map component
│   │   ├── Network.vue     # Network information
│   │   └── ...
│   ├── assets/css/         # Stylesheets
│   └── utils/              # Utility functions
├── server/
│   ├── api/                # Server API routes
│   │   └── ip.ts          # IP detection endpoint
│   └── middleware/         # Server middleware
│       └── rate-limit.ts  # Rate limiting
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── ...
```

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint and fix code
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format
```

### Code Quality

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR
