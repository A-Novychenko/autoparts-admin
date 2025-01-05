import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding-top: 12px;
  padding-bottom: 12px;

  font-size: 14px;

  overflow: hidden;
  background-color: rgba(16, 19, 64, 0.03);
`;

export const ImgBox = styled.div`
  height: 150px;
  flex-shrink: 0;
  padding: 8px;
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const TextContentWrap = styled.div`
  flex-grow: 1;

  display: flex;

  @media screen and (max-width: 1299px) {
    flex-direction: column;
  }
`;

export const InfoBox = styled.div`
  flex-grow: 1;
  width: 320px;
  padding-left: 10px;
  padding-right: 10px;

  @media screen and (max-width: 1299px) {
    width: 100%;
  }
`;

export const Brand = styled.span`
  border: 1px solid rgba(16, 19, 64, 0.5);
  border-radius: 4px;
  padding: 2px;
`;

export const Description = styled.p`
  display: -webkit-box; /* Використовується для активації контейнера flex */
  -webkit-box-orient: vertical; /* Задає орієнтацію контейнера як вертикальну */
  overflow: hidden; /* Ховає текст, який виходить за межі */
  line-clamp: 3; /* Обмежує текст одним рядком */
  -webkit-line-clamp: 3;
`;

export const PriceBox = styled.div`
  padding-left: 10px;
  padding-right: 10px;

  @media screen and (max-width: 1299px) {
    width: 100%;
  }
`;

export const SupplierPrice = styled.p`
  color: #9e4200;
`;

export const ClientPrice = styled.p`
  color: #008402;
`;

export const PromoPriceBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const PromoRemoveBtn = styled.button`
  width: 72px;
  padding: 3px 4px;

  color: red;
  border: 1px solid rgba(16, 19, 64, 0.5);
  font-size: 12px;
  font-weight: 700;

  background-color: transparent;
`;
