import { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import MobileBar from '~/components/mobileBar/mobileBar';
import BackgroundColor from '~/components/backgroundColor/backgroundColor';
import WorkSection from '~/components/work/work';
import dynamic from 'next/dynamic';
import TouchBox from '~/components/touchBox/touchBox';
import { navShrink, introItems } from '~/animation/index';
import Spinner from '~/components/spinner/spinner';
import { getWorksData } from '~/utils/workData';

const Introduce = dynamic(() => import('~/components/introduce/introduce'), {
  ssr: false,
});

import classes from './index.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Home = ({ worksContent }) => {
  const { t, i18n } = useTranslation(['common', 'footer'], { bindI18n: 'languageChanged loaded' });
  const bgGradient = ['1', '2', '3'];
  const workContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const extraIntroRef = useRef<HTMLDivElement>(null);
  const [introDetailsRef, setIntroDetailsRef] = useIntroDetailsRef();

  function useIntroDetailsRef(): any {
    const introDetailsRef = useRef<HTMLDivElement[]>([]);
    introDetailsRef.current = [];
    return [introDetailsRef, (ref) => ref && introDetailsRef.current.push(ref)];
  }
  useEffect(() => {
    navShrink(gsap, workContainer, ref);
    introItems(gsap, ref, extraIntroRef.current, introDetailsRef.current);
    i18n.reloadResources(i18n.resolvedLanguage, ['common', 'footer']);
  }, []);

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

  return (
    <div className={classes['home-page']} ref={ref}>
      <div className={classes['home-page__introduce-section']}>
        <Introduce />
        <BackgroundColor bgGradient={bgGradient} />
      </div>
      <section className={classes['home-page__works-container']} ref={workContainer} id='work'>
        <div className={classes['home-page__title']}>{t('works.title')}</div>
        <WorkSection worksContent={worksContent} />
      </section>
      <section className={classes['home-page__extra-intro']} ref={extraIntroRef}>
        {extraWork &&
          extraWork.map((item: any) => {
            return (
              <div className={classes['home-page__intro-item']} key={item.id}>
                <div className={classes['home-page__intro-title']}>{item.title}</div>
                <div className={classes['home-page__intro-wrap']}>
                  {item &&
                    item.skills.map((skill, Sindex) => {
                      return (
                        <div
                          className={classes['home-page__intro-detail']}
                          key={Sindex}
                          ref={setIntroDetailsRef}
                        >
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
};

export default function HomePage({ worksContent }) {
  return (
    <Fragment>
      <Head>
        <title>Tommy's Portfolio</title>
        <meta name='description' content='I post about programming and web development.' />
      </Head>
      <Home worksContent={worksContent} />
    </Fragment>
  );
}

export const getStaticProps = async (context: any) => {
  const { locale } = context;
  const worksContent = await getWorksData(locale);
  if (!worksContent)
    return {
      notFound: true,
    };
  return {
    props: {
      worksContent,

      ...(await serverSideTranslations(locale, ['common', 'navbar'])),
    },
  };
};
