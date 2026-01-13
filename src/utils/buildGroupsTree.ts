export const buildGroupsTree = (items: IGroup[]): IGroupTreeNode[] => {
  if (!items || items.length === 0) return [];

  const map: Record<string, IGroupTreeNode> = {};
  const roots: IGroupTreeNode[] = [];

  // Инициализация карты. Создаем копии объектов, чтобы не мутировать исходный массив
  items.forEach(item => {
    map[item._id] = { ...item, children: [] };
  });

  // Распределение по родителям
  items.forEach(item => {
    // Если есть родитель и он существует в нашей карте (защита от битых ссылок)
    if (item.parent && map[item.parent]) {
      map[item.parent].children.push(map[item._id]);
    } else {
      roots.push(map[item._id]);
    }
  });

  return roots;
};
