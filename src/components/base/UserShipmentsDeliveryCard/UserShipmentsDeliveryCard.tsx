import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import { MdOutlineEdit, MdDelete, MdSave, MdCancel } from 'react-icons/md';

import { serverApi } from '@/utils';
import { makeDeliveryPayMethod, makeTextPaymentMethod } from '@/utils';

import {
  PrimaryBtn,
  SecondaryBtn,
  ShipmentCard,
  CardRow,
  CardLabel,
  CardValue,
  CardActions,
  InlineInput,
  SmallSelect,
} from './UserShipmentsDeliveryCard.styled';
import { ConfirmAction } from '@/components/ui';

export const UserShipmentsDeliveryCard: React.FC<{
  shipment: IShipment;
  setShipmentList: Dispatch<SetStateAction<IShipment[]>>;
}> = ({ shipment, setShipmentList }) => {
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // editing state: which shipment is being edited and its draft data
  const [editingId, setEditingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, Partial<IShipment>>>({});

  const isEditing = editingId === shipment._id;
  const draft = drafts[shipment._id] ?? {};

  // handlers
  const startEdit = (s: IShipment) => {
    setEditingId(s._id);
    setDrafts(prev => ({ ...prev, [s._id]: { ...s } }));
  };

  const cancelEdit = (sId: string) => {
    setEditingId(prev => (prev === sId ? null : prev));
    setDrafts(prev => {
      const copy = { ...prev };
      delete copy[sId];
      return copy;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const changeDraft = (sId: string, field: keyof IShipment, value: any) => {
    setDrafts(prev => ({
      ...prev,
      [sId]: { ...(prev[sId] || {}), [field]: value },
    }));
  };

  const saveEdit = async (sId: string) => {
    const {
      delivery,
      deliveryCity,
      postOffice,
      payment,
      name,
      phone,
      deliveryPayment,
      company,
    } = drafts[sId];

    const payload = {
      delivery,
      deliveryCity,
      postOffice,
      payment,
      name,
      phone,
      deliveryPayment,
      company,
    };

    if (!payload) return;
    setSavingId(sId);
    try {
      await serverApi.patch(`/clients/shipment/${sId}`, payload);
      setShipmentList(prev =>
        prev.map(s =>
          s._id === sId
            ? ({ ...s, ...(payload as Partial<IShipment>) } as IShipment)
            : s
        )
      );
      toast.success('Доставка обновлена');
      cancelEdit(sId);
    } catch (err) {
      console.error(err);
      toast.error('Ошибка при обновлении доставки');
    } finally {
      setSavingId(null);
    }
  };

  const deleteShipment = async (sId: string) => {
    setDeletingId(sId);
    try {
      await serverApi.delete(`/clients/shipment/${sId}`);

      setShipmentList(prev => prev.filter(s => s._id !== sId));
      toast.success('Доставка удалена');
    } catch (err) {
      console.error(err);
      toast.error('Не удалось удалить доставку');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ShipmentCard>
      <div>
        <CardRow>
          <CardLabel>Тип</CardLabel>
          <CardValue>
            {isEditing ? (
              <SmallSelect
                value={draft.delivery ?? shipment.delivery}
                onChange={e =>
                  changeDraft(shipment._id, 'delivery', e.target.value)
                }
              >
                <option value="post">Новая Почта</option>
                <option value="pickup">Самовывоз</option>
              </SmallSelect>
            ) : shipment.delivery === 'post' ? (
              'Новая Почта'
            ) : (
              'Самовывоз'
            )}
          </CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Оплата</CardLabel>
          <CardValue>
            {isEditing ? (
              <SmallSelect
                value={makeTextPaymentMethod(draft.payment ?? shipment.payment)}
                onChange={e =>
                  changeDraft(shipment._id, 'payment', e.target.value)
                }
              >
                <option value="prepayment">Предоплата</option>
                <option value="cash">Наличными</option>
                <option value="card">На карту</option>
                <option value="cod">Наложка</option>
              </SmallSelect>
            ) : (
              makeTextPaymentMethod(shipment.payment)
            )}
          </CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Имя получателя</CardLabel>
          <CardValue>
            {isEditing ? (
              <InlineInput
                value={draft.name ?? shipment.name ?? ''}
                onChange={e =>
                  changeDraft(shipment._id, 'name', e.target.value)
                }
              />
            ) : (
              shipment.name ?? '—'
            )}
          </CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Тел. получателя</CardLabel>
          <CardValue>
            {isEditing ? (
              <InlineInput
                value={draft.phone ?? shipment.phone ?? ''}
                onChange={e =>
                  changeDraft(shipment._id, 'phone', e.target.value)
                }
              />
            ) : (
              shipment.phone ?? '—'
            )}
          </CardValue>
        </CardRow>
        <CardRow>
          <CardLabel>Компания</CardLabel>
          <CardValue>
            {isEditing ? (
              <InlineInput
                value={draft.company ?? shipment.company ?? ''}
                onChange={e =>
                  changeDraft(shipment._id, 'company', e.target.value)
                }
              />
            ) : (
              shipment.company ?? '—'
            )}
          </CardValue>
        </CardRow>
        {(isEditing
          ? (draft.delivery ?? shipment.delivery) === 'post'
          : shipment.delivery === 'post') && (
          <>
            <CardRow>
              <CardLabel>Город</CardLabel>
              <CardValue>
                {isEditing ? (
                  <InlineInput
                    value={draft.deliveryCity ?? shipment.deliveryCity ?? ''}
                    onChange={e =>
                      changeDraft(shipment._id, 'deliveryCity', e.target.value)
                    }
                  />
                ) : (
                  shipment.deliveryCity ?? '—'
                )}
              </CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Отделение</CardLabel>
              <CardValue>
                {isEditing ? (
                  <InlineInput
                    value={draft.postOffice ?? shipment.postOffice ?? ''}
                    onChange={e =>
                      changeDraft(shipment._id, 'postOffice', e.target.value)
                    }
                  />
                ) : (
                  shipment.postOffice ?? '—'
                )}
              </CardValue>
            </CardRow>

            <CardRow>
              <CardLabel>Оплата доставки</CardLabel>
              <CardValue>
                {isEditing ? (
                  <SmallSelect
                    value={makeDeliveryPayMethod(
                      draft.deliveryPayment ?? shipment.deliveryPayment
                    )}
                    onChange={e =>
                      changeDraft(
                        shipment._id,
                        'deliveryPayment',
                        e.target.value
                      )
                    }
                  >
                    <option value="client">Клиент</option>
                    <option value="shop">Магазин</option>
                    <option value="clientBank">Клиент по б/н</option>
                    <option value="shopBank">Магазин по б/н</option>
                  </SmallSelect>
                ) : (
                  makeDeliveryPayMethod(shipment.deliveryPayment)
                )}
              </CardValue>
            </CardRow>
          </>
        )}
      </div>

      <CardActions>
        {isEditing ? (
          <>
            <PrimaryBtn
              onClick={() => saveEdit(shipment._id)}
              disabled={savingId === shipment._id}
            >
              <MdSave />
              {savingId === shipment._id ? 'Сохраняем...' : 'Сохранить'}
            </PrimaryBtn>
            <SecondaryBtn onClick={() => cancelEdit(shipment._id)}>
              <MdCancel />
              Отмена
            </SecondaryBtn>
          </>
        ) : (
          <>
            <PrimaryBtn
              onClick={() => startEdit(shipment)}
              aria-label={`Редактировать доставку ${shipment._id}`}
            >
              <MdOutlineEdit />
              Редактировать
            </PrimaryBtn>

            <ConfirmAction
              message="Таки удалить, да?🤔"
              onConfirm={() => deleteShipment(shipment._id)}
            >
              <SecondaryBtn disabled={deletingId === shipment._id}>
                <MdDelete />
                {deletingId === shipment._id ? 'Удаляем...' : 'Удалить'}
              </SecondaryBtn>
            </ConfirmAction>
          </>
        )}
      </CardActions>
    </ShipmentCard>
  );
};
