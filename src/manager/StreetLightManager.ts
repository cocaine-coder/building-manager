import { Scene } from "@babylonjs/core";
import NodeNameConfig from "./config/NodeNameConfig";
import SimpleManagerBase from "./SimpleManagerBase";

import light from '../assets/model/env/light.glb?url';

export default class extends SimpleManagerBase {
    constructor(scene: Scene) {
        super(scene, light);

        this.onLoaded=()=>{
            // todu : 安装spotlight

            this.setLightEnable(false);
        }
    }

    setLightEnable(value: boolean) {
        this.scene.lights.forEach(light =>
            light.setEnabled(light.name !== NodeNameConfig.STREET_LIGHT_NAME || value));
    }
}