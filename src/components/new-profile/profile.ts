import { nicknameErrorTypes } from '@/config/errors';
import { Component } from '@/framework/component';
import { store } from '@/store/store';
import { Avatar } from '@/uikit/avatar/avatar';
import { Button } from '@/uikit/button/button';
import { Form } from '@/uikit/form/form';
import { Img } from '@/uikit/img/img';
import { Input } from '@/uikit/input/input';
import { List } from '@/uikit/list/list';
import template from '@components/new-profile/profile.pug';
import '@components/profile/profile.scss';
import { Header } from '@uikit/header/header';

interface Props {
    parent?: HTMLElement;
    style?: Record<string, string | number>;
    onClick?: (e?: Event) => void;
}

interface State {
    isMounted: boolean;
    parent?: HTMLElement | undefined;
    header?: Header;
    avatar?: Avatar;
    form?: Form;
    name?: Input;
    nickname?: Input;
    status?: Input;
    btnList?: List;
    cancelBtn?: Button;
    saveBtn?: Button;
}

export class DumbProfile extends Component<Props, State, HTMLElement> {
    constructor(props: Props) {
        super(props);
        console.log('DumbProfile has been called: ');

        this.state.isMounted = false;
        this.headerText = document.createElement('span');
        this.headerText.classList.add('.header__title');
        this.headerText.textContent = 'Редактирование профиля';

        if (this.props.parent) {
            this.node = this.render() as HTMLElement;
            this.props.parent.appendChild(this.node);
            this.componentDidMount();
            this.update.bind(this);
        }
    }

    private headerText: HTMLElement;

    destroy() {
        if (this.state.isMounted) {
            this.componentWillUnmount();
            this.node?.remove();
            this.node = undefined;
        } else {
            console.error('Profile is not mounted');
        }
    }

    update() {
        if (this.state.isMounted) {
            const prevNode = this.node;

            this.componentWillUnmount();
            this.node = this.render() as HTMLElement;
            this.componentDidMount();

            prevNode?.replaceWith(this.node);
        } else {
            console.error('Profile is not mounted');
        }
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

        this.state.header = new Header({
            parent: this.node,
            className: 'header-profile',
        });

        document.querySelector('.header-profile')?.appendChild(this.headerText);

        this.state.avatar = new Avatar({
            parent: document.querySelector('.profile') as HTMLElement,
            className: '',
            src: 'this.props.user.avatar',
            alt: '',
            caption: ``,
            captionStyle: '',
            captionBlockStyle: '',
        })

        this.state.form = new Form({
            parent: document.querySelector('.profile') as HTMLElement,
            className: 'profile__form',
        });

        this.state.name = new Input({
            parent: document.querySelector('.profile__form') as HTMLElement,
            className: 'input-container',
            placeholder: 'username',
            uniqClassName: 'username',
        });

        this.state.nickname = new Input({
            parent: document.querySelector('.profile__form') as HTMLElement,
            className: 'input-container',
            placeholder: 'nickname',
            uniqClassName: 'nickname',
            errors: nicknameErrorTypes,
        });

        this.state.status = new Input({
            parent: document.querySelector('.profile__form') as HTMLElement,
            className: 'input-container',
            placeholder: 'status',
            uniqClassName: 'status',
        });

        this.state.btnList = new List({
            parent: document.querySelector('.profile__form') as HTMLElement,
            className: 'profile__form__list',
        })

        this.state.cancelBtn = new Button({
            parent: document.querySelector('.profile__form__list') as HTMLElement,
            label: 'Отмена',
            className: 'form__list__btn cancel-btn',
        });

        this.state.saveBtn = new Button({
            parent: document.querySelector('.profile__form__list') as HTMLElement,
            label: 'Сохранить',
            className: 'form__list__btn save-btn',
        });

        this.unsubscribe = store.subscribe(this.constructor.name, (state) => {
            const prevProps = this.props; // TODO: prev props хранить в приватном поле класса компонеты

            if (this.props !== prevProps) {
                this.update();
            }
        });

        this.state.isMounted = true;
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        this.headerText.remove();
        this.state.header?.destroy();
        this.state.avatar?.destroy();
        this.state.saveBtn?.destroy();
        this.state.cancelBtn?.destroy();
        this.state.btnList?.destroy();
        this.state.name?.destroy();
        this.state.nickname?.destroy();
        this.state.status?.destroy();
        this.state.form?.destroy();
    }

    private render() {
        return new DOMParser().parseFromString(template({}), 'text/html').body
            .firstChild;
    }
}
