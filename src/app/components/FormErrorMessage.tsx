import React, { ReactNode } from 'react';

type FormErrorMessageProps = {
  children: ReactNode;
  className?: string;
};

const FormErrorMessage = ({ children, className }: FormErrorMessageProps) => {
  return <p className={`text-red-500 text-sm ${className}`}>{children}</p>;
};

export default FormErrorMessage;
