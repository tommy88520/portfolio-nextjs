// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useRef, useEffect } from 'react';
import classes from './test.module.scss';
import workout from './workout.svg';
import greensocklogo from './greensocklogo.svg';
import happy from './happy.svg';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);
function TestPage() {
  const ref = useRef<HTMLInputElement>(null);
  const gsapLogo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      gsap
        .timeline({
          scrollTrigger: {
            trigger: element.querySelector('.first'),
            start: 'top top',
            end: 'bottom center',
            scrub: true,
          },
        })
        .fromTo(
          element.querySelector('.first-paragraph'),
          {
            opacity: 0,
            y: -50,
          },
          {
            opacity: 1,
            y: 0,
          },
        );
      // gsap.fromTo(
      //   element.querySelector('.first-paragraph'),
      //   {
      //     opacity: 0,
      //     y: -50,
      //   },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     scrollTrigger: {
      //       trigger: element.querySelector('.first'),
      //       start: 'top top',
      //       end: 'bottom center',
      //       scrub: true,
      //     },
      //   },
      // );
    }
  }, []);

  useEffect(() => {
    const element = ref.current;
    const gsapLogoE = gsapLogo.current;

    gsap.fromTo(
      gsapLogoE,
      {
        opacity: 0,
        scale: 0.2,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element.querySelector('.first'),
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  }, []);

  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelectorAll('.happy-logo'),
      {
        opacity: 0,
        scale: 0.2,
        y: -20,
      },
      {
        opacity: 1,
        y: 10,
        stagger: 0.5,
        duration: 0.5,
        ease: 'back',
      },
    );
  }, []);
  useEffect(() => {
    const element = ref.current;
    gsap.from(element.querySelector('.line'), {
      scale: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: element.querySelector('.third'),
        scrub: true,
        start: 'top bottom',
        end: 'top top',
      },
    });
  }, []);

  return (
    <div className='App' ref={ref}>
      <div className={`${classes.first} first`}>
        <h1>ScrollTrigger</h1>
        <p className={classes['first-paragraph']}>
          is the coolest Greensock plugin.
          <span role='img' aria-label='celebrating'>
            🥳
          </span>
        </p>
        <div className={classes['logo-main']}>
          {/* <img src={workout} id='workout-logo' alt='workout' /> */}

          <Image
            src={`/images/testPage/workout.svg`}
            alt='workout'
            width={500}
            height={300}
            id='workout-logo'
          />
        </div>
      </div>

      <div className={classes.second}>
        <div className={classes['logo-main']}>
          <Image
            src={`/images/testPage/greensocklogo.svg`}
            alt='greensocklogo'
            // layout='fill'
            // id='gsap-logo'
            width={500}
            height={300}
            className={`${classes['gsap-logo']}`}
            ref={gsapLogo}
          />

          {/* <img src={greensocklogo} id='gsap-logo' alt='greensocklogo' /> */}
        </div>
      </div>

      <div className={classes.third}>
        <p>
          <span className={classes['line']} />
        </p>
        <div className={classes['logo-main']}>
          <Image src={`/images/testPage/happy.svg`} alt='happy' width={500} height={300} />
          <Image src={`/images/testPage/happy.svg`} alt='happy' width={500} height={300} />
          <Image src={`/images/testPage/happy.svg`} alt='happy' width={500} height={300} />

          {/* <img src={happy} className='happy-logo' alt='happy' />
          <img src={happy} className='happy-logo' alt='happy' />
          <img src={happy} className='happy-logo' alt='happy' /> */}
        </div>
      </div>
    </div>
  );
}

export default TestPage;
