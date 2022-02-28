import { Node, Scene, SceneLoader } from "@babylonjs/core";

export default class SimpleManagerBase {
    protected parentNodes = new Array<Node>();

    /**
     *
     */
    constructor(protected scene: Scene, protected glbUrl: string) {

    }

    protected onLoaded?: () => void;

    async loadAsync() {
        const container = await SceneLoader.LoadAssetContainerAsync(this.glbUrl, undefined, this.scene);
        this.parentNodes.push(...container.meshes);
        container.addAllToScene();

        this.onLoaded?.call(this);
    }

    /**
     * 关闭整个父节点
     *
     * @param {boolean} value
     * @memberof BaseNodesManager
     */
    setEnabled(value: boolean) {
        this.parentNodes.forEach(node => node.setEnabled(value));
    }
}