const forbiddenCharacters = {
    email: ' ;:/?!',
    nickname: '',
    password: '',
};

// TODO: сделать класс валидации
// class ValidationError extends Error {
//     constructor(message) {
//         super(message);
//         this.name = 'ValidationError';
//     }
// }

/**
 * implementation email validation
 * @param {string} email - the email
 */
function validateEmail(email) {
    let isCorrect;

    email.addEventListener('input', () => {
        email.classList.remove('login-reg__input_error');
        document.querySelector('.empty-email').classList.add('invisible');
        document.querySelector('.missdog-email').classList.add('invisible');
        document.querySelector('.invalid-email').classList.add('invisible');
        document.querySelector('.occupied-email').classList.add('invisible');
        isCorrect = (email.value !== '');

        if (!isCorrect) {
            document.querySelector('.empty-email').classList.remove('invisible');
            email.classList.add('login-reg__input_error');
        }

        isCorrect = email.value.includes('@');
        if (!isCorrect) {
            document.querySelector('.missdog-email').classList.remove('invisible');
            email.classList.add('login-reg__input_error');
        }

        isCorrect = String(email.value).split('').every((curSymbol) => !forbiddenCharacters.email.split('').includes(curSymbol));

        if (!isCorrect) {
            document.querySelector('.invalid-email').classList.remove('invisible');
            email.classList.add('login-reg__input_error');
        }
    });

    return isCorrect;
}

/**
 * implementation email validation
 * @param {string} password - the password
 * @param {string} confirmPassword - the confirm password
 */
function validateConfirmPassword(password, confirmPassword) {
    confirmPassword.classList.remove('login-reg__input_error');
    document.querySelector('.empty-confirm-password').classList.add('invisible');
    document.querySelector('.invalid-confirm-password').classList.add('invisible');

    let isCorrect = (confirmPassword.value !== '');

    if (!isCorrect) {
        document.querySelector('.empty-confirm-password').classList.remove('invisible');
        confirmPassword.classList.add('login-reg__input_error');
        return isCorrect;
    }

    isCorrect = (password.value === confirmPassword.value);

    if (!isCorrect) {
        document.querySelector('.invalid-confirm-password').classList.remove('invisible');
        confirmPassword.classList.add('login-reg__input_error');
    }

    return isCorrect;
}

/**
 * implementation email validation
 * @param {string} password - the password
 */
function validatePassword(password) {
    password.classList.remove('login-reg__input_error');
    document.querySelector('.empty-password').classList.add('invisible');
    document.querySelector('.invalid-password').classList.add('invisible');

    let isCorrect = (password.value !== '');

    if (!isCorrect) {
        document.querySelector('.empty-password').classList.remove('invisible');
        password.classList.add('login-reg__input_error');
        return isCorrect;
    }

    isCorrect = (password.value.length > 8);

    if (!isCorrect) {
        document.querySelector('.invalid-password').classList.remove('invisible');
        password.classList.add('login-reg__input_error');
    }

    return isCorrect;
}

/**
 * implementation email validation
 * @param {string} nick - the nickname
 */
function validateNick(nick) {
    nick.classList.remove('login-reg__input_error');
    document.querySelector('.empty-nick').classList.add('invisible');

    let isCorrect = (nick.value !== '');

    if (!isCorrect) {
        document.querySelector('.empty-nick').classList.remove('invisible');
        nick.classList.add('login-reg__input_error');
        return isCorrect;
    }

    isCorrect = (nick.value.length > 1);

    if (!isCorrect) {
        document.querySelector('.invalid-nick').classList.remove('invisible');
        nick.classList.add('login-reg__input_error');
    }

    return isCorrect;
}

export {
    validateEmail, validateNick, validatePassword, validateConfirmPassword,
};
