#!/usr/bin/env python3
"""
Simple HTTP server to serve the MESTRE menu with scraped beer data
"""

import http.server
import socketserver
import os
from pathlib import Path

# Change to the menu directory
os.chdir(Path(__file__).parent)

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers to allow loading JSON
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == '__main__':
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"""
╔══════════════════════════════════════════════════════╗
║        🍺 MESTRE Menu Server Started 🍺             ║
╚══════════════════════════════════════════════════════╝

📍 Server running at: http://localhost:{PORT}
📱 Open in browser: http://localhost:{PORT}/index.html

📊 Beer data: beers_on_tap.json ({Path('beers_on_tap.json').stat().st_size / 1024:.1f} KB)
🔄 To update beers, run: python3 scrape_untappd.py

Press Ctrl+C to stop the server
""")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n✅ Server stopped.")
            httpd.shutdown()
