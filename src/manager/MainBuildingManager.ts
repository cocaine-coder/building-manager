import { AbstractMesh, ActionManager, Color3, ExecuteCodeAction, InterpolateValueAction, Material, Mesh, Scene, StandardMaterial, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui';

import SimpleManager from "./SimpleManager";
import MarkMeshConfig, { MarkMeshType } from './config/MarkMeshConfig';

import mainUrl from '../assets/model/env/main.glb?url'
import SceneManager from "./SceneManager";
import { useIOTShowerStore } from "../stores/IOTStore";
import { useFloorStore } from '../stores/FloorStore';

export default class extends SimpleManager {

    private originMaterials: Map<string, Material> = new Map<string, Material>();
    private currentFloorMesh: AbstractMesh | undefined;
    private iotShowerStore = useIOTShowerStore();
    private floorStore = useFloorStore();
    private advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    //temp
    private currentControl: Control | undefined;

    constructor(scene: Scene, private sceneManager: SceneManager) {
        super(scene, mainUrl);

        this.onLoaded = () => {
            this.parentMeshes.forEach(mesh => {
                if (mesh.material) {
                    this.originMaterials.set(mesh.name, mesh.material);
                    if (mesh.name !== "9_primitive0_merged")
                        this.registAction4YKDSMesh(mesh);
                }
            });

            MarkMeshConfig.Instance.init(scene);
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
            this.currentFloorMesh.getChildMeshes().forEach(mesh => mesh.isVisible = false);
            this.currentFloorMesh = undefined;

            if (this.currentControl)
                this.advancedTexture.removeControl(this.currentControl);

            this.iotShowerStore.show = true;
            this.floorStore.meshName = '';
        }
    }

    goTo(mesh: AbstractMesh | string) {
        const gotoMesh = mesh instanceof AbstractMesh ? mesh : this.scene.getMeshByName(mesh);
        if (!gotoMesh || this.parentMeshes.findIndex(m => m.name === gotoMesh.name) === -1)
            return;

        this.floorStore.meshName = gotoMesh.name;
        if (this.currentFloorMesh) {
            this.registAction4YKDSMesh(this.currentFloorMesh);
            this.currentFloorMesh?.getChildMeshes().forEach(mesh => mesh.isVisible = false);
        }

        this.currentFloorMesh = gotoMesh;
        // 设置当前选中主楼的mesh Id
        gotoMesh.scaling = new Vector3(1, 1, 1);

        // 删除选中mesh的所有事件
        while (gotoMesh.actionManager!.actions.length > 0) {
            gotoMesh.actionManager?.unregisterAction(gotoMesh.actionManager!.actions[0]);
        }
        gotoMesh.actionManager?.dispose();

        this.showCurrentFloorMarkMeshes(gotoMesh.name, ["company"]);

        // 设置只显示主楼
        this.sceneManager.setEnable(false, 'mainbuilding');

        // 其他mesh隐藏
        this.parentMeshes.forEach(mesh => {
            mesh.setEnabled(mesh.id === gotoMesh.id);
        })

        this.iotShowerStore.show = false;
    }

    getCurrentFloorMarkMesheTypes(name: string): IterableIterator<MarkMeshType> | undefined {
        const typeMeshes = MarkMeshConfig.Instance.MarkMeshMap.get(name);
        if (typeMeshes) {
            return typeMeshes.keys();
        }
    }

    showCurrentFloorMarkMeshes(name: string, types: Array<MarkMeshType>) {
        if (!MarkMeshConfig.Instance.MarkMeshMap) return;

        const currentFloorMarkMeshes = MarkMeshConfig.Instance.MarkMeshMap.get(name);
        const currentFloorMesh = this.scene.meshes.find(mesh => mesh.name === name);
        if (!currentFloorMarkMeshes || !currentFloorMesh) return;

        currentFloorMesh.getChildren().forEach(node => (node as AbstractMesh).isVisible = false);

        types.forEach(type => {
            const typeMarkMeshes = currentFloorMarkMeshes.get(type);
            if (!typeMarkMeshes) return;

            typeMarkMeshes.forEach(mark => {
                if (mark.mesh) {
                    mark.mesh.setEnabled(true)
                    mark.mesh.isVisible = true;

                    if (!mark.mesh.actionManager) {
                        mark.mesh.actionManager = new ActionManager(this.scene);
                        mark.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, event => {
                            if (this.currentControl)
                                this.advancedTexture.removeControl(this.currentControl);

                            var rect1 = new Rectangle();
                            rect1.width = "250px";
                            rect1.height = "40px";
                            rect1.cornerRadius = 20;
                            rect1.color = "Orange";
                            // rect1.thickness = 4;
                            rect1.background = "#5b5c5f";
                            this.advancedTexture.addControl(rect1);
                            rect1.linkWithMesh(mark.mesh!);
                            rect1.linkOffsetY = -50;

                            var label = new TextBlock();
                            label.text = mark.message;
                            rect1.addControl(label);

                            this.currentControl = rect1;
                        }))
                    }
                }
            });
        })
    }

    private registAction4YKDSMesh(mesh: AbstractMesh) {
        mesh.actionManager = new ActionManager(this.scene);
        // 鼠标经过 mesh缩放
        mesh.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOutTrigger, mesh, "scaling", new Vector3(1, 1, 1), 150));
        mesh.actionManager.registerAction(new InterpolateValueAction(ActionManager.OnPointerOverTrigger, mesh, "scaling", new Vector3(1.2, 1, 1.2), 150));

        // 左键点击 
        mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnDoublePickTrigger, event => {
            const pointMesh = event.meshUnderPointer!;
            this.goTo(pointMesh);
        }));
    }
}