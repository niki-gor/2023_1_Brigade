import { Component } from "@/components/component";
import template from "@components/templateList/templateList.pug";
import "@components/chatList/chatList.scss"

export class List extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            items: this.props.items,
        })
    }
}