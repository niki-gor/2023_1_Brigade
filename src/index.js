import * as auth from './templates/auth.js';

const rootAppObject = document.querySelector('#root');

rootAppObject.innerHTML = auth.template();

console.log(auth.template());
