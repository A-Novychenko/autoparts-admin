export const makeBadgeColor = (status: string) => {
  switch (status) {
    case 'new':
      return '#2a67ff';
    case 'in-progress':
      return '#ff8018';
    case 'done':
      return '#22c55e';
    case 'rejected':
      return '#ff2a2a';

    default:
      return '#2a67ff';
  }
};
