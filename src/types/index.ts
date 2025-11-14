export interface Server {
  id: string;
  name: string;
  ip: string;
  port: number;
  players: number;
  maxPlayers: number;
  mode: string;
  version: string;
  website: string;
  description: string;
  bannerUrl: string;
  ping?: number;
  isFavorite: boolean;
}

export interface DownloadableFile {
  id: string;
  name: string;
  description: string;
  size: number; // in MB
  url: string;
  version: string;
}

export interface DownloadProgress {
  fileId: string;
  progress: number; // 0-100
  status: 'pending' | 'downloading' | 'paused' | 'completed' | 'failed';
  error?: string;
}


export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  date: string;
  category: string;
}

export interface AppSettings {
  autoUpdate: boolean;
  notifications: boolean;
  videoQuality: 'low' | 'medium' | 'high';
  musicVolume: number;
  language: string;
  cachePath: string;
}
