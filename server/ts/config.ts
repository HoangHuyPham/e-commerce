namespace config{
    export enum db{
        HOST = 'localhost',
        USER = 'root',
        PORT = 3306,
        PASSWORD = '',
        DATABASE_NAME = 'ecommerce',
        WAITFORCONNECTIONS= 1,  // 1 = true, 0 = false
        CONNECTIONLIMIT= 10,
    }
}

export default config