import { Page } from "@pages/page";
import template from "@pages/chat/chat.pug"
import { simpleButton } from "@/components/ui/button/button";

import "@/pages/chat/chat.css"

export class DumbChat extends Page {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            simpleButton: simpleButton.renderTemplate({buttonValue: 'работай сука'})
        })
    }
}