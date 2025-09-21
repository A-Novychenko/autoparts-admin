import styled from '@emotion/styled';

const COLORS = {
  mainBg: '#c2ffd4',
  primary: '#007bff',
  accent: '#00a6fa',
  muted: '#6b7280',
  border: '#e5e7eb',
  borderOpacity: '#e5e7eb99',
  bg: '#ffffff',
  surface: '#fafafa',
  summary: '#fcf6c2',
};

/* Controls area */
export const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 220px;
`;

export const DocBox = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

// const BaseBtn = styled.button`
//   display: inline-flex;
//   align-items: center;
//   gap: 8px;
//   padding: 8px 12px;
//   border-radius: 8px;
//   border: none;
//   cursor: pointer;
//   font-weight: 600;
//   font-size: 0.95rem;
//   transition: transform 0.12s ease, box-shadow 0.12s ease;
//   svg {
//     width: 16px;
//     height: 16px;
//   }
//   &:active {
//     transform: translateY(1px);
//   }
// `;

// export const DocBtnPreview = styled(BaseBtn)`
//   background: ${COLORS.mainBg};
//   color: #007708;
//   box-shadow: 0 4px 10px rgba(0, 166, 250, 0.12);
// `;

// export const DocBtnInv = styled(BaseBtn)`
//   background: ${COLORS.accent};
//   color: #fff;
//   box-shadow: 0 4px 10px rgba(0, 166, 250, 0.12);
// `;

// export const DocBtn = styled(BaseBtn)`
//   background: ${COLORS.surface};
//   color: #111827;
//   border: 1px solid ${COLORS.border};
// `;
const BaseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  svg {
    width: 18px;
    height: 18px;
  }
  &:active {
    transform: translateY(1px) scale(0.98);
  }
`;

/* Предзаказ */
export const DocBtnPreview = styled(BaseBtn)`
  background: ${COLORS.mainBg};
  color: #057a3e;
  border: 1px solid #9ef0b4;
  box-shadow: 0 2px 6px rgba(0, 150, 50, 0.12);

  &:hover {
    background: #a7f5b9;
    box-shadow: 0 4px 10px rgba(0, 150, 50, 0.2);
  }
  &:focus {
    outline: 2px solid #4ade80;
    outline-offset: 2px;
  }
`;

/* Счёт */
export const DocBtnInv = styled(BaseBtn)`
  background: ${COLORS.accent};
  color: #fff;
  box-shadow: 0 2px 6px rgba(0, 166, 250, 0.25);

  &:hover {
    background: #0090e6;
    box-shadow: 0 4px 12px rgba(0, 140, 220, 0.35);
  }
  &:focus {
    outline: 2px solid #38bdf8;
    outline-offset: 2px;
  }
`;

/* Расходная */
export const DocBtn = styled(BaseBtn)`
  background: ${COLORS.surface};
  color: #111827;
  border: 1px solid ${COLORS.border};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #f3f4f6;
    border-color: #d1d5db;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  }
  &:focus {
    outline: 2px solid #9ca3af;
    outline-offset: 2px;
  }
`;

export const SummarySection = styled.section<{ isAccounted: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px 16px;
  /* background: ${COLORS.bg}; */
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
  background-color: ${({ isAccounted }) =>
    isAccounted ? 'var(--accounting-order)' : COLORS.bg};
`;

export const SummaryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

export const SummaryBox = styled.div`
  display: flex;
  gap: 20px;
  font-size: 0.92rem;
  color: ${COLORS.muted};

  margin-left: auto;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    gap: 6px;

    strong {
      font-weight: 600;
      color: #111;
    }
  }
`;

export const SummaryTotal = styled.div`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${COLORS.primary};
  padding: 6px 12px;
  background: linear-gradient(90deg, ${COLORS.accent}20, ${COLORS.accent}10);
  border-radius: 8px;
  white-space: nowrap;
`;

export const SummaryBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: ${COLORS.muted};
`;

export const SummaryInfoBox = styled.div`
  display: flex;
  gap: 24px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

export const SummaryInfoItem = styled.li`
  line-height: 1.3;
`;

export const AccBtn = styled.button`
  all: unset; /* сброс ВСЕХ встроенных стилей браузера */
  cursor: pointer;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ab9203;
  border-radius: 6px;

  transition: color var(--animate), background-color var(--animate);

  &:hover,
  &:focus {
    background-color: #ab9203;
    color: #fff;
    outline: none;
  }

  &:disabled {
    background-color: #fff;
    color: #949494;
  }
  &:disabled :hover,
  &:disabled :focus {
    background-color: #fff;
    color: #949494;
  }
`;
