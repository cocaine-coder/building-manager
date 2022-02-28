import { Scene } from '@babylonjs/core'
import { useState } from 'react'
import './App.css'

import SceneComponent from './components/SceneComponent'
import SceneManager from './manager/SceneManager'

function App() {

  function onSceneReady(scene: Scene) {
    SceneManager.Instance.init(scene);
  }

  return (
    <div className="App">
      <SceneComponent
        className="scene-container"
        onSceneReady={onSceneReady}
        onRender={undefined}
        antialias={true}
        adaptToDeviceRatio></SceneComponent>
    </div>
  )
}

export default App
