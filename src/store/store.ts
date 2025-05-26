import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import questionsReducer from './slices/questionsSlice';
import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    questions: questionsReducer,
    user: userReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 