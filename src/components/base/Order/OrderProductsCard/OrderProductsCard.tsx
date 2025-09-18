import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'react-toastify';

import { ConfirmAction, CopyBtn, DelBtn, ModalDialog } from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';

import { MdCancel, MdModeEdit, MdSave } from 'react-icons/md';

import {
  ProductCard,
  ProductImageThumb,
  ProductImage,
  ProductNumber,
  ProductDescription,
  ProductArticle,
  ProductInStock,
  ProductTotal,
  ProductInStockItem,
  ProductSupplierPrice,
  ProductPricePromo,
  ProductPrice,
  ProductComment,
  ProductImageBtn,
  EditBtn,
  EditBtnBox,
  CancelBtn,
  SaveBtn,
  ProductQtyBox,
} from './OrderProductsCard.styled';

export const OrderProductsCard: React.FC<{
  product: OrderProduct;
  setProducts: Dispatch<SetStateAction<OrderProduct[] | null>>;
  idx: number;
  orderId: string;
}> = ({ product, idx, orderId, setProducts }) => {
  const getInitialDraft = (product: OrderProduct) => ({
    quantity: product.quantity,
    discountPercent: product.price_promo
      ? Math.round(
          ((product.price - product.price_promo) / product.price) * 100
        )
      : 0,
    discountValue: product.price_promo
      ? product.price - product.price_promo
      : 0,
    promoPrice: product.price_promo || product.price,
    comment: product.comment || '',
  });

  const [openProductImg, setOpenProductImg] = useState<OrderProduct | null>(
    null
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [draft, setDraft] = useState(() => getInitialDraft(product));

  const handleQuantityChange = (val: number) => {
    if (val < 1) val = 1;
    setDraft(prev => ({ ...prev, quantity: val }));
  };
  const handleDiscountPercentChange = (val: number) => {
    if (val < 0) val = 0;
    if (val > 100) val = 100;
    const discountValue = Math.round((product.price * val) / 100);
    const promoPrice = product.price - discountValue;
    setDraft(prev => ({
      ...prev,
      discountPercent: val,
      discountValue,
      promoPrice,
    }));
  };

  const handlePromoPriceChange = (val: number) => {
    if (val < 0) val = 0;
    if (val > product.price) val = product.price;
    const discountValue = product.price - val;
    const discountPercent = Math.round((discountValue / product.price) * 100);
    setDraft(prev => ({
      ...prev,
      promoPrice: val,
      discountValue,
      discountPercent,
    }));
  };

  const total = draft.promoPrice * draft.quantity;

  const handleSave = async () => {
    try {
      await serverApi.patch(`/orders/crm-editing/${orderId}`, {
        quantity: draft.quantity,
        price_promo:
          draft.promoPrice === product.price ? null : draft.promoPrice,
        productId: product._id,
        comment: draft.comment,
      });
      toast.success('Изменения сохранены');
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error('Ошибка при сохранении');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await serverApi.delete(`/orders/del-product/${orderId}/${productId}`);

      setProducts(prev =>
        prev ? prev.filter(({ _id }) => _id !== productId) : prev
      );

      toast.success('Товар удален');
    } catch (error) {
      toast.error('Товар НЕ удален');
    }
  };

  return (
    <>
      <ProductCard key={product._id} isEditing={isEditing}>
        <ProductNumber>{idx + 1}</ProductNumber>
        <ProductImageBtn
          // type="button"
          onClick={() => {
            setOpenProductImg(product);
          }}
        >
          <ProductImageThumb size={40}>
            <ProductImage
              src={product.img || '/images/no-photo.png'}
              alt={product.name}
              width={200}
              height={200}
            />
          </ProductImageThumb>
        </ProductImageBtn>
        <ProductDescription>{product.name.slice(0, 150)}</ProductDescription>
        <ProductArticle>
          <span>{product.article}</span>
          <CopyBtn text={product.article} />
        </ProductArticle>
        <ProductInStock>
          {product.availabilityOther ? (
            <>
              <ProductInStockItem qty={product.availabilityOther}>
                Склад {product.availabilityOther}
              </ProductInStockItem>
            </>
          ) : (
            <>
              <ProductInStockItem qty={product.availability}>
                Киев {product.availability}
              </ProductInStockItem>
              <ProductInStockItem qty={product.availabilityLviv}>
                Львов {product.availabilityLviv}
              </ProductInStockItem>
            </>
          )}
        </ProductInStock>
        <ProductSupplierPrice>{product.supplierPrice}</ProductSupplierPrice>
        {isEditing ? (
          <ProductQtyBox>
            <input
              type="number"
              value={draft.quantity}
              onChange={e => handleQuantityChange(Number(e.target.value))}
              style={{ width: '60px', height: 40, textAlign: 'center' }}
            />
          </ProductQtyBox>
        ) : (
          <p>{product.quantity}</p>
        )}
        <ProductPrice hasPromo={product.price_promo}>
          {product.price}
        </ProductPrice>
        {isEditing ? (
          <input
            type="number"
            value={draft.discountPercent}
            onChange={e => handleDiscountPercentChange(Number(e.target.value))}
            style={{ width: '60px', textAlign: 'center' }}
          />
        ) : (
          <p>{draft.discountPercent}%</p>
        )}
        <p>{product.price_promo ? product.price - product.price_promo : 0}</p>
        {isEditing ? (
          <input
            type="number"
            value={draft.promoPrice}
            onChange={e => handlePromoPriceChange(Number(e.target.value))}
            style={{ width: '80px', textAlign: 'center' }}
          />
        ) : (
          <ProductPricePromo hasPromo={product.price_promo}>
            {draft.promoPrice}
          </ProductPricePromo>
        )}
        <ProductTotal>{total}</ProductTotal>

        {isEditing ? (
          <ProductComment
            value={draft.comment}
            onChange={e =>
              setDraft(prev => ({ ...prev, comment: e.target.value }))
            }
          />
        ) : (
          <p
            style={{
              whiteSpace: 'nowrap', // не переносить текст
              overflowX: 'auto', // горизонтальная прокрутка
              textOverflow: 'ellipsis', // многоточие при обрезке
              height: 40,
              padding: 4,
            }}
          >
            {draft.comment || ''}
          </p>
        )}

        {isEditing ? (
          <EditBtnBox>
            <CancelBtn
              type="button"
              title="Отменить"
              onClick={() => {
                setDraft(getInitialDraft(product));
                setIsEditing(false);
              }}
            >
              <MdCancel size={20} />
            </CancelBtn>

            <SaveBtn type="button" title="Сохранить" onClick={handleSave}>
              <MdSave size={20} />
            </SaveBtn>
          </EditBtnBox>
        ) : (
          <EditBtn
            type="button"
            title="Редактировать"
            onClick={() => {
              setIsEditing(true);
            }}
          >
            <MdModeEdit size={20} />
          </EditBtn>
        )}

        <ConfirmAction
          message="Таки удалить, да?🤔"
          onConfirm={() => handleDeleteProduct(product._id)}
        >
          <DelBtn size={20} action={() => {}} />
        </ConfirmAction>
      </ProductCard>

      <ModalDialog
        open={Boolean(openProductImg)}
        title={openProductImg?.name}
        onClose={() => {
          setOpenProductImg(null);
        }}
        cancelText="Закрыть"
        maxWidth="md"
      >
        <ProductImageThumb size={800} isModal>
          <img
            src={openProductImg?.img || '/images/no-photo.png'}
            alt={openProductImg?.name || 'Картинка товара'}
            width={800}
            height={800}
          />
        </ProductImageThumb>
      </ModalDialog>
    </>
  );
};
