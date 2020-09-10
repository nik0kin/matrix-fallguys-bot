import fetch from 'node-fetch';

import { ShopItem } from './fall-guys';

interface FallGuysFauxDatabaseResponse {
  shopFeaturedItems: [ShopItem, ShopItem, ShopItem];
}

const githubRepo = 'nik0kin/fallguys-featured-store-faux-database';
const jsonFilename = 'index.json';
const githubRawFileUrl = `https://raw.githubusercontent.com/${githubRepo}/master/${jsonFilename}`;

export async function checkDatabase(): Promise<FallGuysFauxDatabaseResponse> {
  const resp = await fetch(githubRawFileUrl);
  const json = await resp.json();

  if (!json || !json.shopFeaturedItems) {
    throw new Error('json missing data');
  }

  return json;
}