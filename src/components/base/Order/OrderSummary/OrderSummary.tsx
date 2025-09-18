import { pdf } from '@react-pdf/renderer';
import { toast } from 'react-toastify';

import { DeliveryNotePDF, InvoicePDF } from '@/components/ui';

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
} from './OrderSummary.styled';

export const OrderSummary: React.FC<{
  order: OrderData;
  client: IClient;
  products: OrderProduct[];
  shipment: IShipment;
}> = ({ order, shipment, client, products }) => {
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
        <InvoicePDF order={order} client={client} products={products} />
      ).toBlob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_blank');
    } catch (err) {
      console.error('PDF генерирование (счет):', err);
      toast.error('Ошибка генерации счёта');
    }
  };

  return (
    <SummarySection>
      <SummaryWrap>
        <SummaryBox>
          <p>
            Товаров: <strong>{productsCount}</strong>
          </p>
          <p>
            Сумма: <strong>{order.totalAmount} грн</strong>
          </p>
          <p>
            Скидка: <strong>{order.totalDiscount} грн</strong>
          </p>
          <p>
            Со скидкой: <strong>{order.totalAmountWithDiscount} грн</strong>
          </p>
        </SummaryBox>

        <SummaryTotal>
          Итого к оплате: {order.totalAmountWithDiscount} грн
        </SummaryTotal>
      </SummaryWrap>

      <SummaryBottom>
        <SummaryInfoBox>
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
              <p>Кем создано: 💻</p>
            </SummaryInfoItem>
            <SummaryInfoItem>
              <p>Кем изменено: 👀</p>
            </SummaryInfoItem>
          </ul>
        </SummaryInfoBox>
        <Controls>
          <DocBox>
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
