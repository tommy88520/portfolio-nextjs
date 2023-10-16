// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { worksStore } from '~/store/index';
import Button from '~/components/button/button';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import classes from './introduce.module.scss';
// import Image from 'next/image';
import { ReactSVG } from 'react-svg';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  tollerance?: number;
  scale?: number;
  debug?: boolean;
  borderRadius?: string;
}
gsap.registerPlugin(ScrollToPlugin);

const MagneticButton: React.FC<MagneticButtonProps> = (prop) => {
  const {
    children,
    className,
    speed = 1,
    tollerance = 0.8,
    scale = 1.2,
    debug = false,
    borderRadius = '0px',
    ...props
  } = prop;
  const $root = useRef<HTMLButtonElement>(null);
  const $item = useRef<HTMLDivElement | null>(null);
  const $hover = useRef<HTMLDivElement | null>(null);
  const rootBound = useRef<DOMRect | null>(null);
  const itemBound = useRef<DOMRect | null>(null);
  const diffBound = useRef({ x: 0, y: 0 });
  const handleMouseEnter = () => {
    gsap.killTweensOf($item.current);
    gsap.set($hover.current, {
      scale: scale,
      borderRadius,
      background: debug ? 'rgba(0, 125, 255, .4)' : 'transparent',
    });
    // if ($root.current && rootBound.current !== null && $item.current) {

    rootBound.current = $root.current.getBoundingClientRect();
    itemBound.current = $item.current.getBoundingClientRect();
    diffBound.current.x = (rootBound.current.width * scale - rootBound.current.width) / 2;
    diffBound.current.y = (rootBound.current.height * scale - rootBound.current.height) / 2;
    // }
  };

  const handleMouseLeave = () => {
    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: 0,
      y: 0,
      ease: 'elastic.out(1.1, .4)',
      duration: 1.2,
    });
    gsap.set($hover.current, {
      scale: 1,
    });
  };

  const handleMouseMove = (e) => {
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    // if (rootBound.current !== null && itemBound.current !== null) {

    const maxX = ((rootBound.current.width - itemBound.current.width) / 2) * tollerance;

    const maxY = ((rootBound.current.height - itemBound.current.height) / 2) * tollerance;

    const newX = gsap.utils.mapRange(
      0,
      rootBound.current.width * scale,
      -maxX,
      maxX,
      x - rootBound.current.x + diffBound.current.x,
    );

    const newY = gsap.utils.mapRange(
      0,
      rootBound.current.height * scale,
      -maxY,
      maxY,
      y - rootBound.current.y + diffBound.current.y,
    );

    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: newX,
      y: newY,
      ease: 'power3.out',
      duration: speed,
    });
  };

  return (
    <button
      ref={$root}
      className={`${classes['magnetic-button']} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      {...props}
    >
      <span ref={$item} className={classes['magnetic-button--item']}>
        {children}
      </span>
      <span ref={$hover} className={classes['magnetic-button--hover']} />
    </button>
  );
};

const Introduce = () => {
  const { t, i18n } = useTranslation();
  const { getWorks } = worksStore((state) => state);
  useEffect(() => {
    getWorks(i18n.language);
  }, []); //

  const targetDivRef = useRef(null);
  const element = document.getElementById('work');
  const scrollToTargetDiv = () => {
    if (element) {
      element.scrollIntoView();
    }
  };
  const skills = [
    {
      id: 1,
      skill: 'React',
      image: '/images/skills/react.svg',
    },
    { id: 2, skill: 'Docker', image: '/images/skills/docker.svg' },
    { id: 3, skill: 'GCP', image: '/images/skills/googlecloud.svg' },
    { id: 4, skill: 'JS', image: '/images/skills/javascript.svg' },
    { id: 5, skill: 'MongoDB', image: '/images/skills/mongodb.svg' },
    { id: 6, skill: 'NestJS', image: '/images/skills/swagger.svg' },
    { id: 7, skill: 'Vue', image: '/images/skills/nestjs.svg' },
    { id: 8, skill: 'Swagger', image: '/images/skills/vuedotjs.svg' },
  ];

  return (
    <div className={classes['introduce-section']}>
      <div className={classes['introduce-section__text']}>
        <p className={classes['introduce-section__text-title']}>{t('introduce.title')}</p>
        <p className={classes['introduce-section__text-detail']}>{t('introduce.detail')}</p>
        <div className={classes['introduce-section__buttons-desktop']}>
          <Button text={t('introduce.button')} onClick={scrollToTargetDiv} ref={targetDivRef} />
          <a
            href='https://drive.google.com/file/d/1tZqaupNZGzhWoOMexJPYUWWXP5ajbkIi/view'
            target='_blank'
            rel='noreferrer'
          >
            <span>{t('introduce.resume')}</span>
            <div className={classes['introduce-section__buttons-download']}>
              <img src='/images/downloadIcon.svg' alt='download' />
            </div>
          </a>
        </div>
      </div>
      <div className={classes['introduce-section__skills']}>
        {skills.map((e) => {
          return (
            <MagneticButton
              className={classes['skill-icon']}
              scale={2}
              tollerance={0.8}
              speed={0.3}
              borderRadius='50%'
              key={e.id}
            >
              {/* <img src={e.image} alt={e.skill} /> */}
              {/* <Image src={e.image} alt={e.skill} layout='fill' /> */}
              <ReactSVG src={e.image} alt={e.skill} />
              <p>{e.skill}</p>
            </MagneticButton>
          );
        })}
      </div>
    </div>
  );
};

export default Introduce;
