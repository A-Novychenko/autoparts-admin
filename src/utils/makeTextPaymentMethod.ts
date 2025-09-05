export const makeTextPaymentMethod = (method: PaymentMethod) => {
  switch (method) {
    case 'card':
      return 'Оплата картой';
    case 'cash':
      return 'Наличные';
    case 'prepayment':
      return 'Предоплата';
    case 'cod':
      return 'Наложенный платеж';

    default:
      'not method';
  }
};
