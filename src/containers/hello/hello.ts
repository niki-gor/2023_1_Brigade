import { Container } from "@containers/container";
import { store } from "@/store/store";
import { createRenderAction } from "@/actions/routeActions";
import { DumbHello } from "@/components/hello/hello";
import { HELLO } from "@/config/config";

export interface SmartHello {
    state: {
        isSubscribed: boolean,
    }
}

/**
* Отрисовывает страницу пользователя.
* Прокидывает actions в стору для изменения данных о пользователе
*/
export class SmartHello extends Container {
    /**
     * Cохраняет props
     * @param {Object} props - параметры компонента
     */
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
        };
    }

    /**
     * Рендерит приветственную страницу
     */
    render() {
        if (this.state.isSubscribed) {
            const HelloUI = new DumbHello({
                ...this.props,
            });
            
            this.rootNode.insertAdjacentHTML("afterbegin", HelloUI.render());
        }
    }

    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            // this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
            //     this.props = pr;

            //     this.render();
            // }));

            this.state.isSubscribed = true;

            this.render();
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            // this.unsubscribe.forEach((uns) => uns());
            console.log(HELLO())
            HELLO().remove();
            this.state.isSubscribed = false;
        }
    }
}
