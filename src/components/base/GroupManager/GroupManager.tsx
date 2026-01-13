import { useState } from 'react';

import { toast } from 'react-toastify';

import { Btn, ConfirmAction, ImageUploader, Popup } from '@/components/ui';
import { GroupDataCard, GroupManagerForm } from '@/components/base';

import { serverApi } from '@/utils';
import { formatDateToUkrainian } from '@/utils';

import {
  CardContainer,
  ImgContainer,
  ControlContainer,
  DateBadge,
} from './GroupManager.styled';

export const GroupManager: React.FC<{
  group: IGroup;
  groups: IGroup[];
  onGroupAdded: (newGroup: IGroup) => void;
  onUpdateGroup: (updatedGroup: IGroup) => void;
  onDeleteGroup: (id: string, parentGroup: IGroup | null) => void;
  hasData: boolean;
}> = ({
  group,
  groups,
  onGroupAdded,
  onUpdateGroup,
  onDeleteGroup,
  hasData,
}) => {
  const [openEditPopup, setOpenEditPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (!group) return;

  const parentGroupData: IGroup | undefined = groups.find(
    ({ _id }) => group.parent === _id
  );

  const hasChildren = groups.find(({ parent }) => parent === group._id);

  const handleOpenEditPopup = () => {
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };
  const handleCloseEditForm = () => {
    setOpenEditPopup(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await serverApi.delete(`/catalog/groups/${id}`);

      onDeleteGroup(id, parentGroupData || null);

      toast.success('Группа удалена', {
        autoClose: 300,
      });
    } catch (e) {
      toast.error('Ошибка удаления');
    }
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('_id', group._id);
    formData.append('img', file);

    try {
      const { data } = await serverApi.put('/catalog/group-img', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onUpdateGroup(data.group);

      toast.success('Картинка загружена');
    } catch (e) {
      toast.error('Ошибка картинка загружена');
    }

    setLoading(false);
  };

  const handleClearImg = () => {
    onUpdateGroup({ ...group, img: '' });
  };

  return (
    <>
      {group && (
        <>
          <CardContainer>
            <ImgContainer>
              <ImageUploader
                onImageChange={handleUpload}
                initialImage={group.img}
                groupId={group._id}
                loading={loading}
                handleClearImg={handleClearImg}
              />
            </ImgContainer>

            <GroupDataCard group={group} parentGroupData={parentGroupData} />

            <ControlContainer>
              <ConfirmAction
                onConfirm={() => handleDelete(group._id)}
                message="Удалить группу и связи с товарами?"
              >
                <Btn
                  onClick={() => {}}
                  padding="8px 20px"
                  color="#fff"
                  backgroundColorFirst={'#ff4b4b'}
                  backgroundColorSecond={'#ff0000'}
                  shadowColor={'#930000'}
                  disabled={Boolean(hasChildren) || hasData}
                  title={
                    hasChildren
                      ? 'Нельзя удалить группу с вложенными группами и товарами'
                      : 'Удалить группу'
                  }
                >
                  Удалить группу
                </Btn>
              </ConfirmAction>

              <div>
                <DateBadge>
                  Создано: <span>{formatDateToUkrainian(group.createdAt)}</span>
                </DateBadge>
                <DateBadge>
                  Обновлено:
                  <span>{formatDateToUkrainian(group.updatedAt)}</span>
                </DateBadge>
              </div>

              <Btn onClick={handleOpenEditPopup} padding="8px 20px">
                Изменить
              </Btn>
            </ControlContainer>
          </CardContainer>

          <Popup
            title={`Изменение группы: ${group.name}`}
            open={openEditPopup}
            onClose={handleCloseEditPopup}
            maxWidth="md"
          >
            <GroupManagerForm
              groups={groups}
              onClose={handleCloseEditForm}
              editingGroup={group}
              onGroupAdded={onGroupAdded}
              onUpdateGroup={onUpdateGroup}
            />
          </Popup>
        </>
      )}
    </>
  );
};
