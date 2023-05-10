export interface IComponent {
    componentDidMount(): void;
    componentWillUnmount(): void;
}

export abstract class Component<Props, State> implements IComponent {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props: Props) {
        this.props = props;
        this.state = {} as State;
    }

    abstract componentDidMount(): void;
    abstract componentWillUnmount(): void;

    protected props: Props;
    protected state: State;
    protected node: HTMLElement | undefined;
    protected unsubscribe: () => void = () => {};
}
