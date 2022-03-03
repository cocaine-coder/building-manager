import { AbstractMesh, ActionManager, Color3, ExecuteCodeAction, InterpolateValueAction, Material, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import SimpleManager from "./SimpleManager";

import mainUrl from '../assets/model/env/main.glb?url'
import SceneManager from "./SceneManager";

export default class extends SimpleManager {

    private originMaterials: Map<string, Material> = new Map<string, Material>();
    private currentFloorMesh: AbstractMesh | undefined;

    constructor(scene: Scene, private sceneManager: SceneManager) {
        super(scene, mainUrl);

        this.onLoaded = () => {
            this.parentMeshes.forEach(mesh => {
                if (mesh.material) {
                    this.originMaterials.set(mesh.name, mesh.material);
                    if (mesh.name !== "9_primitive0_merged")
                        this.registAction4YKDSMesh(mesh);
                }
            })
        }
    }

    /**
    * 设置透明
    * @param alpha 透明度 当 >=1 时 恢复本身materials
    */
    setTransparent(alpha: number = 0.3) {
        if (alpha >= 1) {
            this.parentMeshes.forEach(mesh => {
                mesh.material = this.originMaterials.get(mesh.name)!;
            });
        } else {
            const material = new StandardMaterial("trans_material", this.scene);
            material.diffuseColor = new Color3(1, 1, 1);
            material.alpha = alpha;
            this.parentMeshes.forEach(mesh => {
                mesh.material = material;
            });
        }
    }

    /**
     * 返回主楼主体 设置所有显示正常
     *
     */
    goBack() {
        if (this.currentFloorMesh) {
            this.registAction4YKDSMesh(this.currentFloorMesh);
            this.sceneManager.setEnable(true);
            this.currentFloorMesh = undefined;
        }
    }

    private registAction4YKDSMesh(mesh: AbstractMesh) {
        mesh.actionManager = new ActionManager(this.scene);
        // 鼠标经过 mesh缩放
        mesh.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOutTrigger, mesh, "scaling", new Vector3(1, 1, 1), 150));
        mesh.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOverTrigger, mesh, "scaling", new Vector3(1.2, 1, 1.2), 150));

        // 左键点击 
        mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnDoublePickTrigger, event => {
            const pointMesh = event.meshUnderPointer!;
            this.currentFloorMesh = pointMesh;

            // 设置当前选中主楼的mesh Id
            pointMesh.scaling = new Vector3(1, 1, 1);

            // 删除选中mesh的所有事件
            while (pointMesh.actionManager!.actions.length > 0) {
                pointMesh.actionManager?.unregisterAction(pointMesh.actionManager!.actions[0]);
            }
            pointMesh.actionManager?.dispose();

            // 设置只显示主楼
            this.sceneManager.setEnable(false, 'mainbuilding');

            // 其他mesh隐藏
            this.parentMeshes.forEach(mesh => {
                mesh.setEnabled(mesh.id === pointMesh.id);
            })
        }));
    }
}