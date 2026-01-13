import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const distPath = join(__dirname, 'dist');

// Middleware to set cache headers
app.use((req, res, next) => {
    // Default to no-cache for HTML and other files
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

// Serve static files with specific cache rules
app.use(express.static(distPath, {
    extensions: ['html', 'htm'],
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            // Ensure HTML is strictly not cached
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else {
            // Assets like JS, CSS, Images can be cached
            // Astro hashes filenames, so safe to cache long-term
            res.set('Cache-Control', 'public, max-age=31536000, immutable');
            // Clear the no-cache headers set by the middleware above for these assets
            res.removeHeader('Pragma');
            res.removeHeader('Expires');
        }
    }
}));

// Handle 404
app.use((req, res) => {
    const notFoundPath = join(distPath, '404.html');
    if (fs.existsSync(notFoundPath)) {
        res.status(404).sendFile(notFoundPath);
    } else {
        res.status(404).send('404 Not Found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
