import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DownloadProgress } from '../../types';

interface DownloadsState {
  progress: { [fileId: string]: DownloadProgress };
}

const initialState: DownloadsState = {
  progress: {},
};

// Mock download simulation
let downloadIntervals: { [fileId: string]: NodeJS.Timeout } = {};

const startMockDownload = (fileId: string, dispatch: any) => {
  let currentProgress = 0;
  downloadIntervals[fileId] = setInterval(() => {
    currentProgress += 10; // Simulate 10% progress every second
    if (currentProgress > 100) {
      currentProgress = 100;
      clearInterval(downloadIntervals[fileId]);
      dispatch(downloadSlice.actions.updateDownloadStatus({ fileId, status: 'completed' }));
      dispatch(downloadSlice.actions.updateDownloadProgress({ fileId, progress: currentProgress }));
    } else {
      dispatch(downloadSlice.actions.updateDownloadProgress({ fileId, progress: currentProgress }));
    }
  }, 1000);
};

export const downloadSlice = createSlice({
  name: 'downloads',
  initialState,
  reducers: {
    startDownload: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      state.progress[fileId] = { fileId, progress: 0, status: 'downloading' };
      // This is a thunk action, it should be handled by a middleware
    },
    pauseDownload: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      if (state.progress[fileId] && state.progress[fileId].status === 'downloading') {
        state.progress[fileId].status = 'paused';
        clearInterval(downloadIntervals[fileId]);
      }
    },
    resumeDownload: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      if (state.progress[fileId] && state.progress[fileId].status === 'paused') {
        state.progress[fileId].status = 'downloading';
        // This is a thunk action, it should be handled by a middleware
      }
    },
    cancelDownload: (state, action: PayloadAction<string>) => {
      const fileId = action.payload;
      delete state.progress[fileId];
      clearInterval(downloadIntervals[fileId]);
    },
    updateDownloadProgress: (state, action: PayloadAction<{ fileId: string; progress: number }>) => {
      const { fileId, progress } = action.payload;
      if (state.progress[fileId]) {
        state.progress[fileId].progress = progress;
      }
    },
    updateDownloadStatus: (state, action: PayloadAction<{ fileId: string; status: DownloadProgress['status']; error?: string }>) => {
      const { fileId, status, error } = action.payload;
      if (state.progress[fileId]) {
        state.progress[fileId].status = status;
        if (error) {
          state.progress[fileId].error = error;
        }
      }
    },
  },
});

export const {
  startDownload,
  pauseDownload,
  resumeDownload,
  cancelDownload,
  updateDownloadProgress,
  updateDownloadStatus,
} = downloadSlice.actions;

export const resumeDownloadAndSimulate = (fileId: string) => (dispatch: any) => {
  dispatch(resumeDownload(fileId));
  startMockDownload(fileId, dispatch);
};

export default downloadSlice.reducer;