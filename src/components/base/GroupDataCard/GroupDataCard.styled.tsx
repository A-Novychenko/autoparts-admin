import styled from '@emotion/styled';

export const CardContainer = styled.article`
  width: 100%;
  height: 160px;
  padding: 20px 24px;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;

  overflow: hidden;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow: hidden;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const GroupTitle = styled.h1`
  margin: 0;
  line-height: 1.1;
  font-weight: 700;
  color: #111827;
  letter-spacing: -0.02em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;

  transition: font-size 0.2s ease;
`;

export const ParentRow = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  min-width: 0;
`;

export const LabelIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #81a2e3;
  color: #ffffff;

  border-radius: 6px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
`;

export const ParentName = styled.span`
  padding: 2px 8px;
  color: #101340;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;

  border-radius: 6px;
  background: #ffffff;
  border: 1px dashed lightblue;

  transition: font-size 0.2s ease;
`;

export const BreadcrumbsRow = styled.div`
  display: flex;
  align-items: center;
  font-family: 'JetBrains Mono', 'Menlo', monospace;
  font-size: 11px;
  color: #9ca3af;

  min-width: 0;
  width: 100%;
  overflow-x: auto;
  white-space: nowrap;
  padding-top: 4px;
  padding-bottom: 4px;
  max-width: 400px;

  @media screen and (min-width: 1375px) {
    max-width: 40vw;
  }

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  -webkit-overflow-scrolling: touch;
`;

export const PathSegment = styled.span`
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
`;

export const Separator = styled.span`
  color: #d1d5db;
  margin: 0 6px;
  flex-shrink: 0;
`;

export const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const MarginBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  flex-shrink: 0;
  padding-top: 4px;
`;

export const MarginLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

export const MarginValue = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 800;
  line-height: 1;

  background: linear-gradient(135deg, #101340 0%, #2563eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
export const VisibleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  padding-top: 4px;
`;

export const VisibleLabel = styled.span`
  font-size: 10px;
  text-transform: uppercase;
  color: #9ca3af;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
`;

export const VisibleValue = styled.span<{ isVisible: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 800;
  line-height: 1;

  background: ${({ isVisible }) =>
    isVisible
      ? 'linear-gradient(135deg, #16892b 0%, #25eb5a 100%)'
      : 'linear-gradient(135deg, #681b1b 0%, #eb2525 100%)'};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
