import {  Animation, Animatable, ArcRotateCamera,CubicEase, GlowLayer, Mesh, Scene, SceneLoader, Vector3, EasingFunction, MeshBuilder } from "@babylonjs/core";

import SkyManager from "./SkyManager";
import MainBuildingManager from "./MainBuildingManager";

import carModel from '../assets/model/car.glb?url';
import groundModel from '../assets/model/ground.glb?url';
import mainModel from '../assets/model/main.glb?url';
import otherModel from '../assets/model/other.glb?url';
import treeModel from '../assets/model/tree.glb?url';
import undergroundModel from '../assets/model/underground.glb?url';

import { groupby } from "../utils/ArrayExtension";

export default class SceneManager {
    private static _instance: SceneManager;

    private declare cameraOrgPosition: Vector3;
    private declare cameraOrgTarget: Vector3;
    private cameraAnimatables = new Array<Animatable>();

    public declare scene: Scene;
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

        await Promise.all([groundModel,mainModel,otherModel,treeModel,undergroundModel].map(model=>{
            return this.loadAndMergerMeshAsync(model);
        }));

        // 加载车辆资源
        const carContainer = await SceneLoader.LoadAssetContainerAsync(carModel, undefined, scene);
        carContainer.addAllToScene();

        // 发光物高亮
        var gl = new GlowLayer("glow", scene, {
            mainTextureFixedSize: 1024,
            blurKernelSize: 64
        });
        gl.intensity = 1;

        this.mainBuildingManager = new MainBuildingManager(scene);
        this.addWindowKeyboardEvent();
    }

    /**
     * 相机飞入动画
     * @param property  改变的属性 位置和朝向 
     * @param to 终点值
     * @param onAnimationEnd 动画结束事件
     */
    flyto(property: "position" | "target", to: Vector3, onAnimationEnd?: (() => void)) {
        const ease = new CubicEase();
        ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
        this.cameraAnimatables.forEach(animatable => animatable.stop());

        const from = property === 'position' ? this.camera.position : this.camera.target;
        const animatable = Animation.CreateAndStartAnimation("flyto", this.camera, property, 60, 120, from, to, 0, ease, onAnimationEnd);
        if (animatable)
            this.cameraAnimatables.push(animatable);
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
        this.cameraOrgPosition = camera.position.clone();
        this.cameraOrgTarget = camera.target.clone();
    }

    /**
     * 加载并合并mesh
     * @param url mesh url
     */
    private async loadAndMergerMeshAsync(url: string) {
        const container = await SceneLoader.LoadAssetContainerAsync(url, undefined, this.scene);
  
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
    }
}