import { useState } from 'react';

import { IoCopyOutline } from 'react-icons/io5';

import { Button, Tip, Wrapper } from './CopyBtn.styled';

export const CopyBtn = ({
  text,
  label,
}: {
  text: string;
  label?: string | undefined;
}) => {
  const [showTip, setShowTip] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setShowTip(true);
      setTimeout(() => setShowTip(false), 1500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Button onClick={handleCopy}>
        {label}
        <IoCopyOutline size={16} />
      </Button>

      {showTip && <Tip>Скопировано!</Tip>}
    </Wrapper>
  );
};
