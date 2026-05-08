# UNTAPPD BUSINESS API SETUP GUIDE

Complete step-by-step guide to integrate your Untappd Business beer data into the MESTRE menu.

## 📊 Understanding the Integration

The menu can display beers in two ways:

1. **Mock Data** (Default): Shows sample beers - perfect for testing
2. **Live Untappd Business Data**: Pulls real beers from recent checkins at your location

## 🔑 Step-by-Step Setup

### STEP 1: Access Your Untappd Business Account

1. Go to [business.untappd.com](https://business.untappd.com)
2. Sign in with your Untappd account
3. If you don't have a business account, you'll need to set one up

### STEP 2: Get Your API Token

1. Go to [business.untappd.com/account](https://business.untappd.com/account)
2. Find the "API Access Tokens" section
3. Copy your **Read Only** token (it starts with a dash, like `-xxxxx...`)
4. **Note**: The token is already filled in the script.js file

### STEP 3: Find Your Location ID

1. Go to [business.untappd.com/locations](https://business.untappd.com/locations)
2. Find your MESTRE location
3. Note the location ID (you can also get this programmatically)

### STEP 4: Update Your Menu Code

1. Open `script.js` in a text editor (VS Code, Notepad, etc.)
2. Find this section at the top:

```javascript
const CONFIG = {
    UNTAPPED_EMAIL: 'YOUR_EMAIL_HERE',
    UNTAPPED_READ_ONLY_TOKEN: '-cksQmzXz8cxgUfpAf_C',
    UNTAPPED_LOCATION_ID: 'YOUR_LOCATION_ID_HERE',
};
```

3. Replace the placeholders:
   - `YOUR_EMAIL_HERE` → Your Untappd account email
   - `UNTAPPED_READ_ONLY_TOKEN` → Already filled with your token
   - `YOUR_LOCATION_ID_HERE` → Your Location ID from Step 3

**Example (after filling in):**
```javascript
const CONFIG = {
    UNTAPPED_EMAIL: 'your-email@untappd.com',
    UNTAPPED_READ_ONLY_TOKEN: '-cksQmzXz8cxgUfpAf_C',
    UNTAPPED_LOCATION_ID: '12345',
};
```

4. Save the file

### STEP 5: Test Your Integration

1. Open `index.html` in your browser
2. Go to the "On Tap" section
3. Your beers should appear from recent checkins!

## 🐛 Troubleshooting

### Problem: Beers still showing "Loading beers..."

**Solution:**
1. Open Developer Tools (F12 or Right-click → Inspect)
2. Click "Console" tab
3. Look for red error messages
4. Common issues:
   - Wrong email or token
   - Location ID doesn't exist
   - Location has no recent checkins

### Problem: CORS Error (browser blocked the request)

This is a security feature. The browser won't let the menu fetch directly from Untappd's servers.

**Solution: Backend Proxy (Recommended)**

Create a simple backend server that proxies the request. Here's a Node.js example:

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

### Problem: Getting "Unauthorized" errors

- Double-check email and token are correct
- Verify location ID exists and you have access
- Check that you're using the Read Only token

### Problem: No beers showing up

- Make sure you have recent checkins at your location
- Check that the checkins are marked as "on_premise"
- Verify the location ID is correct

## 🔒 Security Notes

⚠️ **Important**: Your API token should NOT be shared publicly!

- Never commit `script.js` with real credentials to GitHub/public repos
- For production, use a backend proxy (see Troubleshooting)
- Consider using environment variables
- Regenerate tokens if accidentally exposed

## 📊 API Details

### Endpoint Used
- **URL**: `https://business.untappd.com/api/v1/locations/{location_id}/checkins`
- **Method**: GET
- **Authentication**: Basic Auth (email:token)
- **Parameters**: `type=on_premise` (for on-tap beers)

### Data Structure
The API returns checkins, which contain beer information. The script extracts unique beers from recent checkins.

### Rate Limits
- Business API has rate limits
- Consider caching results
- Use auto-refresh sparingly (default: 30 minutes)

## 🎯 Best Practices

1. **Keep checkins updated**: The menu pulls from recent checkins, so update Untappd when beers change
2. **Use a proxy for production**: Avoid exposing API credentials
3. **Cache results**: Don't refresh too frequently
4. **Test locally first**: Use mock data for development

## 📞 Support

- **Untappd Business Docs**: [docs.business.untappd.com](https://docs.business.untappd.com)
- **Untappd Support**: [untappd.com/contact](https://untappd.com/contact)
- **Browser Console**: Check developer tools for detailed error messages

## ✅ Final Checklist

- [ ] Untappd Business account set up
- [ ] API token obtained
- [ ] Location ID found
- [ ] `script.js` updated with credentials
- [ ] Menu tested and beers displaying
- [ ] CORS proxy set up (if needed)
- [ ] Menu deployed online

Happy brewing! 🍺
- Regenerate credentials if accidentally exposed

## 📈 Data Refresh

Currently, beers are refreshed when the page loads. To auto-refresh:

1. Uncomment this line at the bottom of `script.js`:
```javascript
setupAutoRefresh();
```

2. This will refresh every 30 minutes
3. Adjust the interval as needed:
```javascript
}, 30 * 60 * 1000); // Change 30 to your desired minutes
```

## 🎯 Best Practices

1. **Keep beers updated on Untappd**: The menu pulls live data, so update Untappd when beers change
2. **Use a proxy for production**: Avoid exposing API credentials
3. **Cache results**: Don't refresh too frequently (you'll hit rate limits)
4. **Add food items manually**: These don't come from Untappd, so update directly in `index.html`

## ✅ Final Checklist

- [ ] Untappd account created
- [ ] Venue created and ID noted
- [ ] Beers added to your venue on Untappd
- [ ] API app registered and credentials copied
- [ ] `script.js` updated with credentials
- [ ] Menu tested and beers displaying
- [ ] Menu deployed online
- [ ] Credentials secured (backend proxy if public)

## 📞 Still Need Help?

- **Untappd API Docs**: [untappd.com/api/docs](https://untappd.com/api/docs)
- **Untappd Support**: [untappd.com/contact](https://untappd.com/contact)
- **Browser Console Errors**: Check developer tools (F12) for detailed error messages

Happy brewing! 🍺
