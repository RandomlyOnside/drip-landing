# Local Drip Landing Page

A Next.js 14 landing page for Local Drip - connecting local coffee enthusiasts with neighborhood cafés.

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Firebase Firestore

## Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "local-drip-landing")
4. Follow the setup wizard

### 2. Enable Firestore Database

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### 3. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web (</>) 
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Replace the placeholder values with your Firebase configuration:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firestore Security Rules

For development, you can use these basic rules (update for production):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /signups/{document} {
      allow read, write: if true;
    }
  }
}
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Production Build & Deployment

### Building for Production

```bash
# Build the application
npm run build

# Test the production build locally
npm start
```

### Firebase Hosting Deployment

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `out` (for static export) or `build` (for server-side)
   - Configure as single-page app: Yes
   - Set up automatic builds with GitHub: Optional

4. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "out",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

5. **Deploy to Firebase**
   ```bash
   # Deploy to production
   firebase deploy

   # Deploy to preview channel (optional)
   firebase hosting:channel:deploy preview
   ```

### Environment Variables for Production

Create production environment variables in your Firebase project or hosting platform:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_production_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_production_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_production_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_production_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_production_app_id
```

### Production Firestore Security Rules

Update your Firestore rules for production security:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /signups/{document} {
      // Only allow writes, no reads for public
      allow write: if request.auth == null 
        && request.resource.data.keys().hasAll(['email', 'role', 'timestamp'])
        && request.resource.data.email is string
        && request.resource.data.role in ['local', 'cafe']
        && request.resource.data.timestamp == request.time;
      
      // Admin access (configure admin users separately)
      allow read, write: if request.auth != null 
        && request.auth.token.admin == true;
    }
  }
}
```

### Performance Optimization

The build includes:
- Automatic code splitting
- Image optimization
- CSS minification
- JavaScript minification
- Static asset optimization

### Monitoring & Analytics

Consider adding:
- Firebase Analytics
- Firebase Performance Monitoring
- Error tracking (Sentry, etc.)

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── SiteHeader.tsx
│   └── SignupModal.tsx
├── lib/
│   ├── utils.ts
│   ├── firebase.ts      # Firebase configuration
│   └── firestore.ts     # Firestore utility functions
└── tailwind.config.js
```