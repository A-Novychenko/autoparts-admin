import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  Link,
  Svg,
  Path,
} from '@react-pdf/renderer';

Font.register({
  family: 'NotoSans',
  fonts: [
    { src: '/fonts/NotoSans-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/NotoSans-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    fontFamily: 'NotoSans',
    padding: 30,
    backgroundColor: '#fff',
  },

  // Шапка
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderColor: '#0077cc',
    paddingBottom: 10,
  },
  logo: { width: 120, height: 120, marginRight: 14 },
  logoText: { width: 200, height: 30 },
  shopInfo: { flex: 1 },
  shopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#0077cc',
  },
  shopSub: { fontSize: 10, color: '#555', marginBottom: 8 },

  contactRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  icon: { width: 10, height: 10, marginRight: 6 },
  contactLink: { fontSize: 9, color: '#0077cc', textDecoration: 'none' },
  siteLink: { fontSize: 9, color: '#0077cc', textDecoration: 'none' },
  contactText: { fontSize: 9, color: '#333' },

  // Таблица
  table: {
    flexDirection: 'column',
    width: '100%',
    borderWidth: 1,
    borderColor: '#d0d7e6',
    marginTop: 15,
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableRow: { flexDirection: 'row', break: 'avoid' },
  tableHeader: {
    backgroundColor: '#0077cc',
    borderBottomWidth: 1,
    borderColor: '#004a8f',
  },
  headerText: { color: '#fff', fontWeight: 'bold', fontSize: 10 },
  cell: {
    borderRightWidth: 1,
    borderColor: '#d0d7e6',
    padding: 4,
    fontSize: 9,
  },
  col1: { width: '6%', textAlign: 'center' },
  col2: { width: '56%', paddingLeft: 6 },
  col3: { width: '6%', textAlign: 'center' },
  col4: { width: '6%', textAlign: 'center' },
  col5: { width: '13%', textAlign: 'right', paddingRight: 6 },
  col6: { width: '13%', textAlign: 'right', paddingRight: 6 },

  oldPrice: { textDecoration: 'line-through', color: '#cc0000' },
  discountPrice: { color: '#007a3d', fontWeight: 'bold' },

  rowAlt: { backgroundColor: '#f2f6fc' },

  totalBox: {
    marginTop: 15,
    alignSelf: 'flex-end',
    width: '55%',
    borderTopWidth: 2,
    borderColor: '#0077cc',
    paddingTop: 8,
    backgroundColor: '#f5faff',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  totalRow: {
    fontSize: 10,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bold: { fontWeight: 'bold', fontSize: 11, color: '#0077cc' },
});

// Иконки
const PhoneIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1.3.4 2.6.6 4 .6.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.8 21.2 2.8 13.2 2.8 3.2 2.8 2.5 3.3 2 4 2h3.2c.7 0 1.2.5 1.2 1.2 0 1.4.2 2.7.6 4 .1.4 0 .9-.3 1.2l-2.1 2.4z"
      fill="#0077cc"
    />
  </Svg>
);

const MailIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 
      1.1.9 2 2 2h16c1.1 0 2-.9 
      2-2V6c0-1.1-.9-2-2-2zm0 
      4-8 5-8-5V6l8 5 8-5v2z"
      fill="#0077cc"
    />
  </Svg>
);

const SiteIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      d="M12 2 A10 10 0 1 1 11.999 2"
      fill="none"
      stroke="#0077cc"
      strokeWidth={1}
    />
    <Path d="M3 12 H21" fill="none" stroke="#0077cc" strokeWidth={0.9} />
    <Path
      d="M8.3 3.2 C9.4 7.0 9.4 17.0 8.3 20.8"
      fill="none"
      stroke="#0077cc"
      strokeWidth={0.9}
    />
    <Path
      d="M15.7 3.2 C14.6 7.0 14.6 17.0 15.7 20.8"
      fill="none"
      stroke="#0077cc"
      strokeWidth={0.9}
    />
    <Path
      d="M5.2 7.2 C8.0 6.0 16.0 6.0 18.8 7.2"
      fill="none"
      stroke="#0077cc"
      strokeWidth={0.9}
    />
    <Path
      d="M5.2 16.8 C8.0 18.0 16.0 18.0 18.8 16.8"
      fill="none"
      stroke="#0077cc"
      strokeWidth={0.9}
    />
  </Svg>
);

