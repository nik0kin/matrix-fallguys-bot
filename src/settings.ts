export interface Settings {
  homeserverUrl: string;
  accessToken: string;
  pollFrequency: number; // In seconds
  emoji: boolean;
  itemLink: boolean;
  onBotJoinRoomMessage: string;
  // dataSource?: 'skin-db' | 'fallguys-db'
}
