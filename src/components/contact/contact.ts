import { Component } from '@framework/component';
import template from '@components/contact/contact.pug';
import '@components/contact/contact.scss';
import { smallEllipseIconUI } from '@components/ui/small-ellipse-icon/small-ellipse-icon';

export class DumbContact extends Component<Props> {
    constructor(props: Record<string, unknown>) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    render() {
        return template({
            // avatar: avatarUi.renderTemplate({
            //     ClassName: 'contact__item__img',
            //     PathToUserImage: this.props.avatar,
            //     Online: false,
            // }),
            avatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props.avatar,
                altMsg: this.props.nickname,
            }),
            nickname: this.props.nickname,
            status: this.props.status,
            id: this.props.id,
        });
    }
}
