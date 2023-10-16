import classes from './spinner.module.scss';
const Spinner = () => {
  return (
    <div className={classes['spinner-overlay']}>
      <div className={classes['spinner-container']}></div>
    </div>
  );
};

export default Spinner;
