import template from '@components/sidebar/sidebar.pug';
import { svgButtonUI } from '@components/ui/button/button';
import '@components/sidebar/sidebar.scss';
import { avatarUi } from '@components/ui/avatar/avatar';
import { Component } from '@framework/component';
import { DumbSideItem } from '../sideItem/sideItem';
import { DumbChangeTheme } from '@components/changeTheme/changeTheme';

export class DumbSidebar extends Component<Props> {
    constructor(props: Record<string, unknown>) {
        super(props);
    }

    componentDidMount(): void {
        //TODO
    }

    componentWillUnmount(): void {
        //TODO
    }

    getSidebarList() {
        const svgButtons: Map<string, Record<string, unknown>> = new Map();
        svgButtons.set('messageButton', {
            className: 'nav-item__message-btn',
            value: null,
        });
        svgButtons.set('contactButton', { className: 'nav-item__contact-btn' });

        const navList: string[] = [];

        svgButtons.forEach((buttonProperty: Record<string, unknown>) => {
            let navValue = '';
            if (buttonProperty.value) {
                navValue = buttonProperty.value;
            }

            const navItem = new DumbSideItem({
                navSvgIcon: svgButtonUI.renderTemplate({
                    svgClassName: buttonProperty.className,
                }),
                navItemValue: navValue,
            });

            navList.push(navItem.render());
        });

        return navList;
    }

    render() {
        return template({
            UserImage: avatarUi.renderTemplate({
                ClassName: 'header__user-photo',
                PathToUserImage: this.props.avatar,
                Online: true,
            }),
            NavList: this.getSidebarList(),
            ChangeTheme: new DumbChangeTheme({
                white: 'change-theme__white',
                black: 'change-theme__black',
            }).render(),
            LogoutBtn: svgButtonUI.renderTemplate({
                svgClassName: 'logout-btn',
            }),
        });
    }
}
