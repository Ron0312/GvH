#!/bin/bash

# Deploy Script for Plesk

# 1. Pull latest changes (Usually handled by Plesk Git extension, but good to have explicit steps)
# git pull origin main

# 2. Install dependencies
npm install

# 3. Build the project
npm run build

# 4. The output is in /dist. Plesk needs to point the Document Root to this folder.
# No file copy needed if Document Root is set to /httpdocs/dist (or repo-root/dist)

echo "Deployment Build Complete. Please ensure Plesk Document Root is set to /dist"
