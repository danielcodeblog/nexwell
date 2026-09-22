import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Aggressive cinematic easings
export const EASINGS = {
  punchy: 'power4.out',
  explosive: 'expo.out',
  springy: 'back.out(2)',
  extremeSpring: 'back.out(3.5)',
  elastic: 'elastic.out(1, 0.4)',
  smooth: 'power3.inOut',
};

// Magnetic button hover effect
export const applyMagneticEffect = (element: HTMLElement, strength = 0.45) => {
  const xTo = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power3.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power3.out' });

  const onMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;
    xTo(distanceX);
    yTo(distanceY);
  };

  const onMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener('mousemove', onMouseMove);
  element.addEventListener('mouseleave', onMouseLeave);

  return () => {
    element.removeEventListener('mousemove', onMouseMove);
    element.removeEventListener('mouseleave', onMouseLeave);
  };
};

// 3D Card Tilt with aggressive depth
export const apply3DTilt = (
  container: HTMLElement,
  target: HTMLElement,
  maxRotation = 14,
  innerFloatingElements?: HTMLElement[]
) => {
  const rotateXTo = gsap.quickTo(target, 'rotationX', { duration: 0.4, ease: 'power2.out' });
  const rotateYTo = gsap.quickTo(target, 'rotationY', { duration: 0.4, ease: 'power2.out' });
  const scaleTo = gsap.quickTo(target, 'scale', { duration: 0.4, ease: 'power2.out' });

  const onMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2; // -1 to 1
    const py = (y / rect.height - 0.5) * 2; // -1 to 1

    rotateXTo(-py * maxRotation);
    rotateYTo(px * maxRotation);
    scaleTo(1.025);

    if (innerFloatingElements) {
      innerFloatingElements.forEach((el, index) => {
        const factor = (index + 1) * 12;
        gsap.to(el, {
          x: px * factor,
          y: py * factor,
          duration: 0.3,
          ease: 'power1.out',
        });
      });
    }
  };

  const onMouseLeave = () => {
    rotateXTo(0);
    rotateYTo(0);
    scaleTo(1);
    if (innerFloatingElements) {
      innerFloatingElements.forEach((el) => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
      });
    }
  };

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseLeave);

  return () => {
    container.removeEventListener('mousemove', onMouseMove);
    container.removeEventListener('mouseleave', onMouseLeave);
  };
};

export { gsap, ScrollTrigger };
