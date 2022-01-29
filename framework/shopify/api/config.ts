import { ApiConfig } from '@common/types/api';
import { fetchApi } from '../utils';

// ==============================================

class Config {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  getConfig(): ApiConfig {
    return this.config;
  }
}

// ==============================================

const api_config: ApiConfig = {
  apiUrl: `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/graphql.json`,
  fetch: fetchApi,
};

const configWrapper = new Config(api_config);

// ==============================================

export function getConfig() {
  return configWrapper.getConfig();
}
