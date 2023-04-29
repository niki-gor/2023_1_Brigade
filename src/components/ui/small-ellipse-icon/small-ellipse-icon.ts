import { Component } from '@/framework/component';
import '@components/ui/small-ellipse-icon/small-ellipse-icon.scss';
import template from '@components/ui/small-ellipse-icon/small-ellipse-icon.pug';

export class smallEllipseIconUI extends Component {
    static renderTemplate(args: { imgSrc: string; altMsg: string }) {
        return template(args);
    }
}
