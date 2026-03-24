// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';

// const RED = '#E8192C';
// const LABEL_COLOR = '#444';
// const INPUT_BORDER = '#d0d0d0';
// const INPUT_BG = '#fff';
// const PLACEHOLDER = '#aaa';

// const ENTITY_DATA = [
//   { label: 'Individual', value: 'Individual' },
//   { label: 'Business', value: 'Business' },
 
// ];

// const TITLE_DATA = [
//   { label: '--None--', value: '--None--' },
//   { label: 'Mr.', value: 'Mr.' },
//   { label: 'Ms.', value: 'Mrs.' },
//   { label: 'Mrs.', value: 'Ms.' },
// ];

// const GeneralInformationForm = () => {
//   const [entity, setEntity] = useState<string>('Individual');
//   const [title, setTitle] = useState<string>('--None--');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [focusedField, setFocusedField] = useState<string | null>(null);

//   const inputStyle = (field: string) => [
//     styles.input,
//     focusedField === field && styles.inputFocused,
//   ];

//   const renderDropdown = (
//     label: string,
//     data: { label: string; value: string }[],
//     value: string,
//     onChange: (val: string) => void,
//     required?: boolean,
//   ) => (
//     <View style={styles.fieldBlock}>
//       <Text style={styles.label}>
//         {required && <Text style={styles.required}>* </Text>}
//         {label}
//       </Text>
//       <View style={styles.dropdownWrapper}>
//         <Dropdown
//           style={styles.dropdown}
//           containerStyle={styles.dropdownContainer}
//           itemTextStyle={styles.dropdownItemText}
//           selectedTextStyle={styles.dropdownSelectedText}
//           placeholderStyle={styles.dropdownPlaceholder}
//           activeColor="#fff5f5"
//           data={data}
//           labelField="label"
//           valueField="value"
//           placeholder="--None--"
//           value={value}
//           onChange={item => onChange(item.value)}
//           renderRightIcon={() => <Text style={styles.dropdownArrow}>▾</Text>}
//         />
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView
//       style={styles.scroll}
//       contentContainerStyle={styles.scrollContent}
//       keyboardShouldPersistTaps="handled"
//     >
//       <View style={styles.card}>
//         {/* Section Title */}
//         <Text style={styles.sectionTitle}>General Information</Text>
//         <View style={styles.divider} />

//         {/* Entity */}
//         {renderDropdown('Entity', ENTITY_DATA, entity, setEntity, true)}

//         {/* Title */}
//         {renderDropdown('Title', TITLE_DATA, title, setTitle, true)}

//         {/* First Name */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>
//             <Text style={styles.required}>* </Text>First Name
//           </Text>
//           <TextInput
//             style={inputStyle('firstName')}
//             value={firstName}
//             onChangeText={setFirstName}
//             onFocus={() => setFocusedField('firstName')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Last Name */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>
//             <Text style={styles.required}>* </Text>Last Name
//           </Text>
//           <TextInput
//             style={inputStyle('lastName')}
//             value={lastName}
//             onChangeText={setLastName}
//             onFocus={() => setFocusedField('lastName')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Mobile Number */}
//         <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
//           <Text style={styles.label}>
//             <Text style={styles.required}>* </Text>Mobile Number
//           </Text>
//           <TextInput
//             style={inputStyle('mobileNumber')}
//             value={mobileNumber}
//             onChangeText={setMobileNumber}
//             onFocus={() => setFocusedField('mobileNumber')}
//             onBlur={() => setFocusedField(null)}
//             keyboardType="phone-pad"
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default GeneralInformationForm;

// const styles = StyleSheet.create({
//   scroll: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollContent: {
//     padding: 16,
//     paddingBottom: 40,
//   },

//   // Card
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     borderWidth: 1.5,
//     borderColor: RED,
//     padding: 16,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     marginBottom: 10,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginBottom: 16,
//   },

//   // Field
//   fieldBlock: {
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 13,
//     color: LABEL_COLOR,
//     marginBottom: 6,
//     fontWeight: '500',
//   },
//   required: {
//     color: RED,
//     fontWeight: '700',
//   },

//   // Text input
//   input: {
//     height: 44,
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//     paddingHorizontal: 12,
//     fontSize: 14,
//     color: '#1a1a1a',
//   },
//   inputFocused: {
//     borderColor: RED,
//     borderWidth: 1.5,
//   },

//   // Dropdown
//   dropdownWrapper: {
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//   },
//   dropdown: {
//     height: 44,
//     paddingHorizontal: 12,
//   },
//   dropdownContainer: {
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     marginTop: -46,
//   },
//   dropdownSelectedText: {
//     fontSize: 14,
//     color: '#1a1a1a',
//   },
//   dropdownPlaceholder: {
//     fontSize: 14,
//     color: '#1a1a1a',
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   dropdownArrow: {
//     fontSize: 14,
//     color: '#888',
//   },
// });



















import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { formatName, validateMobile } from '../../../utils/Validation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const RED = '#E8192C';
const LABEL_COLOR = '#000000';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const PLACEHOLDER = '#aaa';

const ENTITY_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Individual', value: 'Individual' },
  { label: 'Business', value: 'Business' },
];

