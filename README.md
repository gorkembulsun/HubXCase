# 🌱 HubxCase - Plant Identification App

A modern React Native application for plant identification and care, featuring a beautiful UI with onboarding, plant categories, and expert guidance.

## 📱 Features

- **Onboarding Experience**: Beautiful multi-step onboarding with plant imagery
- **Plant Categories**: Browse different plant categories with stunning visuals
- **Expert Questions**: Access curated plant care questions and articles
- **Premium Features**: Upgrade to unlock advanced plant identification features
- **Search Functionality**: Find plants and information quickly
- **Tab Navigation**: Intuitive bottom tab navigation with custom design

## 🏗️ Architecture

This project follows modern React Native best practices with a clean, scalable architecture:

### 📁 Project Structure

```
src/
├── assets/                 # Static assets organized by type
│   ├── images/
│   │   ├── home/          # Home screen specific images
│   │   ├── icons/         # Icon assets
│   │   ├── onboarding/    # Onboarding images
│   │   └── common/        # Shared images
│   └── fonts/             # Custom font files
├── components/            # Reusable UI components
│   └── home/             # Home screen components
├── constants/            # App constants and configuration
├── navigation/           # Navigation configuration
├── screens/             # Screen components
├── store/               # Redux store and slices
│   └── slices/         # Redux Toolkit slices
├── theme/              # Design system and theming
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### 🎨 Design System

- **Responsive Scaling**: Automatic scaling based on device dimensions
- **Consistent Typography**: Rubik and SF Pro Text font families
- **Color Palette**: Carefully crafted color system with semantic naming
- **Component Library**: Reusable components with consistent styling

### 🔧 State Management

- **Redux Toolkit**: Modern Redux with simplified boilerplate
- **Async Thunks**: Proper async action handling
- **Type Safety**: Full TypeScript integration

### 🌐 API Integration

- **Centralized Configuration**: API endpoints and configuration in constants
- **Error Handling**: Comprehensive error handling with user feedback
- **Type Safety**: Strongly typed API responses

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd HubxCasea
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Run the application**
   
   For Android:
   ```bash
   npm run android
   # or
   yarn android
   ```
   
   For iOS:
   ```bash
   npm run ios
   # or
   yarn ios
   ```

## 📦 Dependencies

### Core Dependencies
- **React Native**: Cross-platform mobile development
- **React Navigation**: Navigation library with tab and stack navigators
- **Redux Toolkit**: State management
- **React Redux**: React bindings for Redux
- **Axios**: HTTP client for API requests

### UI & Styling
- **React Native Linear Gradient**: Gradient effects
- **React Native Vector Icons**: Icon library
- **React Native Safe Area Context**: Safe area handling

### Development
- **TypeScript**: Type safety and better development experience
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 🎯 Key Features Implementation

### Component Architecture
- **Modular Components**: Each UI element is a separate, reusable component
- **Props Interface**: Strongly typed component props
- **Style Isolation**: Component-specific styles with theme integration

### API Integration
- **Centralized Endpoints**: All API URLs in constants file
- **Error Handling**: Comprehensive error handling with user feedback
- **Loading States**: Proper loading state management

### Navigation
- **Tab Navigation**: Custom tab bar with plant-themed design
- **Stack Navigation**: Hierarchical navigation for onboarding
- **Deep Linking**: Support for external URL opening

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow the established folder structure
- Use the centralized theme system
- Write descriptive component and function names
- Add JSDoc comments for complex functions

### Component Creation
- Create components in appropriate folders
- Export through index files
- Use theme constants for styling
- Implement proper TypeScript interfaces

### State Management
- Use Redux Toolkit for global state
- Create typed selectors and actions
- Handle loading and error states properly

## 🚀 Build & Deployment

### Android
```bash
cd android
./gradlew assembleRelease
```

### iOS
```bash
cd ios
xcodebuild -workspace HubxCase.xcworkspace -scheme HubxCase -configuration Release
```

## 🤝 Contributing

1. Follow the established code style and architecture
2. Write TypeScript interfaces for all new features
3. Use the centralized theme system
4. Add proper error handling
5. Test on both iOS and Android platforms

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using React Native and modern development practices.
