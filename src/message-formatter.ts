import { ShopItem } from './fall-guys';
import { Settings } from './settings';
import { capitalizeFirstLetter } from './string-util';
import { getFallguysGamepediaItemUrl } from './fall-guys-gamepedia';

function getRarityEmoji(rarity: ShopItem['rarity']) {
  return {
    'common': '⬜️',
    'uncommon': '🟦',
    'rare': '🟩',
    'epic': '🟪',
    'legendary': '🟧'
  }[rarity];
}

function getTypeEmoji(type: ShopItem['type']) {
  return {
    'colour': '🔴',
    'pattern': '💠',
    'face': '🙉',
    'upper': '👕',
    'lower': '🩳'
  }[type];
}

function getCurrencyEmoji(currency: ShopItem['currency']) {
  return {
    'kudos': '🇰',
    'crowns': '👑'
  }[currency];
}

// "Rare Costume Top: Hatchling - 4500K"
export function getShopItemString(item: ShopItem, settings: Settings) {
  const rarityEmoji = settings.emoji ? getRarityEmoji(item.rarity) : '';
  const typeEmoji = settings.emoji ? getTypeEmoji(item.type) : '';
  const currencyEmoji = settings.emoji ? getCurrencyEmoji(item.currency) : '';

  const rarity = capitalizeFirstLetter(item.rarity);

  const isCostume = item.type === 'upper' || item.type === 'lower';
  const topOrBottom = isCostume ? ' ' + item.type === 'upper' ? 'Top' : 'Bottom' : '';
  const type = isCostume ? 'Costume ' + topOrBottom : capitalizeFirstLetter(item.type);

  const itemLink = getFallguysGamepediaItemUrl(item);
  const name = settings.gamepediaLink ? `<a href="${itemLink}">${item.name}</a>` : item.name;

  const cost = `${item.cost}${currencyEmoji || (item.currency === 'kudos' ? 'K' : 'C')}`;

  return `${rarity} ${type}${rarityEmoji + typeEmoji}: ${name} - ${cost}`;
}


