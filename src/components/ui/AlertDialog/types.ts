import React from 'react';

export type AlertDialogProps = {
  title: string;
  description?: string;
  leftBtnLabel?: string;
  rightBtnLabel: string;
  rightColorBtn?: string;
  children: React.ReactNode;
  action: () => void;
};
