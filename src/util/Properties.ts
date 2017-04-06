import "../prototype";
import Objects from "../types/Objects";

export interface PropertiesProps {
    [key: string]: any
}
export default class Properties {
    private props: PropertiesProps;
    public constructor(props?: PropertiesProps) {
        this.props = props || {};
    }

    public add(key: string, value: any, keys: string[]) {
        Objects.addValue(this.props, key, value, keys);
    }
    public get(key: string, keys?: string[]): PropertiesProps | any  {
        return Objects.getValue(this.props, key, keys);
    }
    public merge(props: PropertiesProps) {
        Objects.merge(props, this.props);
    }
}
