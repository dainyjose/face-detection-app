# Face Detection App

A React Native (Expo Bare Workflow) mobile app that uses **react-native-vision-camera** with frame processing to detect faces in real time. Built with TypeScript, Bun, ESLint, Prettier, and Jest for a robust developer experience and clean codebase.

---

## Table of Contents

- [Project Description](#project-description)  
- [Getting Started](#getting-started)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Scripts](#scripts)  
- [Tech Stack](#tech-stack)  
- [Linting & Formatting](#linting--formatting)  
- [Testing](#testing)  
- [Environment Variables](#environment-variables)  
- [Author](#author)  
- [License](#license)

---

## Project Description

This app lets users detect faces in real time using the device camera, via the `react-native-vision-camera` library with custom frame processors. Ideal for custom camera apps, AR, or security/face-recognition use cases.

---

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

---

## Prerequisites

- Node.js (for installing Expo CLI globally)  
- Bun (v1.0+)  
- Expo CLI  
- Xcode / Android development environment if you want to test on iOS / Android devices or emulators  

---

## Installation

```bash
git clone https://github.com/dainyjose/face-detection-app.git
cd face-detection-app
```

## Usage

```bash
bun install
```
To start the app:
```bash
# For Android
bun expo run:android

# For iOS
bun expo run:ios

# To just start the Metro bundler
bun expo start
```

---

## Project Structure

```
src/
├── __tests__/         # Test component
├── api/               # API calls
├── components/        # Reusable components
├── constants/         # App-wide constants
├── context/           # Global contexts
├── enums/             # TypeScript enums
├── hooks/             # Custom hooks
├── navigation/        # Navigation config
├── redux/             # Redux store and slices
├── screens/           # Screen components
├── theme/             # Theming and styles
├── types/             # Global types
├── utils/             # Utility functions
App.tsx                # Entry point

```

---

## Scripts

```bash
bun run dev            # Start Metro bundler
bun run android        # Run on Android
bun run ios            # Run on iOS
bun run lint           # Run ESLint on src/
bun run format         # Format code with Prettier
bun run test           # Run unit tests
```

---

## Tech Stack

- **React Native (bare)**
- **Expo SDK**
- **TypeScript**
- **Bun** (JavaScript runtime)
- **Jest** for unit testing
- **ESLint + Prettier** for linting and formatting
- **React Navigation**
- **Redux Toolkit** (optional)
- **React Native Vision Camera**
- **React Native Vision Camera Face Detector**

---

## Linting & Formatting

- Use ESLint to catch code style / errors
- Prettier for consistent formatting
- Certain folders/files are ignored (e.g. node_modules, android/, ios/, build outputs)
  
---

## Testing

**Unit Testing Setup:**

- Framework: `jest`
- Render tests: `@testing-library/react-native`

```bash
bun run test
```

---

## Environment Variables

Create a `.env` file at the root:

```env
API_URL=https://your-api.com
APP_ENV=development
```

In `env.d.ts`:

```ts
declare module '@env' {
  export const API_URL: string;
  export const APP_ENV: string;
}
```

---

## 🧑‍💻 Author

**Dainy Jose**  
[GitHub](https://github.com/dainyjose) | [LinkedIn](https://linkedin.com/in/dainyjose)

---

## License

[MIT](./LICENSE)
