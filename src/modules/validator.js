(function() {
  class Validator {
    validateEmail(email) {
      email.classList.remove('auth-reg__input_error');
      document.querySelector('.empty-email').classList.add('invisible');
      document.querySelector('.invalid-email').classList.add('invisible');

      const regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      let message = 'correct email';
      let isCorrect = (email.value !== '');
    
      if (!isCorrect) {
        document.querySelector('.empty-email').classList.remove('invisible');
        email.classList.add('auth-reg__input_error');
        message = 'email not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      isCorrect = regular.test(String(email.value).toLowerCase());
    
      if (!isCorrect) {
        document.querySelector('.invalid-email').classList.remove('invisible');
        email.classList.add('auth-reg__input_error');
        message = 'email not correct';
      }
    
      return { isCorrect: isCorrect, message: message };
    }
    
    validateConfirmPassword(password, confirmPassword) {
      confirmPassword.classList.remove('auth-reg__input_error');
      document.querySelector('.empty-confirm-password').classList.add('invisible');
      document.querySelector('.invalid-confirm-password').classList.add('invisible');

      let message = 'correct confirm password';
      let isCorrect = (confirmPassword.value !== '');
    
      if (!isCorrect) {
        document.querySelector('.empty-confirm-password').classList.remove('invisible');
        confirmPassword.classList.add('auth-reg__input_error');
        message = 'confirmPassword not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      isCorrect = (password.value === confirmPassword.value);
    
      if (!isCorrect) {
        document.querySelector('.invalid-confirm-password').classList.remove('invisible');
        confirmPassword.classList.add('auth-reg__input_error');
        message = 'confirmPassword not correct';
      }
    
      return { isCorrect: isCorrect, message: message };
    }
    
    validatePassword(password) {
      password.classList.remove('auth-reg__input_error');
      document.querySelector('.empty-password').classList.add('invisible');
      document.querySelector('.invalid-password').classList.add('invisible');

      let message = 'correct password';
      let isCorrect = (password.value !== '');
    
      if (!isCorrect) {
        document.querySelector('.empty-password').classList.remove('invisible');
        password.classList.add('auth-reg__input_error');
        message = 'password not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      isCorrect = (password.value.length > 8);
    
      if (!isCorrect) {
        document.querySelector('.invalid-password').classList.remove('invisible');
        password.classList.add('auth-reg__input_error');
        message = 'password too short';
      }
    
      return { isCorrect: isCorrect, message: message };
    }
    
    validateNick(nick) {
      nick.classList.remove('auth-reg__input_error');
      document.querySelector('.empty-nick').classList.add('invisible');

      let message = 'correct nick';
      let isCorrect = (nick.value !== '');
    
      if (!isCorrect) {
        document.querySelector('.empty-nick').classList.remove('invisible');
        nick.classList.add('auth-reg__input_error');
        message = 'password not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      return { isCorrect: isCorrect, message: message };
    }
  }
  
  window.Validator = new Validator();  
})();
