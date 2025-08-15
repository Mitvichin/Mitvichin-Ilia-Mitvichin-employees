import type { PropsWithChildren } from 'react';
import type { ButtonProps } from '../types/ButtonProps';
import { LoadingSpinner } from './LoadingSpinner';

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  type = 'button',
  onClick,
  isDisabled = false,
  className: classNameProp = '',
  isLoading = false,
  ...rest
}) => {
  const className =
    `relative focus:outline-none font-medium rounded-lg text-sm text-center disabled:bg-gray-400
     hover:cursor-pointer hover:disabled:cursor-default px-2 py-1 border-1
     border-gray-200 shadow-md hover:scale-110 disabled:hover:scale-100 ${classNameProp}`.trim();

  return (
    <button
      {...rest}
      type={type}
      role="button"
      disabled={isDisabled}
      onClick={onClick}
      className={className}
    >
      {isLoading ? (
        <LoadingSpinner className="absolute left-[50%] top-[50%] translate-[-50%]" />
      ) : null}
      <span className={`${isLoading ? 'opacity-0' : ''}`}>{children}</span>
    </button>
  );
};
