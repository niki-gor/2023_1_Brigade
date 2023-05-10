import { Component } from "@/components/component";
import template from "@components/search/search.pug";
import "@components/search/search.scss"
import { svgButtonUI } from "@components/ui/button/button";

export class searchUi extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return template({
            SearchIcon: svgButtonUI.renderTemplate({svgClassName: "search-icon"}),
            InputClassName: this.props.inputClassName,
            PlaceHolder: this.props.placeholder,
        });
    }
}
