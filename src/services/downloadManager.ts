import RNFetchBlob from 'rn-fetch-blob';
import { DownloadTask } from '../types';

export class DownloadManager {
  private activeDownloads: Map<string, any> = new Map();
  private downloadProgress: Map<string, (progress: DownloadTask) => void> = new Map();

  async startDownload(
    taskId: string,
    url: string,
    destination: string,
    onProgress: (progress: DownloadTask) => void
  ): Promise<void> {
    this.downloadProgress.set(taskId, onProgress);

    try {
      const task = RNFetchBlob.config({
        path: destination,
        trusty: true,
      }).fetch('GET', url, {
        'User-Agent': 'SAMP-Launcher/1.0',
      });

      this.activeDownloads.set(taskId, task);

      task.progress((received, total) => {
        const progress = (received / total) * 100;
        const callback = this.downloadProgress.get(taskId);
        if (callback) {
          callback({
            id: taskId,
            fileName: destination.split('/').pop() || 'file',
            fileSize: total,
            downloadedSize: received,
            progress,
            status: 'downloading',
            speed: received / (Date.now() / 1000),
            eta: (total - received) / (received / (Date.now() / 1000)),
          });
        }
      });

      await task;
      const callback = this.downloadProgress.get(taskId);
      if (callback) {
        callback({
          id: taskId,
          fileName: destination.split('/').pop() || 'file',
          fileSize: 0,
          downloadedSize: 0,
          progress: 100,
          status: 'completed',
          speed: 0,
          eta: 0,
        });
      }
    } catch (error) {
      const callback = this.downloadProgress.get(taskId);
      if (callback) {
        callback({
          id: taskId,
          fileName: destination.split('/').pop() || 'file',
          fileSize: 0,
          downloadedSize: 0,
          progress: 0,
          status: 'failed',
          speed: 0,
          eta: 0,
          error: String(error),
        });
      }
    } finally {
      this.activeDownloads.delete(taskId);
      this.downloadProgress.delete(taskId);
    }
  }

  pauseDownload(taskId: string): void {
    const task = this.activeDownloads.get(taskId);
    if (task) {
      task.cancel();
    }
  }

  resumeDownload(taskId: string, url: string, destination: string, onProgress: (progress: DownloadTask) => void): void {
    this.startDownload(taskId, url, destination, onProgress);
  }
}

export default new DownloadManager();