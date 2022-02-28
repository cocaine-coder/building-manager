import { Engine, EngineOptions, Scene, SceneOptions, SceneLoader, Color4 } from "@babylonjs/core";
import { GLTFFileLoader } from 'babylonjs-loaders'
import { useEffect, useRef, FC } from "react";

type SceneComponentPropsType = {
    className?: string
    antialias?: boolean
    engineOptions?: EngineOptions
    adaptToDeviceRatio?: boolean
    sceneOptions?: SceneOptions
    onRender?: (scene: Scene) => void
    onSceneReady: (scene: Scene) => void
}

const SceneComponent: FC<SceneComponentPropsType> = ({ antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, className }) => {
    const reactCanvas = useRef(null);

    useEffect(() => {
        SceneLoader.RegisterPlugin(new GLTFFileLoader());

        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            scene.clearColor = new Color4(0, 0, 0, 1);

            if (scene.isReady()) {
                onSceneReady(scene);
            } else {
                scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === "function") {
                    onRender(scene);
                }
                scene.render();
            });

            const resize = () => {
                scene.getEngine().resize();
            };

            if (window) {
                window.addEventListener("resize", resize);
            }

            return () => {
                scene.getEngine().dispose();

                if (window) {
                    window.removeEventListener("resize", resize);
                }
            };
        }
    }, [reactCanvas]);

    return <canvas ref={reactCanvas} className={className} />;
};

export default SceneComponent;