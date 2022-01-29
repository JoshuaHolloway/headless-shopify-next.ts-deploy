// merge the configurations

const path = require('path');
const fs = require('fs');
const merge = require('deepmerge');
const prettier = require('prettier');

// ==============================================

const ALLOWED_FW = ['shopify', 'bigcommerce'];

// ==============================================

function withFrameworkConfig(defaultConfig = {}) {
  const framework = defaultConfig?.framework?.name;

  if (!framework) {
    throw new Error('The api framework is missing');
  }

  if (!ALLOWED_FW.includes(framework)) {
    throw new Error('The api framework is invalid');
  }

  // '../shopify/next.config'
  const frameworkNextConfig = require(path.join(
    '../',
    framework,
    'next.config'
  ));

  const config = merge(defaultConfig, frameworkNextConfig);

  // -Import tsconfig.json into this folder:
  //    --/framework/common/shopify/tsconfig.json
  // -Change the 'paths'-property in the ts-config file based on the current configuration.
  const tsPath = path.join(process.cwd(), 'tsconfig.json');
  const tsConfig = require(tsPath);

  tsConfig.compilerOptions.paths['@framework'] = [`framework/${framework}`];
  tsConfig.compilerOptions.paths['@framework/*'] = [`framework/${framework}/*`];

  // -Write (with changes) to file [/tsconfig.json]:
  fs.writeFileSync(
    tsPath,
    prettier.format(JSON.stringify(tsConfig), { parser: 'json' })
  );
  //  --arg 1: Path to file
  //  --arg 2: Value to save

  return config;
}

// ==============================================

module.exports = { withFrameworkConfig };
