import classes from './touchBox.module.scss';

interface iTouchBox {
  info: {
    text: string;
    img: any;
    link: string;
  };
}
const TouchBox: React.FC<iTouchBox> = ({ info }) => {
  const { img, link, text } = info;
  return (
    <a
      href={link}
      className={classes['touch-box']}
      target='_blank'
      rel='noreferrer'
      aria-label="Button to Rayco's LinkedIn"
    >
      <div className={classes['touch-box__img-wrap']}>
        <img src={img} alt={text} />
      </div>
      <span className={classes['touch-box__text']}>{text}</span>
    </a>
  );
};
export default TouchBox;
