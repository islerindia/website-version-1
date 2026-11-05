#!/usr/bin/env python3
"""Local preview server that mirrors the production .htaccess:
   - /foo.html  -> 301 redirect to /foo
   - /foo       -> serves /foo.html when the file exists
   - /          -> serves index.html
   Run: python3 serve.py   (then open http://localhost:8080)
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit, urlunsplit

PORT = 8080
ROOT = os.path.dirname(os.path.abspath(__file__))


class CleanURLHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self._rewrite():
            return
        super().do_GET()

    def do_HEAD(self):
        if self._rewrite():
            return
        super().do_HEAD()

    def _rewrite(self):
        parts = urlsplit(self.path)
        path, query = parts.path, parts.query

        if path.endswith('.html'):
            clean = path[:-5]
            new = urlunsplit(('', '', clean, query, ''))
            self.send_response(301)
            self.send_header('Location', new)
            self.end_headers()
            return True

        if path == '/' or path.endswith('/'):
            return False

        fs = os.path.join(ROOT, path.lstrip('/'))
        if os.path.isfile(fs):
            return False

        html_fs = fs + '.html'
        if os.path.isfile(html_fs):
            self.path = path + '.html' + (('?' + query) if query else '')
            return False

        return False


if __name__ == '__main__':
    os.chdir(ROOT)
    srv = ThreadingHTTPServer(('', PORT), CleanURLHandler)
    print(f'Serving {ROOT} on http://localhost:{PORT}  (clean URLs on)')
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        print('\nbye')
        sys.exit(0)
