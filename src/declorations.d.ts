declare module "*.pug" {
    const _: Function;
    export default _;
}

interface anyObject {
    [key: string]: any;
}

interface componentProps extends anyObject {
    rootNode: HTMLElement,
}
