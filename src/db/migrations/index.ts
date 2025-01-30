import * as migration_20241106_110503 from './20241106_110503';
import * as migration_20241210_123024 from './20241210_123024';
import * as migration_20250128_120859 from './20250128_120859';
import * as migration_20250130_185104 from './20250130_185104';

export const migrations = [
  {
    up: migration_20241106_110503.up,
    down: migration_20241106_110503.down,
    name: '20241106_110503',
  },
  {
    up: migration_20241210_123024.up,
    down: migration_20241210_123024.down,
    name: '20241210_123024',
  },
  {
    up: migration_20250128_120859.up,
    down: migration_20250128_120859.down,
    name: '20250128_120859',
  },
  {
    up: migration_20250130_185104.up,
    down: migration_20250130_185104.down,
    name: '20250130_185104'
  },
];
