import template from "@components/navbar/navbar.pug"
import { svgButtonUI } from "@/components/ui/button/button";
import "@/components/navbar/navbar.css"
import { avatarUi } from "@components/ui/avatar/avatar";
import { Component } from "@components/component";
import { DumbNavItem } from "@components/navItem/navItem";
import { DumbChangeTheme } from "../changeTheme/changeTheme";


export class DumbNavbar extends Component {
    constructor(props: any) {
        super(props);
    }

    getNavbarList() {
        let navList: DumbNavItem[] = [];

        console.log('DumbNavbar props: ', this.props.changeTheme);

        this.props.svgButtons.forEach((buttonProperty: any, buttonType: string) => {
            let navValue = '';
            if (buttonProperty.value) {
                navValue = buttonProperty.value;
            }

            const navItem = new DumbNavItem({
                navSvgIcon: svgButtonUI.renderTemplate({svgClassName: buttonProperty.className}),
                navItemValue: navValue,
            });

            navList.push(navItem.render());
        });

        return navList;
    }

    render() {
        return template({
            UserImage: avatarUi.renderTemplate({ ClassName: 'header__user-photo', PathToUserImage: './assets/img/iii.png', Online: true}),
            NavList: this.getNavbarList(),
            ChangeTheme: new DumbChangeTheme({changeTheme: this.props.changeTheme}).render(),
        })
    }
}