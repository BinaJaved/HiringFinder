# Hiring Finder App

# Demo
![Demo](./Demo//demo.gif)

A **React Native + Expo** mobile app that uses **OpenAI** to fetch a list of companies that are currently hiring. The app provides a clean, simple interface to search for companies based on keywords and displays the results in a user-friendly format. Company links are clickable to open in the default browser.

---

## Project Overview

The Hiring Finder app allows users to search for companies that are hiring using natural language queries, view company information including name, roles, location, and website, click company URLs to open in the default browser, and get results powered by **OpenAI** for enhanced data extraction. The app is designed for **iOS and Android** using **React Native with TypeScript** and a clean architecture for scalability.

---

## Features

- Search companies based on keywords like `"AI startups hiring in Canada"`.  
- Display search results in **cards** with company name, roles, location, and URL.  
- Clickable company URLs using React Native `Linking`.  
- Responsive design with `react-native-paper`.  
- Simple, clean TypeScript code architecture.  
- Supports future routing, filtering, and pagination.

---

## Tech Stack

**Frontend:** React Native + TypeScript, Expo, react-native-paper, Axios  
**Backend:** Node.js + Express, OpenAI API integration, CORS enabled

---

## Project Structure

```

frontend/
├─ App.tsx                 # Entry point
├─ src/
│  ├─ api/
│  │  └─ backend.ts        # API calls to backend
│  ├─ components/
│  │  ├─ CompanyCard.tsx   # Display company info
│  │  └─ SearchBar.tsx     # Input and search button
│  ├─ screens/
│  │  └─ HomeScreen.tsx    # Main screen
│  └─ types/
│     └─ index.ts          # TypeScript interfaces
├─ package.json
├─ tsconfig.json
└─ app.json

````

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/BinaJaved/hiring-finder.git
cd hiring-finder/frontend
````

2. Install dependencies:

```bash
npm install
```

---

## Running the App

1. Start your **backend server** on your computer (ensure it’s listening on `0.0.0.0`):

```bash
cd ../backend
node server.js
```

2. Start Expo:

```bash
cd ../frontend
npx expo start
```

3. Scan the QR code in **Expo Go** on your iPhone (or run in simulator/emulator).
4. Ensure the **backend URL** in `backend.ts` points to your computer’s **LAN IP** for real devices.

---

## Backend

Node.js + Express server running on port 3000. Exposes a POST `/search` endpoint for fetching company data from OpenAI.

Example POST body:

```json
{
  "query": "AI startups hiring in Canada"
}
```

---

## Environment Setup

1. Ensure your computer and phone are on the **same network**.
2. Backend must allow connections from LAN:

```js
app.listen(3000, "0.0.0.0")
```

3. Update frontend API URL (`src/api/backend.ts`) to match LAN IP:

```ts
const BACKEND_URL = "http://192.168.1.12:3000";
```

---
