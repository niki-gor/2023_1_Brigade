import { ROOT } from "@config/config";

export interface Container extends AnyObject {
    props: ComponentProps;
    rootNode: HTMLElement;
    unsubscribe: (() => void)[];
}

export class Container {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(
        props = { rootNode: ROOT, chatId: undefined } as ComponentProps
    ) {
        this.state = {};
        this.props = props;
        this.unsubscribe = [];
        this.rootNode = ROOT;
    }
}
