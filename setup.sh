#!/bin/bash

echo "🎮 Setting up Gaming Store project structure..."

# Root files
cat > .gitignore << 'GITIGNORE'
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
*.tsbuildinfo

# Environment
.env
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
*.pem
GITIGNORE

cat > package.json << 'PKG'
{
  "name": "gaming-store",
  "version": "1.0.0",
  "private": true,
  "description": "Modern gaming store web application",
  "scripts": {
    "dev": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",
    "dev:frontend": "cd frontend && npm run dev",
    "dev:backend": "cd backend && npm run dev",
    "build": "npm run build:frontend && npm run build:backend",
    "build:frontend": "cd frontend && npm run build",
    "build:backend": "cd backend && npm run build",
    "install:all": "cd frontend && npm install && cd ../backend && npm install"
  },
  "devDependencies": {
    "concurrently": "^9.1.2"
  }
}
PKG

# Create frontend structure
mkdir -p frontend/public/{images,icons,fonts}
mkdir -p frontend/src/app/{auth}/{login,register,forgot-password,reset-password}
mkdir -p frontend/src/app/{main}/{games,news,reviews,community,support}
mkdir -p frontend/src/app/{main}/games/{category,search}
mkdir -p frontend/src/app/{main}/community/{forums,discussions}
mkdir -p frontend/src/app/{main}/support/{tickets,faq}
mkdir -p frontend/src/app/{user}/{profile,library,wishlist,orders,settings}
mkdir -p frontend/src/app/{cart,checkout,api/auth}
mkdir -p frontend/src/components/{ui,layout,game,cart,checkout,user,payment,wishlist,notification,review,news,community,support,auth,animations}
mkdir -p frontend/src/store/{slices,api}
mkdir -p frontend/src/{lib,hooks,types,schemas,config}
mkdir -p frontend/src/styles

# Frontend package.json
cat > frontend/package.json << 'FRONTPKG'
{
  "name": "gaming-store-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@reduxjs/toolkit": "^2.5.0",
    "react-redux": "^9.2.0",
    "next-auth": "^5.0.0-beta.25",
    "@auth/core": "^0.37.2",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.9.1",
    "framer-motion": "^11.15.0",
    "tailwindcss": "^3.4.17",
    "socket.io-client": "^4.8.1",
    "@stripe/stripe-js": "^4.11.0",
    "@stripe/react-stripe-js": "^2.10.0",
    "axios": "^1.7.9",
    "date-fns": "^4.1.0",
    "lucide-react": "^0.468.0",
    "sonner": "^1.7.3"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.6",
    "@types/react-dom": "^19.0.2",
    "typescript": "^5.7.2",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
FRONTPKG

# Frontend tsconfig.json
cat > frontend/tsconfig.json << 'TSCONFIG'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{"name": "next"}],
    "paths": {"@/*": ["./src/*"]}
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
TSCONFIG

# Create backend structure
mkdir -p backend/src/modules/{auth,user,game,order,payment,wishlist,review,news,community,support,notification,recommendation}/{controllers,services,models,validators,routes,interfaces}
mkdir -p backend/src/shared/{middleware,utils,constants,types}
mkdir -p backend/src/config
mkdir -p backend/tests/{unit,integration,e2e}

# Backend package.json
cat > backend/package.json << 'BACKPKG'
{
  "name": "gaming-store-backend",
  "version": "1.0.0",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^8.9.3",
    "typescript": "^5.7.2",
    "jsonwebtoken": "^9.0.2",
    "bcryptjs": "^2.4.3",
    "zod": "^3.24.1",
    "cors": "^2.8.5",
    "helmet": "^8.0.0",
    "express-rate-limit": "^7.5.0",
    "dotenv": "^16.4.7",
    "socket.io": "^4.8.1",
    "stripe": "^17.5.0",
    "redis": "^4.7.0",
    "winston": "^3.17.0",
    "compression": "^1.7.5"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.7",
    "@types/cors": "^2.8.17",
    "ts-node": "^10.9.2",
    "nodemon": "^3.1.7"
  }
}
BACKPKG

# Create shared and docs folders
mkdir -p shared/types
mkdir -p docs

# Add .gitkeep files to empty folders
find . -type d -empty -exec touch {}/.gitkeep \;

echo "✅ Project structure created successfully!"
echo "📦 Next steps:"
echo "1. Run: npm install"
echo "2. Run: cd frontend && npm install"
echo "3. Run: cd ../backend && npm install"
echo "4. Copy .env.example files and configure them"
echo "5. Run: npm run dev"

