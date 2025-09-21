export const makeTextPaymentMethod = (method: PaymentMethod | undefined) => {
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
      return '—';
  }
};
