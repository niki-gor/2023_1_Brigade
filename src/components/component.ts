export interface Component {
    props: AnyObject;
    state: AnyObject;
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
    }
}
