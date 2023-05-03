import { DumbChatList } from "@components/chatList/chatList";
import { DYNAMIC } from "@config/config";
import { store } from "@store/store";
import { Container } from "@containers/container";
import { DumbCreateChannel } from "@components/channelCreation/channel";
import { createMoveToChatsAction, createMoveToHomePageAction } from "@actions/routeActions";
import { addErrorToClass, checkNickname } from "@utils/validator";
import { nicknameErrorTypes } from "@config/errors";
import { ChatTypes } from "@config/enum";
import { createCreateChannelAction } from "@actions/chatActions";

export interface SmartCreateChannel {
    state: {
        isSubscribed: boolean,
        valid: {
            channelNameIsValid: boolean,
            isValid: () => boolean,
        },
        domElements: {
            headerBackBtn: HTMLElement | null,
            headerDoneBtn: HTMLElement | null,
            channelImage: HTMLElement | null,
            channelName: HTMLInputElement | null,
            channelDescription: HTMLInputElement | null,
        },
    }
}

export class SmartCreateChannel extends Container {
    constructor(props :componentProps) {
        super(props);
        this.state = {
            isSubscribed: false,
            valid: {
                channelNameIsValid: true,
                isValid: () => {
                    return this.state.valid.channelNameIsValid
                }
            },
            domElements: {
                headerBackBtn: null,
                headerDoneBtn: null,
                channelImage: null,
                channelName: null,
                channelDescription: null,
            }
        }

        this.rootNode = DYNAMIC;
    }

    #image:    File | undefined;

    render() {
        if (this.state.isSubscribed) {
            if (!this.props.channels) {
                this.props.channels = [];
            }
            
            const ChannelUI = new DumbCreateChannel({
                ...this.props.contacts,
            });

            this.rootNode.innerHTML = ChannelUI.render();
        
            this.state.domElements.headerBackBtn = document.querySelector('.create-channel__header__back');
            this.state.domElements.headerDoneBtn = document.querySelector('.create-channel__heder__done-btn');
            this.state.domElements.channelImage = document.querySelector('.channel__avatar');

            this.state.domElements.headerBackBtn?.addEventListener('click', () => {
                store.dispatch(createMoveToHomePageAction());
            });

            this.state.domElements.channelName = document.querySelector('.custom-input__content');
            this.state.domElements.channelName?.addEventListener('input', () => {
                this.validateChannelName(this.state.domElements.channelName);
            });

            this.state.domElements.channelImage?.addEventListener('click', () => {
                this.handleClickAvatar();
            })

            this.state.domElements.headerDoneBtn?.addEventListener('click', () => {
                this.handleClickDone();
            })
        }
    }

    componentDidMount() {
        if (!this.state.isSubscribed) {
            this.unsubscribe.push(store.subscribe(this.constructor.name, (pr: componentProps) => {
                this.props = pr;
    
                this.render();
            }));

            this.state.isSubscribed = true;
        }
    }

    componentWillUnmount() {
        if (this.state.isSubscribed) {
            this.unsubscribe.forEach((uns) => uns());
            this.state.isSubscribed = false;
        }
    }

     /**
     * Проверяет пользовательский ввод 
     */
    validateChannelName(validateInput: HTMLInputElement | null) {
        validateInput?.classList.remove('data-input--error');
        addErrorToClass('', nicknameErrorTypes);

        const { isError, errorClass } = checkNickname(validateInput?.value ?? '');

        if (isError) {
            console.log('error exist');
            validateInput?.classList.add('data-input--error');
            addErrorToClass(errorClass, nicknameErrorTypes);
            this.state.valid.channelNameIsValid = false;
            
            return;
        }

        this.state.valid.channelNameIsValid = true;
    }

    /**
     * Обрабатывает нажатие кнопки аватарки
     */
    handleClickAvatar() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.jpg';

        input.addEventListener('change', () => {
            this.#image = input?.files?.[0];
            if (this.#image) {
                const reader = new FileReader();
                reader.readAsDataURL(this.#image);
                reader.onload = () => {
                    const imageUrl = reader.result;
                    const avatar = document.querySelector('.create-channel__form__image') as HTMLImageElement;
                    avatar.src = imageUrl as string;
                };
            }
        });

        input.click();
    }

    handleClickDone() {
        if (this.state.valid.isValid()) {
                    const newChannel = {
                        type: ChatTypes.Channel,
                        title: this.state.domElements.channelName?.value,
                        members: [this.props.user.id],
                        // TODO: когда на бэке сделают ручки 
                        // avatar: this.state.domElements.channelImage,
                        // description: this.state.domElements.channelDescription?.value,
                        // master_id: this.props.user.id,
                    } as anyObject;
                    
                    store.dispatch(createCreateChannelAction(newChannel));
                    store.dispatch(createMoveToChatsAction());
                    // TODO: store.dispatch(createChannelAvatarAction(this.#image));
        }
    }
}
