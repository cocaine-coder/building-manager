import { AbstractMesh, Color3, Mesh, MeshBuilder, Scene, SceneOptimizerOptions, StandardMaterial, Texture, Vector3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Line, TextBlock } from "@babylonjs/gui";

interface MarkerOptions {
    position: Vector3,
    color?: Color3,
    size?: number,
}

export function createConeMarker(name: string, options: MarkerOptions, scene: Scene) {
    const marker = MeshBuilder.CreateCylinder(name, {
        diameterBottom: 0,
        height: 1
    }, scene);

    marker.position = options.position;
    if (options.size) {
        marker.scaling.x *= options.size;
        marker.scaling.y *= options.size;
        marker.scaling.z *= options.size;
    }
    const color = options.color || Color3.Red();
    const material = new StandardMaterial(`material_${name}`, scene);
    material.emissiveColor = color;
    marker.material = material;

    marker.billboardMode = Mesh.BILLBOARDMODE_ALL;

    return marker;
}

let advancedTexture  : AdvancedDynamicTexture | undefined;

export function createSimpleBillboard(message: string, target: AbstractMesh) {
    
    if(!advancedTexture){
        advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
    }

    const lable = new TextBlock();
    lable.text = message;
    advancedTexture.addControl(lable);
    lable.linkWithMesh(target);
    lable.linkOffsetY = -30;

    return lable;

    // const line = new Line();
    // line.lineWidth = 2;
    // line.color = "Orange";
    // advancedTexture.addControl(line);
    // line.linkWithMesh(target);
    // line.connectedControl = lable;
}