import * as migration_20241106_072326 from './20241106_072326';
import * as migration_20241106_103712 from './20241106_103712';

export const migrations = [
  {
    up: migration_20241106_072326.up,
    down: migration_20241106_072326.down,
    name: '20241106_072326',
  },
  {
    up: migration_20241106_103712.up,
    down: migration_20241106_103712.down,
    name: '20241106_103712'
  },
];
