export interface IUserAtom {
    accountName?: string;
    jwt?: IJwt;
}
export interface IJwt {
    accessToken: string;
    refreshToken: string;
}
