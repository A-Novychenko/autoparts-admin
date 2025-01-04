import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding-top: 12px;
  padding-bottom: 12px;

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
`;

export const InfoBox = styled.div`
  width: 320px;
  padding-left: 20px;
  padding-right: 20px;
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
