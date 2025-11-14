export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.samp-launcher.com';
export const CACHE_EXPIRY = 3600000;
export const MAX_RETRIES = 3;
export const DOWNLOAD_CHUNK_SIZE = 1024 * 1024;
export const PING_TIMEOUT = 5000;

export const GAME_RESOURCES = {
  MAIN_CLIENT: 'gta_sa_client',
  TEXTURES: 'textures_pack',
  MODELS: 'models_pack',
  AUDIO: 'audio_pack',
};

export const STORAGE_KEYS = {
  SERVERS: 'SAMP_SERVERS',
  FAVORITES: 'SAMP_FAVORITES',
  USER_DATA: 'SAMP_USER_DATA',
  SETTINGS: 'SAMP_SETTINGS',
  DOWNLOADS: 'SAMP_DOWNLOADS',
};