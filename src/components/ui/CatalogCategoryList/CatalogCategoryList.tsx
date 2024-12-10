import { GoPlus } from 'react-icons/go';
import { FiMinus } from 'react-icons/fi';

import { CatalogCategoryBtn, Loader, Sidebar } from '@components/ui';

import { CatalogCategoryListProps } from './types';

export const CatalogCategoryList: React.FC<CatalogCategoryListProps> = ({
  categories,
  openCategories,
  handleClick,
  isLoading,
  selectedCategory,
}) => {
  // Рекурсивна функція для відображення категорій
  const renderCategories = (categories: ICategory[]) => {
    return (
      <ul>
        {categories.map(({ id, name, childrenCategories }) => (
          <li
            key={id}
            style={{
              marginBottom: 4,
            }}
          >
            <CatalogCategoryBtn
              id={id}
              name={name}
              handleClick={handleClick}
              selectedCategory={selectedCategory}
            >
              <span
                style={{
                  display: 'inline-block',
                  marginLeft:
                    childrenCategories && childrenCategories.length > 0
                      ? 0
                      : 12,
                }}
              >
                {openCategories.includes(id) &&
                childrenCategories &&
                childrenCategories.length > 0 ? (
                  <FiMinus />
                ) : (
                  childrenCategories &&
                  childrenCategories.length > 0 && <GoPlus />
                )}
              </span>
            </CatalogCategoryBtn>

            {openCategories.includes(id) && childrenCategories && (
              <div
                style={{
                  marginLeft: 8,
                  borderLeft: '1px solid rgba(185, 184, 184, 0.5)',
                  paddingLeft: 4,
                }}
              >
                {renderCategories(childrenCategories)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Sidebar>
      {!isLoading ? (
        <div style={{ display: 'flex' }}>
          {categories.length > 0 ? (
            <div
              style={{
                overflow: 'auto',
                maxHeight: 'calc(100vh - 64px - 40px * 3)',
                width: '100%',
              }}
            >
              {renderCategories(categories)}
            </div>
          ) : (
            <p>Немає категорій</p>
          )}
        </div>
      ) : (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Loader />
        </div>
      )}
    </Sidebar>
  );
};
