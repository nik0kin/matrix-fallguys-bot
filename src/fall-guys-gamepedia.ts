import { ShopItem } from './fall-guys';
import { capitalizeFirstLetter } from './string-util';

const gamepediaBaseUrl = 'https://fallguysultimateknockout.gamepedia.com/';
const patternsPage = 'Patterns';
const facesPage = 'Faceplates';
const coloursPage = 'Colour_Schemes';

function doesGamepediaHavePatternPage(name: string) {
  return ['Pirate', 'Tartan'].includes(name);
}

function getItemPage(item: ShopItem) {
  if (item.type === 'upper' || item.type === 'lower') {
    return item.name + '_Costume';
  }

  if (item.type === 'pattern' && !doesGamepediaHavePatternPage(item.name)) {
    return patternsPage;
  }

  if (item.type === 'face') {
    return facesPage;
  }

  if (item.type === 'colour') {
    return coloursPage;
  }

  return item.name + '_' + capitalizeFirstLetter(item.type);
}

export function getFallguysGamepediaItemUrl(item: ShopItem) {
  return gamepediaBaseUrl + getItemPage(item);
}
