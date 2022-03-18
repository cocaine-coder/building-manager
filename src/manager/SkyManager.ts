import { Scene, Mesh, Animation, Light, HemisphericLight, Vector3, Color3 } from "@babylonjs/core";
import { SkyMaterial } from "@babylonjs/materials";
import NodeNameConfig from "./config/NodeNameConfig";

export type SkyState = "day" | "sunset" | "night"

/**
 * 创建一个天空系统
 * @powerby Sky Material
 * 
 */
export default class SkyManager {

    private skyboxMaterial: SkyMaterial;
    public skybox: Mesh;
    private envLight: Light;

    constructor(private scene: Scene) {
        const skyboxMaterial = new SkyMaterial("skyMaterial", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.inclination = 0;        // 太阳倾角 [-0.5,0.5] 。 =0 时 太阳在正上方
        skyboxMaterial.turbidity = 0;          // 大气中的分子相对的雾度（散射）量
        skyboxMaterial.luminance = 1;          // 天空的整体亮度，区间为[0, 1] 
        skyboxMaterial.rayleigh = 1;
        skyboxMaterial.cameraOffset.y = 100;   // 天空纵方向  越大天空越向下
        this.skyboxMaterial = skyboxMaterial;

        // 如果想直接设置太阳的位置
        // this.skyboxMaterial.useSunPosition = true; 
        // this.skyboxMaterial.sunPosition = new Vector3(0, 100, 0);

        // 具体参数 ：https://doc.babylonjs.com/toolsAndResources/assetLibraries/materialsLibrary/skyMat

        this.skybox = Mesh.CreateBox("skyBox", 1000, scene);
        this.skybox.material = this.skyboxMaterial;

        // 创建环境灯
        this.envLight = new HemisphericLight(NodeNameConfig.ENV_LIGHT_NAME, new Vector3(1, 1, 0), scene);
        this.envLight.intensity = 1;
    }

    change(state: SkyState) {
        switch (state) {
            case "day":
                this.setSkyConfig("material.inclination", this.skyboxMaterial.inclination, 0);
                this.skyboxMaterial.turbidity = 0;
                this.skyboxMaterial.cameraOffset.y = 150;
                this.setEnvLightConfig(this.envLight.intensity, 1);
                break;
            case "sunset":
                this.setSkyConfig("material.inclination", this.skyboxMaterial.inclination, 0.49);
                this.skyboxMaterial.turbidity = 5;
                this.skyboxMaterial.cameraOffset.y = 0;
                this.setEnvLightConfig(this.envLight.intensity, 0.2);
                break;
            case "night":
                this.setSkyConfig("material.inclination", this.skyboxMaterial.inclination, 0.5);
                this.skyboxMaterial.turbidity = 0;
                this.setEnvLightConfig(this.envLight.intensity, 0.05);
                break;
        }
    }

    private setSkyConfig(property: string, from: number, to: number) {
        var animation = new Animation("sky_animation", property, 100, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        animation.setKeys(this.getAnimationKeys(from, to));

        this.scene.stopAnimation(this.skybox);
        this.scene.beginDirectAnimation(this.skybox, [animation], 0, 100, false, 1);
    }

    private setEnvLightConfig(from: number, to: number) {

        var animation = new Animation("env_light_animation", "intensity", 100, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
        animation.setKeys(this.getAnimationKeys(from, to));

        this.scene.stopAnimation(this.envLight);
        this.scene.beginDirectAnimation(this.envLight, [animation], 0, 100, false, 1);
    }

    private getAnimationKeys(from: number, to: number) {
        return [
            { frame: 0, value: from },
            { frame: 100, value: to }
        ]
    }
}