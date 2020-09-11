import { ShopItem } from './fall-guys';

// "Rare Costume Top: Hatchling - 4500K"
export function getShopItemString(item: ShopItem) {
  const isCostume = item.type === 'upper' || item.type === 'lower';
  const topOrBottom = isCostume ? ' ' + item.type === 'upper' ? 'Top' : 'Bottom' : '';
  const type = isCostume ? 'Costume ' + topOrBottom : capitalizeFirstLetter(item.type);
  const cost = `${item.cost}${item.currency === 'kudos' ? 'K' : 'C'}`;
  return `${capitalizeFirstLetter(item.rarity)} ${type}: ${item.name} - ${cost}`;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

