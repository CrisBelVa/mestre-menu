# DEPLOYMENT GUIDE

Quick guide to get your MESTRE menu online.

## 🚀 Deployment Options

### Option 1: GitHub Pages (FREE - 5 minutes)

**Best for**: Simple, fast, no backend needed

1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository:
   - Name: `mestre-menu`
   - Public (not private)
   - Don't add README or .gitignore
   - Click "Create repository"

3. Upload your files:
   - Click "Add file" → "Upload files"
   - Drag and drop all files (index.html, styles.css, script.js, logo image, README.md)
   - Click "Commit changes"

4. Enable GitHub Pages:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Select `main` branch
   - Click Save

5. Your menu is now live at: **`https://yourusername.github.io/mestre-menu`**

**Pros:**
- Completely free
- No maintenance
- Great for static content

**Cons:**
- Can't use backend (CORS issues with Untappd API)
- Need workaround for Untappd: Use CORS proxy (see UNTAPPED_SETUP.md)

---

### Option 2: Netlify (FREE - 10 minutes)

**Best for**: Easy deployment with optional backend

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" → Choose "Sign up with GitHub"
3. Authorize Netlify to access your GitHub
4. Click "New site from Git"
5. Select your `mestre-menu` repository
6. Configure:
   - Base directory: (leave empty)
   - Build command: (leave empty)
   - Publish directory: (leave empty)
7. Click "Deploy site"

**Your menu is live!** You'll get a URL like: `https://mestre-menu.netlify.app`

**Custom domain:**
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., mestre.com)
4. Follow DNS setup instructions

**Pros:**
- Super easy
- Free SSL/HTTPS
- Can add backend functions for Untappd

**Cons:**
- Slightly less free resources than GitHub Pages

---

### Option 3: Traditional Web Hosting

**Best for**: If you already have a hosting account

1. Log into your hosting control panel (cPanel, Plesk, etc.)
2. Access File Manager or use FTP
3. Navigate to your public_html or www folder
4. Upload all files:
   - index.html
   - styles.css
   - script.js
   - Logo image
   - README.md

5. Your menu is live at: `https://yourdomain.com/mestre-menu`

**Pros:**
- Full control
- Can run backend code
- Works with existing hosting

**Cons:**
- Might require FTP knowledge
- Need existing hosting account

---

### Option 4: Vercel (FREE - 15 minutes) - RECOMMENDED FOR UNTAPPD

**Best for**: Backend proxy needed for Untappd API

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign up" → Choose "Sign up with GitHub"
3. Authorize and create account
4. Click "New Project"
5. Import your `mestre-menu` repository
6. Configure:
   - Framework: "Other"
   - Root Directory: (leave empty)
   - Build Command: (leave empty)
7. Click "Deploy"

**Your menu is live!** Example: `https://mestre-menu.vercel.app`

**Adding Untappd API proxy:**

1. Create a folder `api` in your project
2. Create `api/beers.js`:

```javascript
export default async function handler(req, res) {
    const { venueId, clientId, clientSecret } = req.query;
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    try {
        const response = await fetch(
            `https://api.untappd.com/v4/venue/${venueId}/beer_list?client_id=${clientId}&client_secret=${clientSecret}`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
```

3. Update `script.js` to call your API:

```javascript
const response = await fetch(
    `/api/beers?venueId=${CONFIG.UNTAPPED_VENUE_ID}&clientId=${CONFIG.UNTAPPED_CLIENT_ID}&clientSecret=${CONFIG.UNTAPPED_CLIENT_SECRET}`
);
```

**Pros:**
- Free serverless functions
- Perfect for Untappd API proxy
- Auto-deploys on git push

---

## 🔗 Post-Deployment Checklist

After deploying:

- [ ] Test menu on desktop browser
- [ ] Test menu on mobile phone
- [ ] Click on food items to ensure layout works
- [ ] Verify beers are loading (if using Untappd)
- [ ] Check for console errors (F12)
- [ ] Share link with friends/customers

---

## 📊 Comparison Table

| Platform | Cost | Setup Time | Untappd Support | Custom Domain |
|----------|------|-----------|-----------------|---------------|
| GitHub Pages | FREE | 5 min | Needs proxy | Yes ($) |
| Netlify | FREE | 10 min | Needs proxy | Yes (Free) |
| Vercel | FREE | 15 min | Built-in ✓ | Yes (Free) |
| Traditional | Varies | 5 min | Yes | Yes |

---

## 🚨 Troubleshooting Deployment

### Menu looks broken online
- Clear browser cache (Ctrl+Shift+Delete)
- Check all files were uploaded
- Verify file names match exactly (case-sensitive on Linux servers)

### Getting 404 errors
- Check if all files are in root directory
- Make sure index.html is there
- Check file permissions (should be 644 for files)

### Beers not loading
- Check if you set up API credentials correctly
- Verify you're using a proxy solution (not GitHub Pages directly)
- Check browser console for CORS errors
- See UNTAPPED_SETUP.md for detailed troubleshooting

### Custom domain not working
- Wait 24-48 hours for DNS propagation
- Verify DNS records are set correctly
- Check CNAME or A record configuration

---

## 💡 Pro Tips

1. **Use a CI/CD workflow**: Git push → Auto-deploy (Netlify, Vercel do this)
2. **Version your changes**: Commit to git, easy rollback if needed
3. **Monitor uptime**: Use free services like UptimeRobot
4. **Add analytics**: Integr Goole Analytics or Vercel analytics
5. **Backup regularly**: Keep a local copy of your files

---

## 🎉 You're Live!

Share your menu link on:
- Social media (Instagram, Facebook)
- Google My Business
- Bar website
- QR codes (printed on bar counter)

Example QR code maker: [qr-code-generator.com](https://www.qr-code-generator.com/)

---

## 📞 Need Help?

- **GitHub Pages Help**: [pages.github.com](https://pages.github.com)
- **Netlify Docs**: [netlify.com/docs](https://netlify.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **General Web Hosting**: Ask your provider's support

Happy deploying! 🚀
