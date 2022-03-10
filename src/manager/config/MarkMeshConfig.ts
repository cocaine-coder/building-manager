import { AbstractMesh, Color3, Scene, SceneLoader, StandardMaterial, Vector3 } from "@babylonjs/core";

import JASModel from '../../assets/model/infos/3f/JAS.glb?url'
import JSOfficeModel from '../../assets/model/infos/3f/JSOffice.glb?url'
import OtherModel from '../../assets/model/infos/3f/Other.glb?url'
import SHCHModel from '../../assets/model/infos/3f/SHCH.glb?url'

type MarkMeshType = "company" | "webcam" | "office";
type ResourceType = "point" | "url"

type MarkMesh = {
    name: string,
    message: string,
    resourceType: ResourceType,
    src?: string,
    mesh?: AbstractMesh,
    position?: Vector3,
    color?: Color3,
    scaling?: Vector3,
}

const MarkMeshMap = new Map<string, Map<MarkMeshType, Array<MarkMesh>>>();

// 三层MarkMesh
MarkMeshMap.set("4_primitive0_merged", new Map<MarkMeshType, Array<MarkMesh>>([
    ["company", [
        {
            name: "山湖测绘有限公司",
            message: "山湖测绘有限公司",
            resourceType: "url",
            src: SHCHModel,
            color: Color3.Teal()
        },
        {
            name: "吉埃思数据科技有限公司",
            message: "吉埃思数据科技有限公司",
            resourceType: "url",
            src: JASModel,
            color: Color3.Red(),
        },
        {
            name: "其他公司",
            message: "其他公司",
            resourceType: "url",
            src: OtherModel,
            color: Color3.Yellow(),
        }]],
    ["office", [
        {
            name: "教授办公室",
            message: "教授办公室",
            resourceType: "url",
            src: JSOfficeModel,
            color: Color3.Black()
        }]]
    // ["webcam", [{
    //     name: "摄像头1",
    //     message: "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/G85698102/1.hd.live&autoplay=1&accessToken=at.4qfgqb3l63rkvxv0din7o4yq5ernlyp7-3ra5vjhwwh-018fgjq-upmajw9um",
    //     resourceType: "url",
    // }]]
]));

/**
 * 标记配置单例实现
 * 
 * @example
 * // 在父节点加载完毕后执行
 * MarkMeshConfig.Instance.init(scene);
 * 
 * // 获取map
 * MarkMeshConfig.Instance.MarkMeshMap;
 *
 * @export
 * @class MarkMeshConfig
 */
export default class MarkMeshConfig {

    private static config: MarkMeshConfig | undefined;
    public declare MarkMeshMap: Map<string, Map<MarkMeshType, Array<MarkMesh>>>;

    private constructor() {
    }

    public static get Instance() {
        if (!this.config)
            this.config = new MarkMeshConfig();
        return this.config;
    }

    public init(scene: Scene) {
        this.MarkMeshMap = this.buildMarkMeshConfig(scene);
    }

    private buildMarkMeshConfig(scene: Scene): Map<string, Map<MarkMeshType, Array<MarkMesh>>> {

        MarkMeshMap.forEach((meshArrayGroup, name) => {
            // 获取父节点
            const parentMesh = scene.getMeshByName(name);
            if (parentMesh === null) throw Error("mark mesh : get parent-mesh error!");

            meshArrayGroup.forEach(marks => {
                marks.forEach(mark => {
                    switch (mark.resourceType) {
                        case "url":
                            SceneLoader.LoadAssetContainer(mark.src!, undefined, scene, container => {
                                const mesh = container.meshes[1];
                                mark.mesh = mesh;
                                this.buildMesh(mark, parentMesh, scene);
                            })
                            break;
                    }
                })
            })
        })

        return MarkMeshMap;
    }

    private buildMesh(mark: MarkMesh, parent: AbstractMesh, scene: Scene) {
        const mesh = mark.mesh;
        if (!mesh) throw Error("can't find a resource to create mark mesh");

        if (mark.position)
            mesh.position = mark.position;
        if (mark.scaling)
            mesh.scaling = mark.scaling;
        if (mark.color) {
            const material = new StandardMaterial(`${mark.name}_material`, scene);
            if (mark.color)
                material.diffuseColor = mark.color;
            mesh.material = material;
        }

        mesh.name = `${mark.name}_${mark.resourceType}`;
        mesh.setEnabled(false);

        parent.addChild(mesh);
        scene.addMesh(mesh);
    }
}

export type {
    MarkMesh,
    MarkMeshType
}
