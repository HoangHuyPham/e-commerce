declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST?: string | undefined
    DB_USER?: string | undefined
    DB_PORT?: string | undefined
    DB_PASSWORD?: string | undefined
    DB_NAME?: string | undefined

    APP_HOST?: string | undefined
    APP_PORT?: string | undefined

    JWT_SECRET_KEY?: string | undefined

    API_SECRET_KEY?: string | undefined;
    API_KEY?: string | undefined;
    CLOUD_NAME?: string | undefined;

    SAVE_PATH?: string | undefined
  }
}