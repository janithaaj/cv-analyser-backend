export interface TokenPayload {
    userId: string;
    email: string;
}
export declare const generateTokens: (userId: string, email: string) => {
    accessToken: string;
    refreshToken: string;
};
export declare const verifyToken: (token: string, secret: string) => TokenPayload;
export declare const verifyAccessToken: (token: string) => TokenPayload;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map