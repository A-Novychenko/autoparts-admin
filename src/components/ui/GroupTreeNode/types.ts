import { Dispatch, SetStateAction } from 'react';

export type GroupTreeNodeProps = {
  node: IGroupTreeNode;
  level: number;
  selectedId?: string;
  onSelectGroup: Dispatch<SetStateAction<IGroup | null>>;
};
