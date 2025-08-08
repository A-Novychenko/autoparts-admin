import styled from '@emotion/styled';

export const Wrapper = styled.div`
  padding: 32px 16px;
  max-width: 1000px;
  margin: 0 auto;
`;

export const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DocBox = styled.div`
  display: flex;
  gap: 8px;
`;

export const DocBtnInv = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  background-color: #00a6fa;
  color: #000;

  &:hover {
    background-color: #1200dc;
    color: #ffffff;
    transition: background-color 300ms cubic-bezier(0.075, 0.82, 0.165, 1),
      color 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export const DocBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;

  &:hover {
    background-color: #1200dc;
    transition: background-color 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
  }
`;

export const Section = styled.section`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
`;

export const InfoItem = styled.p`
  margin-bottom: 6px;
`;

export const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ProductCard = styled.li`
  display: flex;
  gap: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  flex-grow: 1;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 8px;
  margin-bottom: 16px;
  resize: vertical;
`;

export const TextAreaStyled = styled.textarea`
  padding: 12px 14px;
  border: 1px solid #ccd1d9;
  border-radius: 8px;
  resize: vertical;
  font-size: 15px;
`;

export const SaveBtn = styled.button`
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
`;
