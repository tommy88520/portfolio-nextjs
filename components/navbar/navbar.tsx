import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { worksStore, rootUrlStore, allStore } from '~/store/index';
import BackButton from '~/components/backButton/backButton';

import classes from './navbar.module.scss';

const Navbar = () => {
  // const { menuState, getMenu } = menuStore((state) => state);
  const [menuState, setMenuState] = useState<any>();
  const { t, i18n } = useTranslation();
  const location = useRouter();
  const { getWorks } = worksStore((state) => state);
  const { rootUrlState, toggleRootUrl } = rootUrlStore((state) => state);
  const { lang, setLang } = allStore((state) => state);
  useEffect(() => {
    renderNavigation();
    // getWorks(i18n.language);
    setMenuState(t('menu', { returnObjects: true }));
  }, [location.pathname]);
  const renderNavigation = () => {
    if (location.pathname !== '/') {
      toggleRootUrl(false);
    } else {
      toggleRootUrl(true);
    }
  };
  const changeLang = () => {
    if (i18n.language == 'zh-TW') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('zh-TW');
    }
    // getWorks(i18n.language);
  };

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
                      i18n.language == 'zh-TW' && classes['navigation-bar__link-margin']
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
            <p
              className={classes['navigation-bar__lang-text']}
              onClick={() => changeLang()}
              aria-hidden='true'
            >
              {lang !== 'zh-TW' ? '中文' : 'En'}
            </p>
          </div>
          <BackButton rootUrlState={rootUrlState} top={true} />
        </div>
      </header>
    </Fragment>
  );
};
export default Navbar;
