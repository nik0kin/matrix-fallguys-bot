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
    const cartEmoji = settings.emoji ? '🛒' : '';
    const shopFeaturedItemsTitle = `${cartEmoji}Shop Featured Items${cartEmoji}:`;
    const shopItemMessage = shopFeaturedItemsTitle + '\n' + data.shopFeaturedItems.map((i) => ` - ${getShopItemString(i, settings, false)}`).join('\n');
    const shopItemMessageHtmlFormatted = shopFeaturedItemsTitle + '<br>' + data.shopFeaturedItems.map((i) => ` - ${getShopItemString(i, settings, true)}`).join('<br>');
    console.log(shopItemMessage);
    sendMessageToAllJoinedRooms(botClient, shopItemMessage, shopItemMessageHtmlFormatted);

    lastFeaturedShopItems = data.shopFeaturedItems;
  }
}


export function startPoll(settings: Settings) {
  const botClient = createMatrixClient(settings);

  botClient.start()
    .then(() => {
      console.log(settings.onBotJoinRoomMessage || 'onBotJoinRoomMessage');

      if (settings.onBotJoinRoomMessage) {
        sendMessageToAllJoinedRooms(botClient, settings.onBotJoinRoomMessage);

        botClient.on('room.join', (roomId: string) => {
          botClient.sendText(roomId, settings.onBotJoinRoomMessage);
        });
      }
      poll(settings, botClient);
    });
}

function sendMessageToAllJoinedRooms(client: MatrixClient, message: string, htmlFormattedMessage?: string) {
  client.getJoinedRooms()
    .then((rooms) => {
      rooms.forEach((roomId) => {
        client.sendMessage(roomId, {
          msgtype: 'm.text',
          body: message,
          ...(htmlFormattedMessage ? {
            format: 'org.matrix.custom.html',
            formatted_body: htmlFormattedMessage
          } : {})
        });
      });
    });
}
