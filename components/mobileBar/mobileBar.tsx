import classes from './mobileBar.module.scss';
import Link from 'next/link';

const MobileBar = () => {
  const touchBox = [
    {
      id: 1,
      text: 'plan meeting',
      img: '/images/cal.svg',
      link: 'https://calendly.com/tommy8852024/booking',
    },
    {
      id: 2,
      text: 'Connect',
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
  const mobileMenuState = [
    {
      navigation: 'work',
      link: '#work',
    },
    {
      navigation: 'resume',
      link: 'https://drive.google.com/file/d/1tZqaupNZGzhWoOMexJPYUWWXP5ajbkIi/view',
    },
  ];

  return (
    <div className={classes['mobile-bar']}>
      <div className={classes['mobile-bar__container']}>
        <div className={classes['mobile-bar__container-detail']}>
          <div className={classes['mobile-bar__contact-section']}>
            <div className={classes['mobile-bar__contact']}>
              {touchBox.map((e) => {
                return (
                  <div className={classes['mobile-bar__contact-box']} key={e.id}>
                    <img src={e.img} alt={e.text} />
                  </div>
                );
              })}
            </div>
            <div className={classes['mobile-bar__intro']}>
              {mobileMenuState.map((e, i) => {
                return (
                  <div className={classes['mobile-bar__intro-box']} key={i}>
                    <Link
                      href={`${e.link}`}
                      aria-hidden='true'
                      target={e.navigation == 'resume' ? '_blank' : ''}
                      rel='noreferrer'
                    >
                      {e.navigation}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBar;
