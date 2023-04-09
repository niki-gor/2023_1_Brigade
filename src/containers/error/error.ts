import { Container } from "@containers/container";


export interface SmartError {
    state: {
        isSubsribed: boolean,
    }
}

/**
 * Отрисовывает страницу ошибки.
 */
export class SmartChat extends Container {
    /**
     * Сохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props: componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
        }
    }

    render() {
        if (this.state.isSubscribed && this.props?.error) {
            const error = new DumbError({
                errorHeader: this.props?.error?.status,
                errorDescription: this.props?.error?.message,
            });

            this.rootNode.innerHTML = error.render();
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.render();
            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        this.unsubscribe.forEach((uns) => uns());
        this.state.isSubscribed = false;
    }
}

// error {status: number, message: string};