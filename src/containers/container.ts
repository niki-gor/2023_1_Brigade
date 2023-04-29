import { ROOT } from '@config/config';

export interface Container {
    props: Record<string, unknown>;
    state: Record<string, unknown>;
    rootNode: HTMLElement;
    unsubscribe: (() => void)[];
}

export class Container {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props: Record<string, unknown>) {
        this.state = {};
        this.props = props;
        this.unsubscribe = [];
        this.rootNode = ROOT;
    }
}
