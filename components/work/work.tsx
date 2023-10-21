import Link from 'next/link';
import Tag from '~/components/tag/tag';
import classes from './work.module.scss';
import gsap from 'gsap';
import { Fragment, useEffect, useRef } from 'react';
import { worksAnimation } from '~/animation/index';
import Image from 'next/image';

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

interface WorkSectionProps {
  worksContent: {
    articleId: string;
    title: string;
    content: string;
    tags: string[];
    lang: string;
    orderNumber: number;
    workImage: string;
  }[];
}

const WorkSection: React.FC<WorkSectionProps> = ({ worksContent }) => {
  const [imgsRef, setImgsRef] = useImgsRef();
  const [containerref, setContainerRef] = useContainerRef();
  const uniImgRef = useRef<HTMLImageElement>(null);

  function useImgsRef(): any {
    const imgsRef = useRef<HTMLDivElement[]>([]);
    imgsRef.current = [];
    return [imgsRef, (ref) => ref && imgsRef.current.push(ref)];
  }

  function useContainerRef(): any {
    const containerref = useRef<HTMLDivElement[]>([]);
    containerref.current = [];
    return [containerref, (ref) => ref && containerref.current.push(ref)];
  }
  useEffect(() => {
    if (worksContent[0].title) {
      worksAnimation(gsap, imgsRef.current, containerref.current, uniImgRef.current);
    }
  }, [worksContent[0].title]);

  return (
    <Fragment>
      {worksContent.map((order, number) => {
        const { title, content, tags, workImage, orderNumber, articleId } = order;

        return (
          <div className={classes['work-container']} key={number} ref={setContainerRef}>
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
                  ref={uniImgRef}
                />
              )}
              <div
                className={`${classes['work-container__image-bg']} ${
                  classes[`work-container__image${number}`]
                }`}
              >
                <Image
                  src={workImage}
                  alt='icon'
                  className={classes['work-container__image-detail']}
                  ref={setImgsRef}
                  width='520'
                  height='520'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
            </Link>
          </div>
        );
      })}
    </Fragment>
  );
};

export default WorkSection;
