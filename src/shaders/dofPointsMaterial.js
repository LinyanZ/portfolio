import * as THREE from "three";
import { extend } from "@react-three/fiber";
import particleVertexShader from "./particleVertexShader";
import particleFragmentShader from "./particleFragmentShader";

class DofPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTimeMovement: { value: 0 },
        uTimeTwinkling: { value: 0 },
        uSizeXY: { value: 250 },
        uSizeZ: { value: 10000 },
        uOffsetZ: { value: 600 },
        uFocus: { value: -500 },
        uBlur: { value: 0.3 },
        uFade: { value: 0.9 },
        uPointSize: { value: 1 },
        uOpacity: { value: 0 },
        uCameraPos: { value: new THREE.Vector3(0, 0, 0) },
        uCameraLookAt: { value: new THREE.Vector3(0, 0, 0) },
      },
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
  }
}

extend({ DofPointsMaterial });
