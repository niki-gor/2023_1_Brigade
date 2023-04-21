import { ROOT } from "@config/config";

export interface Component extends AnyObject {
    props: AnyObject;
}

export class Component {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props: AnyObject) {
        this.state = {};
        this.props = props;
        if (Object.hasOwnProperty.call(props, "rootNode")) {
            this.rootNode = props.rootNode ?? ROOT;
        }
    }
}
