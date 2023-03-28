export const checkEmail = (email: string) => {
    const isNotEmpty = email.length > 0;
    const hasDog = /@/.test(email);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isNotEmpty) {
        return {
            isError: true,
            errorClass: '.empty-email',
        }
    }

    if (!hasDog) {
        return {
            isError: true,
            errorClass: '.missdog-email',
        }
    }

    if (!isValid) {
        return {
            isError: true,
            errorClass: '.invalid-email',
        }
    }

    return {
        isError: false,
        errorClass: '',
    }
};

// TODO: в будущем для мыла можно сделать такую мегауточняющую хрень
// function validateEmail(email) {
//     const errors = {};
  
//     if (!email) {
//       errors.missing = 'Email address is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       const parts = email.split('@');
//       if (parts.length !== 2) {
//         errors.invalid = 'Invalid email address format';
//       } else {
//         const localPart = parts[0];
//         const domainPart = parts[1];
//         if (!localPart) {
//           errors.invalid = 'Local part of email address is missing';
//         } else if (!domainPart) {
//           errors.invalid = 'Domain part of email address is missing';
//         } else if (localPart.length > 64) {
//           errors.invalid = 'Local part of email address is too long';
//         } else if (domainPart.length > 255) {
//           errors.invalid = 'Domain part of email address is too long';
//         } else if (!/^[a-zA-Z0-9!#$%&'*+/=?^_`~-]+(\.[a-zA-Z0-9!#$%&'*+/=?^_`~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
//             errors.invalid = 'Invalid email address format';
//           }
//         }
//     }
    
//       return errors;
// }

export const checkPassword = (password: string) => {
    const isNotEmpty = password.length > 0;
    // TODO: на будущее
    // const hasNumber = /\d/.test(email);
    // const hasUpperCase = /[A-Z]/.test(email);
    // const hasLowerCase = /[a-z]/.test(email);
    const hasValidLength = password.length >= 8;

    if (!isNotEmpty) {
        return { 
            isError: true,
            errorClass: '.empty-password', 
        };
    }

    if (!hasValidLength) {
        return { 
            isError: true,
            errorClass: '.invalid-password',
        };
    }

    return {
        isError: false,
        errorClass: '',
    };
};

export const checkConfirmPassword = (password: string, confirmPassword: string) => {
    const isNotEmpty = confirmPassword.length > 0;
    const isEqualPassword = confirmPassword === password;
    
    if (!isNotEmpty) {
        return {
            isError: true,
            errorClass: '.empty-confirm-password',
        };
    }

    if (!isEqualPassword) {
        return {
            isError: true,
            errorClass: '.invalid-confirm-password',
        };
    }

    return {
        isError: false,
        errorClass: '',
    }
    
};

export const checkUsername = (username: string) => {
    const isNotEmpty = username.length > 0;
    const hasValidLength = username.length > 1;

    if (!isNotEmpty) {
        return {
            isError: true,
            errorClass: '.empty-nick',
        };
    }

    if (!hasValidLength) {
        return {
            isError: true,
            errorClass: '.invalid-nick',
        };
    }

    return {
        isError: false,
        errorClass: '',
    }
};

export const addErrorToClass = (classToRemoveInvisible: string, classesToAddInvisible: string[]) => {
    classesToAddInvisible.forEach((curClass) => {
        document.querySelector(curClass)?.classList.add('invisible');
    });

    if (classToRemoveInvisible) document.querySelector(classToRemoveInvisible)?.classList.remove('invisible');
}

export const checkNickname = (nickname: string) => {
    // TODO: здесь нужно делать заспрос на бэк
};

// const forbiddenCharacters = {
//     email: ' ;\\":/?!\'',
//     nickname: '',
//     password: '',
// };

// export class ValidationError {
//     #email;

//     #password;

//     #confirmPassword;

//     #username;

//     #validStatus;

//     // eslint-disable-next-line class-methods-use-this
//     #addError(errorClass, deletedClasses) {
//         deletedClasses.forEach((curClass) => {
//             document.querySelector(curClass).classList.add('invisible');
//         });
//         if (errorClass) document.querySelector(errorClass).classList.remove('invisible');
//     }

