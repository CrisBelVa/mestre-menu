// ================================
// MESTRE Menu - JavaScript
// ================================

// Hardcoded beer data (On Tap)
const ON_TAP_BEERS = [
    {
        name: 'Punk IPA',
        brewery: 'BrewDog',
        style: 'IPA - Scotland',
        abv: '5.2',
        ibu: '35',
        calories: '156'
    },
    {
        name: 'Baltic Porter Nitro',
        brewery: 'Browar Stu Mostów',
        style: 'Porter - Poland',
        abv: '7.3',
        ibu: '0',
        calories: '219'
    },
    {
        name: 'Budweiser Budvar / Czechvar Original',
        brewery: 'Budějovický Budvar',
        style: 'Pilsner - Czech',
        abv: '5',
        ibu: '32',
        calories: '150'
    }
];

// Load beer data from hardcoded array
async function loadBeersFromJSON() {
    return ON_TAP_BEERS;
}

function getCountryFlag(style) {
    const countryMap = {
        'Scotland': '🏴',
        'Poland': '🇵🇱',
        'Czech': '🇨🇿',
        'Portugal': '🇵🇹',
        'USA': '🇺🇸',
        'United States': '🇺🇸',
        'Germany': '🇩🇪',
        'Belgium': '🇧🇪',
        'Spain': '🇪🇸',
        'Netherlands': '🇳🇱',
        'Ireland': '🇮🇪',
        'France': '🇫🇷'
    };

    if (!style) return '';
    const parts = style.split(' - ');
    const country = parts[parts.length - 1].trim();
    return countryMap[country] || '';
}

// Mock beer data for demo purposes (fallback)
const MOCK_BEERS = [
    {
        name: 'Hoppy IPA',
        brewery: 'Local Brewery',
        style: 'IPA',
        abv: '6.5%',
        ibu: '68',
    },
    {
        name: 'Dark Stout',
        brewery: 'Craft Masters',
        style: 'Stout',
        abv: '7.2%',
        ibu: '45',
    },
    {
        name: 'Golden Lager',
        brewery: 'Premium Brews',
        style: 'Lager',
        abv: '5.0%',
        ibu: '25',
    },
    {
        name: 'Amber Ale',
        brewery: 'Artisan Beers',
        style: 'Amber Ale',
        abv: '5.8%',
        ibu: '35',
    },
];

/**
 * Create Basic Auth header for Untappd Business API (no longer needed)
 */
function createAuthHeader() {
    console.log('Using scraped beer data from Untappd venue page');
}

/**
 * Fetch beers from local JSON file (scraped from Untappd)
 */
async function fetchBeersFromJSON() {
    try {
        const response = await fetch('beers_on_tap.json');
        if (!response.ok) throw new Error('Failed to load beer data');
        const beers = await response.json();
        
        // Transform the data to match expected format
        return beers.map(beer => ({
            name: beer.name || 'Unknown Beer',
            brewery: beer.style && beer.style.includes('|') ? beer.style.split('|')[1].trim() : 'Unknown Brewery',
            style: beer.abv ? beer.abv.split(' ').slice(0, -3).join(' ') : beer.style || 'Unknown Style',
            abv: beer.abv && beer.abv.includes('%') ? beer.abv.match(/\d+\.?\d*(?=%)/)[0] : 'N/A',
            ibu: beer.ibu || 'N/A',
            section: beer.section || 'On Tap'
        }));
    } catch (error) {
        console.error('Error loading beer data from JSON:', error);
        return [];
    }
}

/**
 * Render beer items in the DOM
 */
function renderBeers(beers) {
    const container = document.getElementById('beers-container');
    
    if (!beers || beers.length === 0) {
        container.innerHTML = '<div class="loading-placeholder">No beers on tap at the moment. Check back soon!</div>';
        return;
    }

    const beersHTML = beers.map(beer => {
        const flag = getCountryFlag(beer.style);
        return `
        <div class="menu-item beer-item">
            <div class="beer-name">${beer.name}</div>
            <div class="beer-brewery">${beer.brewery}</div>
            <div class="beer-info">
                <span class="beer-flag">${flag}</span>
                <span class="beer-badge">${beer.style}</span>
                <span>${beer.abv}% ABV</span>
                <span>${beer.ibu} IBU</span>
                ${beer.calories ? `<span>${beer.calories} CAL</span>` : ''}
            </div>
        </div>
    `}).join('');

    container.innerHTML = beersHTML;
}

/**
 * Initialize menu - Load beers on page load
 */
async function initializeMenu() {
    // Load beers from hardcoded data
    let beers = await loadBeersFromJSON();
    console.log('DEBUG: loaded beers', beers);
    
    if (!beers || beers.length === 0) {
        console.log('Using mock beer data for demo');
        beers = MOCK_BEERS;
    }

    renderBeers(beers);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeMenu();

    const landingPage = document.getElementById('landing-page');
    const menuContent = document.getElementById('menu-content');
    const backButton = document.getElementById('back-button');
    const tapasSection = document.getElementById('tapas-section');
    const beersSection = document.getElementById('beers-section');
    const drinksSection = document.getElementById('drinks-section');
    const allSections = [tapasSection, beersSection, drinksSection];

    document.querySelectorAll('.selection-box').forEach(box => {
        box.addEventListener('click', () => {
            const section = box.dataset.section;
            allSections.forEach(s => s.classList.add('hidden'));
            landingPage.classList.add('hidden');
            menuContent.classList.remove('hidden');

            if (section === 'tapas') tapasSection.classList.remove('hidden');
            else if (section === 'beers') beersSection.classList.remove('hidden');
            else if (section === 'drinks') drinksSection.classList.remove('hidden');
        });
    });

    backButton.addEventListener('click', () => {
        menuContent.classList.add('hidden');
        allSections.forEach(s => s.classList.remove('hidden'));
        landingPage.classList.remove('hidden');
    });
});

// Optional: Auto-refresh beers from JSON
function setupAutoRefresh() {
    setInterval(async () => {
        console.log('Auto-refreshing beers...');
        const beers = await fetchBeersFromJSON();
        if (beers && beers.length > 0) {
            renderBeers(beers);
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Uncomment to enable auto-refresh
// setupAutoRefresh();

/**
 * SETUP INSTRUCTIONS FOR HARDCODED BEER DATA:
 *
 * The beers on tap are hardcoded in the ON_TAP_BEERS array.
 * To update beers, edit the ON_TAP_BEERS array above.
 *
 * Format:
 * {
 *     name: 'Beer Name',
 *     brewery: 'Brewery Name',
 *     style: 'Style - Country',
 *     abv: '5.2',
 *     ibu: '35',
 *     calories: '156'
 * }
 */
