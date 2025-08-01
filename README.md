# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# ToDoApp-HEPT

This is a React Native Expo ToDo application project.

## Dependencies Installed

### Core Dependencies

- **expo** - Expo platform for React Native development
- **expo-router** - File-based routing for Expo
- **react-native-safe-area-context** - Safe area handling
- **@expo/vector-icons** - Icon library (includes FontAwesome)
- **react-native-dropdown-picker** - Dropdown/picker component for forms
- **react-native-reanimated** - High-performance animations library
- **react-native-gesture-handler** - Touch and gesture handling
- **react-native-screens** - Native screen optimization

### Development Dependencies

- **babel-plugin-module-resolver** - Babel plugin for path aliases and module resolution

### Configuration Notes

- **Path Aliases**: Configured `@components/*`, `@screens/*`, `@utils/*` in both:
  - `babel.config.js` (for runtime resolution)
  - `tsconfig.json` (for TypeScript intellisense)
- **Animations**: react-native-reanimated configured for smooth animations
- **Gestures**: react-native-gesture-handler for touch interactions
- **Dropdown**: react-native-dropdown-picker for form selections

## Project Structure

```
ToDoApp/
├── app/
│   └── index.tsx          # Main app entry point
├── components/
│   └── Header.tsx         # Header component with FontAwesome icon
├── babel.config.js        # Babel configuration with module resolver
├── tsconfig.json         # TypeScript configuration with path aliases
└── package.json
```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Development Notes

- Using **FontAwesome** icons from `@expo/vector-icons`
- Header component with check-square-o icon and custom blue theme (#456882)
- Configured custom path aliases for cleaner imports
- **react-native-dropdown-picker** ready for form components
- **Reanimated v3** + **Gesture Handler** for smooth interactions

## Recent Installations

- **2025-08-01**: Added react-native-dropdown-picker, react-native-reanimated, react-native-gesture-handler, react-native-screens

---

*Last updated: August 1, 2025*
