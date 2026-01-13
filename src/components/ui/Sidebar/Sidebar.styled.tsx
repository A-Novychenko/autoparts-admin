import styled from '@emotion/styled';

export const SidebarWrap = styled.aside<{
  padding?: number;
  paddingBottom?: number;
}>`
  width: 380px;
  height: calc(100vh - 64px);
  padding: 40px;

  ${({ padding = '40px' }) => `padding: ${padding}px;`}
  ${({ paddingBottom }) =>
    paddingBottom && `padding-bottom: ${paddingBottom}px;`}

  border-right: 1px solid #b9b8b8;
`;
