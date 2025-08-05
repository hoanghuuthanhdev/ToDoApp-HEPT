# 📝 ToDoApp - React Native Task Management

A modern, feature-rich task management application built with React Native and Expo. Clean UI design with smooth animations and intuitive user experience.


## ✨ Features

### 🎯 **Core Functionality**
- ✅ **Create Tasks** - Add new tasks with title, description, and due date
- ✅ **Task Management** - Mark tasks as complete/incomplete
- ✅ **Delete Tasks** - Remove tasks with confirmation
- ✅ **Filter Tasks** - Filter by All, Completed, or Expired tasks
- ✅ **Date Picker** - Set due dates for tasks
- ✅ **Toast Notifications** - Real-time feedback for all actions

### 🎨 **UI/UX Features**
- ✅ **Modern Design** - Clean, minimalist interface
- ✅ **Smooth Animations** - Gesture-based interactions
- ✅ **Theme Menu** - Settings and theme options
- ✅ **Modal Dialogs** - Full-screen task creation
- ✅ **Empty States** - Helpful messages when no tasks
- ✅ **Safe Area Support** - Works on all device types

### 📱 **Mobile Optimizations**
- ✅ **FlatList Performance** - Optimized for large task lists
- ✅ **Gesture Handling** - Swipe and touch interactions
- ✅ **Keyboard Handling** - Smart keyboard behavior
- ✅ **Platform Specific** - iOS and Android optimizations

## 🛠️ Tech Stack

### **Frontend Framework**
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe development

### **UI Components & Styling**
- **React Native Elements** - UI component library
- **React Native Vector Icons** - Icon sets (FontAwesome, AntDesign, Entypo)
- **StyleSheet** - Native styling system
- **Flexbox Layout** - Responsive design

### **Navigation & State**
- **React Navigation** - Screen navigation
- **React Hooks** - State management (useState, useEffect)
- **Context API** - Global state (if needed)

### **External Libraries**
```json
{
  "react-native-dropdown-picker": "^5.4.6",
  "@react-native-community/datetimepicker": "^7.6.2",
  "react-native-toast-message": "^2.1.7",
  "react-native-gesture-handler": "^2.14.0",
  "react-native-safe-area-context": "^4.8.2"
}
```

## 📁 Project Structure

```
ToDoApp/
├── app/
│   └── index.tsx                 # Main app component
├── components/
│   ├── Header.tsx               # App header with filters
│   ├── Footer.tsx               # Bottom action bar
│   ├── TaskItem.tsx             # Individual task component
│   ├── ModelCreate.tsx          # Task creation modal
│   └── AddButton.tsx            # Reusable button component
├── assets/
│   ├── images/
│   └── icons/
├── types/
│   └── Task.ts                  # TypeScript interfaces
├── package.json
├── tsconfig.json
├── app.json
└── README.md
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm 
- Expo CLI
- iOS Simulator / Android Emulator

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/hoanghuuthanhdev/ToDoApp-HEPT
cd ToDoApp
```

2. **Install dependencies**
```bash
npm install


3. **Start the development server**
```bash
npx expo start
```

4. **Run on device/simulator**
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## 📱 App Components

### **1. Header Component** (`components/Header.tsx`)
```tsx
Features:
├── App title and icon
├── Filter dropdown (All, Completed, Expired)
├── Theme menu (Light/Dark mode, Settings)
└── Gesture handling for outside clicks
```

### **2. Task Management** (`app/index.tsx`)
```tsx
Features:
├── FlatList for performance
├── Task CRUD operations
├── Toast notifications
├── Safe area handling
└── State management
```

### **3. Task Creation** (`components/ModelCreate.tsx`)
```tsx
Features:
├── Full-screen modal
├── Form validation
├── Date picker integration
├── Toast feedback
└── Keyboard handling
```

### **4. Task Item** (`components/TaskItem.tsx`)
```tsx
Features:
├── Toggle completion status
├── Delete functionality
├── Edit capabilities
├── Gesture interactions
└── Visual feedback
```

## 🎨 Design System

### **Color Palette**
```scss
Primary: #456882    // Header, buttons
Success: #4CAF50    // Success states
Error: #f44336      // Delete, errors
Warning: #FF9800    // Warnings
Info: #2196F3       // Information
Background: #f5f5f5 // App background
```

### **Typography**
```scss
Headers: Bold, 18-20px
Body: Regular, 14-16px
Captions: Light, 12-14px
```

### **Spacing System**
```scss
xs: 4px    // Tight spacing
sm: 8px    // Small spacing
md: 16px   // Medium spacing
lg: 24px   // Large spacing
xl: 32px   // Extra large spacing
```

## 🔧 Key Features Implementation

### **1. Task State Management**
```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}
```

### **2. Performance Optimizations**
```typescript
// FlatList optimizations
getItemLayout={(data, index) => ({
  length: 80,
  offset: 80 * index,
  index,
})}
initialNumToRender={10}
maxToRenderPerBatch={5}
windowSize={5}
```

### **3. Safe Area Handling**
```typescript
const insets = useSafeAreaInsets();
// Dynamic padding based on device
paddingTop: insets.top,
paddingBottom: insets.bottom
```

### **4. Toast System**
```typescript
// Different positions for different contexts
Modal: position: 'top', topOffset: 100
App: position: 'bottom', bottomOffset: 150
```

## 📲 Screenshots

### **Main Screen**
- Task list with filter options
- Clean, modern interface
- Floating action button

### **Task Creation**
- Full-screen modal
- Form validation
- Date picker
- Toast notifications

### **Filter & Settings**
- Dropdown filters
- Theme menu
- Settings options

## 🐛 Known Issues & Limitations

### **Current Limitations**
- [ ] Task editing not fully implemented
- [ ] Dark theme not implemented
- [ ] No data persistence (localStorage/AsyncStorage)
- [ ] No push notifications
- [ ] No task categories/tags

### **Planned Features**
- [ ] Task editing modal
- [ ] Dark/Light theme switching
- [ ] Data persistence with AsyncStorage
- [ ] Task categories and tags
- [ ] Search functionality
- [ ] Task reminders/notifications
- [ ] Export/Import tasks
- [ ] Cloud sync

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Development Guidelines**
- Use TypeScript for type safety
- Follow React Native best practices
- Write clean, readable code
- Add comments for complex logic
- Test on both iOS and Android

## 👨‍💻 Author
