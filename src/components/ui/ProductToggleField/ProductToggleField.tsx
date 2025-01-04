import staticText from '@/data/common.json';

import { ProductToggleFieldProps } from './types';

import {
  Field,
  FieldLabel,
  FieldStatusYes,
  FieldStatusNo,
  FieldBtn,
  FieldStatusRemove,
  FieldStatusAdd,
} from './ProductToggleField.styled';

export const ProductToggleField: React.FC<ProductToggleFieldProps> = ({
  flag,
  label,
  disabled,
  btnAction,
}) => {
  const { labelBanner, labelSale, status, btn } = staticText.productToggleField;

  return (
    <Field>
      <FieldLabel>
        {label === 'banner' ? labelBanner : labelSale}
        {flag ? (
          <FieldStatusYes>{` ${status.yes}`}</FieldStatusYes>
        ) : (
          <FieldStatusNo>{` ${status.no}`}</FieldStatusNo>
        )}
      </FieldLabel>

      <FieldBtn type="button" disabled={disabled} onClick={btnAction}>
        {flag ? (
          <FieldStatusRemove>{btn.remove}</FieldStatusRemove>
        ) : (
          <FieldStatusAdd>{btn.add}</FieldStatusAdd>
        )}
      </FieldBtn>
    </Field>
  );
};
