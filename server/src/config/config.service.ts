import { config } from 'dotenv';

config();

class ConfigService {
  constructor(private env: { [K: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getJwtSecret(): string {
    return this.getValue('JWT_SECRET');
  }

  public getMongoConnection(): string {
    return `mongodb+srv://${this.getValue('MONGO_USER')}:${this.getValue(
      'MONGO_PASSWORD',
    )}@${this.getValue('MONGO_HOST')}/${this.getValue(
      'MONGO_DATABASE',
    )}?retryWrites=true&w=majority`;
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'MONGO_HOST',
  'MONGO_USER',
  'MONGO_PASSWORD',
  'MONGO_DATABASE',
]);

export { configService };
