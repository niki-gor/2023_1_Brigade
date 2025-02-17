import template from '@components/sidebar/sidebar.pug';
import { svgButtonUI } from '@/components/ui/icon/button';
import '@components/sidebar/sidebar.scss';
import { avatarUi } from '@components/ui/avatar/avatar';
import { Component } from '@framework/component';
import { DumbSideItem } from '../sideItem/sideItem';

interface Props {
    avatar: string;
}

interface State {
    isSubscribed: boolean;
}

export class DumbSidebar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    getSidebarList() {
        const svgButtons: Map<
            string,
            {
                className: string;
                value?: string | null | undefined;
            }
        > = new Map();
        svgButtons.set('messageButton', {
            className: 'nav-item__message-btn',
            value: null,
        });
        svgButtons.set('contactButton', { className: 'nav-item__contact-btn' });

        const navList: string[] = [];

        svgButtons.forEach((buttonProperty) => {
            const navItem = new DumbSideItem({
                navSvgIcon: svgButtonUI.renderTemplate({
                    svgClassName: buttonProperty?.className ?? '',
                }),
                navItemValue: buttonProperty.value ?? '',
            });

            navList.push(navItem.render());
        });

        return navList;
    }

    render() {
        return template({
            UserImage: avatarUi.renderTemplate({
                ClassName: 'header__user-photo',
                PathToUserImage: this.props?.avatar ?? '',
                Online: true,
            }),
            NavList: this.getSidebarList(),
            LogoutBtn: svgButtonUI.renderTemplate({
                svgClassName: 'logout-btn',
            }),
        });
    }
}
