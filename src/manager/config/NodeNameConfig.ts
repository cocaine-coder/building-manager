import {Readonly} from '../../utils/ReadOnly'

class NodeNameConfig {
    ENV_LIGHT_NAME = "";
    STREET_LIGHT_NAME = "";
    SKY_BOX_NAME = "";
}

const value: NodeNameConfig = new NodeNameConfig();

for(let key in value){
    const origin = value as any;
    origin[key] = key;
}

export default Readonly<NodeNameConfig>(value);