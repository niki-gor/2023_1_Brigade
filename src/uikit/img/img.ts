import '@uikit/img/img.scss';
import template from '@uikit/img/img.pug';
import { Component } from '@framework/component';

interface Props {
    src: string;
    className?: string;
    borderRadius?: '50' | '25' | '10';
    size?: 'S' | 'M' | 'L';
    alt?: string;
    caption?: string;
    captionStyle?: string;
    captionBlockStyle?: string;
    figureFlexDirection?: 'row' | 'column';
    style?: Record<string, string | number>;
    onClick?: (e?: Event) => void;
    parent: HTMLElement;
}

interface State {
    parent?: HTMLElement;
    node: HTMLElement | undefined;
}

export class Img extends Component<Props, State, HTMLImageElement> {
    constructor(props: Props) {
        super(props);

        this.node = this.render() as HTMLImageElement;
        this.componentDidMount();
        if (this.props.parent && this.node) {
            this.props.parent.appendChild(this.node);
        }
    }

    destroy() {
        this.componentWillUnmount();
        this.node?.remove();
        this.node = undefined;
    }

    componentDidMount() {
        if (!this.node) {
            return;
        }

        if (this.props.onClick) {
            this.node.addEventListener('click', this.props.onClick);
        }
    }

    componentWillUnmount() {
        if (!this.node) {
            return;
        }

        if (this.props.onClick) {
            this.node.removeEventListener('click', this.props.onClick);
        }
    }

    render() {
        const ClassName = `${this.props.className ?? ''} ${
            this.props.borderRadius
                ? 'image-border-radius-' + this.props.borderRadius
                : ''
        } ${this.props.size ? 'image-' + this.props.size : ''}`.trim();

        const CaptionBlockStyle = `${this.props.captionBlockStyle} ${
            this.props.figureFlexDirection
                ? 'figure-' + this.props.figureFlexDirection
                : ''
        }`.trim();

        return new DOMParser().parseFromString(
            template({
                Src: this.props.src,
                ClassName,
                Alt: this.props.alt ?? '',
                Caption: this.props.caption ?? '',
                CaptionStyle: this.props.captionStyle ?? '',
                CaptionBlockStyle,
            }),
            'text/html'
        ).body.firstChild;
    }
}