const TITLE_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Mr.', value: 'Mr.' },
  { label: 'Ms.', value: 'Mrs.' },
  { label: 'Mrs.', value: 'Ms.' },
];

interface Props {
  form: any
  update: (key: string, value: string) => void
}


const GeneralInformationForm = ({form, update}: Props) => {
 

  console.log('form in GeneralInformationForm ====>>>> ', form);
  

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  const renderDropdown = (
    label: string,
    data: { label: string; value: string }[],
    value: string,
    onChange: (val: string) => void,
    required?: boolean,
  ) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>
        {required && <Text style={styles.required}>* </Text>}
        {label}
      </Text>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          search
          searchPlaceholder='Search'
          itemTextStyle={styles.dropdownItemText}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholderStyle={styles.dropdownPlaceholder}
          activeColor="#ffffff"
          data={data}
          labelField="label"
          valueField="value"
          placeholder="--None--"
          value={value}
          onChange={item => onChange(item.value)}
          renderRightIcon={() => <MaterialIcons name="keyboard-arrow-down" color="#d0d0d0" size={24} />}
        />
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
        <Text style={styles.sectionTitle}>General Information</Text>
        <View style={styles.divider} />

        {/* Entity */}
        {renderDropdown('Entity', ENTITY_DATA, form.entity, v => update('entity', v), true)}

        {/* Title */}
        {renderDropdown('Title', TITLE_DATA, form.title, v => update('title', v), true)}

        {/* First Name */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>First Name
          </Text>
          <TextInput
            style={inputStyle('firstName')}
            // value={firstName}
            // // onChangeText={setFirstName}
            // onChangeText={v => setFirstName(formatName(v))}

            value={form.firstName}
onChangeText={v => update('firstName', formatName(v))}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Last Name */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Last Name
          </Text>
          <TextInput
            style={inputStyle('lastName')}
            // value={lastName}
            // onChangeText={v => setLastName(formatName(v))}
            value={form.lastName}
            onChangeText={v => update('lastName', formatName(v))}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Mobile Number */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Mobile Number
          </Text>
          <TextInput
            style={inputStyle('mobileNumber')}
            maxLength={10}
          //   value={mobileNumber}
          //  onChangeText={v => {
          //     const valid = validateMobile(v);
          //     if (valid !== null) setMobileNumber(valid);
          //   }}

          value={form.mobileNumber}
onChangeText={v => {
  const valid = validateMobile(v);
  if (valid !== null) update('mobileNumber', valid);
}}
            onFocus={() => setFocusedField('mobileNumber')}
            onBlur={() => setFocusedField(null)}
            keyboardType="phone-pad"
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* ── NEW FIELDS ── */}

        {/* Street — multiline */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Street
          </Text>
          <TextInput
            style={[
              styles.textArea,
              focusedField === 'street' && styles.inputFocused,
            ]}
            // value={street}
            // onChangeText={setStreet}
            value={form.street}
onChangeText={v => update('street', v)}
            onFocus={() => setFocusedField('street')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* City */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>City
          </Text>
          <TextInput
            style={inputStyle('city')}
            // value={city}
            // onChangeText={setCity}
            value={form.city}
onChangeText={v => update('city', v)}
            onFocus={() => setFocusedField('city')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Postal Code & State — two column */}
        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>
              <Text style={styles.required}>* </Text>Postal Code
            </Text>
            <TextInput
              style={inputStyle('postalCode')}
              maxLength={6}
              // value={postalCode}
              // onChangeText={setPostalCode}
              value={form.postalCode}
onChangeText={v => update('postalCode', v)}
              onFocus={() => setFocusedField('postalCode')}
              onBlur={() => setFocusedField(null)}
              keyboardType="numeric"
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>
              <Text style={styles.required}>* </Text>State
            </Text>
            <TextInput
              style={inputStyle('state')}
              // value={state}
              // onChangeText={setState}
              value={form.state}
onChangeText={v => update('state', v)}
              onFocus={() => setFocusedField('state')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
        </View>

        {/* Country */}
        <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
          <Text style={styles.label}>
            <Text style={styles.required}>* </Text>Country
          </Text>
          <TextInput
            style={inputStyle('country')}
            // value={country}
            // onChangeText={setCountry}
            value={form.country}
onChangeText={v => update('country', v)}
            onFocus={() => setFocusedField('country')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default GeneralInformationForm;

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
  required: {
    color: RED,
    fontWeight: '700',
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

  // Dropdown
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    backgroundColor: INPUT_BG,
  },
  dropdown: {
    height: 44,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    backgroundColor: INPUT_BG,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginTop: -46,
  },
  dropdownSelectedText: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#888',
  },
});