export const required = (value) => {
    return value ? undefined : 'Value is required';
} 

export const maxLength = (max) => (value) => {
    return value && value.length > max ? `Must be ${max} characters or less` : undefined;
}

export const minLength = (min) => (value) =>{
    return value && value.length < min ? `Must be ${min} characters or more` : undefined;
}

export const correctEmail = (email) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)? "Invalid email address" : undefined;
}

export const checkPasswords = (value, allValues) => {
    console.log('first -> ', value);
    console.log('second -> ', allValues);
    return value !== allValues.password? 'Password mismatch' : undefined
}

