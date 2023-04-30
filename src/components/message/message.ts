import { Component } from '@framework/component';
import template from '@components/message/message.pug';
import '@components/message/message.scss';
import { smallEllipseIconUI } from '@components/ui/small-ellipse-icon/small-ellipse-icon';

interface Props {
    messageSide: boolean;
    messageAvatar: string;
    username: string;
    messageContent: string;
}

interface State {
    isSubscribed: boolean;
}

export class DumpMessage extends Component<Props, State> {
    constructor(props: Props) {
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
            Side: this.props?.messageSide,
            MessageAvatar: smallEllipseIconUI.renderTemplate({
                imgSrc: this.props?.messageAvatar ?? '',
                altMsg: this.props?.username ?? '',
            }),
            MessageText: this.props?.messageContent,
            Username: this.props?.username,
        });
    }
}
