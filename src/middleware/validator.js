import validator from 'validator';
import { ERROR_MSG } from '../constants/errors';

export const isEqual = (value, comparison) =>
    validator.equals(String(value), String(comparison));

export function isRequired(value, language) {
    return value !== undefined ? null : ERROR_MSG[language].REQUIRED_MSG;
}

export function isEmail(value, language) {
    return validator.isEmail(String(value)) ? null :
        ERROR_MSG[language].EMAIL_MSG;
}

export function isPassword(value, language) {
    return value.length >= 8 && (/[A-Z]/).test(value) && (/[a-z]/).test(value) &&
        (/[0-9]/).test(value) ? null : ERROR_MSG[language].PASSWORD_MSG;
}

export function isSamePassword(value, comparison, language) {
    return isEqual(String(value), String(comparison)) ? null :
        ERROR_MSG[language].CONFIRM_PASSWORD_MSG;
}

export function isUsedEmail(newEmail, oldEmail, shouldBeUsed, language) {
    const isEql = isEqual(newEmail, oldEmail);
    if (shouldBeUsed) {
        return isEql ? null : ERROR_MSG[language].NOT_USED_EMAIL_MSG;
    }
    return isEql ? ERROR_MSG[language].USED_EMAIL_MSG : null;
}

export function isIndetificationNumber(identificationNumber, language) {
    return identificationNumber.length == 11 && (/[0-9]/).test(identificationNumber) ? null : ERROR_MSG[language].PID_NUMBER;
}
