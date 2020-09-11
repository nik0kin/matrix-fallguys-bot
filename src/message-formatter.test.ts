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

describe('getShopItemString', () => {
  test('should work without emojis', () => {
    expect(getShopItemString(testCostumeShopItem, {} as any)).toEqual('Rare Costume Bottom: Hatchling - 4500K');
    expect(getShopItemString(patternShopItem, {} as any)).toEqual('Legendary Pattern: Mountains - 3C');
  });
  // test('should work with emojis', () => {
  //   expect(getShopItemString(testCostumeShopItem, { emoji: true } as any)).toEqual('🟪Rare 🩳Costume Bottom: Hatchling - 4500🇰');
  //   expect(getShopItemString(patternShopItem, { emoji: true } as any)).toEqual('🟧Legendary 💠Pattern: Mountains - 3👑');
  // });
});
