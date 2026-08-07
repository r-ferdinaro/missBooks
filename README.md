# Miss Books

## Overview

A book catalog app.
Browse and filter your books, view details on each one, add new books by searching Google Books, edit or delete them, and leave star-rated reviews.

## Technical Overview

React + React Router, no build step — libs load via plain `<script>` tags and JSX compiles in-browser with Babel (see [lib/](lib/)). Just open `index.html` or serve the folder statically.

**Pages:** Home, About, Book Index (list + filter), Book Details, Book Add, Book Edit — routed with `HashRouter` in [RootCmp.jsx](RootCmp.jsx). Book data comes from the Google Books API ([services/googleBook-service.js](services/googleBook-service.js)).

## Setup

1. Copy `config.example.js` to `config.js`.
2. Open `config.js` and set your Google Books API key:
   ```js
   window.GOOGLE_BOOKS_API_KEY = "YOUR_API_KEY_HERE";
   ```
3. Open `index.html` (or serve the folder with any static server).

`config.js` is gitignored — never commit your real key. Without it, the app still works, just falls back to unauthenticated Google Books requests (lower rate limit).

## Deploy (GitHub Pages)

No build step, no secrets needed. Pages serves the repo as-is; since `config.js` isn't committed, the deployed site runs keyless (unauthenticated Books API requests). Enable Pages on the `main` branch in repo Settings.
