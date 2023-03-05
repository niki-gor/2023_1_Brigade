import chat from '../templates/chat.js';
import { post } from './ajax.js';

export default (parent, config) => {
	parent.innerHTML = '';
	parent.innerHTML = chat();

	document.querySelector(".logout").addEventListener('click', (e) => {
		e.preventDefault();

		// TODO: POST

		config.auth.render(parent, config);
	});
}
