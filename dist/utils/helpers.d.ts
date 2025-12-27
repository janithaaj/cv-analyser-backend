export declare const paginate: (page: number, limit: number) => {
    skip: number;
    limit: number;
};
export declare const formatResponse: <T>(data: T, message?: string) => {
    success: boolean;
    message: string | undefined;
    data: T;
};
export declare const formatError: (message: string, errors?: any) => {
    success: boolean;
    message: string;
    errors: any;
};
export declare const isValidObjectId: (id: string) => boolean;
//# sourceMappingURL=helpers.d.ts.map