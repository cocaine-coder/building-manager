import { AbstractMesh, Action, ActionManager, ArcRotateCamera, Color4, ExecuteCodeAction, GlowLayer, InstancedMesh, Mesh, MeshBuilder, Scene, SceneLoader, Sprite, SpriteManager, Vector3 } from "@babylonjs/core";
import SkyManager from "./SkyManager";

import MainBuildingManager from "./MainBuildingManager";
import model from '../assets/model/all.glb?url';
import carModel from '../assets/model/car.glb?url';
import pointUrl from '../assets/imgs/point.png?url';

import { groupby } from "../utils/ArrayExtension";
import { createConeMarker, createSimpleBillboard } from "../utils/BJSExtension";
import { Control } from "@babylonjs/gui";

type ManagerType = "ground" | "downspout" | "guard" | "manholecover" | "parkline" | "light" | "mainbuilding"

export default class SceneManager {
    private static _instance: SceneManager;
    private declare scene: Scene;

    public declare camera: ArcRotateCamera;
    public declare sky: SkyManager;
    public declare mainBuildingManager: MainBuildingManager;

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
        //container.addAllToScene()
        const meshGroup = groupby(container.meshes, mesh => {
            if (mesh.name.indexOf("primitive") !== -1) {
                return mesh.name.split('_')[0];
            }
            return undefined;
        });

        meshGroup.forEach((meshes, key) => {
            if (meshes.length === 1 || !key) {
                meshes.forEach(mesh => this.scene.addMesh(mesh));
            }
            else {
                const merged = Mesh.MergeMeshes(meshes.map(mesh => mesh as Mesh), true, true, undefined, false, true);
                if (merged) merged.name = key;
            }
        })

        // 加载车辆资源
        const carContainer = await SceneLoader.LoadAssetContainerAsync(carModel, undefined, scene);
        carContainer.addAllToScene();

        var gl = new GlowLayer("glow", scene, {
            mainTextureFixedSize: 1024,
            blurKernelSize: 64
        });
        gl.intensity = 1;

        const spriteManagerTrees = new SpriteManager("treesManager", pointUrl, 2000, { width: 512, height: 1024 }, scene);
        const tree = new Sprite("tree", spriteManagerTrees);

        tree.width = 4;
        tree.height = 5;

        createSimpleBillboard("悉地集团有限公司", scene.getMeshByName("other8")!);

        this.mainBuildingManager = new MainBuildingManager(scene);
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
                case 'Escape': this.mainBuildingManager.leave(); break;
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
        camera.upperRadiusLimit = camera.radius * 3;   // 最大缩放
        camera.lowerBetaLimit = 0;  // 最低纵轴旋转
        camera.upperBetaLimit = Math.PI / 2;  // 最高纵轴旋转

        camera.panningSensibility = 200; // 控制平移阻尼 越大平移速度越慢
        camera.wheelDeltaPercentage = 0.005; // 控制滚轮增量
        camera.attachControl(scene.getEngine().getRenderingCanvas(), true);

        this.camera = camera;
    }
}