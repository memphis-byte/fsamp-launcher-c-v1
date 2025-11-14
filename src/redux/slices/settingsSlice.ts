import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings } from '../../types';

const initialState: AppSettings = {
  autoUpdate: true,
  notifications: true,
  videoQuality: 'high',
  musicVolume: 80,
  language: 'en',
  cachePath: '/cache',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setAppSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      return { ...state, ...action.payload };
    },
    toggleAutoUpdate: state => {
      state.autoUpdate = !state.autoUpdate;
    },
    toggleNotifications: state => {
      state.notifications = !state.notifications;
    },
    setVideoQuality: (state, action: PayloadAction<'low' | 'medium' | 'high'>) => {
        state.videoQuality = action.payload;
    },
    setMusicVolume: (state, action: PayloadAction<number>) => {
        state.musicVolume = action.payload;
    }
  },
});

export const { setAppSettings, toggleAutoUpdate, toggleNotifications, setVideoQuality, setMusicVolume } = settingsSlice.actions;

export default settingsSlice.reducer;