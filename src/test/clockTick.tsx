/**
 * Move all d3 transitions a specified amount of milliseconds forward in time.
 * @param milliseconds Milliseconds to move transitions forward in time
 */
export function clockTick(milliseconds: number) {
  const currentNow = performance.now();

  const now = performance.now;
  performance.now = () => currentNow + milliseconds;
  // The new animation frame means d3's timers will check performance.now() again
  return new Promise((resolve) =>
    requestAnimationFrame((time) => {
      performance.now = now;
      resolve(time);
    })
  );
}
