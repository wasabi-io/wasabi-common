import Class from "./Class";
import Objects from "../types/Objects";
import { ObjectProps } from "../types/Objects";

export interface IPropClass {
    props: any
}

/**
 * A class which provides to merge props to defaultProps
 * @export
 * @class PropsClass
 */
export default class PropsClass extends Class implements IPropClass {
    props: any;

    /**
     *
     *
     * @param props {ObjectsProps}
     * @param defaultProps {ObjectsProps} it is optional value. It is not exist then checked subclass.defaultProps
     */
    protected constructor(props: ObjectProps, defaultProps?: ObjectProps) {
        super();
        let defProps = defaultProps || this.constructor["defaultProps"];
        this.props = defProps ?  Objects.mergeDefaults(defProps, props): props;
    }
}

