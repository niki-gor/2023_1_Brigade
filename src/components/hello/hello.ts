import { Component } from "@/components/component";
import template from "@components/hello/hello.pug";
import "@components/hello/hello.scss"
import { ellipseIconUI } from "@components/ui/ellipse-icon/ellipse-icon";

export class DumbHello extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            avatar: ellipseIconUI.renderTemplate({
                imgSrc: "./assets/img/logo.png",
                altMsg: 'logo',
            }),
        });
    }
}
