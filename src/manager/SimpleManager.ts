import { AbstractMesh, Mesh, MultiMaterial, Scene, SceneLoader } from "@babylonjs/core";
import { groupby } from "../utils/ArrayExtension";

export default class SimpleManager {
    protected parentMeshes = new Array<AbstractMesh>();

    /**
     *
     */
    constructor(protected scene: Scene, protected glbUrl: string, private merge: boolean = true) {

    }

    protected onLoaded?: () => void;

    async loadAsync() {
        const container = await SceneLoader.LoadAssetContainerAsync(this.glbUrl, undefined, this.scene);

        if (this.merge) {
            // 通过mesh名称合并 mesh
            let meshMap = groupby(container.meshes, v => v.name.split('_')[0], v => v as Mesh);

            meshMap.forEach((meshGroup, key) => {

                if (meshGroup.length < 2) {
                    this.parentMeshes.push(meshGroup[0]);
                    this.scene.addMesh(meshGroup[0])
                    return;
                }

                try {
                    // 合并mesh
                    let mesh = Mesh.MergeMeshes(meshGroup, true, true, undefined, false, true);
                    if (mesh)
                        this.parentMeshes.push(mesh);
                } catch (error) {
                    console.error(error);
                }
            });

        } else {
            this.parentMeshes.push(...container.meshes);

            container.meshes.forEach(mesh => {
                this.scene.addMesh(mesh);
            })
        }

        this.parentMeshes.forEach(mesh => {
            const material = mesh.material;
            if (!material) return;

            if (material instanceof MultiMaterial) {
                material.getChildren().forEach(child => (child as any).maxSimultaneousLights = 12);
            } else {
                (material as any).maxSimultaneousLights = 12;
            }
        })

        this.onLoaded?.call(this);
    }

    /**
     * 关闭整个父节点
     *
     * @param {boolean} value
     * @memberof SimpleManager
     */
    setEnabled(value: boolean) {
        this.parentMeshes.forEach(mesh => mesh.setEnabled(value));
    }
}