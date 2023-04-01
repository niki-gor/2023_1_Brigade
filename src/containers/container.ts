import { ROOT } from '@config/config';

export interface Container extends anyObject {
    props: componentProps;
    rootNode: HTMLElement;
    unsubscribe: (() => void)[];
}

export class Container {
    /**
     * Cохраняет переданные параметры props.
     * @param {Object} props - необходимые для работы класса свойства
     * @default {Element} rootNode - div, через который происходит взаимодействие с html.
     */
    constructor(props = { rootNode: ROOT } as componentProps) {
        this.state = {};
        this.props = props;
        if (Object.hasOwnProperty.call(props, 'rootNode')) {
            this.rootNode = props.rootNode;
        }
        this.unsubscribe = [];
    }
}
