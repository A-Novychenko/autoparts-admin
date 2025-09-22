import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { PageContainer, PageWrap } from '@/components/ui';
import { serverApi } from '@/redux/auth/authOperations';

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #374151;
`;

const Thead = styled.thead`
  background: #f9fafb;
  text-transform: uppercase;
  font-size: 12px;
  color: #6b7280;
  letter-spacing: 0.05em;
`;

const Th = styled.th`
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
`;

const Td = styled.td<{ muted?: boolean; accent?: boolean }>`
  padding: 10px 12px;
  border-bottom: 1px solid #f1f3f5;
  ${({ muted }) => muted && `color: #9ca3af;`}
  ${({ accent }) => accent && `color: #047857; font-weight: 600;`}
`;

const Tr = styled.tr`
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }
`;

export default function ClientsPage() {
  const [clients, setClients] = useState<IClient[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getClients = async () => {
      try {
        setIsLoading(true);
        setClients(null);

        const { data } = await serverApi.get('clients/');
        setClients(data.clients);
      } catch (e) {
        console.log('e', e);
      } finally {
        setIsLoading(false);
      }
    };

    getClients();
  }, []);

  return (
    <>
      <h1 className="visually-hidden">Clients</h1>

      <PageWrap>
        <PageContainer>
          <TableWrapper>
            <Table>
              <Thead>
                <tr>
                  <Th>Код</Th>
                  <Th>Логин</Th>
                  <Th>Оборот</Th>
                  <Th>Телефон</Th>
                  <Th>Email</Th>
                  <Th>Имя</Th>
                  <Th>ID</Th>
                  <Th>Создан</Th>
                  <Th>Обновлён</Th>
                </tr>
              </Thead>
              <tbody>
                {isLoading && (
                  <Tr>
                    <Td colSpan={9} muted>
                      Загрузка клиентов...
                    </Td>
                  </Tr>
                )}

                {clients &&
                  clients.map((client: IClient) => (
                    <Tr key={client._id}>
                      <Td>{client.clientCode}</Td>
                      <Td>{client.login}</Td>
                      <Td accent>{client.totalSpent} грн</Td>
                      <Td>{client.phone}</Td>
                      <Td>{client.email}</Td>
                      <Td>{client.name}</Td>
                      <Td muted>{client._id}</Td>
                      <Td muted>
                        {new Date(client.createdAt).toLocaleString('uk-UA')}
                      </Td>
                      <Td muted>
                        {new Date(client.updatedAt).toLocaleString('uk-UA')}
                      </Td>
                    </Tr>
                  ))}

                {!isLoading && clients?.length === 0 && (
                  <Tr>
                    <Td colSpan={9} muted>
                      Клиентов пока нет
                    </Td>
                  </Tr>
                )}
              </tbody>
            </Table>
          </TableWrapper>
        </PageContainer>
      </PageWrap>
    </>
  );
}
