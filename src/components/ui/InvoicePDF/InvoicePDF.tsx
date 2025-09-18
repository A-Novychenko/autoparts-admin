import { numberToUkrainianCurrency } from '@/utils/numberToUkrainianCurrency';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { InvoiceSignatureSection } from './InvoiceSignatureSection';

Font.register({
  family: 'NotoSans',
  fonts: [
    {
      src: '/fonts/NotoSans-Regular.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/NotoSans-Bold.ttf',
      fontWeight: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: 'NotoSans',
    padding: 30,
  },
  bold: {
    fontWeight: 'bold',
  },
  centered: {
    textAlign: 'center',
  },
  section: {
    marginBottom: 8,
  },
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '2px solid #000',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '5%',
    marginBottom: 8,
  },
  label: {
    width: '20%',
    fontWeight: 'bold',
  },
  text: {
    width: '75%',
  },

  table: {
    flexDirection: 'column',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 10,
  },

  tableRow: {
    flexDirection: 'row',
    break: 'avoid',
  },
  tableHeader: {
    backgroundColor: '#eee',
    fontWeight: 'bold',
  },
  cell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 1,
    fontSize: 9,
  },
  col1: { width: '5%' },
  col2: { width: '58%' },
  col3: { width: '8%', textAlign: 'center' },
  col4: { width: '5%', textAlign: 'center' },
  col5: { width: '12%', textAlign: 'right' },
  col6: { width: '12%', textAlign: 'right' },
  totalBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginLeft: 'auto',
    marginTop: 8,
  },
  totalBoxWithQty: {
    marginTop: 8,
  },
  totalRow: { fontSize: 10, fontWeight: 'bold' },
  signatureBlock: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signature: {
    width: '45%',
    borderTopWidth: 1,
    borderColor: '#000',
    textAlign: 'center',
    paddingTop: 5,
  },
  noteBox: {
    marginTop: 30,
  },
  note: {
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottom: '2px solid #000',
  },
});

export const InvoicePDF: React.FC<{
  order: OrderData;
  client: IClient;
  products: OrderProduct[];
}> = ({ order, client, products }) => {
  const total = products.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>
          Рахунок на оплату № {order.number} від{' '}
          {new Date().toLocaleDateString('uk-UA')}
        </Text>

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>Постачальник: </Text>
            <View>
              <Text style={styles.text}>
                ФІЗИЧНА ОСОБА-ПІДПРИЄМЕЦЬ НОВІЧЕНКО ЮРІЙ ЄВГЕНІЙОВИЧ
              </Text>
              <Text style={styles.text}>
                п/р UA 823220010000026004340017527 у банку АТ "УНІВЕРСАЛ БАНК",
                МФО 322001,
              </Text>
              <Text style={styles.text}>
                08550, Київська область, Фастівський район, село Кожанка, вулиця
                Заводська, будинок 34, квартира 15,
              </Text>
              <Text style={styles.text}>
                тел.: +380 97-290-93-97, ел. пошта: info@avto-magaz.com.ua
              </Text>
              <Text style={styles.text}>
                код за ЄДРПОУ(ІПН) 3127114190, платник єдиного податку ІІІ група
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Покупець: </Text>
            <View>
              <Text style={styles.text}>
                {client.name}, {client.phone}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Договір: </Text>
            <View>
              <Text style={styles.text}></Text>
            </View>
          </View>
        </View>

        {/* Таблица товаров */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.col1]}>№</Text>
            <Text style={[styles.cell, styles.col2]}>Товар</Text>
            <Text style={[styles.cell, styles.col3]}>К-сть</Text>
            <Text style={[styles.cell, styles.col4]}>Од.</Text>
            <Text style={[styles.cell, styles.col5]}>Ціна</Text>
            <Text style={[styles.cell, styles.col6]}>Сума</Text>
          </View>

          {products.map((item, idx) => (
            <View style={styles.tableRow} wrap={false} key={idx}>
              <Text style={[styles.cell, styles.col1]}>{idx + 1}</Text>
              <Text style={[styles.cell, styles.col2]}>
                {item.article} {item.brand && ` ${item.brand}`} — {item.name}
              </Text>
              <Text style={[styles.cell, styles.col3]}>
                {item.quantity.toFixed(2)}
              </Text>
              <Text style={[styles.cell, styles.col4]}>шт</Text>
              <Text style={[styles.cell, styles.col5]}>
                {item.price.toFixed(2)}
              </Text>
              <Text style={[styles.cell, styles.col6]}>
                {(item.quantity * item.price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Сумма и примечание */}
        <View style={styles.totalBox}>
          <Text style={styles.totalRow}>Всього: </Text>
          <Text style={styles.totalRow}> {total.toFixed(2)} грн</Text>
        </View>

        <View style={styles.totalBoxWithQty}>
          <Text style={styles.totalRow}>
            Всього найменувань: {products.length}, на суму: {total.toFixed(2)}{' '}
            грн
          </Text>
          <Text style={styles.totalRow}>
            {numberToUkrainianCurrency(Number(total.toFixed(2)))
              .charAt(0)
              .toUpperCase() +
              numberToUkrainianCurrency(Number(total.toFixed(2))).slice(1)}
          </Text>
        </View>

        <InvoiceSignatureSection />
      </Page>
    </Document>
  );
};
