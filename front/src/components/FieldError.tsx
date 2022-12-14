import { FC } from 'react';

type FieldErrorProps = {
  message: string;
};

const FieldError: FC<FieldErrorProps> = ({ message }) => {
  return <div className='text-sm text-red-500'>{message}</div>;
};

export default FieldError;
