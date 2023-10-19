import Link from 'next/link';
import classes from './backButton.module.scss';

const BackButton = ({ rootUrlState, top }) => {
  return (
    <Link
      className={`${classes['back-button']} ${rootUrlState != false ? 'hide-link' : ''} ${
        !top ? classes.hidden : ''
      } `}
      href='/'
    >
      <img className={classes['back-button__left-arrow']} src='/images/left-arrow.svg' alt='' />
    </Link>
  );
};

export default BackButton;
