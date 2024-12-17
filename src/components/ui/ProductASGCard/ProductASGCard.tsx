const IMG_DEFAULT =
  'https://img.freepik.com/free-vector/illustration-of-gallery-icon_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1707868800&semt=sph';

import {
  Wrap,
  ImgBox,
  Image,
  AddBtn,
  TextContetntWrap,
} from './ProductASGCard.styled';
import { serverApi } from '@/redux/auth/authOperations';
import { useState } from 'react';

export const ProductASGCard: React.FC<{ product: IProductASG }> = ({
  product,
}) => {
  const {
    article,
    brand,
    count_warehouse_3,
    description,
    img,
    name,
    price,
    price_asg,
  } = product;

  const [inputPrice, setInputPrice] = useState(price);

  const image = img && img?.length > 0 ? img[0] : IMG_DEFAULT;
  const countWarehouse = count_warehouse_3 === '0' ? ' ' : count_warehouse_3;

  const handleAddProductToBanner = async () => {
    await serverApi.post('/catalog/banner', {
      id: product.id,
      img: image,
      price: product.price,
      price_sale: inputPrice,
    });
  };

  return (
    <Wrap>
      <ImgBox>
        <Image src={image} width={298} height={298} alt={name} />
      </ImgBox>

      <TextContetntWrap>
        <p>
          {brand} {name}
        </p>

        <p>{description}</p>

        <p>{`Артикул: ${article}`}</p>

        <p>Цена ASG: {price_asg} грн</p>
        <p>Цена клиента: {price} грн</p>

        <p>
          {count_warehouse_3 === '0' ? (
            <span style={{ color: 'red' }}>Немає в наявності</span>
          ) : (
            <span style={{ color: 'green' }}>
              В наявності {countWarehouse}шт
            </span>
          )}
        </p>
      </TextContetntWrap>

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
