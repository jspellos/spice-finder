# 🌶️ Spice Finder

A mobile-first Progressive Web App (PWA) for tracking kitchen spices and finding them quickly while cooking.

## Features

- **Quick Search** - Find spices instantly by name
- **Location Tracking** - Know exactly which cabinet (Island or Stove) each spice is in
- **Refill Tracking** - Mark spices that need to be restocked
- **Notes** - Add custom notes (e.g., "2 bottles", "back shelf")
- **Mobile-First Design** - Optimized for phone use while cooking
- **Offline Support** - Works even without internet connection
- **Installable** - Add to your phone's home screen as an app
- **Real-time Sync** - Changes sync across all devices instantly

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Database**: Firebase Realtime Database
- **Hosting**: GitHub Pages
- **PWA**: Service Workers for offline functionality

## Quick Start

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project" or "Create a project"
3. Enter a project name (e.g., "spice-finder")
4. Disable Google Analytics (optional, not needed for this app)
5. Click "Create project"

#### Create Realtime Database

1. In Firebase Console, click "Realtime Database" in the left menu
2. Click "Create Database"
3. Select a location (choose closest to you)
4. **Start in test mode** (we'll set proper rules next)
5. Click "Enable"

#### Set Database Rules

1. Click on the "Rules" tab
2. Replace the rules with the following:

```json
{
  "rules": {
    "spices": {
      ".read": true,
      ".write": true
    }
  }
}
```

3. Click "Publish"

> **Note**: These rules allow anyone with your database URL to read/write data. This is fine for a personal app, but for production apps, you should implement authentication.

#### Get Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click the web icon (`</>`) to add a web app
5. Enter an app nickname (e.g., "Spice Finder Web")
6. **Check** "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. Copy the Firebase configuration object (you'll need this in step 2)

It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 2. Configure the App

1. Open `app.js` in a text editor
2. Find the `firebaseConfig` object at the top (around line 10)
3. Replace the placeholder values with your actual Firebase configuration

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",              // Replace with your actual API key
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

4. Save the file

### 3. Import Initial Spice Data

You have two options to import the 118 pre-configured spices:

#### Option A: Use the Import Tool (Recommended)

1. Open `firebase-import.html` in your web browser
2. Enter your Firebase configuration values
3. Click "Import Spices to Firebase"
4. Wait for the success message

#### Option B: Manual JSON Import

1. Go to your Firebase Realtime Database in the console
2. Click on the "Data" tab
3. Click the three dots (⋮) menu
4. Select "Import JSON"
5. Upload the `spices-data.json` file
6. Click "Import"

### 4. Test Locally

1. Open `index.html` in a web browser (Chrome, Firefox, Safari, or Edge)
2. You should see all 118 spices loaded
3. Try searching for a spice (e.g., "cumin")
4. Try filtering by location (Island/Stove)
5. Try adding, editing, and deleting a test spice

> **Note**: For full PWA features (offline support, install), you'll need to serve the app over HTTPS. Local `file://` URLs have limitations.

## Deploy to GitHub Pages

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top right
3. Click "New repository"
4. Enter a repository name (e.g., "spice-finder")
5. Make it **Public**
6. **Do NOT** initialize with README, .gitignore, or license (we'll add these)
7. Click "Create repository"

### 2. Initialize Git and Push Code

Open a terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Spice Finder PWA"

# Add GitHub remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Under "Branch", select `main` and `/ (root)`
6. Click "Save"
7. Wait 1-2 minutes for deployment

Your app will be live at: `https://YOUR_USERNAME.github.io/REPO_NAME/`

### 4. Update Service Worker (if needed)

If your GitHub Pages URL is not at the root (e.g., `username.github.io/spice-finder` instead of `username.github.io`), you may need to update the manifest:

1. Open `manifest.json`
2. Update the `start_url` and `scope`:

```json
{
  "start_url": "/spice-finder/",
  "scope": "/spice-finder/",
  ...
}
```

3. Commit and push the changes

## Using the App

### Search

- Type in the search bar to find spices by name
- Search matches partial names (e.g., "card" finds "cardamom")
- Search is case-insensitive

### Filter

- Click "All" to see all spices
- Click "Island" to see only Island spices
- Click "Stove" to see only Stove spices
- Click "Needs Refill" to see spices that need restocking

### Add New Spice

1. Click "+ Add New Spice"
2. Enter the spice name
3. Select location (Island or Stove)
4. Add optional notes
5. Check "Needs Refill" if needed
6. Click "Save"

### Edit Spice

1. Click on any spice card
2. Update the information
3. Click "Save"

### Delete Spice

1. Click on a spice card to edit
2. Click "Delete"
3. Confirm deletion

### Mark for Refill

1. Click on a spice card
2. Check or uncheck "Needs Refill"
3. Click "Save"

### Install as App

On mobile devices:

- **iOS**: Tap the Share button, then "Add to Home Screen"
- **Android**: Tap the menu (⋮), then "Add to Home Screen" or "Install App"
- **Desktop Chrome**: Look for the install icon in the address bar

## Keyboard Shortcuts

- **Ctrl/Cmd + K** - Focus search bar
- **Ctrl/Cmd + N** - Add new spice
- **Esc** - Close modal

## Project Structure

```
spice-finder/
├── index.html              # Main HTML file
├── styles.css              # Styles (mobile-first design)
├── app.js                  # Main JavaScript (Firebase + app logic)
├── manifest.json           # PWA manifest
├── service-worker.js       # Service worker for offline support
├── spices-data.json        # Initial spice data (118 spices)
├── firebase-import.html    # Tool to import data to Firebase
├── .gitignore              # Git ignore file
├── README.md               # This file
└── icons/                  # PWA icons (you need to add these)
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    └── icon-512.png
```

## Adding PWA Icons

The app needs icons for installation. You can:

1. **Create your own**: Design icons at various sizes (see list above)
2. **Use a generator**: Use a tool like [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
3. **Use a simple placeholder**: Create a simple colored square with text

### Quick Icon Setup

For a quick setup, you can use a free icon generator:

1. Go to [Favicon.io](https://favicon.io/) or [Real Favicon Generator](https://realfavicongenerator.net/)
2. Upload an image or create a text-based icon
3. Download the generated icons
4. Rename them to match the names in `manifest.json`
5. Place them in your project root folder

## Customization

### Colors

Edit `styles.css` to change the color scheme. All colors are defined in CSS variables at the top:

```css
:root {
    --primary-color: #D2691E;     /* Main brand color */
    --accent-green: #6B8E23;       /* Add button */
    --accent-red: #DC143C;         /* Refill badge */
    /* ... */
}
```

### Initial Data

To modify the initial 118 spices, edit `spices-data.json`. Each spice has:

```json
{
  "name": "Spice Name",
  "location": "Island" or "Stove",
  "notes": "Optional notes",
  "refill": true or false
}
```

## Troubleshooting

### Spices not loading

- Check browser console for errors (F12)
- Verify Firebase config is correct in `app.js`
- Verify database rules allow read/write
- Check that data was imported successfully

### PWA not installing

- Ensure you're using HTTPS (GitHub Pages uses HTTPS automatically)
- Check that `manifest.json` and `service-worker.js` are accessible
- Verify all required icon sizes exist
- Try clearing cache and reloading

### Changes not syncing

- Check your internet connection
- Verify Firebase database rules
- Check browser console for errors

### Service Worker issues

- Clear cache and hard reload (Ctrl+Shift+R)
- Unregister old service workers in DevTools (Application > Service Workers)
- Update the cache version in `service-worker.js` if you make changes

## Security Notes

- Current setup allows anyone with the URL to access and modify data
- For a production app with sensitive data, implement Firebase Authentication
- Consider adding security rules based on user authentication
- The current setup is perfect for personal/family use

## Future Enhancements

Possible features to add:

- User authentication
- Multiple users with private spice collections
- Barcode scanning for quick entry
- Recipe integration
- Shopping list generation
- Expiration date tracking
- Photo uploads for spices
- Export/import functionality
- Dark mode

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (iOS 11.3+)
- Opera (latest)

## License

This project is open source and available for personal use.

## Support

For issues or questions:

1. Check this README
2. Check browser console for error messages
3. Review Firebase console for database issues
4. Check GitHub Issues for similar problems

## Credits

Created as a personal kitchen organization tool. Feel free to fork and customize for your own needs!

---

**Happy cooking!** 🌶️👨‍🍳👩‍🍳
