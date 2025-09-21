import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SearchInputWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SearchProgress = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px 0;
`;

export const SearchClientsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SearchClientsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;

  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);

  transition: transform 0.15s ease, box-shadow 0.15s ease;

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }
`;

export const ClientName = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #222;
`;

export const ClientCode = styled.p`
  font-size: 14px;
  color: #666;
`;

export const ClientMail = styled.p`
  font-size: 13px;
  color: #888;
`;

export const CreateClientBox = styled.div`
  border-top: 1px solid #8989898e;
  padding-top: 16px;
  margin-top: 8px;
`;

export const CreateClientWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;
