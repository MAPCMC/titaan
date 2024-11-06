import * as migration_20241106_110503 from './20241106_110503';

export const migrations = [
  {
    up: migration_20241106_110503.up,
    down: migration_20241106_110503.down,
    name: '20241106_110503'
  },
];
