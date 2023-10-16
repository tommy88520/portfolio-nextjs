import Link from 'next/link';
import Tag from '~/components/tag/tag';
import classes from './work.module.scss';

interface WorkProps {
  order: {
    articleId: string;
    title: string;
    content: string;
    tags: string[];
    orderNumber: number;
    workImage: string;
  };
  number: any;
}

const Work: React.FC<WorkProps> = ({ order, number }) => {
  const { title, content, tags, workImage, orderNumber, articleId } = order;
  return (
    <div className={classes['work-container']}>
      <Link className={classes['work-container__detail']} href={`/work/${articleId}`}>
        <h3 className={classes['work-container__detail-title']}>{title}</h3>
        <p>{content}</p>
        <div className={classes['work-container__tag-group']}>
          {tags?.map((e: any, i) => {
            return <Tag key={i} tag={e.tag} />;
          })}
        </div>
      </Link>
      <Link
        className={`${classes['work-container__image']} ${classes['work-container__asc']}`}
        href={`/work/${articleId}`}
      >
        {orderNumber == -1 && (
          <img
            src='https://i.ibb.co/dffvNWm/5c5c1edb0909.webp'
            alt='icon'
            className={classes['work-container__uni-img']}
          />
        )}
        <div
          className={`${classes['work-container__image-bg']} ${
            classes['work-container__image'] + number
          }`}
        >
          <img src={workImage} alt='icon' className={classes['work-container__image-detail']} />
        </div>
      </Link>
    </div>
  );
};

export default Work;
