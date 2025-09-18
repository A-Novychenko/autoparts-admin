import { Dispatch, SetStateAction, useState } from 'react';
import {
  Tabs,
  Tab,
  TextField,
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { toast } from 'react-toastify';

import { ModalDialog } from '@/components/ui';

import { serverApi } from '@/redux/auth/authOperations';
import { numIdGenerator } from '@/utils';

import { MdAddBox, MdSearch, MdCheckCircle, MdAdd } from 'react-icons/md';

import { AddProductBtn, Wrap } from './OrderAddProduct.styled';

export const OrderAddProduct: React.FC<{
  products: OrderProduct[];
  setProducts: Dispatch<SetStateAction<OrderProduct[] | null>>;
  orderId: string;
}> = ({ products, setProducts, orderId }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tab, setTab] = useState(0);

  // --- поиск товаров ---
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<OrderProduct[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleSave = async (product: OrderProduct) => {
    console.log('product', product);
    const { data } = await serverApi.patch(
      `/orders/add-product/${orderId}`,
      product
    );
    console.log('data', data);
    console.log('data.products', data.products);

    return data.products;
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast.warning('Введите артикул или название для поиска');
      return;
    }
    setLoadingSearch(true);
    try {
      const { data } = await serverApi.post(`/cms-catalog/search-products`, {
        article: search,
      });

      const products: OrderProduct[] =
        Array.isArray(data.products) &&
        data.products.map(
          ({
            article,
            brand,
            count_warehouse_3,
            count_warehouse_4,
            id,
            img,
            name,
            price_client,
            price_promo,
            price_supplier,
            _id,
          }: IProductASG) => {
            return {
              id,
              article,
              name,
              img:
                Array.isArray(img) && img.length > 0
                  ? img[0]
                  : '/images/no-photo.png',
              supplierPrice: price_supplier,
              price: price_client,
              price_promo,
              quantity: 1,
              availability: count_warehouse_3,
              availabilityLviv: count_warehouse_4,
              availabilityOther: null,
              _id,
              brand,
              comment: '',
            };
          }
        );

      setSearchResults(products);
    } catch (err) {
      console.error(err);
      toast.error('Ошибка при поиске товаров');
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleAddFromSearch = async (product: OrderProduct) => {
    if (products.find(p => p.id === product.id)) {
      toast.warning('Такой товар уже есть в заказе');
      return;
    }

    try {
      const updProducts = await handleSave(product);

      setProducts(updProducts);

      toast.success('Товар добавлен');
    } catch (error) {
      console.log('error', error);
      toast.error('Ошибка! Товар не добавлен');
    } finally {
      setIsOpenModal(false);
    }
  };

  // --- создание нового товара ---
  const [newProduct, setNewProduct] = useState<Partial<OrderProduct>>({
    name: '',
    article: '',
    brand: '',
    price: 0,
    price_promo: null,
    quantity: 1,
    availability: '',
    availabilityLviv: '',
    availabilityOther: '',
    supplierPrice: null,
    comment: '',
    img: '/images/no-photo.png',
  });

  const handleCreateProduct = async () => {
    if (!newProduct.name || !newProduct.article || newProduct.price === null) {
      toast.error('Заполните обязательные поля: Название, Артикул, Цена');
      return;
    }

    const id = numIdGenerator();

    const createdProduct: OrderProduct = {
      _id: '',
      id,
      article: newProduct.article!,
      name: newProduct.name!,
      img: newProduct.img || '/images/no-photo.png',
      supplierPrice:
        typeof newProduct.supplierPrice === 'number'
          ? newProduct.supplierPrice
          : null,
      price: newProduct.price!,
      price_promo: newProduct.price_promo ?? null,
      quantity: newProduct.quantity ?? 1,
      availability: '—',
      availabilityLviv: '—',
      availabilityOther: newProduct.availabilityOther,
      brand: newProduct.brand || 'CUSTOM',
      comment: newProduct.comment || '',
    };

    try {
      const updProducts = await handleSave(createdProduct);

      setProducts(updProducts);

      toast.success('Товар создан и добавлен в заказ');
    } catch (error) {
      console.log('error', error);
      toast.error('Ошибка! Товар не добавлен');
    } finally {
      setIsOpenModal(false);
    }
  };

  return (
    <Wrap>
      <AddProductBtn onClick={() => setIsOpenModal(true)}>
        <MdAdd size={32} color="#fff" /> Добавить товар
      </AddProductBtn>

      <ModalDialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        title="Добавить товар"
        confirmText=""
        maxWidth="xl"
      >
        <Tabs
          value={tab}
          onChange={(_, val) => setTab(val)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Поиск" />
          <Tab label="Создание" />
        </Tabs>

        {/* --- Поиск --- */}
        {tab === 0 && (
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1}>
              <TextField
                label="Поиск по артикулу или названию"
                fullWidth
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleSearch}
                        disabled={loadingSearch}
                      >
                        <MdSearch />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                onClick={handleSearch}
                variant="contained"
                disabled={loadingSearch}
              >
                Искать
              </Button>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
              {searchResults.length === 0 && !loadingSearch && (
                <Typography variant="body2" color="text.secondary">
                  Результатов пока нет
                </Typography>
              )}

              {searchResults && searchResults.length > 0 && (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Фото</TableCell>
                      <TableCell>Артикул</TableCell>
                      <TableCell>Бренд Название</TableCell>
                      <TableCell>Цена Поставщика</TableCell>
                      <TableCell>Цена</TableCell>
                      <TableCell>Цена акция</TableCell>
                      <TableCell>Наличие (склад)</TableCell>
                      <TableCell>Наличие (Львов)</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchResults.map((p: OrderProduct) => (
                      <TableRow key={p._id}>
                        <TableCell>
                          {p.img ? (
                            <img
                              src={
                                Array.isArray(p.img) && p.img.length > 0
                                  ? p.img[0]
                                  : '/images/no-photo.png'
                              }
                              alt={p.name}
                              style={{
                                width: 50,
                                height: 50,
                                objectFit: 'contain',
                              }}
                            />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>{p.article}</TableCell>
                        <TableCell>
                          {p.brand}
                          {p.name}
                        </TableCell>

                        <TableCell>{p.supplierPrice}</TableCell>
                        <TableCell>{p.price}</TableCell>
                        <TableCell>
                          {p.price_promo ? (
                            <Typography color="error">
                              {p.price_promo}
                            </Typography>
                          ) : (
                            '-'
                          )}
                        </TableCell>
                        <TableCell>{p.availability}</TableCell>
                        <TableCell>{p.availabilityLviv}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<MdCheckCircle />}
                            onClick={() => handleAddFromSearch(p)}
                          >
                            Добавить в заказ
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Box>
          </Box>
        )}

        {/* --- Создание --- */}
        {tab === 1 && (
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              maxHeight: 500,
              overflowY: 'auto',
              pr: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Введите данные нового товара
            </Typography>

            <Box
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
            >
              <TextField
                label="Название*"
                value={newProduct.name}
                onChange={e =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <TextField
                label="Артикул*"
                value={newProduct.article}
                onChange={e =>
                  setNewProduct({ ...newProduct, article: e.target.value })
                }
              />
              <TextField
                label="Бренд"
                value={newProduct.brand}
                onChange={e =>
                  setNewProduct({ ...newProduct, brand: e.target.value })
                }
              />
              <TextField
                label="Закупочная цена"
                type="number"
                value={newProduct.supplierPrice?.toString() ?? ''}
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    supplierPrice: e.target.value ? +e.target.value : null,
                  })
                }
              />
              <TextField
                label="Количество"
                type="number"
                value={newProduct.quantity?.toString() ?? '1'}
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    quantity: e.target.value ? +e.target.value : undefined,
                  })
                }
              />
              <TextField
                label="Цена*"
                type="number"
                value={newProduct.price?.toString() ?? ''}
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value ? +e.target.value : undefined,
                  })
                }
              />
              <TextField
                label="Промо-цена"
                type="number"
                value={newProduct.price_promo?.toString() ?? ''}
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    price_promo: e.target.value ? +e.target.value : null,
                  })
                }
              />
              <TextField
                label="Наличие"
                value={newProduct.availabilityOther}
                onChange={e =>
                  setNewProduct({
                    ...newProduct,
                    availabilityOther: e.target.value,
                  })
                }
              />
              <TextField
                label="Комментарий"
                value={newProduct.comment}
                onChange={e =>
                  setNewProduct({ ...newProduct, comment: e.target.value })
                }
              />
              <TextField
                label="URL картинки"
                value={newProduct.img}
                onChange={e =>
                  setNewProduct({ ...newProduct, img: e.target.value })
                }
              />
            </Box>

            <Button
              onClick={handleCreateProduct}
              variant="contained"
              size="large"
              startIcon={<MdAddBox />}
            >
              Создать и добавить
            </Button>
          </Box>
        )}
      </ModalDialog>
    </Wrap>
  );
};
