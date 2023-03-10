const forbiddenCharacters = {
    email: ' ;\\":/?!\'',
    nickname: '',
    password: '',
};

export default class ValidationError extends Error {
    #email;

    #password;

    #cofirmPassword;

    #username;

    // eslint-disable-next-line class-methods-use-this
    #addError(erorrClass, deletedClasses) {
        deletedClasses.forEach((curClass) => {
            document.querySelector(curClass).classList.add('invisible');
        });
        if (erorrClass) document.querySelector(erorrClass).classList.remove('invisible');
    }

    constructor(message, ...props) {
        super(message);
        this.name = 'ValidationError';
        [this.email, this.password, this.confirmPassword, this.username] = props;
    }

    getMail() {
        return this.#email;
    }

    getUsername() {
        return this.#username;
    }

    getPassword() {
        return this.#password;
    }

    getConfirmPassword() {
        return this.#cofirmPassword;
    }

    /**
     * implementation email validation
     * @param {string} email - the email
     */
    validateEmail() {
        let isCorrect;
        const errorTypes = ['.empty-email', '.missdog-email', '.invalid-email', '.occupied-email'];

        this.email.addEventListener('input', () => {
            this.email.classList.remove('login-reg__input_error');
            this.#addError('', errorTypes);

            isCorrect = (this.email.value !== '');

            if (!isCorrect) {
                this.#addError('.empty-email', errorTypes);
                this.email.classList.add('login-reg__input_error');
                return;
            }

            const inputValue = String(this.email.value);

            if (!isCorrect || !(inputValue.includes('@mail.ru') || inputValue.includes('@yandex.ru') || inputValue.includes('@gmail.com'))) {
                this.#addError('.missdog-email', errorTypes);
                this.email.classList.add('login-reg__input_error');
            }

            isCorrect = String(this.email.value).split('').every((curSymbol) => !forbiddenCharacters.email.split('').includes(curSymbol));

            if (!isCorrect) {
                this.#addError('.invalid-email', errorTypes);
                this.email.classList.add('login-reg__input_error');
            }
        });

        return isCorrect;
    }

    /**
     * implementation email validation
     * @param {Object} password - the password html element
     */
    validatePassword() {
        let isCorrect;

        const errorTypes = ['.empty-password', '.invalid-password'];

        this.password.addEventListener('input', () => {
            this.password.classList.remove('login-reg__input_error');
            this.#addError('', errorTypes);

            isCorrect = (this.password.value !== '');

            if (!isCorrect) {
                this.#addError('.empty-password', errorTypes);
                this.password.classList.add('login-reg__input_error');
                return;
            }

            isCorrect = (this.password.value.length > 8);

            if (!isCorrect) {
                this.#addError('.invalid-password', errorTypes);
                this.password.classList.add('login-reg__input_error');
            }
        });

        return isCorrect;
    }

    /**
     * implementation email validation
     * @param {Object} password - the password
     * @param {Object} confirmPassword - the confirm password
     */
    validateConfirmPassword() {
        let isCorrect;

        const errorTypes = ['.empty-confirm-password', '.invalid-confirm-password'];

        this.confirmPassword.addEventListener('input', () => {
            this.confirmPassword.classList.remove('login-reg__input_error');
            this.#addError('', errorTypes);

            isCorrect = (this.confirmPassword.value !== '');

            if (!isCorrect) {
                this.#addError('.empty-confirm-password', errorTypes);
                this.confirmPassword.classList.add('login-reg__input_error');
                return;
            }

            isCorrect = (String(this.password.value) === String(this.confirmPassword.value));

            if (!isCorrect) {
                this.#addError('.invalid-confirm-password', errorTypes);
                this.confirmPassword.classList.add('login-reg__input_error');
            }
        });

        return isCorrect;
    }

    /**
     * implementation email validation
     * @param {Object} nick - the nickname
     */
    validateNick() {
        let isCorrect;

        const errorTypes = ['.empty-nick', '.invalid-nick'];

        this.username.addEventListener('input', () => {
            this.username.classList.remove('login-reg__input_error');
            this.#addError('', errorTypes);

            isCorrect = (this.username.value !== '');

            if (!isCorrect) {
                this.#addError('.empty-nick', errorTypes);
                this.username.classList.add('login-reg__input_error');
                return;
            }

            isCorrect = (this.username.value.length > 1);

            if (!isCorrect) {
                this.#addError('.invalid-nick', errorTypes);
                this.username.classList.add('login-reg__input_error');
            }
        });

        return isCorrect;
    }
}
