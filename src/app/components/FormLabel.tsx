import { ReactNode } from 'react';

type FormLabelProps = {
  children: ReactNode;
  className?: string;
};

const FormLabel = ({ children, className }: FormLabelProps) => {
  return (
    <label className={`flex items-start gap-4 ${className}`}>{children}</label>
  );
};

export default FormLabel;
