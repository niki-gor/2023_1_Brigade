(function() {
  class Validator {
    validateEmail(email) {
      const regular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
      let message = 'correct email';
      let isCorrect = (email.value !== '');
    
      if (!isCorrect) {
        email.classList.add('auth-reg__input_error');
        message = 'email not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      isCorrect = regular.test(String(email.value).toLowerCase());
    
      if (!isCorrect) {
        email.classList.add('auth-reg__input_error');
        message = 'email not correct';
      }
    
      return { isCorrect: isCorrect, message: message };
    }
    
    validateConfirmPassword(password, confirmPassword) {
      let message = 'correct confirm password';
      let isCorrect = (confirmPassword.value !== '');
    
      if (!isCorrect) {
        confirmPassword.classList.add('auth-reg__input_error');
        message = 'confirmPassword not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      isCorrect = (password.value === confirmPassword.value);
    
      if (!isCorrect) {
        confirmPassword.classList.add('auth-reg__input_error');
        message = 'confirmPassword not correct';
      }
    
      return { isCorrect: isCorrect, message: message };
    }
    
    validatePassword(password) {
      let message = 'correct password';
      let isCorrect = (password.value !== '');
    
      if (!isCorrect) {
        password.classList.add('auth-reg__input_error');
        message = 'password not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      isCorrect = (password.value.length > 8);
    
      if (!isCorrect) {
        password.classList.add('auth-reg__input_error');
        message = 'password too short';
      }
    
      return { isCorrect: isCorrect, message: message };
    }
    
    validateNick(nick) {
      let message = 'correct nick';
      let isCorrect = (nick.value !== '');
    
      if (!isCorrect) {
        nick.classList.add('auth-reg__input_error');
        message = 'password not filled';
        return { isCorrect: isCorrect, message: message };
      }
    
      return { isCorrect: isCorrect, message: message };
    }
  }
  
  window.Validator = new Validator();  
})();
