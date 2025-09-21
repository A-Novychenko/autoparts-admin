import { Dispatch, SetStateAction, useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { MdPersonAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import { NumberFormatValues } from 'react-number-format';
import {
  ClientCode,
  ClientMail,
  ClientName,
  CreateClientBox,
  CreateClientWrap,
  SearchClientsItem,
  SearchClientsList,
  SearchInputWrap,
  SearchProgress,
  Wrap,
} from './ClientSelector.styled';
import { serverApi } from '@/redux/auth/authOperations';
import { PhoneInput } from '@/components/ui';

interface ClientSelectorProps {
  orderId: string;
  onSelect: (client: IClient) => void;
  setClient: Dispatch<SetStateAction<IClient | null>>;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
}

export const ClientSelector: React.FC<ClientSelectorProps> = ({
  orderId,
  onSelect,
  setClient,
  setOrder,
}) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchCode, setSearchCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<IClient[]>([]);
  const [creating, setCreating] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    phone: '',
    email: '',
  });

  // Поиск клиентов
  const handleSearch = async () => {
    if (!searchPhone && !searchName && !searchCode) {
      toast.error('Введите хотя бы один параметр для поиска');
      return;
    }
    try {
      setLoading(true);
      const { data } = await serverApi.get('/clients/search', {
        params: {
          phone: searchPhone || undefined,
          name: searchName || undefined,
          clientCode: searchCode || undefined,
        },
      });
      setClients(data.clients || []);
    } catch (e) {
      console.error(e);
      toast.error('Ошибка поиска клиента');
    } finally {
      setLoading(false);
    }
  };

  // Создание нового клиента
  const handleCreate = async () => {
    if (!newClient.name || !newClient.phone) {
      toast.error('Имя и телефон обязательны');
      return;
    }
    try {
      const res = await serverApi.post('/clients/new', newClient);

      const { data } = await serverApi.patch(
        `/orders/choose-client/${orderId}`,
        {
          clientId: res.data.newClient._id,
        }
      );
      setClient(data.client);
      setOrder(prev => (prev ? { ...prev, updatedBy: data.updatedBy } : prev));

      toast.success('Клиент создан и выбран');

      onSelect(res.data.newClient);
      setCreating(false);
      setNewClient({ name: '', phone: '', email: '' });
    } catch (e) {
      console.error(e);
      toast.error('Не удалось создать клиента');
    }
  };

  // Выбор клиента для заказа
  const handleChooseClient = async (client: IClient) => {
    try {
      const { data } = await serverApi.patch(
        `/orders/choose-client/${orderId}`,
        {
          clientId: client._id,
        }
      );
      setClient(data.client);
      setOrder(prev => (prev ? { ...prev, updatedBy: data.updatedBy } : prev));
      onSelect(data.client);
      toast.success('Клиент выбран!');
    } catch (e) {
      console.error(e);
      toast.error('Клиент не выбран!');
    }
  };

  return (
    <Wrap>
      {/* Поиск клиентов */}
      <SearchInputWrap>
        <PhoneInput
          size="small"
          placeholder="Телефон"
          value={searchPhone}
          onValueChange={(v: NumberFormatValues) => setSearchPhone(v.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleSearch()
          }
        />
        <TextField
          size="small"
          placeholder="Имя"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleSearch()
          }
        />
        <TextField
          size="small"
          placeholder="Код клиента"
          value={searchCode}
          onChange={e => setSearchCode(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleSearch()
          }
        />
        <Button variant="contained" onClick={handleSearch}>
          Поиск
        </Button>
      </SearchInputWrap>

      {/* Результаты поиска */}
      {loading ? (
        <SearchProgress>
          <CircularProgress size={28} />
        </SearchProgress>
      ) : (
        <SearchClientsList>
          {clients.map(client => (
            <SearchClientsItem key={client._id}>
              <div className="info">
                <ClientName>{client.name}</ClientName>
                <ClientCode>
                  {client.phone} {client.clientCode && `| ${client.clientCode}`}
                </ClientCode>
                {client.email && <ClientMail>{client.email}</ClientMail>}
              </div>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleChooseClient(client)}
              >
                Выбрать клиента
              </Button>
            </SearchClientsItem>
          ))}
        </SearchClientsList>
      )}

      {/* Создание нового клиента */}
      <CreateClientBox>
        <Button
          startIcon={<MdPersonAdd />}
          onClick={() => setCreating(prev => !prev)}
        >
          {creating ? 'Отменить' : 'Создать нового клиента'}
        </Button>

        {creating && (
          <CreateClientWrap>
            <TextField
              size="small"
              label="Имя"
              value={newClient.name}
              onChange={e =>
                setNewClient(prev => ({ ...prev, name: e.target.value }))
              }
            />
            <PhoneInput
              size="small"
              label="Телефон"
              value={newClient.phone}
              onValueChange={(v: NumberFormatValues) =>
                setNewClient(prev => ({ ...prev, phone: v.formattedValue }))
              }
            />
            <TextField
              size="small"
              label="Email"
              value={newClient.email}
              onChange={e =>
                setNewClient(prev => ({ ...prev, email: e.target.value }))
              }
            />
            <Button variant="contained" color="primary" onClick={handleCreate}>
              Сохранить клиента
            </Button>
          </CreateClientWrap>
        )}
      </CreateClientBox>
    </Wrap>
  );
};
