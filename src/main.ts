//
// Copyright 2020 DXOS.org
//

import yargs from 'yargs';

import { check } from './commands/check';
import { upgrade, UpgradeOpts } from './commands/upgrade';
import { checkInstalled } from './commands/installed';

// eslint-disable-next-line no-unused-expressions
yargs(process.argv.slice(2))
  .command<{ fix?: boolean }>('$0', 'Check that all packages use same version',
    yargs => yargs
      .alias('f', 'fix')
      .describe('f', 'Fix errors automatically.'),
    argv => {
      check(!!argv.fix);
    }
  )
  .command<{ fix?: boolean }>('installed', 'Check installed node_modules',
    yargs => yargs,
    argv => {
      checkInstalled();
    }
  )
  .command<UpgradeOpts>('upgrade', 'Upgrade to the latest version from NPM',
    yargs => yargs
      .string('scope')
      .describe('scope', 'Upgrade packages only from specific scope')
      .string('package')
      .describe('package', 'Upgrade this package only')
      .boolean('dry-run')
      .describe('dry-run', 'Show what packages would be updated, but don\'t update them')
      .string('preid')
      .describe('preid', 'Upgrade packages to specific preid')
      .boolean('force')
      .describe('force', 'Force upgrade packages even to lower stability level'),
    argv => {
      upgrade(argv);
    }
  )
  .demandCommand(1)
  .argv;
