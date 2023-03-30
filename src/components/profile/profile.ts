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
            username: this.props.user.username,
            nickname: this.props.user.nickname,
            status: this.props.user.status,
            nameHeader: headerInputUI.renderTemplate({
                headerInputText: 'Имя'
            }),
            nameInput: dataInputUI.renderTemplate({
                className: 'username',
                inputType: 'text',
                inputPlaceholder: this.props.user.username,
            }),
            nickHeader: headerInputUI.renderTemplate({
                headerInputText: 'Ник'
            }),
            nickInput: dataInputUI.renderTemplate({
                className: 'nickname',
                inputType: 'text',
                inputPlaceholder: this.props.user.nickname,
            }),
            statusHeader: headerInputUI.renderTemplate({
                headerInputText: 'Статус'
            }),
            statusInput: dataInputUI.renderTemplate({
                className: 'status',
                inputType: 'text',
                inputPlaceholder: this.props.user.status,
            }),
            passwordHeader: headerInputUI.renderTemplate({
                headerInputText: 'Пароль'
            }),
            passwordInput: dataInputUI.renderTemplate({
                className: 'password',
                inputType: 'password',
                inputPlaceholder: '**********',
            }),
            buttonSave: blueButtonUI.renderTemplate({
                className: 'button-save',
                buttonValue: 'Сохранить изменения',
            })
        });
    }
}
