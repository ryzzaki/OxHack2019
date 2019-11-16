import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    password: string;
    certification: string;
}
