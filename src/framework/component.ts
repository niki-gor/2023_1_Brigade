interface IComponent {
    componentDidMount(): void;
    componentWillUnmount(): void;
}

export abstract class Component implements IComponent {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props: AnyObject) {
        this.props = props;
    }

    abstract componentDidMount(): void;
    abstract componentWillUnmount(): void;

    protected props: AnyObject;
}
