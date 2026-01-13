import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const distPath = join(__dirname, 'dist');

// Log startup (useful for Passenger logs)
console.log(`Starting application from ${distPath}`);

// Middleware to set cache headers
app.use((req, res, next) => {
    // Default to no-cache for HTML and other files
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// Serve static files with specific cache rules
// 'extensions' option helps serving /page as /page.html
app.use(express.static(distPath, {
    extensions: ['html', 'htm'],
    redirect: true, // Redirect /dir to /dir/
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            // Ensure HTML is strictly not cached
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else {
            // Assets like JS, CSS, Images can be cached
            // Astro hashes filenames, so safe to cache long-term
            res.set('Cache-Control', 'public, max-age=31536000, immutable');
            res.removeHeader('Pragma');
            res.removeHeader('Expires');
        }
    }
}));

// Handle 404
app.use((req, res) => {
    console.log(`404 Not Found: ${req.url}`);
    const notFoundPath = join(distPath, '404.html');
    if (fs.existsSync(notFoundPath)) {
        res.status(404).sendFile(notFoundPath);
    } else {
        res.status(404).send('404 Not Found');
    }
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(500).send('Internal Server Error');
});

// Start Server
// Note: Phusion Passenger might handle the port binding automatically,
// but app.listen(port) is generally safe for modern Passenger + Node versions.
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});
