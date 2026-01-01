# 🚀 Quick Setup Guide - Spice Finder

Follow these steps in order to get your Spice Finder PWA up and running!

## Step 1: Create Firebase Project (5 minutes)

1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name it "spice-finder" (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create project"

## Step 2: Create Realtime Database (2 minutes)

1. In left menu, click "Realtime Database"
2. Click "Create Database"
3. Choose a location (closest to you)
4. Start in **test mode**
5. Click "Enable"
6. Go to "Rules" tab
7. Paste this:

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

8. Click "Publish"

## Step 3: Get Firebase Config (2 minutes)

1. Click gear icon (⚙️) > "Project settings"
2. Scroll to "Your apps"
3. Click web icon (`</>`)
4. Name it "Spice Finder Web"
5. Click "Register app"
6. **Copy the config object** - you'll need it next!

## Step 4: Configure App.js (2 minutes)

1. Open `app.js` in a text editor
2. Find line ~10 with `firebaseConfig`
3. Replace the placeholder values with your Firebase config
4. Save the file

## Step 5: Import Spice Data (1 minute)

### Option A: Easy Way
1. Open `firebase-import.html` in your browser
2. Paste your Firebase config values
3. Click "Import Spices to Firebase"
4. Wait for success message

### Option B: Manual Way
1. In Firebase Console, go to Realtime Database
2. Click ⋮ menu > "Import JSON"
3. Select `spices-data.json`
4. Click "Import"

## Step 6: Test Locally (1 minute)

1. Open `index.html` in your browser
2. Search for "cumin" - you should see results!
3. Try filtering by Island/Stove
4. Try adding a test spice

**Working?** Great! Continue to deployment.

## Step 7: Create GitHub Repository (3 minutes)

1. Go to https://github.com
2. Click "+" > "New repository"
3. Name it "spice-finder"
4. Make it **Public**
5. **Don't** add README, .gitignore, or license
6. Click "Create repository"

## Step 8: Push Code to GitHub (2 minutes)

Open terminal in your project folder:

```bash
git init
git add .
git commit -m "Initial commit: Spice Finder PWA"
git remote add origin https://github.com/YOUR_USERNAME/spice-finder.git
git branch -M main
git push -u origin main
```

**Replace YOUR_USERNAME** with your actual GitHub username!

## Step 9: Enable GitHub Pages (2 minutes)

1. In your GitHub repo, click "Settings"
2. Click "Pages" in left sidebar
3. Under "Source", select branch: `main` and folder: `/ (root)`
4. Click "Save"
5. Wait 1-2 minutes for deployment

Your app will be at: `https://YOUR_USERNAME.github.io/spice-finder/`

## Step 10: Add Icons (Optional - 5 minutes)

Your PWA needs icons to be installable.

### Quick Option: Generate Simple Icons

1. Go to https://favicon.io/favicon-generator/
2. Settings:
   - Text: "🌶️" or "SF"
   - Background: #D2691E (Chocolate)
   - Font: Any you like
3. Click "Download"
4. Extract the zip file
5. Rename files to match:
   - favicon-16x16.png → icon-72.png (resize if needed)
   - favicon-32x32.png → icon-96.png
   - android-chrome-192x192.png → icon-192.png
   - android-chrome-512x512.png → icon-512.png
6. Generate remaining sizes at https://resizeimage.net/
7. Upload all icons to your GitHub repo

### Professional Option: Custom Icons

1. Design a 512x512 icon (use Canva, Figma, etc.)
2. Use https://www.pwabuilder.com/ to generate all sizes
3. Upload to your repo

## You're Done! 🎉

Your Spice Finder PWA is now live!

### Test it:

1. Visit your GitHub Pages URL on your phone
2. Try the "Add to Home Screen" option
3. Search for spices
4. Add/edit/delete spices

## Troubleshooting

**Problem**: Spices not loading
- Check browser console (F12) for errors
- Verify Firebase config in app.js is correct
- Check Firebase database has data

**Problem**: Can't install as app
- Make sure you're accessing via HTTPS (GitHub Pages is HTTPS)
- Add the icon files
- Try on different browsers

**Problem**: GitHub Pages shows 404
- Wait a few minutes after enabling Pages
- Check that index.html is in the root folder
- Verify the repository is public

## Next Steps

- Share the URL with family members
- Bookmark it on your phone
- Install it as an app
- Start tracking your spices!

## Need Help?

- Read the full README.md
- Check Firebase Console for database issues
- Look at browser console for errors

**Happy cooking!** 🌶️
