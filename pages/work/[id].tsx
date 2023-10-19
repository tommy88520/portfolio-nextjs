import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classes from './workPage.module.scss';
import Head from 'next/head';
import { getWorkPageData } from '~/utils/workData';

const WorkPage = ({ workPageContent }) => {
  const location = useRouter();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
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
                        height='521'
                        layout='responsive'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
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
      <WorkPageDetail />
    </Fragment>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale, params } = context;
  const { id } = params;
  const regexZh = /^zh/;
  const matchZh = locale.match(regexZh);

  let lang;
  if (matchZh) {
    lang = 'zh-TW';
  } else {
    lang = 'en';
  }
  const data = await getWorkPageData({ articleId: id, lang });

  if (!data)
    return {
      notFound: true,
    };

  return {
    props: {
      workPageContent: data,
      ...(await serverSideTranslations(locale, ['navbar'])),
    },
  };
};

export default WorkPage;
