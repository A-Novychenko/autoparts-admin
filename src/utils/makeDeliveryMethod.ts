export const makeDeliveryMethod = (method: DeliveryMethod | undefined) => {
  switch (method) {
    case 'post':
      return 'Новая почта';
    case 'pickup':
      return 'Самовывоз';

    default:
      return '—';
  }
};
