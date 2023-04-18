/* eslint-disable prettier/prettier */
export const dbUrlPcAndroid = 'http://192.168.0.4:3000/clients';
export const dbUrlPcIos = 'http://localhost:3000/clients';
export type Client = {
    id: number;
    name: string;
    phone: string;
    email: string;
    company: string;
}
