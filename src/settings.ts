export interface Settings {
  homeserverUrl: string;
  accessToken: string;
  pollFrequency: number; // In seconds
  emoji: boolean;
  onBotJoinRoomMessage: string;
}
