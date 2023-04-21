import { Page } from "@pages/page";
import template from "@pages/chat/chat.pug";
import { svgButtonUI } from "@components/ui/button/button";
import "@pages/chat/chat.css";

export class DumbChat extends Page {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            Header: svgButtonUI.renderTemplate({ svgClassName: "" }), // TODO: navbarUI
            // ChatList: chatListComponent.renderTemplate({}),
            // ViewChat: ViewChat.renderTemplate({}),
            // GroupInfo: GroupInfo.renderTemplate({}),
        });
    }
}
