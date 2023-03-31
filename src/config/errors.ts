export const emailErrorTypes : ErrorTypes[] = [
    {
        param: 'emptyEmail',
        class: 'empty-email',
        message: 'Почта не может быть пустой',
    }, 
    {
        param: 'invalidEmail',
        class: 'invalid-email',
        message: 'Почта невалидна',
    },
    {
        param: 'occupiedEmail',
        class: 'occupied-email',
        message: 'Почта уже зарегистрирована',
    }, 
    {
        param: 'missdogEmail',
        class: 'missdog-email',
        message: 'Пропущен знак @',
    },
];

export const passwordErrorTypes : ErrorTypes[] = [
    {
        param: 'emptyPassword',
        class: 'empty-password',
        message: 'Пароль не может быть пустым',
    }, 
    {
        param: 'invalidPassword',
        class: 'invalid-password',
        message: 'Пароль должен быть длиннее 8 символов',
    },
];

export const confirmPasswordErrorTypes : ErrorTypes[] = [
    {
        param: 'emptyConfirmPassword',
        class: 'empty-confirm-password',
        message: 'Пароль не может быть пустым',
    },
    {
        param: 'invalidConfirmPassword',
        class: 'invalid-confirm-password',
        message: 'Подтверждение не равно паролю',
    },
];

export const newPasswordErrorTypes : ErrorTypes[] = [
    {
        param: 'emptyNewPassword',
        class: 'empty-new-password',
        message: 'Пароль не может быть пустым',
    }, 
    {
        param: 'invalidNewPassword',
        class: 'invalid-new-password',
        message: 'Пароль должен быть длиннее 8 символов',
    },
];

export const nicknameErrorTypes : ErrorTypes[] = [
    {
        param: 'emptyNickname',
        class: 'empty-nickname',
        message: 'Никнейм не может быть пустым',
    },
    {
        param: 'invalidNickname',
        class: 'invalid-nickname',
        message: 'Никнейм должен быть длиннее двух символов' 
    },
];

export const usernameErrorTypes : ErrorTypes[] = [
    {
        param: 'occupiedUsername',
        class: 'occupied-username',
        message: 'Имя пользователя уже занято',
    },
];
