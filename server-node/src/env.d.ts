declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: number;
    REDIS_HOSTNAME: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    CORS_ORIGIN: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
    JWT_SECRET: string;
    URL: string;
    FE_URL: string;
  }
}
