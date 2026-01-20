# Firebase Setup Guide

## 🔥 Firebase Integration for Husni & Ellisya's Wedding Website

This guide will help you set up Firebase for your wedding website with RSVP functionality.

## 📋 Prerequisites

1. Google account
2. Firebase CLI installed globally: `npm install -g firebase-tools`
3. Node.js and npm installed

## 🚀 Setup Steps

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `ellisya-husni-wedding`
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll deploy security rules later)
4. Select a location closest to your users

### 3. Enable Firebase Hosting

1. In Firebase Console, go to "Hosting"
2. Click "Get started"
3. Follow the setup instructions

### 4. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app (</>) 
4. Register app with name: "Wedding Website"
5. Copy the configuration object

### 5. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 6. Initialize Firebase in Your Project

```bash
# Login to Firebase
firebase login

# Set the project
firebase use --add
# Select your project and give it an alias like "default"
```

### 7. Deploy Firestore Rules

```bash
npm run deploy:firestore
```

### 8. Build and Deploy

```bash
# Build the project
npm run build

# Deploy everything
npm run deploy

# Or deploy only hosting
npm run deploy:hosting
```

## 📊 RSVP Features

### For Guests
- ✅ Submit RSVP with name, attendance, guest count
- ✅ Add dietary restrictions and personal messages
- ✅ Real-time form validation
- ✅ Success confirmation with beautiful animations

### For Admin
- ✅ View all RSVPs in admin dashboard
- ✅ Real-time statistics (total responses, attendance rate, guest count)
- ✅ Export data capabilities
- ✅ Responsive admin interface

## 🔒 Security

- Firestore rules allow anyone to create RSVPs (for guests)
- Read access is open for admin dashboard
- Updates and deletes are disabled to maintain data integrity
- In production, consider adding authentication for admin access

## 📱 Admin Dashboard

Access the admin dashboard at: `https://your-domain.com/admin`

To add the admin route, you can create a simple route in your app or access the `AdminRSVP` component directly.

## 🚀 Deployment Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Deploy everything (hosting + firestore)
npm run deploy

# Deploy only hosting
npm run deploy:hosting

# Deploy only firestore rules
npm run deploy:firestore
```

## 🎯 Firebase Console URLs

- **Project Overview**: `https://console.firebase.google.com/project/your-project-id/overview`
- **Firestore Database**: `https://console.firebase.google.com/project/your-project-id/firestore`
- **Hosting**: `https://console.firebase.google.com/project/your-project-id/hosting`

## 🔧 Troubleshooting

### Common Issues

1. **Environment variables not loading**: Make sure `.env.local` is in the project root and variables start with `VITE_`

2. **Firestore permission denied**: Check that firestore rules are deployed correctly

3. **Build fails**: Run `npm run lint` to check for TypeScript errors

4. **Deployment fails**: Make sure you're logged in with `firebase login` and have selected the correct project

### Getting Help

- Check Firebase Console for error logs
- Review browser console for client-side errors
- Verify environment variables are set correctly

## 🎉 Success!

Once deployed, your wedding website will be live with:
- ✅ Beautiful wedding invitation
- ✅ Interactive RSVP form
- ✅ Real-time data storage
- ✅ Admin dashboard for managing responses
- ✅ Automatic scaling and reliability

Your guests can now RSVP online, and you can track all responses in real-time! 🎊
