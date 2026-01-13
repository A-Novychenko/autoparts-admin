import { useEffect, useState } from 'react';

import { MdArrowForwardIos, MdCircle } from 'react-icons/md';

import { GroupTreeNodeProps } from './types';

import {
  IconWrapper,
  MarginBadge,
  NodeButton,
  NodeButtonWrap,
  Text,
  TreeItem,
  TreeList,
} from './GroupTreeNode.styled';

// Проверяет рекурсивно, содержится ли selectedId в потомках узла
const hasSelectedDescendant = (
  node: IGroupTreeNode,
  selectedId?: string
): boolean => {
  if (!selectedId || !node.children) return false;

  return node.children.some(
    child =>
      child._id === selectedId || hasSelectedDescendant(child, selectedId)
  );
};

export const GroupTreeNode: React.FC<GroupTreeNodeProps> = ({
  node,
  level,
  selectedId,
  onSelectGroup,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children && node.children.length > 0;

  const currentId = node._id || node._id?.toString();
  const isSelected = selectedId === currentId;

  // --- 2. Эффект для авто-раскрытия ---
  useEffect(() => {
    // Если текущий узел содержит выбранный элемент где-то в глубине,
    // или если текущий узел и есть выбранный (опционально, если хотите раскрывать и его),
    // то открываем ветку.

    const shouldExpand = hasSelectedDescendant(node, selectedId);

    if (shouldExpand) {
      setIsOpen(true);
    }
  }, [selectedId, node]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    onSelectGroup(node);

    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <TreeItem role="treeitem" aria-expanded={hasChildren ? isOpen : undefined}>
      <NodeButtonWrap level={level}>
        <NodeButton
          level={level}
          isOpen={isOpen}
          hasChildren={hasChildren}
          isSelected={isSelected}
          onClick={handleClick}
          type="button"
        >
          <IconWrapper isOpen={isOpen} isSelected={isSelected}>
            {hasChildren ? (
              <MdArrowForwardIos size={10} />
            ) : (
              <MdCircle size={8} />
            )}
          </IconWrapper>

          <Text>{node.name}</Text>

          <MarginBadge>{node.margin}%</MarginBadge>
        </NodeButton>
      </NodeButtonWrap>

      {hasChildren && isOpen && (
        <TreeList role="group">
          {node.children.map(child => (
            <GroupTreeNode
              key={child._id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelectGroup={onSelectGroup}
            />
          ))}
        </TreeList>
      )}
    </TreeItem>
  );
};
