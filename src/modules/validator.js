/**
 * implementation email validation
 * @param {string} email - the email
 */
function validateEmail(email) {
  email.classList.remove('auth-reg__input_error');
  document.querySelector('.empty-email').classList.add('invisible');
  document.querySelector('.invalid-email').classList.add('invisible');
  document.querySelector('.occupied-email').classList.add('invisible');

  const regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let isCorrect = (email.value !== '');

  if (!isCorrect) {
    document.querySelector('.empty-email').classList.remove('invisible');
    email.classList.add('auth-reg__input_error');
    return isCorrect;
  }

  isCorrect = regular.test(String(email.value).toLowerCase());

  if (!isCorrect) {
    document.querySelector('.invalid-email').classList.remove('invisible');
    email.classList.add('auth-reg__input_error');
  }

  return isCorrect;
}

/**
 * implementation email validation
 * @param {string} password - the password
 * @param {string} confirmPassword - the confirm password
 */
function validateConfirmPassword(password, confirmPassword) {
  confirmPassword.classList.remove('auth-reg__input_error');
  document.querySelector('.empty-confirm-password').classList.add('invisible');
  document.querySelector('.invalid-confirm-password').classList.add('invisible');

  let isCorrect = (confirmPassword.value !== '');

  if (!isCorrect) {
    document.querySelector('.empty-confirm-password').classList.remove('invisible');
    confirmPassword.classList.add('auth-reg__input_error');
    return isCorrect;
  }

  isCorrect = (password.value === confirmPassword.value);

  if (!isCorrect) {
    document.querySelector('.invalid-confirm-password').classList.remove('invisible');
    confirmPassword.classList.add('auth-reg__input_error');
  }

  return isCorrect;
}

/**
 * implementation email validation
 * @param {string} password - the password
 */
function validatePassword(password) {
  password.classList.remove('auth-reg__input_error');
  document.querySelector('.empty-password').classList.add('invisible');
  document.querySelector('.invalid-password').classList.add('invisible');

  let isCorrect = (password.value !== '');

  if (!isCorrect) {
    document.querySelector('.empty-password').classList.remove('invisible');
    password.classList.add('auth-reg__input_error');
    return isCorrect;
  }

  isCorrect = (password.value.length > 8);

  if (!isCorrect) {
    document.querySelector('.invalid-password').classList.remove('invisible');
    password.classList.add('auth-reg__input_error');
  }

  return isCorrect;
}

/**
 * implementation email validation
 * @param {string} nick - the nickname
 */
function validateNick(nick) {
  nick.classList.remove('auth-reg__input_error');
  document.querySelector('.empty-nick').classList.add('invisible');

  let isCorrect = (nick.value !== '');

  if (!isCorrect) {
    document.querySelector('.empty-nick').classList.remove('invisible');
    nick.classList.add('auth-reg__input_error');
    return isCorrect;
  }

  isCorrect = (nick.value.length > 1);

  if (!isCorrect) {
    document.querySelector('.invalid-nick').classList.remove('invisible');
    nick.classList.add('auth-reg__input_error');
  }

  return isCorrect;
}

export {
  validateEmail, validateNick, validatePassword, validateConfirmPassword,
};
