import { AbstractMesh, Color3, Mesh, Scene, SpotLight, StandardMaterial, Vector3 } from "@babylonjs/core";
import NodeNameConfig from "./config/NodeNameConfig";
import SimpleManagerBase from "./SimpleManager";

import lightUrl from '../assets/model/env/light.glb?url';

const customLightUrl = "https://assets.babylonjs.com/meshes/lamp.babylon";

const copyInfos: Array<{ positionX: number, positionZ: number, rotationY: number }> = [
    { positionX: 31, positionZ: -24, rotationY: 0 },
    { positionX: 28.5, positionZ: -56, rotationY: 0 },
    { positionX: 28, positionZ: -88, rotationY: 0 }
]

export default class extends SimpleManagerBase {
    constructor(scene: Scene) {
        super(scene, lightUrl, false);

        this.onLoaded = () => {

            this.parentNodes.forEach(node => {
                if (node.name.endsWith('1') && node.name.indexOf('.0') !== -1) {

                    const parent = node as Mesh;

                    const localPositions = parent.getFacetLocalPositions();
                    let position = Vector3.Zero();
                    localPositions.forEach(p => {
                        position.x -= p.y / localPositions.length;
                        position.y -= p.z / localPositions.length;
                        position.z -= p.x / localPositions.length;
                    })

                    const lampLight = new SpotLight(
                        NodeNameConfig.STREET_LIGHT_NAME,
                        position,
                        new Vector3(0, -1, 0),
                        Math.PI * 2,
                        500,
                        this.scene);

                    lampLight.diffuse = Color3.Yellow();
                    lampLight.intensity = 200;
                }
            })

            this.setLightEnable(false);
        }
    }

    setEnabled(value: boolean): void {
        super.setEnabled(value);
        if (!value)
            this.setLightEnable(false);
    }

    setLightEnable(value: boolean) {
        this.scene.lights.forEach(light =>
            light.setEnabled(light.name !== NodeNameConfig.STREET_LIGHT_NAME || value));
    }
}