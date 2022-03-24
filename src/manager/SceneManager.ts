import { ArcRotateCamera, Mesh, Scene, SceneLoader, Vector3 } from "@babylonjs/core";
import SkyManager from "./SkyManager";

import MainBuildingManager from "./MainBuildingManager";
import model from '../assets/model/all.glb?url';
import { groupby } from "../utils/ArrayExtension";

type ManagerType = "ground" | "downspout" | "guard" | "manholecover" | "parkline" | "light" | "mainbuilding"

export default class SceneManager {

    private static _instance: SceneManager;
    private declare scene: Scene;

    public declare camera: ArcRotateCamera;
    public declare sky: SkyManager;

    private constructor() {
    }

    /**
     * 获取单例
     *
     * @readonly
     * @static
     * @memberof SceneManager
     */
    static get Instance() {
        if (!this._instance)
            this._instance = new SceneManager();
        return this._instance;
    }

    /**
     * 异步初始化
     * 进行其他操作之前必须调用
     *
     * @param {Scene} scene
     * @memberof SceneManager
     */
    async initAsync(scene: Scene) {
        this.scene = scene;
        this.createMainCamera(scene);
        this.sky = new SkyManager(scene);

        const container = await SceneLoader.LoadAssetContainerAsync(model, undefined, scene);
        const meshGroup = groupby(container.meshes, mesh =>mesh.parent?.name, mesh => mesh as Mesh);
        meshGroup.forEach((meshes, key) => {
            console.log(key, meshes.map(x=>x.name).join(","))
            if (meshes.length === 1 || !key || key === "Group018") {
                meshes.forEach(mesh => this.scene.addMesh(mesh));
                return;
            }

            const merged = Mesh.MergeMeshes(meshes, true, true, undefined, false, true);
            merged!.name = key;
        })

        new MainBuildingManager(scene);

        this.addWindowKeyboardEvent();
    }

    /**
     * 添加键盘操作
     *
     * @private
     * @memberof SceneManager
     */
    private addWindowKeyboardEvent() {
        window.addEventListener('keydown', e => {
            switch (e.key) {

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
        //camera.panningSensibility = 0; // 禁止平移
        camera.lowerRadiusLimit = 0;//camera.radius * 0.5; // 最低缩放
        //camera.upperRadiusLimit = camera.radius * 1;   // 最大缩放
        camera.lowerBetaLimit = 0;  // 最低纵轴旋转
        camera.upperBetaLimit = Math.PI / 2;  // 最高纵轴旋转

        camera.panningSensibility = 200; // 控制平移阻尼 越大平移速度越慢
        camera.wheelDeltaPercentage = 0.005; // 控制滚轮增量
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

        this.camera = camera;
    }
}