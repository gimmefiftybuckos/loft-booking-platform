import clsx from 'clsx';

import styles from './index.module.sass';

type TInputProps = {
   placeholder?: string;
   value?: string;
   type?: string;
   autoFocus?: boolean;
   className?: string;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
   placeholder,
   type = 'text',
   autoFocus,
   value,
   className,
   onChange,
}: TInputProps) => {
   return (
      <input
         autoFocus={autoFocus}
         type={type}
         value={value}
         placeholder={placeholder}
         onChange={onChange}
         className={clsx(className, styles.input)}
      />
   );
};
