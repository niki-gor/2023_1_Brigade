import { Component } from "@/components/component";
import template from "@components/profile/profile.pug";
import { blueButtonUI } from "@components/ui/blue-button/blue-button";
import { dataInputUI } from "@components/ui/data-input/data-input";
import { ellipseIconUI } from "@components/ui/ellipse-icon/ellipse-icon";
import { headerInputUI } from "@components/ui/header-input/header-input";
import { errorInputUI } from "../ui/error-input/error-input";
import { nicknameErrorTypes, passwordErrorTypes, usernameErrorTypes, newPasswordErrorTypes } from "@/config/errors";
import "@components/profile/profile.scss"

const strings = {
    nickname: 'Никнейм',
    username: 'Имя пользователя',
    status: 'Статус',
    currentPassword: 'Текущий пароль',
    newPassword: 'Новый пароль',
    saveChanges: 'Сохранить изменения'
};

export class DumbProfile extends Component {
    constructor(props: any) {
        super(props);
    }

    getValidateErrors(errors: {param: string, class: string, message: string}[]) {
        let result = {};
    
        errors.forEach(err => {
            result = {
                    ...result,
                    [err.param] : errorInputUI.renderTemplate({
                        className:  `${err.class}`,
                        message: `${err.message}`,
                    }),
            };
        });
    
        return result;
    }

    getUsername() {
        if (this.props.user.username == this.props.user.id) {
            return '@';
        }

        return '@' + this.props.user.username;
    }

    render() {
        return template({
            avatar: ellipseIconUI.renderTemplate({
                imgSrc: this.props.user.avatar, 
                altMsg: 'avatar'
            }),

            nickname: this.props.user.nickname,
            username: this.getUsername(),
            status: this.props.user.status,

            nicknameHeader: headerInputUI.renderTemplate({
                headerInputText: strings.nickname,
            }),
            nicknameInput: dataInputUI.renderTemplate({
                className: 'nickname',
                inputType: 'text',
                inputPlaceholder: '',
                value: this.props.user.nickname,
            }),
            ...this.getValidateErrors(nicknameErrorTypes),

            usernameHeader: headerInputUI.renderTemplate({
                headerInputText: strings.username,
            }),
            usernameInput: dataInputUI.renderTemplate({
                className: 'username',
                inputType: 'text',
                inputPlaceholder: '',
                value: this.getUsername(),
            }),
            ...this.getValidateErrors(usernameErrorTypes),

            statusHeader: headerInputUI.renderTemplate({
                headerInputText: strings.status,
            }),
            statusInput: dataInputUI.renderTemplate({
                className: 'status',
                inputType: 'text',
                inputPlaceholder: '',
                value: this.props.user.status,
            }),

            currentPasswordHeader: headerInputUI.renderTemplate({
                headerInputText: strings.currentPassword,
            }),
            currentPasswordInput: dataInputUI.renderTemplate({
                className: 'current-password',
                inputType: 'password',
                inputPlaceholder: '**********',
                value: '',
            }),
            ...this.getValidateErrors(passwordErrorTypes),

            newPasswordHeader: headerInputUI.renderTemplate({
                headerInputText: strings.newPassword,
            }),
            newPasswordInput: dataInputUI.renderTemplate({
                className: 'new-password',
                inputType: 'password',
                inputPlaceholder: '**********',
                value: '',
            }),
            ...this.getValidateErrors(newPasswordErrorTypes),

            buttonSave: blueButtonUI.renderTemplate({
                className: 'button-save',
                buttonValue: strings.saveChanges,
            })
        });
    }
}
