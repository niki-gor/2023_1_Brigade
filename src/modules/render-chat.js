import chat from '../templates/chat.js';

export default (parent, config) => {
	parent.innerHTML = '';

	parent.innerHTML = chat();
}
