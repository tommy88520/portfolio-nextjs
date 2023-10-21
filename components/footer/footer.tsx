import { useTranslation } from 'react-i18next';
import { rootUrlStore } from '~/store/index';
import BackButton from '../backButton/backButton';
import TouchBox from '~/components/touchBox/touchBox';
import BackgroundColor from '../backgroundColor/backgroundColor';

import classes from './footer.module.scss';

const Footer = () => {
  const { rootUrlState } = rootUrlStore((state) => state);
  const footerText = '2023 portfolio - developed by Tommy Huang';
  const bgGradient = ['1', '2', '3'];
  const { t, i18n } = useTranslation();
  const touchBox = [
    {
      text: 'calender',
      img: '/images/cal.svg',
      link: 'https://calendly.com/tommy8852024/booking',
    },
    {
      text: 'LinkedIn',
      img: '/images/LinkedIn-Negative.svg',
      link: 'https://www.linkedin.com/in/tommy8852024/',
    },
    {
      text: 'email',
      img: '/images/email.svg',
      link: 'mailto:tommy8852024@gmail.com?subject=Hi, Tommy Huang',
    },
  ];

  return rootUrlState ? (
    <footer className={classes['footer-text']}>{footerText}</footer>
  ) : (
    <footer className={classes['footer-page']}>
      <div className={classes['footer-page__wrap']}>
        <div className={classes['footer-page__button-wrap']}>
          <BackButton rootUrlState={rootUrlState} top={false} />
        </div>

        <div className={classes['footer-page__box-wrap']}>
          {/* <h3>{t('contact.title')}</h3> */}
          <h3>{i18n.language.includes('zh') ? '聯絡方式' : 'Let’s Get In Touch'} </h3>
          <div className={classes['footer-page__touch-box']}>
            {touchBox.map((e, i) => {
              return <TouchBox key={i} info={e} />;
            })}
          </div>
        </div>
      </div>

      <p className={classes['footer-text']}>{footerText}</p>
      <BackgroundColor />
    </footer>
  );
};

export default Footer;
