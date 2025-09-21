export const makeBadgeColor = (status: string) => {
  switch (status) {
    case 'new':
      return '#2563eb';
    case 'in-progress':
      return '#f97316';
    case 'awaiting-payment':
      return '#eab308';
    case 'processed':
      return '#38bdf8';
    case 'sent':
      return '#8b5cf6';
    case 'reserve':
      return '#14b8a6';
    case 'done':
      return '#22c55e';
    case 'rejected':
      return '#ef4444';
    case 'accounted':
      return '#00000074';
    default:
      return '#000000';
  }
};
