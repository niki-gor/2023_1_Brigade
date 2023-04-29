import { Component } from '@framework/component';
import template from '@components/chatCard/chatCard.pug';
import '@components/chatCard/chatCard.scss';
import { smallEllipseIconUI } from '@components/ui/small-ellipse-icon/small-ellipse-icon';

export class DumbChatCard extends Component<Props> {
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
            avatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props?.avatar as string,
                altMsg: this.props?.title as string,
            }),
            title: this.props?.title,
            lastMessage: this.props?.last_message?.body,
            id: this.props?.id,
        });
    }
}
