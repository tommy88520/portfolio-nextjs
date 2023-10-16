// import eftArrow } from '~/IMG/left-arrow.svg';
import classes from './backButton.module.scss';
const BackButton = ({ rootUrlState, top }) => {
  return (
    <div
      className={`${classes['back-button']} ${rootUrlState != false ? 'hide-link' : ''} ${
        !top ? classes.hidden : ''
      } `}
      onClick={() => window.history.back()}
      aria-hidden='true'
    >
      <img className={classes['back-button__left-arrow']} src='/images/left-arrow.svg' alt='' />
    </div>
  );
};

export default BackButton;
