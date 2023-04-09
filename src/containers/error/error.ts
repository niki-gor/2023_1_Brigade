import { DumbError } from "@/components/error/error";
import { Container } from "@containers/container";


export interface SmartError {
    state: {
        isSubscribed: boolean,
    }
}

/**
 * Отрисовывает страницу ошибки.
 */
export class SmartError extends Container {
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
