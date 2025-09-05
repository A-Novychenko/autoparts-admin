import { useEffect, useState } from 'react';

import { PageContainer, PageWrap } from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';

export default function ClientsPage() {
  const [clients, setClients] = useState<IClient[] | null>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        setIsLoading(true);
        setClients(null);

        const { data } = await serverApi.get('clients/');

        console.log('clients', data.clients);

        setClients(data.clients);
      } catch (e) {
        console.log('e', e);
      } finally {
        setIsLoading(false);
      }
    };

    getTopProducts();
  }, []);

  return (
    <>
      <h1 className="visually-hidden">ProductsPage</h1>

      {isLoading && null}

      <PageWrap>
        <PageContainer>
          <ul>
            <li
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(9, 1fr)', // 9 колонок, под каждое поле
                gap: '4px',
                borderBottom: '1px solid #ccc',
                padding: '4px 0',
              }}
            >
              <p>login</p>
              <p> password</p>
              <p> clientCode</p>
              <p>phone</p>
              <p> email</p>
              <p> name</p>
              <p>_id</p>
              <p> createdAt</p>
              <p> updatedAt</p>
            </li>
            {clients &&
              clients.map((client: IClient) => {
                const {
                  login,
                  password,
                  clientCode,
                  phone,
                  email,
                  name,
                  _id,
                  createdAt,
                  updatedAt,
                } = client;

                return (
                  <li
                    key={client._id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(9, 1fr)', // 9 колонок, под каждое поле
                      gap: '16px',
                      borderBottom: '1px solid #ccc',
                      padding: '4px 0',
                    }}
                  >
                    <p>{login} </p>
                    <p> {password} </p>
                    <p> {clientCode} </p>
                    <p> {phone} </p>
                    <p> {email} </p>
                    <p> {name} </p>
                    <p> {_id} </p>
                    <p> {new Date(createdAt).toLocaleString('uk-UA')} </p>
                    <p> {new Date(updatedAt).toLocaleString('uk-UA')} </p>
                  </li>
                );
              })}
          </ul>
        </PageContainer>
      </PageWrap>
    </>
  );
}
