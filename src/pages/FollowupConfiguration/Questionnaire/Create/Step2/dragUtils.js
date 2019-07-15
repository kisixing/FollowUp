export const windowSrcoll = e => {
  const y = e.clientY;

  if (y > 800) {
    window.scrollBy(0, 10);
  }
  if (y < 130) {
    window.scrollBy(0, -10);
  }
};
export default 'ss';
