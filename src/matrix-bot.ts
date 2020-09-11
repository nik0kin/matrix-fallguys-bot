import { MatrixClient, SimpleFsStorageProvider, AutojoinRoomsMixin } from 'matrix-bot-sdk';
import { Settings } from './settings';

export function createMatrixClient(settings: Settings) {
  const storage = new SimpleFsStorageProvider('bot-storage.json');
  const client = new MatrixClient(settings.homeserverUrl, settings.accessToken, storage);
  AutojoinRoomsMixin.setupOnClient(client);
  return client;
}
