import { FC, ReactNode } from 'react';
import cn from 'classnames';

import s from './Grid.module.css';

// ==============================================

interface GridProps {
  // className?: string;
  children: ReactNode[]; // | Component[] | any[];
  layout?: 'A' | 'B';
}

// ==============================================

const Grid: FC<GridProps> = ({ children, layout }) => {
  const rootClassName = cn(s.root, {
    [s.layoutA]: layout === 'A',
    [s.layoutB]: layout === 'B',
  });
  return <div className={rootClassName}>{children}</div>;
};

// ==============================================

export default Grid;
