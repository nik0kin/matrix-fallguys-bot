/* eslint-disable no-console */
import { MatrixClient } from 'matrix-bot-sdk';

import { checkDatabase } from './db';
import { ShopItem } from './fall-guys';
import { getShopItemString } from './message-formatter';
import { Settings } from './settings';
import { createMatrixClient } from './matrix-bot';

let lastFeaturedShopItems: [ShopItem, ShopItem, ShopItem];

async function poll(settings: Settings, botClient: MatrixClient) {
  try {
    await checkForNewFeaturedStoreItems(settings, botClient);
  } catch(e) {
    console.error('Something went wrong polling', e);
  }
  setTimeout(() => {
    poll(settings, botClient);
  }, settings.pollFrequency * 1000);
}

async function checkForNewFeaturedStoreItems(settings: Settings, botClient: MatrixClient) {
  const data = await checkDatabase();

  // if new data
  if (!data || JSON.stringify(data.shopFeaturedItems) !== JSON.stringify(lastFeaturedShopItems)) {
    // notify watchers
    console.log('New data! Sending messages to rooms.');
    const shopItemMessage = 'Shop Featured Items:\n' + data.shopFeaturedItems.map((i) => ` - ${getShopItemString(i, settings)}`).join('\n');
    console.log(shopItemMessage);
    sendMessageToAllJoinedRooms(botClient, shopItemMessage);

    lastFeaturedShopItems = data.shopFeaturedItems;
  }
}


export function startPoll(settings: Settings) {
  const botClient = createMatrixClient(settings);

  botClient.start()
    .then(() => {
      console.log(settings.onBotJoinRoomMessage);

      sendMessageToAllJoinedRooms(botClient, settings.onBotJoinRoomMessage);
      poll(settings, botClient);

      botClient.on('room.join', (roomId: string) => {
        botClient.sendText(roomId, settings.onBotJoinRoomMessage);
      });
    });
}

function sendMessageToAllJoinedRooms(client: MatrixClient, message: string) {
  client.getJoinedRooms()
    .then((rooms) => {
      rooms.forEach((roomId) => {
        client.sendText(roomId, message);
      });
    });
}