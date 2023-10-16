import classes from './tag.module.scss';
interface Tag {
  tag: string;
}

const Tag: React.FC<Tag> = (props) => {
  const { tag } = props;
  return <div className={classes['tag-button']}>{tag}</div>;
};

export default Tag;
