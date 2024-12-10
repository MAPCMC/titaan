import * as migration_20241106_110503 from './20241106_110503';
import * as migration_20241210_123024 from './20241210_123024';

export const migrations = [
  {
    up: migration_20241106_110503.up,
    down: migration_20241106_110503.down,
    name: '20241106_110503',
  },
  {
    up: migration_20241210_123024.up,
    down: migration_20241210_123024.down,
    name: '20241210_123024'
  },
];
