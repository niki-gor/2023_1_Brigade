import { Component } from '@framework/component';
import template from '@components/message/message.pug';
import '@components/message/message.scss';
import { smallEllipseIconUI } from '@components/ui/small-ellipse-icon/small-ellipse-icon';
import { Dropdown } from '@components/dropdown/dropdown';

interface Props {
    messageSide: boolean;
    messageAvatar: string;
    messageContent: string;
    username: string;
    id: string;
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
        if (this.props) {
            return template({
                Side: this.props.messageSide,
                MessageAvatar: smallEllipseIconUI.renderTemplate({
                    imgSrc: this.props.messageAvatar,
                    altMsg: this.props.username,
                }),
                MessageText: this.props.messageContent,
                Username: this.props.username,
                TreeDots: (function (message_id: string, is_user: boolean) {
                    if (is_user) {
                        return new Dropdown({
                            icon: 'three-dots',
                            list: [
                                {
                                    className: 'edit-message',
                                    value: 'Изменить',
                                },
                                {
                                    className: 'delete-message',
                                    value: 'Удалить',
                                },
                            ],
                            id: message_id,
                        }).render();
                    }
                    return '';
                })(this.props.id, this.props.messageSide),
                id: this.props.id,
            });
        }
    }
}
