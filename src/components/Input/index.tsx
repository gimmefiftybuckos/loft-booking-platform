type TInputProps = {
   placeholder?: string;
   value?: string;
   type?: string;
   autoFocus?: boolean;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
   placeholder,
   type = 'text',
   autoFocus,
   value,
   onChange,
}: TInputProps) => (
   <input
      autoFocus={autoFocus}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
   />
);
