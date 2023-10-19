import { useEffect, useState, Fragment, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import Spinner from '~/components/spinner/spinner';
import Image from 'next/image';
import { workPageStore } from '~/store/index';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import classes from './workPage.module.scss';
import Head from 'next/head';

const WorkPage = () => {
  const { t, i18n } = useTranslation();

  const location = useRouter();

  const { workPageContent, getWorkPageContent, isWorkPageLoading } = workPageStore(
    (state) => state,
  );
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (location.query) {
      getWorkPageContent({ articleId: location.query.id, lang: i18n.language });
    }
  }, [location.query]);
  const WorkPageDetail = () => {
    return (
      <div className={classes['work-page']}>
        <h2 className={classes['work-page__title']}>{workPageContent.title}</h2>
        <div className={classes['work-page__content']}>
          {workPageContent.title &&
            workPageContent?.workDetail.map((e, index) => {
              return (
                <div key={e.id} className={classes['work-page__detail-wrap']}>
                  <h3 className={classes['work-page__detail-title']}>{e.title}</h3>
                  <div className={classes['work-page__detail-content']}>{e.content}</div>
                  {e.workDetailImages.map((img) => {
                    return (
                      <Image
                        src={img.image}
                        alt={'tommy'}
                        className={classes['work-page__detail-img']}
                        width='650'
                        height={'521'}
                        key={img.id}
                        loading={index > 2 ? 'lazy' : 'eager'}
                      />
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <Head>
        <title>Tommy's work</title>
        <meta name='description' content='' />
      </Head>
      {isWorkPageLoading ? <Spinner /> : <WorkPageDetail />}
    </Fragment>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar'])),
    },
  };
};
export default WorkPage;
