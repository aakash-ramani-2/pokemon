# React + TypeScript + Vite Project

This project is a starter template using React, TypeScript, and Vite for fast development and optimized builds.

## Table of Contents
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [ESLint Configuration](#eslint-configuration)
- [License](#license)

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
3. **Build for production**
   ```bash
   npm run build
   ```

## Features
- React with TypeScript
- Vite for fast HMR and builds
- ESLint configuration for code quality

## Project Structure
- `App.ResourceExplorer.tsx`: Main application component
- `KombaiWrapper.tsx`: Wrapper component
- `main.tsx`: Entry point
- `eslint.config.js`: ESLint configuration
- `index.html`: HTML template

## Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint

## ESLint Configuration
This template provides a minimal ESLint setup. For production, consider expanding the configuration as described below:

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install `eslint-plugin-react-x` and `eslint-plugin-react-dom` for React-specific lint rules:

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
# pokemon
