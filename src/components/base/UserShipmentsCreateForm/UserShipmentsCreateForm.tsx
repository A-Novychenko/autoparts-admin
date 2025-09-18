import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { serverApi } from '@/redux/auth/authOperations';

import {
  CreateForm,
  Field,
  FieldLabel,
  FieldControl,
  ActionsRow,
  PrimaryBtn,
  SecondaryBtn,
  FieldsGrid,
  CheckboxWrapper,
  FieldWrap,
} from './UserShipmentsCreateForm.styled';

type Props = {
  client: IClient | null;
  id: string | undefined;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setShipmentList: Dispatch<SetStateAction<IShipment[]>>;
};

export const UserShipmentsCreateForm: React.FC<Props> = ({
  client,
  id,
  loading,
  setLoading,
  setShipmentList,
}) => {
  // индивидуальные чекбоксы для name/phone/company
  const [useClientName, setUseClientName] = useState<boolean>(true);
  const [useClientPhone, setUseClientPhone] = useState<boolean>(true);
  const [useClientCompany, setUseClientCompany] = useState<boolean>(true);

  // память для ручных значений (чтобы восстановить после toggling)
  const [prevManual, setPrevManual] = useState({
    name: '',
    phone: '',
    company: '',
  });

  const [createData, setCreateData] = useState<Partial<IShipment>>({
    delivery: 'post',
    payment: 'prepayment',
    deliveryCity: '',
    postOffice: '',
    deliveryPayment: 'client',
    name: '',
    phone: '',
    company: '',
  });

  // инициализация при загрузке client: если чекбоксы включены — берем значения из client
  useEffect(() => {
    setCreateData(prev => ({
      ...prev,
      name: useClientName ? client?.name ?? '' : prev.name ?? '',
      phone: useClientPhone ? client?.phone ?? '' : prev.phone ?? '',
      company: useClientCompany ? client?.company ?? '' : prev.company ?? '',
    }));
    // заполним prevManual начальными значениями (если нужны)
    setPrevManual(prev => ({
      name: prev.name || client?.name || '',
      phone: prev.phone || client?.phone || '',
      company: prev.company || client?.company || '',
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  // --- HELPERS ---

  const setFieldAndRemember = (
    field: 'name' | 'phone' | 'company',
    value: string
  ) => {
    // при ручном вводе мы запоминаем manual value
    setPrevManual(prev => ({ ...prev, [field]: value }));
    // если чекбокс стоял (совпадает с клиентом) — при начале ручного ввода снимаем его
    if (
      (field === 'name' && useClientName) ||
      (field === 'phone' && useClientPhone) ||
      (field === 'company' && useClientCompany)
    ) {
      if (field === 'name') setUseClientName(false);
      if (field === 'phone') setUseClientPhone(false);
      if (field === 'company') setUseClientCompany(false);
    }
    setCreateData(prev => ({ ...prev, [field]: value }));
  };

  // переключение одного чекбокса (имя/телефон/компания)
  const toggleFieldCheckbox = (
    field: 'name' | 'phone' | 'company',
    checked: boolean
  ) => {
    if (field === 'name') setUseClientName(checked);
    if (field === 'phone') setUseClientPhone(checked);
    if (field === 'company') setUseClientCompany(checked);

    if (checked) {
      // включили — ставим значение клиента (если есть), иначе если нет клиента — ставим prevManual (если есть)
      setCreateData(prev => ({
        ...prev,
        [field]: client
          ? client[field] ?? prevManual[field]
          : prevManual[field] ?? '',
      }));
    } else {
      // выключили — восстанавливаем prevManual (или пустую строку)
      setCreateData(prev => ({
        ...prev,
        [field]: prevManual[field] ?? '',
      }));
    }
  };

  // нижний общий чекбокс — ставит/снимает все
  const toggleAllCheckboxes = (checked: boolean) => {
    setUseClientName(checked);
    setUseClientPhone(checked);
    setUseClientCompany(checked);

    if (checked) {
      // ставим все значения, которые совпадают с клиентом (если клиента нет — используем prevManual)
      setCreateData(prev => ({
        ...prev,
        name: client ? client.name ?? prevManual.name : prevManual.name,
        phone: client ? client.phone ?? prevManual.phone : prevManual.phone,
        company: client
          ? client.company ?? prevManual.company
          : prevManual.company,
      }));
    } else {
      // снимаем все — восстановим prevManual (если были ручные значения)
      setCreateData(prev => ({
        ...prev,
        name: prevManual.name ?? '',
        phone: prevManual.phone ?? '',
        company: prevManual.company ?? '',
      }));
    }
  };

  // вычисление статуса нижнего чекбокса: все ли включены
  const allChecked = useClientName && useClientPhone && useClientCompany;

  // --- submit ---
  const createShipment = async () => {
    if (!id) {
      toast.error('Не указан клиент');
      return;
    }

    setLoading(true);
    try {
      const payload = { ...createData, client: id };

      const { data } = await serverApi.post(
        `/clients/add-shipment/${id}`,
        payload
      );

      const newShipment = data?.newShipment; // 👈 правильное место
      if (!newShipment?._id) {
        toast.error('Сервер не вернул _id у новой доставки');
        return;
      }

      setShipmentList(prev => [...prev, newShipment]);

      // Сбросим форму не трогая чекбоксы (оставим их как есть),
      // но если чекбоксы выставлены на совпадение, поле должно снова показать клиентское значение
      setCreateData({
        delivery: 'post',
        payment: 'prepayment',
        deliveryCity: '',
        postOffice: '',
        deliveryPayment: 'client',
        name: useClientName ? client?.name ?? '' : prevManual.name ?? '',
        phone: useClientPhone ? client?.phone ?? '' : prevManual.phone ?? '',
        company: useClientCompany
          ? client?.company ?? ''
          : prevManual.company ?? '',
      });
    } catch (err) {
      console.error(err);
      toast.error('Ошибка при создании доставки');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setPrevManual({ name: '', phone: '', company: '' });

    setCreateData({
      delivery: 'post',
      payment: 'prepayment',
      deliveryCity: '',
      postOffice: '',
      deliveryPayment: 'client',
      name: useClientName ? client?.name ?? '' : '',
      phone: useClientPhone ? client?.phone ?? '' : '',
      company: useClientCompany ? client?.company ?? '' : '',
    });
  };

  return (
    <CreateForm>
      <FieldsGrid>
        <Field>
          <FieldLabel>Тип доставки</FieldLabel>
          <FieldControl
            as="select"
            value={createData.delivery}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCreateData(prev => ({
                ...prev,
                delivery: e.target.value as DeliveryMethod,
              }))
            }
          >
            <option value="post">Новая Почта</option>
            <option value="pickup">Самовывоз</option>
          </FieldControl>
        </Field>

        <Field>
          <FieldLabel>Оплата</FieldLabel>
          <FieldControl
            as="select"
            value={createData.payment}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCreateData(prev => ({
                ...prev,
                payment: e.target.value as PaymentMethod,
              }))
            }
          >
            <option value="prepayment">Предоплата</option>
            <option value="cash">Наличными</option>
            <option value="card">На карту</option>
            <option value="cod">Наложка</option>
          </FieldControl>
        </Field>

        {/* Имя */}
        <FieldWrap>
          <Field>
            <FieldLabel>Имя получателя</FieldLabel>
            <FieldControl
              value={createData.name || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldAndRemember('name', e.target.value)
              }
              placeholder="Имя получателя"
            />
          </Field>
          <CheckboxWrapper>
            <input
              id="useClientName"
              type="checkbox"
              checked={useClientName}
              onChange={e => toggleFieldCheckbox('name', e.target.checked)}
            />
            <label htmlFor="useClientName">Совпадает с клиентом</label>
          </CheckboxWrapper>
        </FieldWrap>

        {/* Телефон */}
        <FieldWrap>
          <Field>
            <FieldLabel>Телефон получателя</FieldLabel>
            <FieldControl
              value={createData.phone || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldAndRemember('phone', e.target.value)
              }
              placeholder="+38 (0XX) XXX-XX-XX"
            />
          </Field>
          <CheckboxWrapper>
            <input
              id="useClientPhone"
              type="checkbox"
              checked={useClientPhone}
              onChange={e => toggleFieldCheckbox('phone', e.target.checked)}
            />
            <label htmlFor="useClientPhone">Совпадает с клиентом</label>
          </CheckboxWrapper>
        </FieldWrap>

        {/* Компания */}
        <FieldWrap>
          <Field>
            <FieldLabel>Компания</FieldLabel>
            <FieldControl
              value={createData.company || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFieldAndRemember('company', e.target.value)
              }
              placeholder="Компания (если есть)"
            />
          </Field>
          <CheckboxWrapper>
            <input
              id="useClientCompany"
              type="checkbox"
              checked={useClientCompany}
              onChange={e => toggleFieldCheckbox('company', e.target.checked)}
            />
            <label htmlFor="useClientCompany">Совпадает с клиентом</label>
          </CheckboxWrapper>
        </FieldWrap>

        {createData.delivery === 'post' && (
          <>
            <Field>
              <FieldLabel>Город</FieldLabel>
              <FieldControl
                value={createData.deliveryCity || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCreateData(prev => ({
                    ...prev,
                    deliveryCity: e.target.value,
                  }))
                }
              />
            </Field>

            <Field>
              <FieldLabel>Отделение</FieldLabel>
              <FieldControl
                value={createData.postOffice || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCreateData(prev => ({
                    ...prev,
                    postOffice: e.target.value,
                  }))
                }
              />
            </Field>

            <Field>
              <FieldLabel>Оплата доставки</FieldLabel>
              <FieldControl
                as="select"
                value={createData.deliveryPayment || 'client'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCreateData(prev => ({
                    ...prev,
                    deliveryPayment: e.target.value as
                      | 'client'
                      | 'shop'
                      | 'clientBank'
                      | 'shopBank',
                  }))
                }
              >
                <option value="client">Клиент</option>
                <option value="shop">Магазин</option>
                <option value="clientBank">Клиент по б/н</option>
                <option value="shopBank">Магазин по б/н</option>
              </FieldControl>
            </Field>
          </>
        )}
      </FieldsGrid>

      <ActionsRow>
        <div>
          <input
            id="unsetAll"
            type="checkbox"
            checked={allChecked}
            onChange={e => toggleAllCheckboxes(e.target.checked)}
          />
          <label htmlFor="unsetAll" style={{ marginLeft: 8 }}>
            Снять/поставить все совпадения
          </label>
        </div>

        <PrimaryBtn onClick={createShipment} disabled={loading}>
          Создать
        </PrimaryBtn>
        <SecondaryBtn onClick={clearForm}>Очистить</SecondaryBtn>
      </ActionsRow>
    </CreateForm>
  );
};

export default UserShipmentsCreateForm;
