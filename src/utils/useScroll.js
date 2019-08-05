/* eslint-disable no-plusplus */

// const interval = 60
// let times = 0
export default () => {
  const ref = useRef(null);
  const scroll = () => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // const { current: { offsetTop } } = ref
    // times = 0

    // const index = setInterval(() => {
    //     times++
    //     console.log('zzz')
    //     const distance = (offsetTop - window.scrollY) / 6
    //     if (Math.abs(offsetTop - window.scrollY) < 20 || times > 10) {
    //         clearInterval(index)
    //         window.scrollTo(0, offsetTop)

    //     }
    //     window.scrollBy(0, distance)

    // }, interval)
  };

  return [ref, scroll];
};
