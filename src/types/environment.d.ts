export {};

declare global {
    namespace NodeJs {
        interface ProcessEnv {
            PGUSER: string;
            PGHOST: string;
            PGDATBASE: string;
            PGPASSWORD: string;
            PGPORT?: number;
            SECRET_TOKEN: string;
        }
    }
}