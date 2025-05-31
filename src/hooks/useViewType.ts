'use client';

import { viewPrefService } from '@/services/viewPrefService';
import { useState } from 'react';

export const useViewType = () => {
  const [view] = useState<ReturnType<typeof viewPrefService.get>>(() =>
    viewPrefService.get()
  );
  return view;
};
