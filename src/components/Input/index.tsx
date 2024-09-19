type TInputProps = {
   placeholder?: string;
   value?: string;
   type?: string;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
   placeholder,
   type = 'text',
   value,
   onChange,
}: TInputProps) => (
   <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
   />
);
