
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const RED = '#E8192C';
const LABEL_COLOR = '#444';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const PLACEHOLDER = '#aaa';

interface FormState {
  // Billing Address
  addressSearch: string;
  billingStreet: string;
  billingCity: string;
  billingZip: string;
  billingState: string;
  billingCountry: string;
  // Shipping Address
  shippingAddressSearch: string;
  shippingStreet: string;
  shippingCity: string;
  shippingZip: string;
  shippingState: string;
  shippingCountry: string;
}

const CustomerAddressInformationForm = ({customerForm, setCustomerForm, onSave}) => {
  // const [form, setForm] = useState<FormState>({
  //   addressSearch: '',
  //   billingStreet: '',
  //   billingCity: '',
  //   billingZip: '',
  //   billingState: '',
  //   billingCountry: '',
  //   shippingAddressSearch: '',
  //   shippingStreet: '',
  //   shippingCity: '',
  //   shippingZip: '',
  //   shippingState: '',
  //   shippingCountry: '',
  // });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const update = (key: keyof FormState, value: string) =>
    setCustomerForm(prev => ({ ...prev, [key]: value }));

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  const renderSearchField = (fieldKey: keyof FormState, label: string) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.searchWrapper}>
        <TextInput
          style={[
            styles.searchInput,
            focusedField === fieldKey && styles.inputFocused,
          ]}
          value={customerForm[fieldKey]}
          onChangeText={v => update(fieldKey, v)}
          onFocus={() => setFocusedField(fieldKey)}
          onBlur={() => setFocusedField(null)}
          placeholder="Search Address"
          placeholderTextColor={PLACEHOLDER}
        />
        <View style={styles.searchIconWrap} pointerEvents="none">
         <Icon name='search' size={24} color='#e0e0e0'/>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Address Information</Text>
        <View style={styles.divider} />

        {/* ── BILLING ADDRESS ── */}
        <Text style={styles.subHeading}>Billing Address</Text>

        {renderSearchField('addressSearch', 'Address Search')}

        {/* Billing Street */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Billing Street</Text>
          <TextInput
            style={[styles.textArea, focusedField === 'billingStreet' && styles.inputFocused]}
            value={customerForm.billingStreet}
            onChangeText={v => update('billingStreet', v)}
            onFocus={() => setFocusedField('billingStreet')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Billing City */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Billing City</Text>
          <TextInput
            style={inputStyle('billingCity')}
            value={customerForm.billingCity}
            onChangeText={v => update('billingCity', v)}
            onFocus={() => setFocusedField('billingCity')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Billing Zip & State — two column */}
        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Billing Zip/Postal Code</Text>
            <TextInput
              style={inputStyle('billingZip')}
              value={customerForm.billingZip}
              onChangeText={v => update('billingZip', v)}
              onFocus={() => setFocusedField('billingZip')}
              onBlur={() => setFocusedField(null)}
              keyboardType="numeric"
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Billing State/Province</Text>
            <TextInput
              style={inputStyle('billingState')}
              value={customerForm.billingState}
              onChangeText={v => update('billingState', v)}
              onFocus={() => setFocusedField('billingState')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
        </View>

        {/* Billing Country */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Billing Country</Text>
          <TextInput
            style={inputStyle('billingCountry')}
            value={customerForm.billingCountry}
            onChangeText={v => update('billingCountry', v)}
            onFocus={() => setFocusedField('billingCountry')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* ── SHIPPING ADDRESS ── */}
        <View style={styles.sectionSeparator} />
        <Text style={styles.subHeading}>Shipping Address</Text>

        {renderSearchField('shippingAddressSearch', 'Address Search')}

        {/* Shipping Street */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Shipping Street</Text>
          <TextInput
            style={[styles.textArea, focusedField === 'shippingStreet' && styles.inputFocused]}
            value={customerForm.shippingStreet}
            onChangeText={v => update('shippingStreet', v)}
            onFocus={() => setFocusedField('shippingStreet')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Shipping City */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Shipping City</Text>
          <TextInput
            style={inputStyle('shippingCity')}
            value={customerForm.shippingCity}
            onChangeText={v => update('shippingCity', v)}
            onFocus={() => setFocusedField('shippingCity')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Shipping Zip & State — two column */}
        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Shipping Zip/Postal Code</Text>
            <TextInput
              style={inputStyle('shippingZip')}
              value={customerForm.shippingZip}
              onChangeText={v => update('shippingZip', v)}
              onFocus={() => setFocusedField('shippingZip')}
              onBlur={() => setFocusedField(null)}
              keyboardType="numeric"
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Shipping State/Province</Text>
            <TextInput
              style={inputStyle('shippingState')}
              value={customerForm.shippingState}
              onChangeText={v => update('shippingState', v)}
              onFocus={() => setFocusedField('shippingState')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
        </View>

        {/* Shipping Country */}
        <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
          <Text style={styles.label}>Shipping Country</Text>
          <TextInput
            style={inputStyle('shippingCountry')}
            value={customerForm.shippingCountry}
            onChangeText={v => update('shippingCountry', v)}
            onFocus={() => setFocusedField('shippingCountry')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>
      </View>

        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                     <Text style={styles.saveButtonText}>Save</Text>
                   </TouchableOpacity>

      
    </ScrollView>
  );
};

export default CustomerAddressInformationForm;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  // Card
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
  sectionSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 16,
    marginTop: 4,
  },
  subHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 14,
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

  // Focus state
  inputFocused: {
    borderColor: RED,
    borderWidth: 1.5,
  },

  // Two-column row
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  halfBlock: {
    flex: 1,
  },

  // Search field with icon
  searchWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    backgroundColor: INPUT_BG,
    paddingHorizontal: 12,
    paddingRight: 44,
    fontSize: 14,
    color: '#1a1a1a',
  },
  searchIconWrap: {
    position: 'absolute',
    right: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 16,
    color: '#888',
  },

  saveButton: {
    backgroundColor: '#E8192C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});