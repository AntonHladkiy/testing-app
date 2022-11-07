import { ConfigService } from '@nestjs/config';

export function getMongooseUriFromConfig(configService: ConfigService): string {
  const protocol = configService.get<string>('db.protocol');
  const host = configService.get<string>('db.host');
  const port = configService.get<string>('db.port');
  const dbName = configService.get<string>('db.dbname');
  const username = configService.get<string>('db.username');
  const password = configService.get<string>('db.password');

  return `${protocol}://${username}:${password}@${host}:${port}/${dbName}?authSource=admin&directConnection=true`;
}
