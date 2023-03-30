import { Page } from "@pages/page";
import { DumbProfile } from "@/components/profile/profile";
import template from "@pages/profile/profile.pug"
import "@pages/profile/profile.scss"

export class ProfilePage extends Page {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            profile: '', // TODO: profile component
        });
    }
}
