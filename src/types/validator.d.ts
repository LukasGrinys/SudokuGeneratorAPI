export type TValueValidator<P> = (parameter: P) => {
    isValid: boolean;
    message?: string;
};
