import styled from '@emotion/styled';

/* breakpoints */
const bp = {
  mobile: '@media (max-width: 420px)', // iPhone XS/SE range
  tablet: '@media (max-width: 900px)',
};

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  /* background-color: linear-gradient(180deg, #f7fafc, #fff); */
  background-color: #f7fafc; /* однотонный фон вместо градиента */
  min-height: calc(100vh - 64px);
  height: calc(100vh - 64px);
  box-sizing: border-box;
`;

export const HeaderWrap = styled.div`
  position: sticky;
  top: 64px;

  padding-bottom: 16px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  border-radius: 12px;
`;
export const Header = styled.header`
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const TopRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  margin: 0;
  color: #0f172a;
`;

export const BackButton = styled.button`
  border: 1px solid #cbd5e1;
  background: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  color: #0f172a;
  &:hover {
    background: #f2f4f7;
  }
`;

export const ShipmentList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  padding: 20px;

  ${bp.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${bp.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  padding: 28px;
  text-align: center;
  color: #64748b;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #e6eef8;
`;

export const Spinner = styled.div`
  padding: 12px;
  text-align: center;
  color: #0f172a;
`;
