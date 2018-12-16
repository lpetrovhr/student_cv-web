import { SubmissionError } from 'redux-form/immutable';

export default function parseErrors(error) {
    const errors = { _error: error.data.error };
    if (error.debugInfo) {
        error.debugInfo.forEach((info) => {
            errors[info.path] = info.message;
        });
    }
    return new SubmissionError(errors);
}
