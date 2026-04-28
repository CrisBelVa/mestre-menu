# 🚀 QUICK START GUIDE

Get your MESTRE menu up and running in 10 minutes!

## Step 1: Preview Locally (2 minutes)

1. Open `index.html` in your web browser
2. See your menu with mock beer data ✓

**That's it! Your menu works locally.**

---

## Step 2: Customize Your Menu (3 minutes)

### Edit Food Items
1. Open `index.html` in a text editor
2. Find the Food section (around line 30)
3. Update descriptions if desired
4. Save the file
5. Refresh browser to see changes

### Add/Remove Food Items
Add a new item:
```html
<div class="menu-item">
    <h3 class="item-name">Yuca Frita</h3>
    <p class="item-description">Crispy cassava root</p>
</div>
```

---

## Step 3: Deploy Online (5 minutes)

### EASIEST: Netlify (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up with GitHub" (create account if needed)
3. Authorize Netlify
4. Click "New site from Git"
5. Select your `mestre-menu` GitHub repo
6. Click "Deploy"

**Done!** Your menu is now live at a URL like `https://mestre-menu.netlify.app`

**Optional: Add custom domain**
- Go to "Domain settings" in Netlify
- Add your domain (mestre-menu.com)
- Update DNS records (Netlify will guide you)

---

### ALTERNATIVE: GitHub Pages (Also Easy)

1. Create GitHub account [github.com](https://github.com)
2. Upload all files to a public repository
3. Go to Settings → Pages
4. Enable Pages on `main` branch
5. Your menu is live at `https://username.github.io/repo-name`

---

## Step 4: Add Real Beer Data (OPTIONAL - 5 minutes extra)

To show beers from your actual Untapped venue:

1. Open [untappd.com/api](https://untappd.com/api)
2. Click "Register Application"
3. Fill form and submit
4. Copy your **Client ID** and **Client Secret**

5. Find your Untapped Venue ID:
   - Go to your venue page
   - URL looks like: `https://untappd.com/venue/12345`
   - Number is your Venue ID

6. Open `script.js` and update:
```javascript
const CONFIG = {
    UNTAPPED_CLIENT_ID: 'YOUR_ID_HERE',      // Paste here
    UNTAPPED_CLIENT_SECRET: 'YOUR_SECRET',   // Paste here
    UNTAPPED_VENUE_ID: 'YOUR_VENUE_ID',      // Paste here
};
```

7. Save and deploy again
8. Beers will now load from Untappd! 🍺

---

## Step 5: Share Your Menu! (Now)

1. Copy your menu URL
2. Share on:
   - Instagram/Facebook: "Check our new menu!"
   - Google My Business
   - Bar website
   - Print as QR code for bar counter

---

## 📋 File Overview

| File | Purpose |
|------|---------|
| `index.html` | Menu content & structure |
| `styles.css` | Styling & responsive design |
| `script.js` | Untappd API integration |
| `Logo_Mestre%202.png` | Your brand logo |
| `README.md` | Full documentation |
| `UNTAPPED_SETUP.md` | Detailed Untappd guide |
| `DEPLOYMENT_GUIDE.md` | Deployment options |

---

## 🎨 Customize Colors

Edit `styles.css` line 8-12:

```css
:root {
    --primary-orange: #F57C00;   /* Change this hex code */
    --black: #000000;
    --white: #FFFFFF;
    --dark-brown: #2B1B0F;
}
```

Find hex color codes at [color-hex.com](https://www.color-hex.com)

---

## ⚡ Common Tasks

### Change logo
1. Replace `Logo_Mestre%202.png` with your image
2. Update `index.html` line 18:
```html
<img src="your-new-logo.png" alt="MESTRE Logo" class="logo">
```

### Add more beer info
Edit `script.js` to include:
- Beer rating
- Untappd URL link
- Last updated timestamp

### Make beer descriptions clickable
Wrap beer name in a link to Untappd:
```html
<a href="https://untappd.com/beer/123" target="_blank">
    ${beer.name}
</a>
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Menu looks weird on phone | It's responsive - refresh browser |
| Beers still showing "Loading" | Check Untappd credentials in script.js |
| CORS error in console | Use Netlify/Vercel (they have proxies) |
| Deployment failed | Check all files uploaded, including logo |
| Changes not showing | Clear browser cache (Ctrl+Shift+Delete) |

---

## 🎯 Next Steps

- [ ] Test menu on mobile phone
- [ ] Add beer descriptions to Untappd
- [ ] Set up custom domain
- [ ] Print QR code for bar
- [ ] Share on social media
- [ ] Update beers regularly on Untappd

---

## 📱 Test Your Menu

**Desktop**: Open in Chrome, Firefox, Safari
**Mobile**: Test on iPhone and Android
**Tablet**: Check responsiveness

---

## 💡 Tips

✓ **Update beers regularly**: Change them on Untappd, they auto-update  
✓ **Use high-quality logo**: Looks better on high-res screens  
✓ **Keep descriptions short**: Mobile-friendly  
✓ **Share link frequently**: More customers = more traffic  
✓ **Monitor analytics**: Netlify has built-in analytics  

---

## 🍺 You're All Set!

Your MESTRE menu is ready to showcase your beers to the world.

**Questions?** See:
- `README.md` - Full documentation
- `UNTAPPED_SETUP.md` - Untappd integration help
- `DEPLOYMENT_GUIDE.md` - Deployment options

Enjoy! 🎉
