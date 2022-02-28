import { ArcRotateCamera, Camera, Scene, Vector3 } from "@babylonjs/core";
import SkyManager from "./SkyManager";
import SimpleManagerBase from "./SimpleManagerBase";
import StreetLightManager from "./StreetLightManager";

import downspoutUrl from '../assets/model/env/downspout.glb?url'
import groundUrl from '../assets/model/env/ground.glb?url'
import guardUrl from '../assets/model/env/guard.glb?url'
import manholecoverUrl from '../assets/model/env/manholecover.glb?url'
import parklineUrl from '../assets/model/env/parkline.glb?url'

import mainUrl from '../assets/model/env/main.glb?url'


export default class SceneManager {

    private static _instance: SceneManager;
    private declare scene: Scene;
    private declare camera: Camera;
    private declare sky: SkyManager;
    private declare ground:SimpleManagerBase;
    private declare downspout : SimpleManagerBase;
    private declare guard : SimpleManagerBase;
    private declare manholecover : SimpleManagerBase;
    private declare parkline : SimpleManagerBase;

    private declare light : StreetLightManager;

    private constructor() {
    }

    static get Instance() {
        if (!this._instance)
            this._instance = new SceneManager();
        return this._instance;
    }

    async init(scene: Scene) {
        this.scene = scene;
        this.createMainCamera(scene);   // 创建相机
        this.sky = new SkyManager(scene);   // 创建天空

        this.addWindowKeyboardEvent(this.sky);  // 添加键盘事件

        this.downspout = new SimpleManagerBase(scene,downspoutUrl)
        await this.downspout.loadAsync();

        this.ground = new SimpleManagerBase(scene,groundUrl);
        await this.ground.loadAsync();

        this.guard = new SimpleManagerBase(scene,guardUrl);
        await this.guard.loadAsync();

        this.manholecover = new SimpleManagerBase(scene,manholecoverUrl);
        await this.manholecover.loadAsync();

        this.parkline = new SimpleManagerBase(scene,parklineUrl);
        await this.parkline.loadAsync();

        this.light = new StreetLightManager(scene);
        await this.light.loadAsync();

        const main = new SimpleManagerBase(scene,mainUrl);
        await main.loadAsync();
    }

    private addWindowKeyboardEvent(sky:SkyManager) {
        window.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 49: sky.change('day'); break;
                case 50: sky.change('sunset'); break;
                case 51: sky.change('night'); break;
            }
        })
    }

    /**
     * 创建相机
     *
     * @private
     * @param {Scene} scene
     * @memberof SceneManager
     */
    private createMainCamera(scene: Scene) {
        // 创建相机
        const camera = new ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.2, 100, new Vector3(0, 0, -30), scene);
        camera.panningSensibility = 0; // 禁止平移
        camera.lowerRadiusLimit = camera.radius * 0.5; // 最低缩放
        camera.upperRadiusLimit = camera.radius * 1;   // 最大缩放
        camera.lowerBetaLimit = 0;  // 最低纵轴旋转
        camera.upperBetaLimit = Math.PI / 2;  // 最高纵轴旋转
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

        this.camera = camera;
    }
}