import template from '@components/ui/chatAvatar/chatAvatar.pug';
import '@components/ui/avatar/avatar.scss';
import '@components/ui/chatAvatar/chatAvatar.scss';
import { Component } from '@framework/component';

interface Props {}

interface State {}

export class chatAvatarUi extends Component<Props, State> {
    componentDidMount(): void {
        //
    }

    componentWillUnmount(): void {
        //
    }

    static renderTemplate(args: {
        ClassName: string;
        PathToUserImage: string;
        UserName: string;
        UserStatus: string;
        Online: boolean;
    }) {
        return template(args);
    }
}
