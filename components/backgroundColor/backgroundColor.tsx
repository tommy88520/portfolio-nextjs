import classes from './backgroundColor.module.scss';
const BackgroundColor = () => {
  const bgGradient = ['1', '2', '3'];
  return (
    <div className={classes['background-gradient__contact-gradients']}>
      {bgGradient.map((g, hindex) => {
        return <div className={`${classes[`background-gradient__gradients-${g}`]}`} key={hindex} />;
      })}
    </div>
  );
};

export default BackgroundColor;
