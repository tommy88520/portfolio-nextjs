import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { rootUrlStore } from '~/store/index';
import BackButton from '~/components/backButton/backButton';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import classes from './navbar.module.scss';

const Navbar = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation('navbar');
  const { rootUrlState, toggleRootUrl } = rootUrlStore((state) => state);
  useEffect(() => {
    renderNavigation();
  }, [router.pathname]);

  const renderNavigation = () => {
    if (router.pathname !== '/') {
      toggleRootUrl(false);
    } else {
      toggleRootUrl(true);
    }
  };

  const menuState = Object.values(t('menu', { returnObjects: true }));
  const iconLink = [
    {
      title: 'github',
      href: 'https://github.com/tommy88520',
      icon: '/images/github.svg',
    },
    {
      title: 'linkIn',
      href: 'https://www.linkedin.com/in/tommy8852024/',
      icon: '/images/LinkedIn-Negative.svg',
    },
    {
      title: 'Instagram',
      href: 'https://www.instagram.com/tommy88520/',
      icon: '/images/Instagram-Negative.svg',
    },
  ];

  return (
    <Fragment>
      <header className={classes['navigation-bar']}>
        <div className={classes['navigation-bsr__logo-container']}>
          <Link className={classes['navigation-bar__logo']} href='/'>
            <p>HYM</p>
          </Link>
        </div>
        <div className={classes['navigation-bar__show-container']}>
          <div
            className={`${classes['navigation-bar__link']} ${
              rootUrlState == false ? 'hide-link' : ''
            }`}
          >
            {menuState &&
              menuState.map((res, index) => {
                return (
                  <a
                    className={`${classes['navigation-bar__link-detail']} ${
                      i18n.language.includes('zh') && classes['navigation-bar__link-margin']
                    }`}
                    key={index}
                    href={`#${res.link}`}
                    aria-hidden='true'
                  >
                    {res.navigation}
                  </a>
                );
              })}
          </div>
          <div
            className={`${classes['navigation-bar__icon']} ${
              rootUrlState == false ? 'hide-link' : ''
            }`}
          >
            {iconLink.map((res, index) => {
              return (
                <a
                  className={classes['navigation-bar__icon-detail']}
                  href={`${res.href}`}
                  target='_blank'
                  rel='noreferrer'
                  key={index}
                >
                  <img src={res.icon} alt='Logo' />
                </a>
              );
            })}
          </div>
          <div className={classes['navigation-bar__lang']}>
            <Link href={router.asPath} locale={router.locale === 'en' ? 'zh-TW' : 'en'}>
              <p className={classes['navigation-bar__lang-text']}>{t('change-locale')}</p>
            </Link>
          </div>
          <BackButton rootUrlState={rootUrlState} top={true} />
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
