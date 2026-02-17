export type IFormInput = {
  name: string;
  slug: string;
  margin: number;
  parent: string;
  img: string;
  isVisible: boolean;
  description: string | null;
};

export type GroupManagerFormProps = {
  groups: IGroup[];
  onClose: () => void;
  editingGroup?: IGroup | null;

  onGroupAdded: (newGroup: IGroup) => void;
  onUpdateGroup: (updatedGroup: IGroup) => void;
};
