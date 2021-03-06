import { DBItem } from './db-types';
import { getShopItemString } from './message-formatter';

const testCostumeShopItem: DBItem = {
  'name': 'Hatchling',
  'type': 'lower',
  'rarity': 'rare',
  'cost': 4500,
  'currency': 'kudos',
  'link': 'https://fallguysdb.com/lower-items/hatchling'
};

const patternShopItem: DBItem = {
  'name': 'Mountains',
  'type': 'pattern',
  'rarity': 'legendary',
  'cost': 3,
  'currency': 'crowns',
  'link': 'https://fallguysdb.com/patterns/mountains'
};

const tartanPatternShopItem: DBItem = {
  'name': 'Tartan',
  'type': 'pattern',
  'rarity': 'epic',
  'cost': 4500,
  'currency': 'kudos',
  'link': 'https://fallguysdb.com/patterns/tartan'
};

const faceShopItem: DBItem = {
  'name': 'Raging',
  'type': 'face',
  'rarity': 'epic',
  'cost': 1,
  'currency': 'crowns',
  'link': 'https://fallguysdb.com/faces/raging'
};

const colourShopItem: DBItem = {
  'name': 'Bumblebee',
  'type': 'colour',
  'rarity': 'legendary',
  'cost': 2,
  'currency': 'crowns',
  'link': 'https://fallguysdb.com/colors/bumblebee'
};

describe('getShopItemString', () => {
  test('should work with no extra formatting', () => {
    expect(getShopItemString(testCostumeShopItem, {} as any, false)).toEqual('Rare Costume Bottom: Hatchling - 4500K');
    expect(getShopItemString(patternShopItem, {} as any, false)).toEqual('Legendary Pattern: Mountains - 3C');
  });
  test('should work with links', () => {
    expect(getShopItemString(testCostumeShopItem, { itemLink: true } as any, false))
      .toEqual('Rare Costume Bottom: [Hatchling](https://fallguysdb.com/lower-items/hatchling) - 4500K');
    expect(getShopItemString(patternShopItem, { itemLink: true } as any, false))
      .toEqual('Legendary Pattern: [Mountains](https://fallguysdb.com/patterns/mountains) - 3C');
    expect(getShopItemString(tartanPatternShopItem, { itemLink: true } as any, false))
      .toEqual('Epic Pattern: [Tartan](https://fallguysdb.com/patterns/tartan) - 4500K');
    expect(getShopItemString(faceShopItem, { itemLink: true } as any, false))
      .toEqual('Epic Face: [Raging](https://fallguysdb.com/faces/raging) - 1C');
    expect(getShopItemString(colourShopItem, { itemLink: true } as any, false))
      .toEqual('Legendary Colour: [Bumblebee](https://fallguysdb.com/colors/bumblebee) - 2C');
  });
  // test('should work with emojis', () => {
  //   expect(getShopItemString(testCostumeShopItem, { emoji: true } as any)).toEqual('Rare Costume Bottom🟪🩳: Hatchling - 4500🇰');
  //   expect(getShopItemString(patternShopItem, { emoji: true } as any)).toEqual('Legendary Pattern🟧💠: Mountains - 3👑');
  // });
});
