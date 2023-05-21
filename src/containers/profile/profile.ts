import { Component } from '@framework/component';
import { DumbProfile } from '@components/new-profile/profile';
import {
    checkPassword,
    checkNickname,
    addErrorToClass,
    checkNewPassword,
} from '@utils/validator';
import { store } from '@store/store';
import {
    passwordErrorTypes,
    usernameErrorTypes,
    nicknameErrorTypes,
    newPasswordErrorTypes,
} from '@config/errors';
import {
    createIncorrectPasswordAction,
    createOccupiedUsernameAction,
    createUpdateUserAction,
    createUpdateUserAvatarAction,
} from '@actions/userActions';
import { createRenderAction } from '@actions/routeActions';
import { DYNAMIC } from '@config/config';

interface Props {
    parent: HTMLElement;
}

interface State {
    isMounted: boolean;
    node?: DumbProfile;
}

/**
 * Отрисовывает страницу пользователя.
 * Прокидывает actions в стору для изменения данных о пользователе
 */
export class SmartProfile extends Component<Props, State> {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: Props) {
        super(props);
        this.state.isMounted = false;
        this.profile = null;

        this.node = this.render() as HTMLElement;
        this.componentDidMount();

        console.log('Profile constructor has been called');
    }

    private profile: DumbProfile | null;
    private image: File | undefined;

    destroy() {
        if (this.state.isMounted) {
            this.componentWillUnmount();
            // this.node?.remove();
            // this.node = undefined;
        } else {
            console.error('SmartProfile is not mounted');
        }
    }

    render() {
        return this.props.parent;
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.node) {
            return;
        }

        this.state.node = new DumbProfile({
            parent: this.node,
        });
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        if (this.profile) {
            this.profile?.destroy();
        }
        
        this.state.isMounted = false;
    }

    /**
     * Обрабатывает нажатие кнопки аватарки
     */
    // handleClickAvatar() {
    //     const input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = '.jpg' && '.png' && '.svg';

    //     input.addEventListener('change', () => {
    //         this.image = input?.files?.[0];
    //         if (this.image) {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(this.image);
    //             reader.onload = () => {
    //                 const imageUrl = reader.result;
    //                 const avatar = document.querySelector(
    //                     '.profile__avatar'
    //                 ) as HTMLImageElement;
    //                 avatar.src = imageUrl as string;
    //             };
    //         }
    //     });

    //     input.click();
    // }

    // /**
    //  * Обрабатывает нажатие кнопки логина
    //  */
    // handleClickSave() {
    //     if (this.state.valid.isValid()) {
    //         const user = {
    //             username: this.state.domElements.username?.value.slice(1),
    //             nickname: this.state.domElements.nickname?.value,
    //             status: this.state.domElements.status?.value,
    //             current_password:
    //                 this.state.domElements.current_password?.value,
    //             new_password: this.state.domElements.new_password?.value,
    //         } as Record<string, unknown>;

    //         store.dispatch(createUpdateUserAction(user));
    //         store.dispatch(createUpdateUserAvatarAction(this.#image));
    //     } else {
    //         this.validateCurrentPassword();
    //         this.validateNewPassword();
    //         this.validateNickname();
    //         this.validateUsername();
    //     }
    // }

    // /**
    //  * Проверяет пользовательский ввод текущего пароля
    //  */
    // validateCurrentPassword() {
    //     this.state.domElements.current_password?.classList.remove(
    //         'data-input--error'
    //     );
    //     addErrorToClass('', passwordErrorTypes);

    //     const { isError, errorClass } = checkPassword(
    //         this.state.domElements.current_password?.value ?? ''
    //     );

    //     if (isError) {
    //         this.state.domElements.current_password?.classList.add(
    //             'data-input--error'
    //         );
    //         addErrorToClass(errorClass, passwordErrorTypes);
    //         if (this.state.valid.currentPasswordIsValid) {
    //             this.state.valid.currentPasswordIsValid = false;
    //         }
    //         return;
    //     }

    //     if (this.state.valid.currentPasswordIsValid === false) {
    //         this.state.valid.currentPasswordIsValid = true;
    //     }
    // }

    // incorrectPassword() {
    //     if (this.state.isSubscribed && this.props?.incorrectPassword) {
    //         this.state.domElements.current_password?.classList.add(
    //             'data-input--error'
    //         );
    //         addErrorToClass('incorrect-password', passwordErrorTypes);
    //         if (this.state.valid.currentPasswordIsValid) {
    //             this.state.valid.currentPasswordIsValid = false;
    //         }
    //         store.dispatch(createIncorrectPasswordAction(false));
    //     }
    // }

    // /**
    //  * Проверяет пользовательский ввод нового пароля
    //  */
    // validateNewPassword() {
    //     this.state.domElements.new_password?.classList.remove(
    //         'data-input--error'
    //     );
    //     addErrorToClass('', newPasswordErrorTypes);

    //     const { isError, errorClass } = checkNewPassword(
    //         this.state.domElements.new_password?.value ?? ''
    //     );

    //     if (isError) {
    //         this.state.domElements.new_password?.classList.add(
    //             'data-input--error'
    //         );
    //         addErrorToClass(errorClass, newPasswordErrorTypes);
    //         if (this.state.valid.newPasswordIsValid) {
    //             this.state.valid.newPasswordIsValid = false;
    //         }
    //         return;
    //     }

    //     if (this.state.valid.newPasswordIsValid === false) {
    //         this.state.valid.newPasswordIsValid = true;
    //     }
    // }

    // /**
    //  * Проверяет пользовательский ввод имени
    //  */
    // validateNickname() {
    //     this.state.domElements.nickname?.classList.remove('data-input--error');
    //     addErrorToClass('', nicknameErrorTypes);

    //     const { isError, errorClass } = checkNickname(
    //         this.state.domElements.nickname?.value ?? ''
    //     );

    //     if (isError) {
    //         this.state.domElements.nickname?.classList.add('data-input--error');
    //         addErrorToClass(errorClass, nicknameErrorTypes);
    //         if (this.state.valid.nicknameIsValid) {
    //             this.state.valid.nicknameIsValid = false;
    //         }
    //         return;
    //     }

    //     if (this.state.valid.nicknameIsValid === false) {
    //         this.state.valid.nicknameIsValid = true;
    //     }
    // }

    // validateUsername() {
    //     this.state.domElements.username?.classList.remove('data-input--error');
    //     addErrorToClass('', usernameErrorTypes);
    // }
}








