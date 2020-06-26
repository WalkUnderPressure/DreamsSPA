import ServerResponse from 'Templates/ServerResponse';
import { METHODS } from 'COMMON';
import { xRead } from 'src';
import { Dispatch } from 'redux';

export const required = (value: any) => {
    return value ? undefined : 'Value is required';
}

export const maxLength = (max: number) => (value: string) => {
    return value && value.length > max ? `Must be ${max} characters or less` : undefined;
}

export const minLength = (min: number) => (value: string) => {
    return value && value.length < min ? `Must be ${min} characters or more` : undefined;
}

export const correctEmail = (email: string) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ? "Invalid email address" : undefined;
}

export const checkPasswords = (value: string, allValues: any) => {
    return value !== allValues.password ? 'Password mismatch' : undefined
}

export const asyncValidate = (values: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const email = values.email;
        const url = '/api/auth/checkEmail';
        xRead(url, { email }, METHODS.POST)
            .then(resp => {
                const answer: ServerResponse = resp;

                if (answer.error) {
                    reject({ email: answer.message });
                } else {
                    resolve()
                }
            })
    })
}
