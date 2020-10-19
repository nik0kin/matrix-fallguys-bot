/* eslint-disable no-console */
import { checkDatabase } from './db';

checkDatabase()
  .then((resp) => {
    console.log('test response: ', resp);
  }, (error) => {
    console.error('test error: ', error);
  });
