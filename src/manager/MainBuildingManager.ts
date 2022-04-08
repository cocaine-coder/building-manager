import { AbstractMesh, ActionManager, Color3, ExecuteCodeAction, Scene } from "@babylonjs/core";
import NodeNameConfig from "../config/NodeNameConfig";

export type FloorChildType = "item" | "webcam" | "furniture";

interface FloorChild {
    name: string
    message: string
    mesh?: AbstractMesh
}

let currentFloor: Floor | undefined;

const FloorMaps = new Map<string, Map<FloorChildType, Array<FloorChild>>>([
    ["1", new Map<FloorChildType, Array<FloorChild>>()],
    ["2", new Map<FloorChildType, Array<FloorChild>>()],
    ["3", new Map<FloorChildType, Array<FloorChild>>([
        ["item", [
            { name: "3-1", message: "" },
            { name: "3-2", message: "" },
            { name: "3-3", message: "" },
            { name: "3-4", message: "" },
            { name: "3-5", message: "" },
            { name: "3-6", message: "" },
            { name: "3-7", message: "" },
            { name: "3-8", message: "" },
            { name: "3-9", message: "" },
            { name: "3-10", message: "" },
            { name: "3-11", message: "" },
            { name: "3-12", message: "" },
            { name: "3-13", message: "" },
        ]],
        ["furniture", [
            { name: "3-JiaJu", message: "" },
        ]]
    ])],
    ["4", new Map<FloorChildType, Array<FloorChild>>()],
    ["5", new Map<FloorChildType, Array<FloorChild>>()],
    ["6", new Map<FloorChildType, Array<FloorChild>>()],
])


class Floor {

    private readonly mesh: AbstractMesh;
    private readonly children: Map<FloorChildType, Array<FloorChild>>;

    /**
     *
     */
    constructor(private scene: Scene, public readonly name: string) {
        this.mesh = this.scene.getMeshByName(this.name)!;
        this.mesh.overlayColor = Color3.FromHexString("#000000");

        const floorMap = FloorMaps.get(this.name)!;
        floorMap.forEach((children) => {
            children.forEach(child => {
                child.mesh = scene.getMeshByName(child.name)!;
                child.mesh.overlayColor = Color3.FromHexString("#000000");
            })
        })
        this.children = floorMap;

        this.initActions();
    }

    get meshes() {
        const ret = [this.mesh];
        this.children.forEach(child => {
            child.forEach(mesh => {
                ret.push(mesh.mesh!);
            })
        })

        return ret;
    }

    /**
     * 设置是否可见
     *
     * @param {boolean} value
     * @param {(...Array<FloorChildType | "self")} excepts 排除并设置相反值
     * @memberof Floor
     */
    setVisible(value: boolean, ...excepts: Array<FloorChildType | "self">) {
        this.mesh.isVisible = value;
        this.mesh.getChildMeshes().forEach(child => {
            child.isVisible = value;
        })

        excepts.forEach(except => {
            if (except === 'self') {
                this.mesh.isVisible = !value;
            } else {
                this.children.get(except)?.forEach(child => {
                    child.mesh!.isVisible = !value;
                })
            }
        })
    }

    enter() {
        // 设置显示隐藏 显示天空及当前floor的mesh
        this.scene.meshes.forEach(mesh => {
            mesh.isVisible = mesh.name === NodeNameConfig.SKY_BOX_NAME ||
                this.meshes.find(m => m.name === mesh.name) !== undefined;
        })

        // 当前floor meshes 还原状态，删除action
        this.meshes.forEach(mesh => {
            mesh.actionManager!.actions
                .forEach(action => mesh.actionManager?.unregisterAction(action));
            mesh.renderOverlay = false;

            if (mesh === this.mesh) return;

            mesh.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, e => {
                mesh.renderOverlay = true;
            }));
            mesh.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, e => {
                mesh.renderOverlay = false;
            }));
        });
    }

    leave() {
        this.initActions();
    }

    private initActions() {
        this.meshes.forEach(mesh => {
            if (mesh.actionManager)
                mesh.actionManager.dispose();
            mesh.actionManager = new ActionManager(this.scene);

            mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, e => {
                this.meshes.forEach(mesh => mesh.renderOverlay = true);
            }));
            mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, e => {
                this.meshes.forEach(mesh => mesh.renderOverlay = false);
            }));
            mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnDoublePickTrigger, e => {
                currentFloor = this;
                this.enter();
            }));
        })
    }
}

export default class {
    private _floorNames: Array<string> | undefined;
    private floors = new Array<Floor>();

    constructor(private scene: Scene) {
        FloorMaps.forEach((_, key) => {
            this.floors.push(new Floor(scene, key));
        })
    }

    get floorNames() {
        if (!this._floorNames)
            this._floorNames = this.floors.map(f => f.name);
        return this._floorNames;
    }

    enter(floorName: string) {
        const floor = this.floors.find(f => f.name === floorName);
        if (!floor) throw Error(`floor : ${floorName} is not existed !`);

        currentFloor?.leave();
        currentFloor = floor;
        currentFloor.enter();
    }

    leave() {
        currentFloor?.leave();
        currentFloor = undefined;
        this.scene.meshes.forEach(mesh => mesh.isVisible = true);
    }
}