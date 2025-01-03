import { CatalogCategoryCardImage, Loader, MarginItem } from '@/components/ui';

import { formatDateToUkrainian } from '@/utils';

import staticData from '@/data/common.json';

import { CatalogCategoryCardProps } from './types';

import {
  Card,
  CategoryName,
  Wrap,
  WrapDate,
  CardInfo,
} from './CatalogCategoryCard.styled';

export const CatalogCategoryCard: React.FC<CatalogCategoryCardProps> = ({
  category,
  isLoading,
  setCategories,
}) => {
  const {
    nameText,
    nameTextNotSelected,
    noDateText,
    createdAtText,
    updatedAtText,
  } = staticData.catalogCard;

  return (
    <>
      <Wrap>
        {!isLoading ? (
          <>
            {category && (
              <Card>
                <CardInfo>
                  <CategoryName>{`${nameText}: ${category?.name}`}</CategoryName>
                  {category?.id && category?.margin && (
                    <MarginItem
                      key={category.id}
                      id={category.id}
                      margin={category.margin}
                      setCategories={setCategories}
                    />
                  )}

                  <WrapDate>
                    <p>
                      {` ${createdAtText}:
                ${
                  category?.createdAt
                    ? formatDateToUkrainian(category?.createdAt)
                    : noDateText
                }
                `}
                    </p>

                    <p>
                      {`    ${updatedAtText}: 
                ${
                  category?.createdAt
                    ? formatDateToUkrainian(category?.updatedAt)
                    : noDateText
                }`}
                    </p>
                  </WrapDate>
                </CardInfo>

                <CatalogCategoryCardImage category={category} />
              </Card>
            )}
            {!category && (
              <CategoryName>{`${nameTextNotSelected}`}</CategoryName>
            )}
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Loader />
          </div>
        )}
      </Wrap>
    </>
  );
};
