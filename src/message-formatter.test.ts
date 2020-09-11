import { ShopItem } from './fall-guys';
import { getShopItemString } from './message-formatter';

const testCostumeShopItem: ShopItem = {
  'name': 'Hatchling',
  'type': 'lower',
  'rarity': 'rare',
  'cost': 4500,
  'currency': 'kudos'
};

const patternShopItem: ShopItem = {
  'name': 'Mountains',
  'type': 'pattern',
  'rarity': 'legendary',
  'cost': 3,
  'currency': 'crowns'
};

const tartanPatternShopItem: ShopItem = {
  'name': 'Tartan',
  'type': 'pattern',
  'rarity': 'epic',
  'cost': 4500,
  'currency': 'kudos'
};

const faceShopItem: ShopItem = {
  'name': 'Raging',
  'type': 'face',
  'rarity': 'epic',
  'cost': 1,
  'currency': 'crowns'
};

const colourShopItem: ShopItem = {
  'name': 'Bumblebee',
  'type': 'colour',
  'rarity': 'legendary',
  'cost': 2,
  'currency': 'crowns'
};

describe('getShopItemString', () => {
  test('should work with no extra formatting', () => {
    expect(getShopItemString(testCostumeShopItem, {} as any)).toEqual('Rare Costume Bottom: Hatchling - 4500K');
    expect(getShopItemString(patternShopItem, {} as any)).toEqual('Legendary Pattern: Mountains - 3C');
  });
  test('should work with links', () => {
    expect(getShopItemString(testCostumeShopItem, { gamepediaLink: true } as any)).toEqual('Rare Costume Bottom: [Hatchling](https://fallguysultimateknockout.gamepedia.com/Hatchling_Costume) - 4500K');
    expect(getShopItemString(patternShopItem, { gamepediaLink: true } as any)).toEqual('Legendary Pattern: [Mountains](https://fallguysultimateknockout.gamepedia.com/Patterns) - 3C');
    expect(getShopItemString(tartanPatternShopItem, { gamepediaLink: true } as any)).toEqual('Epic Pattern: [Tartan](https://fallguysultimateknockout.gamepedia.com/Tartan_Pattern) - 4500K');
    expect(getShopItemString(faceShopItem, { gamepediaLink: true } as any)).toEqual('Epic Face: [Raging](https://fallguysultimateknockout.gamepedia.com/Faceplates) - 1C');
    expect(getShopItemString(colourShopItem, { gamepediaLink: true } as any)).toEqual('Legendary Colour: [Bumblebee](https://fallguysultimateknockout.gamepedia.com/Colour_Schemes) - 2C');
  });
  // test('should work with emojis', () => {
  //   expect(getShopItemString(testCostumeShopItem, { emoji: true } as any)).toEqual('Rare Costume Bottom🟪🩳: Hatchling - 4500🇰');
  //   expect(getShopItemString(patternShopItem, { emoji: true } as any)).toEqual('Legendary Pattern🟧💠: Mountains - 3👑');
  // });
});
