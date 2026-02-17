// Базовая структура группы (как она приходит с бекенда)
interface IGroup {
  _id: string;
  name: string;
  slug: string;
  parent: string | null; // ID родителя или null
  ancestors: {
    _id: string;
    name: string;
    slug: string;
  }[];
  margin: number;
  img?: string;
  createdAt: string;
  updatedAt: string;
  isVisible: boolean;
  description: string | null;
}

// Структура узла дерева (расширяет группу массивом детей)
interface IGroupTreeNode extends IGroup {
  children: IGroupTreeNode[];
}
