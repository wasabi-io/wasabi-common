import Class from "./Class";
import Objects from "../types/Objects";

export interface IPropClass {
    props: any
}

/**
 * A class which provides to merge props to defaultProps
 * @export
 * @class PropsClass
 */
abstract class PropsClass extends Class implements IPropClass {
    props: any;
    constructor(props: any, defaultProps?: any) {
        super();
        let defProps = defaultProps || this.constructor["defaultProps"];
        this.props = defProps ?  Objects.mergeDefaults(defProps, props): props;
    }
}

export default PropsClass;
