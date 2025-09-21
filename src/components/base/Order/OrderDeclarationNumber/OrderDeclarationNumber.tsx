import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';

import { DelBtn, Popup } from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';

import { MdOutlineAddBox } from 'react-icons/md';

import {
  AddDeclarationNumberBtn,
  DataBox,
  DataItem,
  DataItemDeclarationNumberValue,
  DataItemDeclarationNumberValueInner,
  DataItemTitle,
  DataLabel,
} from './OrderDeclarationNumber.styled';

export const OrderDeclarationNumber: React.FC<{
  order: OrderData;
  shipment: IShipment;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}> = ({ order, shipment, setOrder }) => {
  const [openDeclarationNumberPopup, setOpenDeclarationNumberPopup] =
    useState<boolean>(false);
  const [declarationNumberValue, setDeclarationNumberValue] =
    useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  const handleOpenDeclarationNumberPopup = () => {
    setOpenDeclarationNumberPopup(true);
  };
  const handleCloseDeclarationNumberPopup = () => {
    setOpenDeclarationNumberPopup(false);
  };

  const handleDeleteDeclarationNumber = async (declarationNumber: string) => {
    try {
      const { data } = await serverApi.post(
        `/orders/declaration-delete/${order._id}`,
        {
          declarationNumber,
        }
      );

      setOrder(prev =>
        prev
          ? {
              ...prev,
              updatedBy: data.updatedBy,
              declarationNumber: order.declarationNumber.filter(
                el => el !== declarationNumber
              ),
            }
          : prev
      );

      toast.success('Номер декларации удалён');
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при удалении номера декларации');
    }
  };

  const validateDeclarationNumber = (value: string) => {
    if (!value.trim()) return 'Введите номер декларации';
    if (!/^\d{14}$/.test(value))
      return 'Номер декларации должен состоять из 14 цифр';
    return '';
  };

  const handleAddDeclarationNumber = async () => {
    const error = validateDeclarationNumber(declarationNumberValue);
    if (error) {
      setInputError(error);
      return;
    }

    try {
      await serverApi.post(`/orders/declaration/${order._id}`, {
        declarationNumber: declarationNumberValue,
      });

      setOrder(prev =>
        prev
          ? {
              ...prev,
              declarationNumber: [
                ...prev.declarationNumber,
                declarationNumberValue,
              ],
            }
          : prev
      );

      toast.success('Номер декларации успешно добавлен');

      setDeclarationNumberValue('');
      setInputError('');
      handleCloseDeclarationNumberPopup();
    } catch (error) {
      console.error(error);
      toast.error('Ошибка при добавлении номера декларации');
    }
  };

  return (
    <DataBox>
      <DataLabel>Отправка</DataLabel>

      <ul>
        {shipment.delivery === 'post' && (
          <>
            {order.declarationNumber && (
              <DataItem>
                <DataItemDeclarationNumberValue>
                  <DataItemTitle>Номера ТТН:</DataItemTitle>
                  <AddDeclarationNumberBtn
                    type="button"
                    title="Добавить номер ТТН"
                    onClick={handleOpenDeclarationNumberPopup}
                  >
                    <MdOutlineAddBox size={20} />
                  </AddDeclarationNumberBtn>

                  <Popup
                    open={openDeclarationNumberPopup}
                    onClose={handleCloseDeclarationNumberPopup}
                    onSave={handleAddDeclarationNumber}
                  >
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Номер декларации"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={declarationNumberValue}
                      onChange={e => {
                        const onlyDigits = e.target.value.replace(/\D/g, '');
                        setDeclarationNumberValue(onlyDigits);

                        if (inputError) {
                          setInputError(validateDeclarationNumber(onlyDigits));
                        }
                      }}
                      inputProps={{
                        maxLength: 14,
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                      error={!!inputError}
                      helperText={inputError}
                    />
                  </Popup>
                </DataItemDeclarationNumberValue>

                <DataItemDeclarationNumberValue>
                  {order.declarationNumber &&
                    order.declarationNumber.map(el => (
                      <DataItemDeclarationNumberValueInner key={el}>
                        <DataItemDeclarationNumberValueInner>
                          {el}
                        </DataItemDeclarationNumberValueInner>
                        <DelBtn
                          action={() => {
                            handleDeleteDeclarationNumber(el);
                          }}
                        />
                      </DataItemDeclarationNumberValueInner>
                    ))}
                </DataItemDeclarationNumberValue>
              </DataItem>
            )}
          </>
        )}
      </ul>
    </DataBox>
  );
};
