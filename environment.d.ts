declare namespace NodeJS {
    export interface ProcessEnv {
      readonly NEXT_PUBLIC_API_URL: string;
      readonly NEXT_PUBLIC_ETHEREUM_NETWORK_ID: string;
    }
}