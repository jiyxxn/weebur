import { getViewPref } from '@/lib/viewPref';
import { ReactNode } from 'react';

type RandomViewProps = {
  list: ReactNode;
  grid: ReactNode;
};

const RandomView = ({ list, grid }: RandomViewProps) => {
  const viewType = getViewPref();

  if (viewType === 'grid') return grid;
  return list;
};

export default RandomView;
