import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { PatternFormat, PatternFormatProps } from 'react-number-format';

// 🔹 Типизированный PhoneInput
type PhoneInputProps = Omit<PatternFormatProps<TextFieldProps>, 'format'> & {
  format?: string; // делаем опциональным, внутри фиксируем
};

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  function PhoneInput({ format, ...props }, ref) {
    return (
      <PatternFormat
        {...props}
        getInputRef={ref}
        customInput={TextField}
        format={format || '+38 (###) ### ## ##'}
        mask="_"
        allowEmptyFormatting // 🔹 отображение маски сразу
        size="small"
      />
    );
  }
);
