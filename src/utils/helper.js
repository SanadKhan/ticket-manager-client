export const validateEmail = (rule, value) => {
    // Regular expression to validate email format with .com and .in domains
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/;

    if (value && !emailRegex.test(value)) {
        return Promise.reject('Please enter a valid email address with .com or .in domain.');
    }
    return Promise.resolve();
};

export const passwordValidator = (_, value) => {
    if (value) {
        if (value.length >= 6) {
            return Promise.resolve();
        }
    }
    return Promise.reject(
        new Error("Password must be atleast 6 chars")
    )
}

export const textFieldValidator = (_, value ) => {
    if (value) {
        if (value.length >= 3) {
            return Promise.resolve();
        }
    }
    return Promise.reject(
        new Error("Must be atleast 3 chars")
    )
}
