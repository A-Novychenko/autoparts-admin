export const makeDeliveryPayMethod = (method: DeliveryPaymentMethod) => {
  switch (method) {
    case 'client':
      return 'Получатель';
    case 'shop':
      return 'Отправитель';
    case 'clientBank':
      return 'Получатель по б/н';
    case 'shopBank':
      return 'Отправитель по б/н';

    default:
      return 'Получатель';
  }
};
