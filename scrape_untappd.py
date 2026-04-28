#!/usr/bin/env python3
"""
Scrape Untappd venue page to extract beers on tap
"""

import requests
from bs4 import BeautifulSoup
import json
import csv

# Untappd venue URL
VENUE_URL = "https://untappd.com/v/mestre-da-cerveja/11094009"

def scrape_venue_beers():
    """Scrape beers from Untappd venue page"""
    print("🍺 Scraping Untappd venue page...")
    print(f"URL: {VENUE_URL}\n")
    
    try:
        # Fetch the page with a user agent to avoid blocking
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(VENUE_URL, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all menu sections
        menu_sections = soup.find_all('div', class_='menu-section')
        print(f"📍 Found {len(menu_sections)} menu sections\n")
        
        all_beers = []
        
        for section_idx, section in enumerate(menu_sections, 1):
            # Get section title
            header = section.find('div', class_='menu-section-header')
            if header:
                title_elem = header.find('h4')
                section_title = title_elem.get_text(strip=True) if title_elem else "Unknown Section"
                description_elem = header.find('p')
                section_desc = description_elem.get_text(strip=True) if description_elem else ""
            else:
                section_title = f"Section {section_idx}"
                section_desc = ""
            
            print(f"📋 Section {section_idx}: {section_title}")
            if section_desc:
                print(f"   {section_desc}")
            
            # Find all beer items in this section
            beer_list = section.find('ul', class_='menu-section-list')
            if beer_list:
                beer_items = beer_list.find_all('li', class_='menu-item')
                print(f"   🍻 Found {len(beer_items)} beers\n")
                
                for beer_item in beer_items:
                    beer_info = {'section': section_title}
                    
                    # Get the beer info div
                    beer_div = beer_item.find('div', class_='beer-info')
                    if not beer_div:
                        continue
                    
                    # Get all text and parse it
                    beer_text = beer_div.get_text(separator=' ', strip=True)
                    
                    # Try to find the beer name (usually first link)
                    links = beer_div.find_all('a')
                    if links:
                        beer_info['name'] = links[0].get_text(strip=True)
                    
                    # Parse the beer details from text
                    # Format is usually: Name • Style • ABV
                    if beer_text and beer_info.get('name'):
                        # Remove the beer name to get the rest
                        rest = beer_text.replace(beer_info['name'], '', 1).strip()
                        
                        # Split by bullet or dash
                        parts = [p.strip() for p in rest.split('•')]
                        
                        for part in parts:
                            if not part:
                                continue
                            if '%' in part:
                                beer_info['abv'] = part
                            elif 'IBU' in part:
                                beer_info['ibu'] = part
                            elif part and not beer_info.get('style'):
                                beer_info['style'] = part
                    
                    if beer_info.get('name'):
                        all_beers.append(beer_info)
                        print(f"   ✅ {beer_info['name']}", end='')
                        if 'style' in beer_info:
                            print(f" | {beer_info['style']}", end='')
                        if 'abv' in beer_info:
                            print(f" | {beer_info['abv']}", end='')
                        print()
            
            print()
        
        if all_beers:
            print(f"✅ Successfully scraped {len(all_beers)} beers!\n")
            save_beers_to_files(all_beers)
            return all_beers
        else:
            print("❌ No beers found. The page structure may have changed.")
            return []
    
    except requests.RequestException as e:
        print(f"❌ Error fetching page: {e}")
        return []
    except Exception as e:
        print(f"❌ Error parsing page: {e}")
        return []

def save_beers_to_files(beers):
    """Save beers to JSON and CSV files"""
    
    # Save as JSON
    json_file = 'beers_on_tap.json'
    with open(json_file, 'w') as f:
        json.dump(beers, f, indent=2)
    print(f"💾 Saved to {json_file}")
    
    # Save as CSV
    csv_file = 'beers_on_tap.csv'
    if beers:
        keys = beers[0].keys()
        with open(csv_file, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(beers)
        print(f"💾 Saved to {csv_file}")

if __name__ == '__main__':
    beers = scrape_venue_beers()
