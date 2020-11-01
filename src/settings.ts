export interface Settings {
  //// SETUP ////

  /**
   * Matrix Homeserver
   *  Eg. "https://matrix-federation.matrix.org"
   */
  homeserverUrl: string;
  /**
   * Access Token of the bot account
   *   See https://t2bot.io/docs/access_tokens/ for a simple way to generate
   */
  accessToken: string;
  /**
   * File used as temporary storage by the bot
   *   Defaults to `bot-storage.json`
   */
  storageFile?: string;

  //// OPERATIONS ////

  /**
   * Dry run indicates that no messages will be sent to Matrix
   *   Defaults to `false`
   */
  dryRun?: boolean;
  /**
   * Frequency of the bot polling Strava's API (in seconds)
   */
  pollFrequency: number;
  /**
   * Source of fall guys featured shop items data
   *   Defaults to `skin-db`
   */
  dataSource?: 'skin-db' | 'fallguys-db'
  /**
   * Should the bot auto accept invites to rooms?
   *    (Probably not if you want your Strava Club private)
   *   Defaults to `false`
   */
  autoJoin?: boolean;

  //// CUSTOMIZATION ////

  /**
   * Include emoji's in the shop featured items message
   *   Defaults to `false`
   */
  emoji?: boolean;
  /**
   * Optional Message outputted on bot startup and joining rooms
   */
  onBotJoinRoomMessage: string | undefined;
  /**
   * Include links to shop featured items
   *   Defaults to `false`
   */
  itemLink?: boolean;

}

export type SettingsWithDefaults = Required<Settings>;
