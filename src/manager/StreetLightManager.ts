// import { Color3, Mesh, Scene, SpotLight, Vector3 } from "@babylonjs/core";
// import NodeNameConfig from "./config/NodeNameConfig";

// import lightUrl from '../assets/model/env/light.glb?url';

// default class {
//     constructor(scene: Scene) {

//         this.onLoaded = () => {

//             this.parentMeshes.forEach(mesh => {
//                 if (mesh.name.endsWith('1') && mesh.name.indexOf('.0') !== -1) {

//                     const localPositions = mesh.getFacetLocalPositions();
//                     let position = Vector3.Zero();
//                     localPositions.forEach(p => {
//                         position.x -= p.y / localPositions.length;
//                         position.y -= p.z / localPositions.length;
//                         position.z -= p.x / localPositions.length;
//                     })

//                     const lampLight = new SpotLight(
//                         NodeNameConfig.STREET_LIGHT_NAME,
//                         position,
//                         new Vector3(0, -1, 0),
//                         Math.PI * 2,
//                         500,
//                         this.scene);

//                     lampLight.diffuse = Color3.FromHexString("#FF8C00");
//                     lampLight.intensity = 1000;
//                 }
//             })

//             this.setLightEnable(false);
//         }
//     }

//     setEnabled(value: boolean): void {
//         setEnabled(value);
//     }

//     setLightEnable(value: boolean) {
//         this.scene.lights.forEach(light =>
//             light.setEnabled(light.name !== NodeNameConfig.STREET_LIGHT_NAME || value));
//     }
// }