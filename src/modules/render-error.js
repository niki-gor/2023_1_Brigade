import loadError from '../templates/error.js';

export default (parent, config, prevPage, {name, descr}) => {
    parent.innerHTML = '';
    parent.innerHTML = loadError();
    document.querySelector('.header-error').textContent = name
    document.querySelector('.header-error__descr').textContent = descr

    document.querySelector('.error-back-button').addEventListener('click', (e) => {
        e.preventDefault();
        switch(prevPage) {
            case 'login':
                config.login.render(parent, config)
                break
            case 'reg':
                config.reg.render(parent, config)
                break
            case 'chat':
                config.chat.render(parent, config)
                break
        }
    });
}