import { ShopItem } from './fall-guys';

// "Rare Costume Top: Hatchling - 4500K"
export function getShopItemString(item: ShopItem) {
  const topOrBottom = item.type === 'costume' ? ' ' + capitalizeFirstLetter(item.topOrBottom!) : '';
  const cost = `${item.cost}${item.currency === 'kudos' ? 'K' : 'C'}`;
  return `${capitalizeFirstLetter(item.rarity)} ${capitalizeFirstLetter(item.type)}${topOrBottom}: ${item.name} - ${cost}`;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

