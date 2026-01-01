# 📋 Deployment Checklist - Spice Finder

Use this checklist to ensure your app is properly configured before deployment.

## Pre-Deployment Checklist

### ✅ Firebase Setup

- [ ] Firebase project created
- [ ] Realtime Database created and enabled
- [ ] Database rules set to allow public read/write
- [ ] Firebase config copied from console
- [ ] Firebase config pasted into `app.js` (line ~10)
- [ ] All placeholder values replaced with actual values:
  - [ ] `apiKey`
  - [ ] `authDomain`
  - [ ] `databaseURL`
  - [ ] `projectId`
  - [ ] `storageBucket`
  - [ ] `messagingSenderId`
  - [ ] `appId`

### ✅ Data Import

- [ ] Opened `firebase-import.html` OR
- [ ] Used Firebase Console JSON import
- [ ] Verified 118 spices imported successfully
- [ ] Can see data in Firebase Console > Realtime Database

### ✅ Local Testing

- [ ] Opened `index.html` in browser
- [ ] All 118 spices display correctly
- [ ] Search functionality works
- [ ] Filter by location works (All/Island/Stove)
- [ ] Filter by "Needs Refill" works
- [ ] Can add new spice
- [ ] Can edit existing spice
- [ ] Can delete spice
- [ ] Changes sync to Firebase
- [ ] No errors in browser console (F12)

### ✅ PWA Icons

- [ ] Generated icons (using `icon-generator.html` or online tool)
- [ ] Created all required sizes:
  - [ ] icon-72.png
  - [ ] icon-96.png
  - [ ] icon-128.png
  - [ ] icon-144.png
  - [ ] icon-152.png
  - [ ] icon-192.png
  - [ ] icon-384.png
  - [ ] icon-512.png
- [ ] All icons placed in project root folder
- [ ] Icons are properly sized and formatted as PNG

### ✅ Files Check

- [ ] `index.html` exists
- [ ] `styles.css` exists
- [ ] `app.js` exists and configured
- [ ] `manifest.json` exists
- [ ] `service-worker.js` exists
- [ ] `README.md` exists
- [ ] `.gitignore` exists
- [ ] All 8 icon files exist

### ✅ Git & GitHub

- [ ] GitHub account created
- [ ] New repository created (public)
- [ ] Git initialized locally (`git init`)
- [ ] Files added (`git add .`)
- [ ] Initial commit made (`git commit -m "Initial commit"`)
- [ ] Remote added (`git remote add origin ...`)
- [ ] Code pushed to GitHub (`git push -u origin main`)

### ✅ GitHub Pages

- [ ] GitHub Pages enabled in repo settings
- [ ] Source set to `main` branch, `/ (root)` folder
- [ ] Waited 2-3 minutes for deployment
- [ ] Can access site at `https://username.github.io/repo-name/`

## Post-Deployment Testing

### ✅ Live Site Testing

- [ ] Site loads correctly at GitHub Pages URL
- [ ] All spices display
- [ ] Search works
- [ ] Filters work
- [ ] Can add/edit/delete spices
- [ ] Changes persist (refresh page to verify)
- [ ] No console errors

### ✅ Mobile Testing

- [ ] Opened site on mobile device
- [ ] Layout looks good on phone
- [ ] Touch targets are large enough
- [ ] Search bar works on mobile
- [ ] Filters work on mobile
- [ ] Modal forms work on mobile keyboard

### ✅ PWA Testing

- [ ] Site served over HTTPS (GitHub Pages is HTTPS)
- [ ] Install prompt appears (may take a few minutes)
- [ ] Can install to home screen
- [ ] App icon appears correctly
- [ ] App opens in standalone mode (no browser UI)
- [ ] Works offline (try airplane mode)

## Common Issues & Fixes

### Issue: Spices not loading
**Fix:**
- Check browser console for errors
- Verify Firebase config in `app.js`
- Check Firebase database rules
- Verify data was imported

### Issue: GitHub Pages shows 404
**Fix:**
- Wait 2-5 minutes after enabling Pages
- Verify repository is public
- Check that `index.html` is in root folder
- Hard refresh browser (Ctrl+Shift+R)

### Issue: Install prompt not showing
**Fix:**
- Verify all icon files exist
- Check `manifest.json` is accessible
- Clear browser cache
- Try different browser
- Check DevTools > Application > Manifest

### Issue: Changes not persisting
**Fix:**
- Check Firebase console for new data
- Verify internet connection
- Check database rules allow write
- Look for errors in browser console

## Final Steps

- [ ] Share app URL with family/friends
- [ ] Add bookmark to phone browser
- [ ] Install as PWA on devices
- [ ] Test with real usage scenario
- [ ] Celebrate! 🎉

## Maintenance

### Regular Tasks
- Check Firebase usage (free tier limits)
- Update spices as needed
- Mark items for refill when running low
- Share updates with other users

### Future Updates

To update the app:
1. Make changes to files locally
2. Test changes by opening `index.html`
3. Commit changes: `git add . && git commit -m "Description"`
4. Push to GitHub: `git push`
5. Wait 1-2 minutes for GitHub Pages to update
6. Users may need to refresh or clear cache

## Resources

- Firebase Console: https://console.firebase.google.com
- GitHub Pages: https://pages.github.com
- PWA Documentation: https://web.dev/progressive-web-apps/
- Icon Generator: https://favicon.io

---

**Ready to deploy?** Follow the checklist step by step!
