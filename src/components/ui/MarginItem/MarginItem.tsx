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

export const MarginItem: React.FC<MarginItemProps> = ({
  id,
  margin,
  setCategories,
}) => {
  const { marginText, popoverText } = staticData.catalogCard;

  const [percentageValue, setPercentageValue] = useState<number>(margin);

  const isChangedValue = margin !== percentageValue;

  const updateCategories = (
    categories: ICategory[],
    updatedCategory: ICategory
  ): ICategory[] => {
    return categories.map(category => {
      if (category.id === updatedCategory.id) {
        return {
          ...category,
          margin: updatedCategory.margin,
          childrenCategories: category.childrenCategories
            ? updatedCategory.childrenCategories
            : category.childrenCategories,
        };
      }

      return category;
    });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await serverApi.put('/cms-catalog/margin', {
        id,
        margin: percentageValue,
      });

      if (data.data && data.data.length > 0) {
        const updatedCategory = data.data[0];

        setCategories((prevCategories: ICategory[]) => {
          return updateCategories(prevCategories, updatedCategory);
        });
      }
    } catch (error) {
      console.log('Error during category update:', error);
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
