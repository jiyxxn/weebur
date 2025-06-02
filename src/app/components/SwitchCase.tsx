import { ReactElement } from 'react';

type Key = string | number | symbol;

type SwitchCaseProps<Case extends Key> = {
  value: Case;
  cases: Partial<Record<Case, ReactElement>>;
  default?: ReactElement;
};

const SwitchCase = <Case extends Key>(props: SwitchCaseProps<Case>) => {
  return props.cases[props.value] ?? props.default ?? null;
};

export default SwitchCase;
