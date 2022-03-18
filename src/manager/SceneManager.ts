import { ArcRotateCamera, Scene, Vector3 } from "@babylonjs/core";
import SkyManager from "./SkyManager";
import SimpleManager from "./SimpleManager";
import StreetLightManager from "./StreetLightManager";

import downspoutUrl from '../assets/model/env/downspout.glb?url'
import groundUrl from '../assets/model/env/ground.glb?url'
import guardUrl from '../assets/model/env/guard.glb?url'
import manholecoverUrl from '../assets/model/env/manholecover.glb?url'
import parklineUrl from '../assets/model/env/parkline.glb?url'
import MainBuildingManager from "./MainBuildingManager";

type ManagerType = "ground" | "downspout" | "guard" | "manholecover" | "parkline" | "light" | "mainbuilding"

export default class SceneManager {

    private static _instance: SceneManager;
    private declare scene: Scene;
    private declare camera: ArcRotateCamera;
    private declare sky: SkyManager;

    private declare ground: SimpleManager;
    private declare downspout: SimpleManager;
    private declare guard: SimpleManager;
    private declare manholecover: SimpleManager;
    private declare parkline: SimpleManager;

    private declare light: StreetLightManager;
    private declare mainbuilding: MainBuildingManager;

    private declare managerMap: Map<ManagerType, SimpleManager>;

    private constructor() {
    }

    static get Instance() {
        if (!this._instance)
            this._instance = new SceneManager();
        return this._instance;
    }

    init(scene: Scene) {
        this.scene = scene;
        this.managerMap = new Map<ManagerType, SimpleManager>();
        this.createMainCamera(scene);   // 创建相机
        this.sky = new SkyManager(scene);   // 创建天空

        const tasks = new Array<Promise<void>>();

        this.ground = new SimpleManager(scene, groundUrl);
        tasks.push(this.ground.loadAsync());

        this.guard = new SimpleManager(scene, guardUrl);
        tasks.push(this.guard.loadAsync());

        this.manholecover = new SimpleManager(scene, manholecoverUrl);
        tasks.push(this.manholecover.loadAsync());

        this.parkline = new SimpleManager(scene, parklineUrl);
        tasks.push(this.parkline.loadAsync());

        this.downspout = new SimpleManager(scene, downspoutUrl)
        tasks.push(this.downspout.loadAsync());

        this.light = new StreetLightManager(scene);
        tasks.push(this.light.loadAsync());

        this.mainbuilding = new MainBuildingManager(scene, this);
        tasks.push(this.mainbuilding.loadAsync());

        this.addWindowKeyboardEvent();  // 添加键盘事件

        this.managerMap.set('ground', this.ground);
        this.managerMap.set('guard', this.guard);
        this.managerMap.set('manholecover', this.manholecover);
        this.managerMap.set('parkline', this.parkline);
        this.managerMap.set('downspout', this.downspout);
        this.managerMap.set('light', this.light);
        this.managerMap.set('mainbuilding', this.mainbuilding);

        return Promise.all(tasks);
    }

    setEnable(value: boolean, ...excepts: ManagerType[]) {
        this.managerMap.forEach((manager, key) => {
            if (excepts.indexOf(key) == -1)
                manager.setEnabled(value);
            else
                manager.setEnabled(!value);
        })
    }

    private addWindowKeyboardEvent() {
        window.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 27:    //esc 恢复原状
                    this.goOrigin(); break;
                case 49:    // 1 白天
                    this.sky.change('day');
                    this.light.setLightEnable(false);
                    break;
                case 50:    // 2 日落
                    this.sky.change('sunset');
                    this.light.setLightEnable(true);
                    break;
                case 51:    // 3 黑天 
                    this.sky.change('night');
                    this.light.setLightEnable(true);
                    break;
                case 57:    // 9 进入透明模式
                    this.mainbuilding.setTransparent(); break;
                case 48:    // 0 恢复material
                    this.mainbuilding.setTransparent(1);
                    break;
            }
        })
    }

    goOrigin() {
        this.mainbuilding.goBack();

        this.camera.alpha = Math.PI / 2;
        this.camera.beta = Math.PI / 2.2;
        this.camera.radius = 100;
        this.camera.target.x = 0;
        this.camera.target.y = 0;
        this.camera.target.z = -30;
    }

    goTo(mainMeshName: string) {
        this.mainbuilding.goTo(mainMeshName);
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
        //camera.panningSensibility = 0; // 禁止平移
        camera.lowerRadiusLimit = 0;//camera.radius * 0.5; // 最低缩放
        //camera.upperRadiusLimit = camera.radius * 1;   // 最大缩放
        camera.lowerBetaLimit = 0;  // 最低纵轴旋转
        camera.upperBetaLimit = Math.PI / 2;  // 最高纵轴旋转
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

        this.camera = camera;
    }
}