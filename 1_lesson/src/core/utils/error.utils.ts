import { ValidationError } from '../../videos/types/validationError';

export const CreateErrorMessages = (
    errors: ValidationError[],
): { errorMessages: ValidationError[] } => {
    return { errorMessages: errors };
};