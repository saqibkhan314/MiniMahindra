import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';

const RED = '#E8192C';
const LABEL_COLOR = '#444';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const PLACEHOLDER = '#aaa';

interface FormState {
  customerAdditionalDetails: string;
  relatedTo: string;
}

const DealerAccountSummaryForm = ({setDealerForm, dealerForm}) => {
  // const [form, setForm] = useState<FormState>({
  //   customerAdditionalDetails: '',
  //   relatedTo: '',
  // });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) =>
    setDealerForm(prev => ({ ...prev, [key]: value }));

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Account Summary</Text>
        <View style={styles.divider} />

        {/* Customer Additional Details — multiline */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Customer Additional Details</Text>
          <TextInput
            style={[
              styles.textArea,
              focusedField === 'customerAdditionalDetails' && styles.inputFocused,
            ]}
            value={dealerForm.customerAdditionalDetails}
            onChangeText={v => update('customerAdditionalDetails', v)}
            onFocus={() => setFocusedField('customerAdditionalDetails')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Related To */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Related To</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'relatedTo' && styles.inputFocused,
            ]}
            value={dealerForm.relatedTo}
            onChangeText={v => update('relatedTo', v)}
            onFocus={() => setFocusedField('relatedTo')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default DealerAccountSummaryForm;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Card — identical to AccountInformationForm
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: RED,
    padding: 16,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
  },

  // Field
  fieldBlock: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    color: LABEL_COLOR,
    marginBottom: 6,
    fontWeight: '500',
  },

  // Single-line input
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    backgroundColor: INPUT_BG,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#1a1a1a',
  },

  // Multiline textarea
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    backgroundColor: INPUT_BG,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: '#1a1a1a',
  },

  // Focus state — same red border as AccountInformationForm
  inputFocused: {
    borderColor: RED,
    borderWidth: 1.5,
  },
});