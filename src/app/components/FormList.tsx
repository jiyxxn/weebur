import { ReactNode } from 'react';

type FormListProps = {
  children: ReactNode;
  className?: string;
};

const FormList = ({ children, className }: FormListProps) => {
  return (
    <li className={`border-[1px] border-gray-500 rounded-md p-2 ${className}`}>
      {children}
    </li>
  );
};

export default FormList;
