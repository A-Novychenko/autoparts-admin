export const makeBadgeText = (status: string) => {
  switch (status) {
    case 'new':
      return 'Новый';
    case 'in-progress':
      return 'В обработке';
    case 'awaiting-payment':
      return 'Ожидает оплату';
    case 'processed':
      return 'Выполняется';
    case 'sent':
      return 'Отправлено';
    case 'reserve':
      return 'Резерв';
    case 'done':
      return 'Завершен';
    case 'rejected':
      return 'Отменен';
    default:
      return 'нет статуса';
  }
};
