import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slice/authSlice';
import pathReducer from './slice/pathSlice';
import surveyReducer from './slice/surveySlice';
import teiReducer from './slice/teiSlice';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Configuration for persisting the Redux state
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'survey', 'path', 'teiSurvey'], // Specify which reducers to persist
};

// Combine your reducers
const rootReducer = combineReducers({
  user: authReducer,
  path: pathReducer,
  survey: surveyReducer,
  teiSurvey: teiReducer,
});

// Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a persistor to handle the persist state
const persistor = persistStore(store);

export { store, persistor };
