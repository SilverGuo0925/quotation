export class User {
    id: number;
    loginId: string;
    firstName: string;
    lastName: string;
    lastLoginDate: string;
    token: string;
    autoLogin: boolean;
    permissions: [];
    resourcesIds: [];
}