import { local } from '@/utils/storage';

const STORAGE_KEY = 'weebur_view_pref' as const;
const DAY = 24 * 60 * 60 * 1000;

type ViewType = 'list' | 'grid';

type StoredViewType = {
  type: ViewType;
  at: number;
};

export const viewPrefService = {
  get(): ViewType {
    const saved = local.get<StoredViewType>(STORAGE_KEY);
    if (!saved || Date.now() - saved.at > DAY) {
      return this.reset();
    }
    return saved.type;
  },
  reset(): ViewType {
    const viewType = Math.random() < 0.5 ? 'list' : 'grid';
    local.set(STORAGE_KEY, { type: viewType, at: Date.now() });
    return viewType;
  },
};
