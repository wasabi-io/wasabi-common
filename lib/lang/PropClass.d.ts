import Class from "./Class";
export interface IPropClass {
    props: any;
}
/**
 * A class which provides to merge props to defaultProps
 * @export
 * @class PropsClass
 */
declare abstract class PropsClass extends Class implements IPropClass {
    props: any;
    constructor(props: any, defaultProps?: any);
}
export default PropsClass;