//     constructor(...props) {
//         this.name = 'ValidationError';
//         [this.#email, this.#password, this.#confirmPassword, this.#username] = props;
//     }

//     getMail() {
//         return this.#email;
//     }

//     getUsername() {
//         return this.#username;
//     }

//     getPassword() {
//         return this.#password;
//     }

//     getConfirmPassword() {
//         return this.#confirmPassword;
//     }

//     validate() {
//         this.#validateEmail();
//         this.#validatePassword();
//         this.#validateConfirmPassword();
//         this.#validateNick();
//     }

//     isValid() {
//         return this.#validStatus;
//     }

//     /**
//      * implementation email validation
//      * @param {string} email - the email
//      */
//     #validateEmail() {
//         const errorTypes = ['.empty-email', '.missdog-email', '.invalid-email', '.occupied-email'];

//         this.#email.addEventListener('input', () => {
//             this.#email.classList.remove('login-reg__input_error');
//             this.#addError('', errorTypes);

//             this.#validStatus = (this.#email.value !== '');

//             if (!this.#validStatus) {
//                 this.#addError('.empty-email', errorTypes);
//                 this.#email.classList.add('login-reg__input_error');
//                 return;
//             }

//             const inputValue = String(this.#email.value);

//             if (!(inputValue.includes('@mail.ru') || inputValue.includes('@yandex.ru') || inputValue.includes('@gmail.com'))) {
//                 this.#addError('.missdog-email', errorTypes);
//                 this.#email.classList.add('login-reg__input_error');
//                 this.#validStatus = false;
//                 return;
//             }

//             this.#validStatus = String(this.#email.value).split('').every((curSymbol) => !forbiddenCharacters.email.split('').includes(curSymbol));

//             if (!this.#validStatus) {
//                 this.#addError('.invalid-email', errorTypes);
//                 this.#email.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = true;
//         });
//     }

//     /**
//      * implementation email validation
//      * @param {Object} password - the password html element
//      */
//     #validatePassword() {
//         const errorTypes = ['.empty-password', '.invalid-password'];

//         this.#password.addEventListener('input', () => {
//             this.#password.classList.remove('login-reg__input_error');
//             this.#addError('', errorTypes);

//             this.#validStatus = (this.#password.value !== '');

//             if (!this.#validStatus) {
//                 this.#addError('.empty-password', errorTypes);
//                 this.#password.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = (this.#password.value.length > 8);

//             if (!this.#validStatus) {
//                 this.#addError('.invalid-password', errorTypes);
//                 this.#password.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = true;
//         });
//     }

//     /**
//      * implementation email validation
//      * @param {Object} password - the password
//      * @param {Object} confirmPassword - the confirm password
//      */
//     #validateConfirmPassword() {
//         const errorTypes = ['.empty-confirm-password', '.invalid-confirm-password'];

//         this.confirmPassword?.addEventListener('input', () => {
//             this.#confirmPassword.classList.remove('login-reg__input_error');
//             this.#addError('', errorTypes);

//             this.#validStatus = (this.#confirmPassword.value !== '');

//             if (!this.#validStatus) {
//                 this.#addError('.empty-confirm-password', errorTypes);
//                 this.#confirmPassword.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = (
//                 String(this.password.value) === String(this.#confirmPassword.value)
//             );

//             if (!this.#validStatus) {
//                 this.#addError('.invalid-confirm-password', errorTypes);
//                 this.#confirmPassword.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = true;
//         });
//     }

//     /**
//      * implementation email validation
//      * @param {Object} nick - the nickname
//      */
//     #validateNick() {
//         const errorTypes = ['.empty-nick', '.invalid-nick'];

//         this.#username?.addEventListener('input', () => {
//             this.#username.classList.remove('login-reg__input_error');
//             this.#addError('', errorTypes);

//             this.#validStatus = (this.#username.value !== '');

//             if (!this.#validStatus) {
//                 this.#addError('.empty-nick', errorTypes);
//                 this.#username.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = (this.#username.value.length > 1);

//             if (!this.#validStatus) {
//                 this.#addError('.invalid-nick', errorTypes);
//                 this.#username.classList.add('login-reg__input_error');
//                 return;
//             }

//             this.#validStatus = true;
//         });
//     }
// }
