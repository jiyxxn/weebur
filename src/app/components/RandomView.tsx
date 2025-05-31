import { useViewType } from '@/hooks/useViewType';
import { ReactNode } from 'react';

type RandomViewProps = {
  list: ReactNode;
  grid: ReactNode;
};

const RandomView = ({ list, grid }: RandomViewProps) => {
  const viewType = useViewType();

  if (viewType === 'grid') return grid;
  return list;
};

export default RandomView;
