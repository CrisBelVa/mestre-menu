# MESTRE Digital Menu

A modern, responsive digital menu for MESTRE craft beer bar, featuring Food & Beverages sections with Untappd Business API integration.

## 📋 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Brand-Consistent**: Follows MESTRE brand guidelines (colors, typography, logo)
- **Untappd Business Integration**: Automatically display beers from recent checkins at your location
- **Modern UI**: Smooth animations, hover effects, and professional styling
- **Easy to Update**: Simple JSON structure for adding/removing items

## 🚀 Quick Start

### Option 1: Local Development

1. **Clone/Download this folder** to your computer
2. **Open `index.html`** in your web browser
3. That's it! The menu will display with mock beer data

### Option 2: Deploy Online

#### Using GitHub Pages (Free)
1. Create a GitHub account (if you don't have one)
2. Create a new public repository named `mestre-menu`
3. Upload all files to the repository
4. Go to Settings → Pages → Select `main` branch → Save
5. Your menu will be live at: `https://yourusername.github.io/mestre-menu`

#### Using Netlify (Free & Easier)
1. Visit [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git" → Select this repository
4. Deploy! You'll get a live URL

#### Using a Web Host
1. Upload all files to your web host via FTP/cPanel
2. Access via your domain

## 🍺 Setting Up Untappd Business API (Beer Data)

To automatically pull your beers from Untappd Business instead of using mock data:

### Step 1: Access Your Untappd Business Account

1. Go to [business.untappd.com](https://business.untappd.com)
2. Sign in with your Untappd account
3. If you don't have a business account, you'll need to set one up

### Step 2: Get Your API Token

1. Go to [business.untappd.com/account](https://business.untappd.com/account)
2. Find the "API Access Tokens" section
3. Copy your **Read Only** token (it starts with a dash, like `-xxxxx...`)
4. **Note**: The token is already filled in the script.js file

### Step 3: Find Your Location ID

1. Go to [business.untappd.com/locations](https://business.untappd.com/locations)
2. Find your MESTRE location
3. Note the location ID (you can also get this programmatically)

### Step 4: Update Your Menu Code

1. Open `script.js` in a text editor
2. Find the `CONFIG` object at the top
3. Update these values:
```javascript
const CONFIG = {
    UNTAPPED_EMAIL: 'your-email@untappd.com',  // Your Untappd email
    UNTAPPED_READ_ONLY_TOKEN: '-cksQmzXz8cxgUfpAf_C',  // Already filled
    UNTAPPED_LOCATION_ID: 'YOUR_LOCATION_ID',  // Add your location ID
};
```

### Step 5: Test Your Integration

1. Open `index.html` in your browser
2. Go to the "On Tap" section
3. Your beers should appear from recent checkins!

## ⚠️ Important: CORS Limitation

If you see an error about "CORS" or "blocked by browser", you need to use a proxy. This is a browser security feature.

**Solution**: Set up a backend server to proxy Untappd requests. Here's a simple Node.js example:

```javascript
// backend/server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/beers', async (req, res) => {
    const { locationId, email, token } = req.query;

    const credentials = `${email}:${token}`;
    const encodedCredentials = Buffer.from(credentials).toString('base64');

    try {
        const response = await fetch(
            `https://business.untappd.com/api/v1/locations/${locationId}/checkins?type=on_premise`,
            {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                },
            }
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
```

Then modify `script.js` to call your proxy instead of Untappd directly.

## 📝 Customizing Your Menu

### Add/Edit Food Items
Open `index.html` and find the Food section. Example:
```html
<div class="menu-item">
    <h3 class="item-name">Empanadas</h3>
    <p class="item-description">Your description here</p>
</div>
```

### Change Colors
Edit `styles.css` and modify the color variables:
```css
:root {
    --primary-orange: #F57C00;   /* Change this hex code */
    --black: #000000;             /* Text color */
    --white: #FFFFFF;             /* Background */
    --dark-brown: #2B1B0F;        /* Accent */
}
```

Find hex color codes at [color-hex.com](https://www.color-hex.com)

### Update Logo
Replace `Logo_Mestre%202.png` with your logo file (or upload a different image)

## 📱 Features Overview

### Responsive Layout
- Desktop: 4 items per row
- Tablet: 2 items per row
- Mobile: 1 item per row

### Hover Effects
- Items lift up on hover
- Orange accent bar on left
- Smooth shadow transitions

### Beer Information Displayed
- Beer name
- Brewery
- Style
- ABV (Alcohol by Volume)
- IBU (International Bitterness Units)

## 🔄 Auto-Refresh Beer Data

To automatically update beers every 30 minutes, uncomment this line in `script.js`:
```javascript
setupAutoRefresh();
```

## 📧 Support & Troubleshooting

### Beers not loading?
1. Check browser console (F12 → Console tab)
2. Verify credentials in `script.js`
3. Make sure location is set up on Untappd Business
4. Check for CORS errors (see solution above)

### Website looks broken?
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Try a different browser
3. Check that all files are uploaded (index.html, styles.css, script.js, logo image)

### Getting "Unauthorized" errors
- Double-check email and token are correct
- Verify location ID exists and you have access
- Check that you're using the Read Only token

## 🎨 Design Credits

- **Brand Guidelines**: MESTRE Craft Beer Bar
- **Font**: Bevan (headings), Inter (body)
- **Colors**: Brand palette from guidelines

## 📄 File Structure

```
mestre-menu/
├── index.html          # Main menu page
├── styles.css          # Styling & responsive design
├── script.js           # Untappd Business API integration
├── Logo_Mestre 2.png   # Brand logo
└── Documentation files
```

## 🚀 Next Steps

1. ✅ Customize food items
2. ✅ Set up Untappd Business API
3. ✅ Deploy to web hosting
4. ✅ Share menu link with customers
5. ✅ Update beers regularly on Untappd

Enjoy your digital menu! 🍺

1. ✅ Customize food items
2. ✅ Set up Untapped API
3. ✅ Deploy to web hosting
4. ✅ Share menu link with customers
5. ✅ Update beers regularly on Untappd

Enjoy your digital menu! 🍺
