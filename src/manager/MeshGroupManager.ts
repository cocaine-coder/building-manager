import { AbstractMesh, Mesh, Scene ,MultiMaterial} from "@babylonjs/core";

export default abstract class{

    
    
    /**
     *
     */
    constructor(protected scene:Scene) {
        
    }

    abstract getMeshes():Array<AbstractMesh>;
    
    clear(){
        const meshes = this.getMeshes();
    }
}