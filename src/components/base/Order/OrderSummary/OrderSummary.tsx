import { pdf } from '@react-pdf/renderer';
import { toast } from 'react-toastify';

import {
  ConfirmAction,
  DelBtn,
  DeliveryNotePDF,
  InvoicePDF,
  PreviewOrderPdf,
} from '@/components/ui';

import { formatDateToUkrainian } from '@/utils';

import { FaRegFilePdf } from 'react-icons/fa6';
import { LiaFileInvoiceSolid } from 'react-icons/lia';

import {
  Controls,
  DocBox,
  DocBtnInv,
  DocBtn,
  SummarySection,
  SummaryInfoBox,
  SummaryInfoItem,
  SummaryBottom,
  SummaryBox,
  SummaryWrap,
  SummaryTotal,
  DocBtnPreview,
  AccBtn,
} from './OrderSummary.styled';
import { serverApi } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { Dispatch, SetStateAction } from 'react';

export const OrderSummary: React.FC<{
  client: IClient | null;
  order: OrderData;
  products: OrderProduct[];
  shipment: IShipment | null;
  setOrder: Dispatch<SetStateAction<OrderData | null>>;
  setClient: Dispatch<SetStateAction<IClient | null>>;
}> = ({ order, client, shipment, products, setOrder, setClient }) => {
  const navigate = useNavigate();

  const productsCount = products?.length || 0;

  const handleOpenDeliveryNotePdf = async () => {
    try {
      const blob = await pdf(
        <DeliveryNotePDF
          order={order}
          shipment={shipment}
          products={products}
        />
      ).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('PDF генерирование (накладная):', err);
      toast.error('Ошибка генерации накладной');
    }
  };

  const handleOpenInvoicePdf = async () => {
    try {
      const blob = await pdf(
        <InvoicePDF order={order} products={products} shipment={shipment} />
      ).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('PDF генерирование (счет):', err);
      toast.error('Ошибка генерации счёта');
    }
  };

  const handlePreviewOrderPdf = async () => {
    try {
      const blob = await pdf(
        <PreviewOrderPdf order={order} products={products} />
      ).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('PDF генерирование (счет):', err);
      toast.error('Ошибка генерации счёта');
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const { data } = await serverApi.delete(
        `/orders/delete-order/${order._id}`
      );

      toast.success(`Заказ ${data.number} успешно удален`);

      navigate('/dashboard/orders/order-list');
    } catch (e) {
      console.log('e', e);
      toast.error(`Ошибка, заказ не удален`);
    }
  };

  const totalSupplierPrice = products.reduce(
    (acc, { supplierPrice, quantity }) =>
      acc + (supplierPrice ? supplierPrice * quantity : 0),
    0
  );

  const handleOrderAccounting = async () => {
    try {
      const { data } = await serverApi.patch(`/orders/accounting/${order._id}`);

      const { isAccounted, updTotalSpent, updatedBy } = data;

      toast.success(`Заказ ${data.number} успешно учтен`);

      setOrder(prev => (prev ? { ...prev, isAccounted, updatedBy } : prev));
      setClient(prev => (prev ? { ...prev, totalSpent: updTotalSpent } : prev));
    } catch (e) {
      console.log('e', e);
      toast.error(`Ошибка, заказ не учтен`);
    }
  };

  const isDisabledAccountBtnCondition = Boolean(
    !client || // нет клиента
      !shipment || // нет доставки
      order?.status !== 'done' || // статус не "done"
      order?.isAccounted || // уже учтён
      order?.totalAmountWithDiscount <= 0 || // сумма <= 0 или отсутствует
      !order?.isPaid || // не оплачен
      products?.length === 0 // нет товаров
  );

  const isDisabledAccountBtn = Boolean(isDisabledAccountBtnCondition);

  const accountingTitle = !isDisabledAccountBtn
    ? 'Учет заказа'
    : 'Должно быть: статус заказа "ЗАВЕРШЕН", заказ НЕ УЧТЕН, выбрано: Клиента, Доставку, заказ оплачен, есть минимум 1 товар и сумма больше 0, ';

  const accountingTitleResult = order.isAccounted
    ? 'Заказ уже учтен'
    : accountingTitle;

  return (
    <SummarySection isAccounted={order.isAccounted}>
      <SummaryWrap>
        <SummaryBox>
          <p style={{ color: '#6702ff93', marginRight: 'auto' }}>
            Вход. сумма{' '}
            <strong style={{ color: '#6702ff93' }}>
              {totalSupplierPrice.toFixed(2)} грн
            </strong>
          </p>
          <p>
            Товаров: <strong>{productsCount}</strong>
          </p>
          <p>
            Сумма: <strong>{order.totalAmount.toFixed(2)} грн</strong>
          </p>
          <p>
            Скидка: <strong>{order.totalDiscount.toFixed(2)} грн</strong>
          </p>
          <p>
            Со скидкой:{' '}
            <strong>{order.totalAmountWithDiscount.toFixed(2)} грн</strong>
          </p>
        </SummaryBox>

        <SummaryTotal>
          Итого к оплате: {order.totalAmountWithDiscount.toFixed(2)} грн
        </SummaryTotal>
      </SummaryWrap>

      <SummaryBottom>
        <SummaryInfoBox>
          <ConfirmAction
            message="Таки удалить, да?🤔"
            onConfirm={handleDeleteOrder}
          >
            <DelBtn
              size={32}
              title="Удалить заказ"
              action={() => {}}
              disabled={order.isAccounted}
            />
          </ConfirmAction>

          <ConfirmAction
            message="Учесть заказ❓"
            onConfirm={handleOrderAccounting}
          >
            <AccBtn
              title={accountingTitleResult}
              type="button"
              disabled={isDisabledAccountBtn}
            >
              <FaMoneyCheckAlt size={32} />
            </AccBtn>
          </ConfirmAction>

          <ul>
            <SummaryInfoItem>
              <p>Создано: {formatDateToUkrainian(order.createdAt)}</p>
            </SummaryInfoItem>
            <SummaryInfoItem>
              <p>Изменено: {formatDateToUkrainian(order.updatedAt)}</p>
            </SummaryInfoItem>
          </ul>
          <ul>
            <SummaryInfoItem>
              <p>Кем создано: {order.createdBy ? order.createdBy : '💻'}</p>
            </SummaryInfoItem>
            <SummaryInfoItem>
              <p>Кем изменено: {order.updatedBy ? order.updatedBy : '👀'}</p>
            </SummaryInfoItem>
          </ul>
        </SummaryInfoBox>

        <Controls>
          <DocBox>
            <DocBtnPreview
              type="button"
              onClick={handlePreviewOrderPdf}
              aria-label="Открыть счет"
            >
              <LiaFileInvoiceSolid />
              Предзаказ
            </DocBtnPreview>

            <DocBtnInv
              type="button"
              onClick={handleOpenInvoicePdf}
              aria-label="Открыть счет"
            >
              <LiaFileInvoiceSolid />
              Счет
            </DocBtnInv>

            <DocBtn
              type="button"
              onClick={handleOpenDeliveryNotePdf}
              aria-label="Открыть накладную"
            >
              <FaRegFilePdf />
              Расходная
            </DocBtn>
          </DocBox>
        </Controls>
      </SummaryBottom>
    </SummarySection>
  );
};
