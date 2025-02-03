from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import os
from functions.api.conversation import handler as ConversationHandler

class LocalDevServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/api/conversation'):
            # Handle API requests
            ConversationHandler.do_GET(self)
        else:
            # Serve static files
            super().do_GET()

def run(server_class=HTTPServer, handler_class=LocalDevServer, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting server on port {port}...")
    print(f"Open http://localhost:{port} in your browser")
    httpd.serve_forever()

if __name__ == '__main__':
    run() 