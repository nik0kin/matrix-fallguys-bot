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
    await checkForNewFeaturedStoreItems(botClient);
  } catch(e) {
    console.error('Something went wrong polling', e);
  }
  setTimeout(() => {
    poll(settings, botClient);
  }, settings.pollFrequency * 1000);
}

async function checkForNewFeaturedStoreItems(botClient: MatrixClient) {
  const data = await checkDatabase();

  // if new data
  if (JSON.stringify(data) !== JSON.stringify(lastFeaturedShopItems)) {
    // notify watchers
    console.log('new data!');
    data.shopFeaturedItems.forEach((i) => {
      const shopItemMessage = ` - ${getShopItemString(i)}`;
      console.log(shopItemMessage);
      sendMessageToAllJoinedRooms(botClient, shopItemMessage);
    });
    lastFeaturedShopItems = data.shopFeaturedItems;
  }
}


export function startPoll(settings: Settings) {
  const botClient = createMatrixClient(settings);

  botClient.start()
    .then(() => {
      const startMessage = "Hello, Let's Fall!";
      console.log(startMessage);

      sendMessageToAllJoinedRooms(botClient, startMessage);
      poll(settings, botClient);

      botClient.on('room.join', (roomId: string) => {
        botClient.sendText(roomId, startMessage);
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