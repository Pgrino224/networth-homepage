import * as THREE from 'three';

// Utility function to create line geometry
export const createLineGeometry = (start: THREE.Vector3, end: THREE.Vector3) => {
  const points = [start, end];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return geometry;
};

// Utility function to create a line between two points
export const createLine = (
  start: { x: number; y: number; z: number },
  end: { x: number; y: number; z: number },
  color: string,
  opacity: number = 1
) => {
  const points = [
    new THREE.Vector3(start.x, start.y, start.z),
    new THREE.Vector3(end.x, end.y, end.z)
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ 
    color, 
    opacity, 
    transparent: opacity < 1 
  });
  return new THREE.Line(geometry, material);
};