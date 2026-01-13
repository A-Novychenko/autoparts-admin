import styled from '@emotion/styled';

export const UploaderLabel = styled.label<{ hasImage: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80px;
  height: 80px;

  border-radius: 50%;

  background: linear-gradient(135deg, #101340 0%, #268be3 100%);
  background-size: 200% auto;

  box-shadow: 0 8px 20px -5px rgba(38, 139, 227, 0.5);

  cursor: pointer;
  overflow: hidden;

  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 20px 35px -10px rgba(38, 139, 227, 0.7);
    background-position: right center;
  }

  &:active {
    transform: translateY(2px) scale(0.95);
    box-shadow: 0 4px 10px -2px rgba(79, 70, 229, 0.4);
    transition: all 0.1s ease;
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const IconOverlay = styled.div<{ visible: boolean }>`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: white;

  background: ${({ visible }) => (visible ? 'transparent' : 'rgba(0,0,0,0.4)')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const RemoveButton = styled.button`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  box-shadow: none;
  appearance: none;

  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  border: none;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  color: #ff0000;
  cursor: pointer;

  transition: all 0.2s ease;

  & > svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 2;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.9);
    transform: scale(1.1);
    color: white;
    fill: white;
    stroke: white;
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const CameraIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

export const EditIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
