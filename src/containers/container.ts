import { ROOT } from '@config/config';

export interface Container {
    props: AnyObject;
    state: AnyObject;
    rootNode: HTMLElement;
    unsubscribe: (() => void)[];
}

export class Container {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props: AnyObject) {
        this.state = {};
        this.props = props;
        this.unsubscribe = [];
        this.rootNode = ROOT;
    }
}
