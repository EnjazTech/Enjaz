export function createFilm(renderer) {
  return {
    resize() {},
    render(scene, camera) {
      renderer.render(scene, camera);
    },
    dispose() {},
  };
}
