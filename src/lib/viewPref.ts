const STORAGE_KEY = 'weebur_view_pref' as const;
const DAY = 24 * 60 * 60 * 1000;

type ViewType = 'list' | 'grid';

type StoredViewType = {
  type: ViewType;
  at: number;
};

const getViewPref = (): ViewType => {
  if (typeof window === 'undefined') return 'list';
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return saveRandomView();

  try {
    const data: StoredViewType = JSON.parse(raw);
    if (Date.now() - data.at > DAY) return saveRandomView();
    return data.type;
  } catch {
    return saveRandomView();
  }
};

const saveRandomView = (): ViewType => {
  const type = Math.random() < 0.5 ? 'list' : 'grid';
  const payload: StoredViewType = { type, at: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return type;
};
