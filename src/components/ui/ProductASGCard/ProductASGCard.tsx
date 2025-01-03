import { useState } from 'react';

import { serverApi } from '@/redux/auth/authOperations';

const IMG_DEFAULT =
  'https://img.freepik.com/free-vector/illustration-of-gallery-icon_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1707868800&semt=sph';

import {
  Wrap,
  ImgBox,
  Image,
  AddBtn,
  TextContentWrap,
} from './ProductASGCard.styled';
import { ProductASGCardProps } from './types';

export const ProductASGCard: React.FC<ProductASGCardProps> = ({
  product,
  setProducts,
}) => {
  const {
    article,
    brand,
    count_warehouse_3,
    description,
    img,
    name,
    price_supplier,
    price_client,
    price_promo,
    banner,
    sale,
  } = product;

  const [inputPrice, setInputPrice] = useState(price_client);

  const image = img && img?.length > 0 ? img[0] : IMG_DEFAULT;
  const countWarehouse = count_warehouse_3 === '0' ? ' ' : count_warehouse_3;

  const handleAddProductToBanner = async () => {
    try {
      const { data } = await serverApi.put('/cms-catalog/banner', {
        id: product.id,
        banner: !banner,
      });

      const { updProduct } = data;

      console.log('updProduct', updProduct);

      setProducts(pSt => {
        const productsUpdated = pSt.map(product => {
          if (product.id === updProduct.id) {
            return { ...product, banner: updProduct.banner };
          }

          return product;
        });
        return productsUpdated;
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Wrap>
      <ImgBox>
        <Image src={image} width={298} height={298} alt={name} />
      </ImgBox>

      <TextContentWrap>
        <p>
          {brand} {name}
        </p>

        <p>{description}</p>

        <p>{`Артикул: ${article}`}</p>

        <p>Цена поставщика: {price_supplier} грн</p>
        <p>Цена клиента: {price_client} грн</p>
        <p>Цена клиента АКЦИЯ/Распродажа: {price_promo} грн</p>
        <p>Banner: {banner ? 'DA' : 'NET'}</p>
        <p>Sale: {sale ? 'DA' : 'NET'}</p>

        <p>
          {count_warehouse_3 === '0' ? (
            <span style={{ color: 'red' }}>Немає в наявності</span>
          ) : (
            <span style={{ color: 'green' }}>
              В наявності {countWarehouse}шт
            </span>
          )}
        </p>
      </TextContentWrap>

      <div>
        <input
          type="number"
          value={inputPrice}
          onChange={e => setInputPrice(Number(e.target.value))}
          min="0"
          style={{ width: '100px', marginRight: '20px' }}
        />

        <AddBtn
          type="button"
          disabled={count_warehouse_3 === '0'}
          onClick={handleAddProductToBanner}
        >
          Добавить в баннер
        </AddBtn>
      </div>
    </Wrap>
  );
};
