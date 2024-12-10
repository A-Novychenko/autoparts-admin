import { useState } from 'react';

import { ConfirmAlert } from '@components/ui';

import { serverApi } from '@/redux/auth/authOperations';

import staticData from '@/data/common.json';

import { MarginItemProps } from './types';

import {
  MarginForm,
  MarginPercentage,
  MarginValue,
  MarginValueWrap,
  WrapMargin,
  AlertText,
  AlertPercentage,
} from './MarginItem.styled';

export const MarginItem: React.FC<MarginItemProps> = ({ margin }) => {
  const { marginText, popoverText } = staticData.catalogCard;

  const [percentageValue, setPercentageValue] = useState<number>(margin);

  const isChangedValue = margin !== percentageValue;

  const handleSubmit = async () => {
    try {
      await serverApi.post('', { margin: percentageValue });
    } catch (error) {
      console.log('error', error);
    }
  };

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

      <ConfirmAlert handleSubmit={handleSubmit} disabled={isChangedValue}>
        <AlertText>
          {popoverText} <AlertPercentage>{percentageValue}%</AlertPercentage> ?
        </AlertText>
      </ConfirmAlert>
    </WrapMargin>
  );
};
