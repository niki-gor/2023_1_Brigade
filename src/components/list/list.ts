import { Component } from "@/components/component";
import template from "@components/templateList/templateList.pug";
import "@components/chatList/chatList.scss"
import { svgButtonUI } from "@components/ui/button/button";

export class List extends Component {
    constructor(props: any) {
        super(props);
        // TODO: присваивать в пропсы тип листа
    }

    getList(itemType: Component) {

    }

    render() {
        return template({
            HeaderIcon: svgButtonUI.renderTemplate({svgClassName: this.props.headerIcon}),
            HeaderText: this.props.headerText,
            HeaderButton: svgButtonUI.renderTemplate({svgClassName: "arrow-down"}),
            List: this.getList(this.props.itemType),
        })
    }
}