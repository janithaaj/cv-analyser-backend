export const paginate = (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};

export const formatResponse = <T>(data: T, message?: string) => {
  return {
    success: true,
    message,
    data
  };
};

export const formatError = (message: string, errors?: any) => {
  return {
    success: false,
    message,
    errors
  };
};

export const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