// if (this.state.isSubscribed && this.props?.user) {
//             this.profileUI = new DumbProfile({
//                 parent: document.getElementById('dynamic') as HTMLElement,
//             });

//             this.state.domElements.avatar =
//                 document.querySelector('.profile__avatar'); // ellipse-icon
//             this.state.domElements.avatar?.addEventListener('click', () => {
//                 this.handleClickAvatar();
//             });

//             this.state.domElements.saveButton =
//                 document.querySelector('.button-save');
//             this.state.domElements.saveButton?.addEventListener(
//                 'click',
//                 (e) => {
//                     e.preventDefault();

//                     this.handleClickSave();
//                 }
//             );

//             this.state.domElements.current_password =
//                 document.querySelector('.current-password');
//             this.state.domElements.current_password?.addEventListener(
//                 'input',
//                 (e) => {
//                     e.preventDefault();

//                     this.validateCurrentPassword();
//                 }
//             );

//             this.state.domElements.new_password =
//                 document.querySelector('.new-password');
//             this.state.domElements.new_password?.addEventListener(
//                 'input',
//                 (e) => {
//                     e.preventDefault();

//                     this.validateNewPassword();
//                 }
//             );

//             this.state.domElements.nickname =
//                 document.querySelector('.nickname');
//             this.state.domElements.nickname?.addEventListener('input', (e) => {
//                 e.preventDefault();

//                 this.validateNickname();
//             });

//             this.state.domElements.username =
//                 document.querySelector('.username');
//             this.state.domElements.username?.addEventListener('input', (e) => {
//                 e.preventDefault();

//                 if (this.state.domElements.username?.value) {
//                     if (
//                         this.state.domElements.username?.value.charAt(0) !== '@'
//                     ) {
//                         this.state.domElements.username.value =
//                             '@' + this.state.domElements.username.value;
//                     }
//                 }

//                 this.validateUsername();
//             });

//             this.state.domElements.status = document.querySelector('.status');
//         }