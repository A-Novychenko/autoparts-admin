import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  signatureBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  column: {
    flex: 1,
  },
  label: {
    marginTop: 20,
    fontSize: 10,
    fontWeight: 'bold',
    borderBottom: '2px solid #000',
  },
  labelInner: {
    marginTop: 20,
    fontSize: 10,
    paddingBottom: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    height: 14,
    marginBottom: 6,
  },
  name: {
    fontSize: 10,

    marginBottom: 4,
  },
  note: {
    fontSize: 10,
    lineHeight: 1.2,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
    marginTop: 4,
  },
});

export const SignatureSection = () => (
  <View>
    <Text style={styles.label}>Місце складання:</Text>

    <View style={styles.signatureBlock}>
      <View style={styles.column}>
        <Text style={styles.labelInner}>Від постачальника*</Text>
        <View style={styles.line} />
        <Text style={styles.name}>Новіченко Юрій</Text>
        <Text style={styles.note}>
          * Відповідальний за здійснення господарської операції і правильність
          її оформлення
        </Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.labelInner}>Отримав(ла)</Text>
        <View style={styles.line} />
        <View style={styles.inlineRow}>
          <Text>За довіреністю</Text>
          <Text style={{ marginLeft: 4 }}>№_____</Text>
          <Text style={{ marginLeft: 4 }}>від ______</Text>
        </View>
      </View>
    </View>
  </View>
);
