import { AbstractMesh, ActionManager, ArcRotateCamera, Color3, ExecuteCodeAction, InterpolateValueAction, Material, Mesh, MeshBuilder, MultiMaterial, Scene, SetValueAction, StandardMaterial, Vector3, VideoTexture } from "@babylonjs/core";
import { AdvancedDynamicTexture, Control, Rectangle, TextBlock } from '@babylonjs/gui';

export type FloorChildType = "item" | "webcam" | "furniture";

interface FloorChild {
    name: string
    message: string
    mesh?: AbstractMesh
}

const FloorMaps = new Map<string, Map<FloorChildType, Array<FloorChild>>>([
    ["2", new Map<FloorChildType, Array<FloorChild>>()],
    ["3", new Map<FloorChildType, Array<FloorChild>>()],
    ["4", new Map<FloorChildType, Array<FloorChild>>([
        ["item", [
            { name: "4-1", message: "" },
            { name: "4-2", message: "" },
            { name: "4-3", message: "" },
            { name: "4-4", message: "" },
            { name: "4-5", message: "" },
            { name: "4-6", message: "" },
            { name: "4-7", message: "" },
            { name: "4-8", message: "" },
            { name: "4-9", message: "" },
            { name: "4-10", message: "" },
            { name: "4-11", message: "" },
            { name: "4-12", message: "" },
            { name: "4-13", message: "" },
        ]],
        ["furniture", [
            { name: "Jiaju", message: "" },
        ]]
    ])],
    ["5", new Map<FloorChildType, Array<FloorChild>>()],
    ["6", new Map<FloorChildType, Array<FloorChild>>()],
    ["7", new Map<FloorChildType, Array<FloorChild>>()],
])


class Floor {

    private readonly mesh: AbstractMesh;
    private readonly children: Map<FloorChildType, Array<FloorChild>>;

    /**
     *
     */
    constructor(private scene: Scene, private readonly name: string) {
        this.mesh = this.scene.getMeshByName(this.name)!;
        this.mesh.overlayColor = Color3.FromHexString("#000000");
        this.mesh.actionManager = new ActionManager(scene);

        const floorMap = FloorMaps.get(this.name)!;
        floorMap.forEach((children) => {
            children.forEach(child => {
                child.mesh = scene.getMeshByName(child.name)!;
                child.mesh.overlayColor = Color3.FromHexString("#000000");
                //child.mesh.parent = this.mesh;
            })
        })
        this.children = floorMap;

        this.registMeshAction(this.mesh);
    }

    get displayName() {
        return Number.parseInt(this.name) - 1 + "F";
    }

    get meshes(){
        const ret = [this.mesh];
        this.children.forEach(child=>{
            child.forEach(mesh=>    {
                ret.push(mesh.mesh!);
            })
        })

        return ret;
    }

    /**
     * 设置单层是否可用，影响floor中所有mesh
     *
     * @param {boolean} value
     * @memberof Floor
     */
    setEnable(value: boolean) {
        this.mesh.setEnabled(value);
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

    private registMeshAction(mesh:AbstractMesh) {
        mesh.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger,e=>{
            mesh.renderOverlay  = true;
            this.children.get('item')?.forEach(item=>{
                item.mesh!.renderOverlay = true;
            })
        }));
        mesh.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger,e=>{
            mesh.renderOverlay  = false;
            this.children.get('item')?.forEach(item=>{
                item.mesh!.renderOverlay = false;
            })
        }));

        mesh.actionManager!.registerAction(new ExecuteCodeAction(ActionManager.OnDoublePickTrigger,e=>{
           this.scene.meshes.forEach(mesh=>{
               if(mesh.name !== 'skyBox' && this.meshes.every(x=>x.name !== mesh.name)){
                    mesh.isVisible = false;
               }
           })
        }));
    }
}

export default class {
    private floors = new Array<Floor>();
    constructor(private scene: Scene) {
        FloorMaps.forEach((value, key) => {
            this.floors.push(new Floor(scene, key));
        })
    }
}