const TelegramIcon = () => (
  <Svg style={styles.icon} viewBox="0 0 24 24">
    <Path
      d="M9.04 15.46 8.9 19.65c.41 0 .59-.18.81-.4l1.94-1.87 4.02 2.95c.74.41 1.26.19 1.44-.68l2.62-12.34h0c.23-1.11-.4-1.54-1.12-1.27L2.9 9.53c-1.07.43-1.06 1.05-.18 1.33l4.37 1.36L17.64 6.1c.53-.32 1.02-.15.62.2"
      fill="#0077cc"
    />
  </Svg>
);

export const PreviewOrderPdf: React.FC<{
  order: OrderData;
  products: OrderProduct[];
}> = ({ order, products }) => {
  const totalWithoutDiscount = products.reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0
  );
  const totalWithDiscount = order.totalAmountWithDiscount;
  const discountValue = totalWithoutDiscount - totalWithDiscount;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Шапка */}
        <View style={styles.header}>
          <Image style={styles.logo} src={'/images/am-logo.png'} />
          <View style={styles.shopInfo}>
            <Image style={styles.logoText} src={'/images/text-logo.png'} />
            <Text style={styles.shopSub}>
              Масла, автохімія, запчастини, АКБ, аксесуари
            </Text>

            <View style={styles.contactRow}>
              <PhoneIcon />
              <Text style={styles.contactText}>
                <Link src="tel:+380936259999" style={styles.contactLink}>
                  +38 (093) 625-99-99
                </Link>{' '}
                |{' '}
                <Link src="tel:+380972909397" style={styles.contactLink}>
                  +38 (097) 290-93-97
                </Link>
              </Text>
            </View>

            <View style={styles.contactRow}>
              <MailIcon />
              <Link
                src="mailto:info@avto-magaz.com.ua"
                style={styles.contactLink}
              >
                info@avto-magaz.com.ua
              </Link>
            </View>

            <View style={styles.contactRow}>
              <SiteIcon />
              <Link src="https://avto-magaz.com.ua" style={styles.siteLink}>
                avto-magaz.com.ua
              </Link>
            </View>

            <View style={styles.contactRow}>
              <TelegramIcon />
              <Link
                src="https://t.me/avto_magaz_com_ua"
                style={styles.contactLink}
              >
                @avto_magaz_com_ua
              </Link>
            </View>
          </View>
        </View>

        {/* Таблица */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.cell, styles.col1, styles.headerText]}>№</Text>
            <Text style={[styles.cell, styles.col2, styles.headerText]}>
              Товар
            </Text>
            <Text style={[styles.cell, styles.col3, styles.headerText]}>
              К-сть
            </Text>
            <Text style={[styles.cell, styles.col4, styles.headerText]}>
              Од.
            </Text>
            <Text style={[styles.cell, styles.col5, styles.headerText]}>
              Ціна
            </Text>
            <Text style={[styles.cell, styles.col6, styles.headerText]}>
              Ціна зі знижкою
            </Text>
          </View>

          {products.map((p, idx) => {
            const rowStyle = idx % 2 === 0 ? {} : styles.rowAlt;

            return (
              <View style={[styles.tableRow, rowStyle]} wrap={false} key={idx}>
                <Text style={[styles.cell, styles.col1]}>{idx + 1}</Text>
                <Text style={[styles.cell, styles.col2]}>
                  {p.brand && `${p.brand} — `}
                  {p.name}
                </Text>
                <Text style={[styles.cell, styles.col3]}>{p.quantity}</Text>
                <Text style={[styles.cell, styles.col4]}>шт</Text>
                <Text style={[styles.cell, styles.col5]}>
                  {p.price_promo ? (
                    <Text style={styles.oldPrice}>{p.price.toFixed(2)}</Text>
                  ) : (
                    p.price.toFixed(2)
                  )}
                </Text>
                <Text style={[styles.cell, styles.col6]}>
                  {p.price_promo ? (
                    <Text style={styles.discountPrice}>
                      {p.price_promo.toFixed(2)}
                    </Text>
                  ) : (
                    p.price.toFixed(2)
                  )}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Итоги */}
        <View style={styles.totalBox}>
          {discountValue > 0 && (
            <>
              <View style={styles.totalRow}>
                <Text>Сума без знижки:</Text>
                <Text>{totalWithoutDiscount.toFixed(2)} грн</Text>
              </View>
              <View style={styles.totalRow}>
                <Text>Знижка:</Text>
                <Text>- {discountValue.toFixed(2)} грн</Text>
              </View>
            </>
          )}

          <View style={[styles.totalRow, styles.bold]}>
            <Text>До сплати:</Text>
            <Text>{totalWithDiscount.toFixed(2)} грн</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
