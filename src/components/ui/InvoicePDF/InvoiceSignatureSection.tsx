import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  signatureBlock: {
    marginLeft: 'auto',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 8,
  },

  label: {
    fontSize: 10,
  },

  inlineRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 10,
  },
});

export const InvoiceSignatureSection = () => (
  <View>
    <View style={styles.signatureBlock}>
      <Text style={styles.label}>Виписав(ла):</Text>

      <View style={styles.inlineRow}>
        <Text>__________________________</Text>
        <Text>Новіченко Юрій</Text>
      </View>
    </View>
  </View>
);
