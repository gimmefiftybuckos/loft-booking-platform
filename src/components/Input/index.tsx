type TInputProps = {
   placeholder?: string;
};

export const Input = ({ placeholder }: TInputProps) => (
   <input type='text' placeholder={placeholder} />
);
