import { Dispatch, SetStateAction } from 'react';

import { GroupTreeNode, Loader } from '@/components/ui';

export const GroupTree: React.FC<{
  loading: boolean;
  groups: IGroup[];
  tree: IGroupTreeNode[];
  selectedGroup: IGroup | null;
  onSelectGroup: Dispatch<SetStateAction<IGroup | null>>;
}> = ({ loading, groups, tree, selectedGroup, onSelectGroup }) => {
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        tree.map(node => (
          <GroupTreeNode
            key={node._id}
            node={node}
            level={0}
            onSelectGroup={onSelectGroup}
            selectedId={selectedGroup?._id}
          />
        ))
      )}

      {groups.length === 0 && !loading && <p>Категорий пока нет.</p>}
    </div>
  );
};
