# AI Recipes Mobile App UI

A beautiful mobile app UI for recipe discovery built with Next.js, featuring a mobile frame simulation and natural color palette.

## Features

1. **Recipe by Name**: Enter a recipe name to get ingredients and cooking method
2. **Recipes by Ingredients**: Input your available ingredients to find matching recipes
3. **Image to Description**: Upload a recipe image to get a detailed description

## Authentication Flow

- Phone number input page
- OTP verification page

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design

The app uses a natural color palette with greens and earth tones:
- Primary: `#8fb569` (sage green)
- Secondary: `#a8c97f` (light green)
- Accent: `#c8d5b9` (pale green)
- Text: `#2d5016` (dark green)
- Background: `#f8f9f4` (cream)

## Project Structure

- `app/` - Next.js app directory with pages and global styles
- `components/` - React components for each page and feature
- `components/MobileFrame.tsx` - Mobile device frame simulation
