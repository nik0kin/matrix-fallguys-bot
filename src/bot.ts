/* eslint-disable no-console */

import { checkDatabase } from './db';
import { ShopItem } from './fall-guys';
import { getShopItemString } from './message-formatter';

interface Settings {
  pollFrequency: number; // In seconds
}

let lastFeaturedShopItems: [ShopItem, ShopItem, ShopItem];


async function poll(settings: Settings) {
  try {
    await checkForNewFeaturedStoreItems();
  } catch(e) {
    console.error('Something went wrong polling', e);
  }
  setTimeout(() => {
    poll(settings);
  }, settings.pollFrequency * 1000);
}

async function checkForNewFeaturedStoreItems() {
  const data = await checkDatabase();

  // if new data
  if (JSON.stringify(data) !== JSON.stringify(lastFeaturedShopItems)) {
    // notify watchers
    console.log('new data!');
    data.shopFeaturedItems.forEach((i) => {
      console.log(` - ${getShopItemString(i)}`);
    });
    lastFeaturedShopItems = data.shopFeaturedItems;
  }
}


export function startPoll(settings: Settings) {
  // TODO init bot
  // TODO "Hello, Let's Fall"
  console.log("Hello, Let's Fall");
  poll(settings);
}
