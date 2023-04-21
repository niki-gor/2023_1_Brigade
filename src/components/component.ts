import { ROOT } from "@config/config";

export interface Component extends anyObject {
    props: anyObject;
}

export class Component {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props: anyObject) {
        this.state = {};
        this.props = props;
        if (Object.hasOwnProperty.call(props, "rootNode")) {
            this.rootNode = props.rootNode ?? ROOT;
        }
    }
}
