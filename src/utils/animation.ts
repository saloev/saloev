import { TimelineMax } from 'gsap';

/**
 * Common function for animating
 */
export default class Animation {
  static animateArrayOfElements(
    arrayOfElements: Array<Element>,
    show: boolean = true,
    delay: number = 0.1,
  ) {
    return new Promise((resolve: Function) => {
      const tl = new TimelineMax();
      // @ts-ignore
      tl.staggerFromTo(arrayOfElements, 0.33, {
        scale: show ? 0 : 1,
        opacity: show ? 0 : 1,
      }, {
        scale: show ? 1 : 0,
        opacity: show ? 1 : 1,
        delay,
        immediateRender: true,
        ease: 'elastic.easeInOut(1, 1)',
      }, 0.77)
        .add(resolve);
    });
  }
}
