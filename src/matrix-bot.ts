import { MatrixClient, SimpleFsStorageProvider, AutojoinRoomsMixin } from 'matrix-bot-sdk';
import { SettingsWithDefaults } from './settings';

export function createMatrixClient(settings: SettingsWithDefaults) {
  const storage = new SimpleFsStorageProvider(settings.storageFile);
  const client = new MatrixClient(settings.homeserverUrl, settings.accessToken, storage);
  if (settings.autoJoin) {
    AutojoinRoomsMixin.setupOnClient(client);
  }
  return client;
}
