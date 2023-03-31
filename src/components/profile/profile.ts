import { Component } from "@/components/component";
import template from "@components/profile/profile.pug";
import { blueButtonUI } from "@components/ui/blue-button/blue-button";
import { dataInputUI } from "@components/ui/data-input/data-input";
import { ellipseIconUI } from "@components/ui/ellipse-icon/ellipse-icon";
import { headerInputUI } from "@components/ui/header-input/header-input";
import "@components/profile/profile.scss"

export class DumbProfile extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            avatar: ellipseIconUI.renderTemplate({
                imgSrc: this.props.user.avatar, 
                altMsg: 'avatar'
            }),
            nickname: this.props.user.nickname,
            username: this.props.user.username,
            status: this.props.user.status,
            nameHeader: headerInputUI.renderTemplate({
                headerInputText: 'Никнейм'
            }),
            nameInput: dataInputUI.renderTemplate({
                className: 'nickname',
                inputType: 'text',
                inputPlaceholder: '',
                value: this.props.user.nickname,
            }),
            nickHeader: headerInputUI.renderTemplate({
                headerInputText: 'Имя пользователя'
            }),
            nickInput: dataInputUI.renderTemplate({
                className: 'username',
                inputType: 'text',
                inputPlaceholder: '',
                value: this.props.user.username,
            }),
            statusHeader: headerInputUI.renderTemplate({
                headerInputText: 'Статус'
            }),
            statusInput: dataInputUI.renderTemplate({
                className: 'status',
                inputType: 'text',
                inputPlaceholder: '',
                value: this.props.user.status,
            }),
            currentPasswordHeader: headerInputUI.renderTemplate({
                headerInputText: 'Текущий пароль'
            }),
            currentPasswordInput: dataInputUI.renderTemplate({
                className: 'current-password',
                inputType: 'password',
                inputPlaceholder: '**********',
                value: '',
            }),
            newPasswordHeader: headerInputUI.renderTemplate({
                headerInputText: 'Новый пароль'
            }),
            newPasswordInput: dataInputUI.renderTemplate({
                className: 'new-password',
                inputType: 'password',
                inputPlaceholder: '**********',
                value: '',
            }),
            buttonSave: blueButtonUI.renderTemplate({
                className: 'button-save',
                buttonValue: 'Сохранить изменения',
            })
        });
    }
}
