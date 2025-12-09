1. ROOT README.md (material-tracker-system/README.md)
markdown# 📋 Material Usage Tracker System

A comprehensive web application for tracking material usage across multiple railway stations and clusters. Built with React, Node.js, Express, and MongoDB.

![Material Tracker](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node](https://img.shields.io/badge/Node-18.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)

## 🌟 Features

- **🔐 Role-Based Authentication**
  - Admin Dashboard with complete data overview
  - Worker Dashboard for field operations
  
- **📍 Multi-Cluster Management**
  - 25+ Railway clusters supported
  - 200+ Station tracking
  - Real-time material tracking

- **📊 Material Categories**
  - Active Equipment (Cameras, Switches, UPS)
  - Passive Components (Cables, Pipes, Fiber)
  - Trenching Work
  - HDD (Horizontal Directional Drilling)

- **💾 Data Persistence**
  - MongoDB cloud database
  - Automatic save/load functionality
  - Date-stamped records

- **📱 Responsive Design**
  - Mobile-friendly interface
  - Touch-optimized controls
  - Modern UI/UX

## 🚀 Live Demo

- **Frontend:** [https://material-tracker.vercel.app](https://material-tracker.vercel.app)
- **Backend API:** [https://material-tracker-backend.onrender.com](https://material-tracker-backend.onrender.com)

### Demo Credentials

**Admin Access:**
```
Username: admin
Password: admin123
```

**Worker Access:**
```
Username: worker
Password: worker123
```

## 📁 Project Structure
```
material-tracker-system/
│
├── frontend/              # React Frontend Application
│   ├── src/
│   │   ├── MaterialTracker.jsx
│   │   ├── config.js
│   │   └── App.js
│   └── package.json
│
├── backend/               # Node.js Backend API
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── MaterialData.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── data.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Framework
- **Lucide React** - Icons
- **CSS3** - Styling
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

### Deployment
- **Vercel** - Frontend Hosting
- **Render** - Backend Hosting
- **MongoDB Atlas** - Database Hosting

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.x or higher
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/material-tracker.git
cd material-tracker-system
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb://localhost:27017/material-tracker
JWT_SECRET=your_secret_key_here
NODE_ENV=development
EOF

# Create initial users
node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/material-tracker')
  .then(async () => {
    const adminPwd = await bcrypt.hash('admin123', 10);
    await User.findOneAndUpdate(
      { username: 'admin' },
      { username: 'admin', password: adminPwd, role: 'admin' },
      { upsert: true }
    );
    
    const workerPwd = await bcrypt.hash('worker123', 10);
    await User.findOneAndUpdate(
      { username: 'worker' },
      { username: 'worker', password: workerPwd, role: 'worker' },
      { upsert: true }
    );
    
    console.log('Users created!');
    process.exit(0);
  });
"

# Start backend
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm start
```

### 4. Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🌐 Deployment Guide

### MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Add database user
4. Whitelist IP: 0.0.0.0/0
5. Get connection string

### Backend Deployment (Render)
1. Push code to GitHub
2. Sign up at [Render.com](https://render.com)
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Add environment variables:
```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your_secret_key
   NODE_ENV=production
```

### Frontend Deployment (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `cd frontend && vercel --prod`
4. Add environment variable:
```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 📚 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "token": "jwt_token_here",
  "role": "admin",
  "username": "admin"
}
```

#### Register (Admin Only)
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "role": "worker"
}
```

### Data Endpoints

#### Save Material Data
```http
POST /api/data/save
Authorization: Bearer {token}
Content-Type: application/json

{
  "cluster": "RGDA",
  "station": "PARVATHIPURAM TOWN",
  "items": [...],
  "selectedFolder": "Active",
  "updatedBy": "worker"
}
```

#### Load Station Data
```http
GET /api/data/load/:cluster/:station
Authorization: Bearer {token}

Response:
{
  "cluster": "RGDA",
  "station": "PARVATHIPURAM TOWN",
  "items": [...],
  "lastUpdated": "2024-12-09T10:30:00Z"
}
```

#### Get All Data (Admin)
```http
GET /api/data/all
Authorization: Bearer {token}

Response: [
  {
    "cluster": "RGDA",
    "station": "PARVATHIPURAM TOWN",
    "items": [...],
    "updatedBy": "worker",
    "lastUpdated": "2024-12-09T10:30:00Z"
  }
]
```

## 🎯 Usage Guide

### For Workers
1. Login with worker credentials
2. Search and select cluster (e.g., RGDA)
3. Select station (e.g., PARVATHIPURAM TOWN)
4. Select work category (Active, Passive-A, etc.)
5. Track materials using +/- buttons
6. Click "Save Data" to persist changes

### For Admins
1. Login with admin credentials
2. View dashboard with all statistics
3. See all saved records with timestamps
4. Monitor worker activities
5. Access complete data overview

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/material-tracker
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongodb
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Errors
- Ensure backend CORS settings include frontend URL
- Check API_URL in frontend config
- Verify environment variables are loaded

## 📊 Database Schema

### User Model
```javascript
{
  username: String (unique),
  password: String (hashed),
  role: String (enum: ['admin', 'worker']),
  createdAt: Date
}
```

### MaterialData Model
```javascript
{
  cluster: String,
  station: String,
  items: Array,
  selectedFolder: String,
  updatedBy: String,
  lastUpdated: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub Profile](https://github.com/YOUR_USERNAME)

## 🙏 Acknowledgments

- Railway Department for requirements
- React community for excellent documentation
- MongoDB Atlas for free tier hosting
- Vercel & Render for deployment platforms

## 📞 Support

For support, email: your.email@example.com

## 🔄 Version History

- **v1.0.0** (2024-12-09)
  - Initial release
  - Basic authentication
  - Material tracking
  - Multi-cluster support
  - HDD items support

## 🗺️ Roadmap

- [ ] Export data to Excel
- [ ] Generate PDF reports
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Offline mode support

## 📸 Screenshots

### Login Screen
![Login](screenshots/login.png)

### Worker Dashboard
![Worker Dashboard](screenshots/worker-dashboard.png)

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)

### Material Tracking
![Material Tracking](screenshots/material-tracking.png)

---

Made with ❤️ for Railway Material Management

2. FRONTEND README.md (frontend/README.md)
markdown# Material Tracker - Frontend

React-based frontend application for Material Usage Tracker System.

## 🚀 Quick Start
```bash
npm install
npm start
```

## 📦 Build for Production
```bash
npm run build
```

## 🔧 Environment Variables

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production (`.env.production`):
```env
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## 📱 Features

- Responsive design
- Real-time material tracking
- Search functionality
- Role-based UI
- Auto-save functionality

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📚 Dependencies

- react: ^18.2.0
- react-dom: ^18.2.0
- lucide-react: ^0.263.1
- axios: ^1.6.0

## 🌐 Deployment

Deploy to Vercel:
```bash
vercel --prod
```

Or push to GitHub and connect to Vercel dashboard.

3. BACKEND README.md (backend/README.md)
markdown# Material Tracker - Backend

Node.js/Express REST API for Material Usage Tracker System.

## 🚀 Quick Start
```bash
npm install
npm run dev
```

## 🔧 Environment Variables

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/material-tracker
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user

### Data Management
- `POST /api/data/save` - Save material data
- `GET /api/data/load/:cluster/:station` - Load station data
- `GET /api/data/all` - Get all data (Admin only)
- `DELETE /api/data/delete/:cluster/:station` - Delete data

## 🗄️ Database Models

### User
- username (String, unique)
- password (String, hashed)
- role (String: 'admin' | 'worker')

### MaterialData
- cluster (String)
- station (String)
- items (Array)
- updatedBy (String)
- lastUpdated (Date)

## 🛠️ Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 📦 Dependencies

- express: ^4.18.2
- mongoose: ^8.0.0
- bcryptjs: ^2.4.3
- jsonwebtoken: ^9.0.2
- cors: ^2.8.5
- dotenv: ^16.3.1

## 🌐 Deployment

Deploy to Render:
1. Push to GitHub
2. Connect repository on Render
3. Set environment variables
4. Deploy!

## 🔒 Security

- Passwords hashed with bcrypt
- JWT authentication
- CORS configured
- Environment variables for secrets

Commands to Create README Files:
bash# Root README
cat > README.md << 'EOF'
[Paste the root README content here]
EOF

# Frontend README
cat > frontend/README.md << 'EOF'
[Paste the frontend README content here]
EOF

# Backend README
cat > backend/README.md << 'EOF'
[Paste the backend README content here]
EOF

# Git commit
git add README.md frontend/README.md backend/README.md
git commit -m "Added comprehensive README documentation"
git push origin main
