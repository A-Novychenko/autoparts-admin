import { ProductToggleField, PricePromoPopover } from '@components/ui';

import { serverApi } from '@/redux/auth/authOperations';

import staticData from '@/data/common.json';
const IMG_DEFAULT =
  'https://img.freepik.com/free-vector/illustration-of-gallery-icon_53876-27002.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1707868800&semt=sph';

import { ProductASGCardProps } from './types';

import {
  Wrap,
  ImgBox,
  Image,
  TextContentWrap,
  Description,
  Brand,
  InfoBox,
  PriceBox,
  SupplierPrice,
  ClientPrice,
  PromoPriceBox,
  PromoRemoveBtn,
} from './ProductASGCard.styled';
import {
  FieldBtn,
  FieldStatusAdd,
} from '../ProductToggleField/ProductToggleField.styled';

export const ProductASGCard: React.FC<ProductASGCardProps> = ({
  product,
  setProducts,
}) => {
  const {
    article,
    brand,
    count_warehouse_3,
    count_warehouse_4,
    description,
    img,
    name,
    price_supplier,
    price_client,
    price_promo,
    banner,
    sale,
  } = product;

  const {
    currency,
    supplierLabel,
    clientLabel,
    promoLabel,
    promoNotPrice,
    promoBtnLabels,
    marginLabel,
    profitLabel,
  } = staticData.productCard.price;

  const image = img && img?.length > 0 ? img[0] : IMG_DEFAULT;
  const countWarehouse = count_warehouse_3 === '0' ? ' ' : count_warehouse_3;

  const handleAddProductToBanner = async () => {
    try {
      const { data } = await serverApi.put('/cms-catalog/banner', {
        id: product.id,
        banner: !banner,
      });

      const { updProduct } = data;

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

  const handleAddProductToSale = async () => {
    try {
      const { data } = await serverApi.put('/cms-catalog/sale', {
        id: product.id,
        sale: !sale,
      });

      const { updProduct } = data;

      setProducts(pSt => {
        const productsUpdated = pSt.map(product => {
          if (product.id === updProduct.id) {
            return { ...product, sale: updProduct.sale };
          }

          return product;
        });
        return productsUpdated;
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChangeSalePrice = async (price: number | null) => {
    try {
      const { data } = await serverApi.put('/cms-catalog/price-promo', {
        id: product.id,
        price_promo: price,
      });

      const { updProduct } = data;

      setProducts(pSt => {
        const productsUpdated = pSt.map(product => {
          if (product.id === updProduct.id) {
            return { ...product, price_promo: updProduct.price_promo };
          }

          return product;
        });
        return productsUpdated;
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAddTopProducts = async () => {
    try {
      // const { data } = await serverApi.post('/catalog/top-products', {
      await serverApi.post('/catalog/top-products', {
        tecdoc_article: product.tecdoc_article,
      });
      // console.log('data', data);
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
        <InfoBox>
          <p>
            <Brand>{brand}</Brand> {name}
          </p>

          <Description>{description}</Description>

          <p>
            {count_warehouse_3 === '0' ? (
              <span style={{ color: 'red' }}>Нет в наличии</span>
            ) : (
              <span style={{ color: 'green' }}>
                В наличии {countWarehouse}шт
              </span>
            )}
          </p>

          <p>{`Артикул: ${article}`}</p>
        </InfoBox>

        <PriceBox>
          <SupplierPrice>
            {supplierLabel}&nbsp;
            {price_supplier}
            {currency}
          </SupplierPrice>

          <ClientPrice
            style={{
              textDecoration: price_promo ? 'line-through' : 'none',
              color: price_promo ? '#101340' : undefined,
            }}
          >
            {clientLabel}&nbsp;
            {price_client}
            {currency}
          </ClientPrice>

          <PromoPriceBox>
            <p
              style={{
                color: price_promo ? '#008402' : '#101340',
              }}
            >
              {promoLabel}&nbsp;
              {price_promo ? price_promo + currency : promoNotPrice}
            </p>

            {price_promo ? (
              <PromoRemoveBtn
                type="button"
                onClick={() => {
                  handleChangeSalePrice(null);
                }}
              >
                {promoBtnLabels.remove}
              </PromoRemoveBtn>
            ) : (
              <PricePromoPopover
                price_client={price_client}
                handleSubmit={handleChangeSalePrice}
              />
            )}
          </PromoPriceBox>

          <p>
            {marginLabel}
            {Math.round(
              (((price_promo ? price_promo : price_client) - price_supplier) /
                price_supplier) *
                100
            )}
            %
          </p>

          <p>
            {profitLabel}
            {Math.round(
              ((price_promo ? price_promo : price_client) - price_supplier) *
                100
            ) / 100}
            грн
          </p>

          <ProductToggleField
            flag={banner}
            label="banner"
            disabled={count_warehouse_3 === '0' && count_warehouse_4 === '0'}
            btnAction={handleAddProductToBanner}
          />

          <ProductToggleField
            flag={sale}
            label="sale"
            disabled={count_warehouse_3 === '0'}
            btnAction={handleAddProductToSale}
          />

          <FieldBtn
            style={{ width: 300 }}
            type="button"
            onClick={handleAddTopProducts}
          >
            <FieldStatusAdd>Добавить в ТОП-товары</FieldStatusAdd>
          </FieldBtn>
        </PriceBox>
      </TextContentWrap>
    </Wrap>
  );
};
