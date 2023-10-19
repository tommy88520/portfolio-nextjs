import { forwardRef } from 'react';
import classes from './button.module.scss';
interface iButton {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
const Button = forwardRef<HTMLDivElement, iButton>((props, ref) => {
  const { text, onClick } = props;

  return (
    <div className={classes['portfolio-button']} ref={ref} onClick={onClick} aria-hidden='true'>
      {text}
    </div>
  );
});
Button.displayName = 'Button';
export default Button;
