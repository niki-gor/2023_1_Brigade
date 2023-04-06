import { Container } from "@containers/container";
import { DumbEmptyDynamicPage } from "@/components/emptyDynamicPage/emptyDynamicPage";
import { store } from "@/store/store";
import { createRenderAction } from "@/actions/routeActions";

export interface SmartChat {
    state: {
        isSubscribed: boolean,
    }
}

/**
* Отрисовывает страницу пользователя.
* Прокидывает actions в стору для изменения данных о пользователе
*/
export class SmartChat extends Container {
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
     * Рендерит логин
     */
    render() {
        if (this.state.isSubscribed && this.props.user) {
            const LoginUI = new DumbEmptyDynamicPage({ 
                ...this.props,
            }); 

            this.rootNode.innerHTML = LoginUI.render();
        }
    }
    
    /**
     * Навешивает переданные обработчики на валидацию и кнопки
     */
    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                this.props = pr;

                this.render();
                this.occupiedUsername();
            }));

            this.state.isSubscribed = true;
            
            store.dispatch(createRenderAction());
        }
    }

    /**
     * Удаляет все подписки
     */
    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }

}
