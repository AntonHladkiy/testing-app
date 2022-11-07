import { loadAll } from '../config/environment';

export const configModuleConfig = {
  envFilePath: ['.env', '.env.ci'],
  isGlobal: true,
  load: [loadAll],
};
