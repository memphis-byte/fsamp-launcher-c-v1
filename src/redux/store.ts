import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import serversReducer from './slices/serversSlice';
import downloadReducer from './slices/downloadSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    servers: serversReducer,
    downloads: downloadReducer,
    settings: settingsReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;