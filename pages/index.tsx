import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { allStore, worksStore } from '~/store/index';
import MobileBar from '~/components/mobileBar/mobileBar';
import BackgroundColor from '~/components/backgroundColor/backgroundColor';
import Work from '~/components/work/work';
import dynamic from 'next/dynamic';
import TouchBox from '~/components/touchBox/touchBox';
const Introduce = dynamic(() => import('~/components/introduce/introduce'), {
  ssr: false,
});

import classes from './index.module.scss';

const inter = Inter({ subsets: ['latin'] });
gsap.registerPlugin(ScrollTrigger);

export default function Home(props) {
  const { t, i18n } = useTranslation();
  const { setLang } = allStore((state) => state);
  useEffect(() => {
    setLang(i18n.language);
    // getWorks(i18n.language);
    // if (worksContent[0].title) {
    //   navShrink();
    //   worksAnimation(gsap, ref);
    //   introItems();
    // }
  }, []);
  const { worksContent, getWorks } = worksStore((state) => state);
  const extraWork = [
    {
      id: 1,
      title: t('extraWork.experience.title'),
      skills: t('extraWork.experience.content', { returnObjects: true }),
      link: '其他',
    },
    {
      id: 2,
      title: t('extraWork.education.title'),
      skills: t('extraWork.education.content', { returnObjects: true }),
      link: '其他',
    },
    {
      id: 3,
      title: t('extraWork.others.title'),
      skills: t('extraWork.others.content', { returnObjects: true }),
      link: '其他',
    },
  ];
  const touchBox = [
    {
      id: 1,
      text: t('contact.meeting'),
      img: '/images/cal.svg',
      link: 'https://calendly.com/tommy8852024/booking',
    },
    {
      id: 2,
      text: t('contact.connect'),
      img: '/images/LinkedIn-Negative.svg',
      link: 'https://www.linkedin.com/in/tommy8852024/',
    },
    {
      id: 3,
      text: 'tommy8852024@gmail.com',
      img: '/images/email.svg',
      link: 'mailto:tommy8852024@gmail.com?subject=Hi, Tommy Huang',
    },
  ];
  const bgGradient = ['1', '2', '3'];
  const workContainer = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className={classes['home-page']} ref={ref}>
      <div className={classes['home-page__introduce-section']}>
        <Introduce />
        <BackgroundColor bgGradient={bgGradient} />
      </div>
      <section className={classes['home-page__works-container']} ref={workContainer} id='work'>
        <div className={classes['home-page__title']}>{t('works.title')}</div>
        {worksContent.map((order, i) => {
          return <Work key={i} order={order} number={i} />;
        })}
      </section>
      <section className={classes['home-page__extra-intro']}>
        {extraWork.map((item: any) => {
          return (
            <div className={classes['home-page__intro-item']} key={item.id}>
              <div className={classes['home-page__intro-title']}>{item.title}</div>
              <div className={classes['home-page__intro-wrap']}>
                {item.skills.map((skill, Sindex) => {
                  return (
                    <div className={classes['home-page__intro-detail']} key={Sindex}>
                      {skill}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>
      <section className={classes['home-page__contact-page']} id='contact'>
        <div className={classes['home-page__touch-text']}>
          <p>{t('contact.title')}</p>
          <div className={classes['home-page__contact-icon']}>
            {touchBox.map((e) => {
              return <TouchBox key={e.id} info={e} />;
            })}
          </div>
        </div>
        <BackgroundColor bgGradient={bgGradient} />
      </section>
      <MobileBar />
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      // Spread the returned object into our `props` to expose
      // them to our component during SSR.
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  };
};
