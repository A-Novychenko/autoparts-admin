import { configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {
  authReducer,
  setTokenInState,
  setIsAuthenticated,
} from './auth/authSlice';

import {
  setTokenUpdateCallback,
  setLogoutIsAuthenticatedCallback,
} from './auth/authOperations';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

setTokenUpdateCallback(({ token }) => {
  store.dispatch(setTokenInState({ token }));
});

setLogoutIsAuthenticatedCallback(() => {
  store.dispatch(setIsAuthenticated(false));
});

export const store = configureStore({
  reducer: { auth: persistReducer(authPersistConfig, authReducer) },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
