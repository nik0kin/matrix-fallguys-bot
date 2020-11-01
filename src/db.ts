import { checkDatabase as checkFallguysDb } from './data-sources/fallguys-db';
import { checkDatabase as checkSkinDb } from './data-sources/skin-db';
import { SettingsWithDefaults } from './settings';

export function checkDatabase(dataSource: SettingsWithDefaults['dataSource'] = 'skin-db') {
  if (dataSource === 'fallguys-db') return checkFallguysDb();
  else return checkSkinDb();
}
