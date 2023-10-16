import classes from './backgroundColor.module.scss';
const BackgroundColor = ({ bgGradient }) => {
  return (
    <div className={classes['background-gradient__contact-gradients']} id='contact'>
      {bgGradient.map((g, hindex) => {
        return <div className={`${classes['background-gradient__gradients-'] + g}`} key={hindex} />;
      })}
    </div>
  );
};

export default BackgroundColor;
