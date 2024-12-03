import * as migration_20241106_110503 from './20241106_110503';
import * as migration_20241203_114243 from './20241203_114243';

export const migrations = [
  {
    up: migration_20241106_110503.up,
    down: migration_20241106_110503.down,
    name: '20241106_110503',
  },
  {
    up: migration_20241203_114243.up,
    down: migration_20241203_114243.down,
    name: '20241203_114243'
  },
];
