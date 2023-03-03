import auth from './templates/auth.js';
import reg from './templates/reg.js';
import validate from './validate.js'

const rootAppObject = document.querySelector('#root');

rootAppObject.innerHTML = reg();

validate();
