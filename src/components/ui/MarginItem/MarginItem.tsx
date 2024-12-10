import staticData from '@/data/common.json';

import { MarginItemProps } from './types';

import {
  MarginForm,
  MarginPercentage,
  MarginValue,
  MarginValueWrap,
  WrapMargin,
} from './MarginItem.styled';
import { ConfirmAlert } from '../ConfirmAlert';
import { useState } from 'react';

export const MarginItem: React.FC<MarginItemProps> = ({ margin }) => {
  const { marginText } = staticData.catalogCard;

  const [percentageValue, setPercentageValue] = useState<number>(margin);

  return (
    <WrapMargin>
      <p>{marginText}:</p>

      <MarginForm>
        <MarginValueWrap>
          <MarginValue
            type="text"
            value={percentageValue}
            onChange={e => {
              setPercentageValue(parseFloat(e.target.value));
            }}
          />

          <MarginPercentage>%</MarginPercentage>
        </MarginValueWrap>
      </MarginForm>

      <ConfirmAlert margin={percentageValue} />
    </WrapMargin>
  );
};
