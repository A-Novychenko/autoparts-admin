import { CatalogCategoryCardProps } from './types';

import { Wrap } from './CatalogCategoryCard.styled';

export const CatalogCategoryCard: React.FC<CatalogCategoryCardProps> = ({
  category,
}) => {
  if (!category) return;

  const { _id, id, img, name, parent_id, createdAt, updatedAt } = category;

  return (
    <Wrap>
      <p>_id: {_id}</p>
      <p>ASG id: {id}</p>
      <p>img: {img}</p>
      <p>name: {name}</p>
      <p>parent_id: {parent_id}</p>
      <p>createdAt: {createdAt}</p>
      <p>updatedAt: {updatedAt}</p>
    </Wrap>
  );
};
