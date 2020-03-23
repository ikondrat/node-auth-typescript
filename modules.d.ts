declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string;
    TOKEN_SECRET: string;
  }
}
