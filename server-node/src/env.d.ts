declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    REDIS_HOSTNAME: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
  }
}
