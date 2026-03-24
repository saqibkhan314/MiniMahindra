// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import DatePicker from 'react-native-modern-datepicker';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const RED = '#E8192C';
// const BORDER_CARD = '#e8b4b8';
// const LABEL_COLOR = '#444';
// const INPUT_BORDER = '#d0d0d0';
// const INPUT_BG = '#fff';
// const DISABLED_BG = '#f0f0f0';
// const PLACEHOLDER = '#aaa';

// const CATEGORY_OPTIONS = ['--None--', 'A', 'B'];
// const ZONE_OPTIONS = ['--None--', 'North', 'South', 'East', 'West'];
// const STATUS_OPTIONS = ['--None--', 'Active', 'Inactive'];
// const FINANCER_SCOPE_OPTIONS = ['--None--', 'All India'];

// interface FormState {
//   accountName: string;
//   dealerCode: string;
//   category: string;
//   panNumber: string;
//   phone: string;
//   isMetro: boolean;
//   tcsApplicable: boolean;
//   zone: string;
//   addressId: string;
//   status: string;
//   email: string;
//   warehouseCode: string;
//   otherServiceCode: string;
//   financerScope: string;
//   gstNumber: string;
//   emailId: string;
//   registrationDate: string;
//   supplierCode: string;
//   registrationNumber: string;
//   isB2B: boolean;
// }

// const DealerAccountInformationForm = () => {
//   const [form, setForm] = useState<FormState>({
//     accountName: '',
//     dealerCode: '',
//     category: '--None--',
//     panNumber: '',
//     phone: '',
//     isMetro: false,
//     tcsApplicable: false,
//     zone: '--None--',
//     addressId: '',
//     status: '--None--',
//     email: '',
//     warehouseCode: '',
//     otherServiceCode: '',
//     financerScope: '--None--',
//     gstNumber: '',
//     emailId: '',
//     registrationDate: '',
//     supplierCode: '',
//     registrationNumber: '',
//     isB2B: false,
//   });

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [showDateModal, setShowDateModal] = useState(false);

//   const update = (key: keyof FormState, value: string | boolean) =>
//     setForm(prev => ({ ...prev, [key]: value }));

//   const inputStyle = (field: string) => [
//     styles.input,
//     focusedField === field && styles.inputFocused,
//   ];

//   const toggleDropdown = (name: string) =>
//     setOpenDropdown(prev => (prev === name ? null : name));

//   // Convert "YYYY/MM/DD" from picker → display "DD/MM/YYYY"
//   const formatDisplayDate = (raw: string): string => {
//     if (!raw) return '';
//     const parts = raw.split('/');
//     if (parts.length !== 3) return raw;
//     return `${parts[2]}/${parts[1]}/${parts[0]}`;
//   };

//   // Reusable full-width dropdown renderer
//   const renderFullDropdown = (
//     name: string,
//     label: string,
//     value: string,
//     options: string[],
//     formKey: keyof FormState,
//   ) => (
//     <View style={styles.fieldBlock}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={{ position: 'relative' }}>
//         <TouchableOpacity
//           style={styles.dropdown}
//           onPress={() => toggleDropdown(name)}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.dropdownText}>{value}</Text>
//           <Text style={styles.dropdownArrow}>▾</Text>
//         </TouchableOpacity>
//         {openDropdown === name && (
//           <View style={styles.dropdownMenu}>
//             {options.map(opt => (
//               <TouchableOpacity
//                 key={opt}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   update(formKey, opt);
//                   setOpenDropdown(null);
//                 }}
//               >
//                 <Text
//                   style={[
//                     styles.dropdownItemText,
//                     value === opt && styles.dropdownItemActive,
//                   ]}
//                 >
//                   {opt}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView
//       style={styles.scroll}
//       contentContainerStyle={styles.scrollContent}
//       keyboardShouldPersistTaps="handled"
//     >
//       {/* Card */}
//       <View style={styles.card}>
//         {/* Section Title */}
//         <Text style={styles.sectionTitle}>Account Information</Text>
//         <View style={styles.divider} />

//         {/* Account Name */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>
//             Account Name <Text style={styles.required}>*</Text>
//           </Text>
//           <TextInput
//             style={inputStyle('accountName')}
//             value={form.accountName}
//             onChangeText={v => update('accountName', v)}
//             onFocus={() => setFocusedField('accountName')}
//             onBlur={() => setFocusedField(null)}
//             placeholder=""
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Dealer Code & Category — two column */}
//         <View style={styles.row}>
//           <View style={styles.halfBlock}>
//             <Text style={styles.label}>Dealer Code</Text>
//             <TextInput
//               style={inputStyle('dealerCode')}
//               value={form.dealerCode}
//               onChangeText={v => update('dealerCode', v)}
//               onFocus={() => setFocusedField('dealerCode')}
//               onBlur={() => setFocusedField(null)}
//               placeholderTextColor={PLACEHOLDER}
//             />
//           </View>

//           <View style={styles.halfBlock}>
//             <Text style={styles.label}>Category</Text>
//             <TouchableOpacity
//               style={styles.dropdown}
//               onPress={() => toggleDropdown('category')}
//               activeOpacity={0.8}
//             >
//               <Text style={styles.dropdownText}>{form.category}</Text>
//               <Text style={styles.dropdownArrow}>▾</Text>
//             </TouchableOpacity>
//             {openDropdown === 'category' && (
//               <View style={styles.dropdownMenu}>
//                 {CATEGORY_OPTIONS.map(opt => (
//                   <TouchableOpacity
//                     key={opt}
//                     style={styles.dropdownItem}
//                     onPress={() => {
//                       update('category', opt);
//                       setOpenDropdown(null);
//                     }}
//                   >
//                     <Text
//                       style={[
//                         styles.dropdownItemText,
//                         form.category === opt && styles.dropdownItemActive,
//                       ]}
//                     >
//                       {opt}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}
//           </View>
//         </View>

//         {/* Pan Number & Phone — two column */}
//         <View style={styles.row}>
//           <View style={styles.halfBlock}>
//             <Text style={styles.label}>Pan Number</Text>
//             <TextInput
//               style={inputStyle('panNumber')}
//               value={form.panNumber}
//               onChangeText={v => update('panNumber', v)}
//               onFocus={() => setFocusedField('panNumber')}
//               onBlur={() => setFocusedField(null)}
//               autoCapitalize="characters"
//               placeholderTextColor={PLACEHOLDER}
//             />
//           </View>

//           <View style={styles.halfBlock}>
//             <Text style={styles.label}>Phone</Text>
//             <TextInput
//               style={inputStyle('phone')}
//               value={form.phone}
//               onChangeText={v => update('phone', v)}
//               onFocus={() => setFocusedField('phone')}
//               onBlur={() => setFocusedField(null)}
//               keyboardType="phone-pad"
//               placeholderTextColor={PLACEHOLDER}
//             />
//           </View>
//         </View>

//         {/* Checkboxes row */}
//         <View style={styles.row}>
//           {/* Is Metro */}
//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => update('isMetro', !form.isMetro)}
//             activeOpacity={0.7}
//           >
//             <View style={[styles.checkbox, form.isMetro && styles.checkboxChecked]}>
//               {form.isMetro && <Text style={styles.checkmark}>✓</Text>}
//             </View>
//             <Text style={styles.checkboxLabel}>Is Metro</Text>
//           </TouchableOpacity>

//           {/* TCS Applicable */}
//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => update('tcsApplicable', !form.tcsApplicable)}
//             activeOpacity={0.7}
//           >
//             <View style={[styles.checkbox, form.tcsApplicable && styles.checkboxChecked]}>
//               {form.tcsApplicable && <Text style={styles.checkmark}>✓</Text>}
//             </View>
//             <Text style={styles.checkboxLabel}>TCS Applicable</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Zone */}
//         {renderFullDropdown('zone', 'Zone', form.zone, ZONE_OPTIONS, 'zone')}

//         {/* Address Id */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Address Id</Text>
//           <TextInput
//             style={inputStyle('addressId')}
//             value={form.addressId}
//             onChangeText={v => update('addressId', v)}
//             onFocus={() => setFocusedField('addressId')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Status */}
//         {renderFullDropdown('status', 'Status', form.status, STATUS_OPTIONS, 'status')}

//         {/* Email */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={inputStyle('email')}
//             value={form.email}
//             onChangeText={v => update('email', v)}
//             onFocus={() => setFocusedField('email')}
//             onBlur={() => setFocusedField(null)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Warehouse Code */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Warehouse Code</Text>
//           <TextInput
//             style={inputStyle('warehouseCode')}
//             value={form.warehouseCode}
//             onChangeText={v => update('warehouseCode', v)}
//             onFocus={() => setFocusedField('warehouseCode')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Other Service Code */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Other Service Code</Text>
//           <TextInput
//             style={inputStyle('otherServiceCode')}
//             value={form.otherServiceCode}
//             onChangeText={v => update('otherServiceCode', v)}
//             onFocus={() => setFocusedField('otherServiceCode')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Financer Scope */}
//         {renderFullDropdown(
//           'financerScope',
//           'Financer Scope',
//           form.financerScope,
//           FINANCER_SCOPE_OPTIONS,
//           'financerScope',
//         )}

//         {/* GST Number */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>GST Number</Text>
//           <TextInput
//             style={inputStyle('gstNumber')}
//             value={form.gstNumber}
//             onChangeText={v => update('gstNumber', v)}
//             onFocus={() => setFocusedField('gstNumber')}
//             onBlur={() => setFocusedField(null)}
//             autoCapitalize="characters"
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Email Id */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Email Id</Text>
//           <TextInput
//             style={inputStyle('emailId')}
//             value={form.emailId}
//             onChangeText={v => update('emailId', v)}
//             onFocus={() => setFocusedField('emailId')}
//             onBlur={() => setFocusedField(null)}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Registration Date — react-native-modern-datepicker */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Registration Date</Text>
//           <TouchableOpacity
//             style={styles.dateInput}
//             onPress={() => setShowDateModal(true)}
//             activeOpacity={0.8}
//           >
//             <Text style={form.registrationDate ? styles.dateText : styles.datePlaceholder}>
//               {form.registrationDate
//                 ? formatDisplayDate(form.registrationDate)
//                 : 'DD/MM/YYYY'}
//             </Text>
//             {/* Calendar SVG icon — no emoji */}
//             <View style={styles.calendarIconWrap}>
//               <Icon name="calendar-today" size={22} color="#000000" />
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Supplier Code */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Supplier Code</Text>
//           <TextInput
//             style={inputStyle('supplierCode')}
//             value={form.supplierCode}
//             onChangeText={v => update('supplierCode', v)}
//             onFocus={() => setFocusedField('supplierCode')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Registration Number */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Registration Number</Text>
//           <TextInput
//             style={inputStyle('registrationNumber')}
//             value={form.registrationNumber}
//             onChangeText={v => update('registrationNumber', v)}
//             onFocus={() => setFocusedField('registrationNumber')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {/* Is B2B checkbox */}
//         <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
//           <TouchableOpacity
//             style={styles.checkboxRow}
//             onPress={() => update('isB2B', !form.isB2B)}
//             activeOpacity={0.7}
//           >
//             <View style={[styles.checkbox, form.isB2B && styles.checkboxChecked]}>
//               {form.isB2B && <Text style={styles.checkmark}>✓</Text>}
//             </View>
//             <Text style={styles.checkboxLabel}>Is B2B</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* ── Modern Date Picker Modal ── */}
//       <Modal
//         visible={showDateModal}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowDateModal(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalCard}>
//             {/* Modal Header */}
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Date</Text>
//               <TouchableOpacity onPress={() => setShowDateModal(false)}>
//                 <Text style={styles.modalClose}>✕</Text>
//               </TouchableOpacity>
//             </View>

//             <DatePicker
//               mode="calendar"
//               isGregorian={true}
//               selected={form.registrationDate || undefined}
//               onDateChange={(date: string) => {
//                 update('registrationDate', date);
//               }}
//               options={{
//                 backgroundColor: '#fff',
//                 textHeaderColor: RED,
//                 textDefaultColor: '#1a1a1a',
//                 selectedTextColor: '#fff',
//                 mainColor: RED,
//                 textSecondaryColor: '#888',
//                 borderColor: INPUT_BORDER,
//               }}
//             />

//             {/* Confirm Button */}
//             <TouchableOpacity
//               style={styles.modalConfirmBtn}
//               onPress={() => setShowDateModal(false)}
//             >
//               <Text style={styles.modalConfirmText}>Confirm</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default DealerAccountInformationForm;

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

//   // Row layout
//   row: {
//     flexDirection: 'row',
//     gap: 12,
//     marginBottom: 14,
//   },
//   halfBlock: {
//     flex: 1,
//     position: 'relative',
//   },

//   // Dropdown
//   dropdown: {
//     height: 44,
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: '#1a1a1a',
//     flex: 1,
//   },
//   dropdownArrow: {
//     fontSize: 14,
//     color: '#888',
//   },
//   dropdownMenu: {
//     position: 'absolute',
//     top: 46,
//     left: 0,
//     right: 0,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     zIndex: 100,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 4 },
//     marginTop: -46,
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderBottomWidth: 0.5,
//     borderBottomColor: '#f0f0f0',
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   dropdownItemActive: {
//     color: '#333',
//     fontWeight: '600',
//   },

//   // Date input trigger
//   dateInput: {
//     height: 44,
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//     paddingHorizontal: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   dateText: {
//     fontSize: 14,
//     color: '#1a1a1a',
//     flex: 1,
//   },
//   datePlaceholder: {
//     fontSize: 14,
//     color: PLACEHOLDER,
//     flex: 1,
//   },
//   calendarIconWrap: {
//     width: 22,
//     height: 22,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   calendarIconText: {
//     fontSize: 15,
//     color: '#888',
//   },

//   // Modal
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.45)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   modalCard: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     width: '100%',
//     overflow: 'hidden',
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 12,
//     shadowOffset: { width: 0, height: 6 },
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   modalTitle: {
//     fontSize: 15,
//     fontWeight: '700',
//     color: '#1a1a1a',
//   },
//   modalClose: {
//     fontSize: 16,
//     color: '#888',
//     paddingHorizontal: 4,
//   },
//   modalConfirmBtn: {
//     margin: 16,
//     marginTop: 4,
//     backgroundColor: RED,
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//   },
//   modalConfirmText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '700',
//   },

//   // Checkbox
//   checkboxRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     gap: 8,
//   },
//   checkbox: {
//     width: 22,
//     height: 22,
//     borderRadius: 5,
//     borderWidth: 1.5,
//     borderColor: INPUT_BORDER,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxChecked: {
//     backgroundColor: RED,
//     borderColor: RED,
//   },
//   checkmark: {
//     color: '#fff',
//     fontSize: 13,
//     fontWeight: '700',
//     lineHeight: 16,
//   },
//   checkboxLabel: {
//     fontSize: 13,
//     color: LABEL_COLOR,
//     fontWeight: '500',
//   },
// });

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { emailRegex, formatName, validateEmail, validateMobile } from '../../../utils/Validation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateModel from '../../DateModel';
import moment from 'moment';

const RED = '#E8192C';
const BORDER_CARD = '#e8b4b8';
const LABEL_COLOR = '#000000';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const DISABLED_BG = '#f0f0f0';
const PLACEHOLDER = '#aaa';

// ── Dropdown data ──
const CATEGORY_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
];
const ZONE_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'North', value: 'North' },
  { label: 'South', value: 'South' },
  { label: 'East', value: 'East' },
  { label: 'West', value: 'West' },
];
const STATUS_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];
const FINANCER_SCOPE_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'All India', value: 'All India' },
];

// Same helper as CallFollowUpForm
const formatToDisplay = (value: string) => {
  if (!value) return '';
  const [y, m, d] = value.split('/');
  return `${d}/${m}/${y}`;
};

interface FormState {
  accountName: string;
  dealerCode: string;
  category: string;
  panNumber: string;
  phone: string;
  isMetro: boolean;
  tcsApplicable: boolean;
  zone: string;
  addressId: string;
  status: string;
  email: string;
  warehouseCode: string;
  otherServiceCode: string;
  financerScope: string;
  gstNumber: string;
  emailId: string;
  registrationDate: string;
  supplierCode: string;
  registrationNumber: string;
  isB2B: boolean;
}

const DealerAccountInformationForm = ({setDealerForm, dealerForm}) => {
  const today = getFormatedDate(new Date(), 'YYYY/MM/DD');


  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showDateModal, setShowDateModal] = useState(false);

  const update = (key: keyof  FormState, value: string | boolean) =>
    setDealerForm(prev => ({ ...prev, [key]: value }));

   const monthYearChange = (monthYear: string) => {
 
  // We don't need to do anything here
  // Just needs to exist as a function to prevent the crash

  console.log('monthYear ====>>>>>> ', monthYear);
  
};

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  // Reusable full-width element-dropdown
  const renderDropdown = (
    label: string,
    data: { label: string; value: string }[],
    value: string,
    formKey: keyof FormState,
  ) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          style={styles.dropdown}
          search
          searchPlaceholder="Search"
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownItemText}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholderStyle={styles.dropdownPlaceholder}
          activeColor="#ffffff"
          data={data}
          labelField="label"
          valueField="value"
          placeholder="--None--"
          value={value}
          onChange={item => update(formKey, item.value)}
          renderRightIcon={() => (
            <MaterialIcons
              name="keyboard-arrow-down"
              color="#d0d0d0"
              size={24}
            />
          )}
        />
      </View>
    </View>
  );

  // Reusable half-width element-dropdown (for two-column rows)
  const renderHalfDropdown = (
    label: string,
    data: { label: string; value: string }[],
    value: string,
    formKey: keyof FormState,
  ) => (
    <View style={styles.halfBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          style={styles.dropdown}
          search
          searchPlaceholder="Search"
          containerStyle={styles.dropdownContainer}
          itemTextStyle={styles.dropdownItemText}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholderStyle={styles.dropdownPlaceholder}
          activeColor="#ffffff"
          data={data}
          labelField="label"
          valueField="value"
          placeholder="--None--"
          value={value}
          onChange={item => update(formKey, item.value)}
          renderRightIcon={() => (
            <MaterialIcons
              name="keyboard-arrow-down"
              color="#d0d0d0"
              size={24}
            />
          )}
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
      {/* Card */}
      <View style={styles.card}>
        {/* Section Title */}
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.linedivider} />

        {/* Account Name */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            Account Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={inputStyle('accountName')}
            value={dealerForm.accountName}
            onChangeText={v => update('accountName', formatName(v))}
            onFocus={() => setFocusedField('accountName')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Dealer Code & Category — two column */}
        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Dealer Code</Text>
            <TextInput
              style={inputStyle('dealerCode')}
              value={dealerForm.dealerCode}
              onChangeText={v => update('dealerCode', v)}
              onFocus={() => setFocusedField('dealerCode')}
              onBlur={() => setFocusedField(null)}
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
          {renderHalfDropdown(
            'Category',
            CATEGORY_DATA,
            dealerForm.category,
            'category',
          )}
        </View>

        {/* Pan Number & Phone — two column */}
        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Pan Number</Text>
            <TextInput
              style={inputStyle('panNumber')}
              value={dealerForm.panNumber}
              onChangeText={v => update('panNumber', v)}
              onFocus={() => setFocusedField('panNumber')}
              onBlur={() => setFocusedField(null)}
              autoCapitalize="characters"
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
          <View style={styles.halfBlock}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={inputStyle('phone')}
              value={dealerForm.phone}
              // onChangeText={v => update('phone', validateMobile(v))}
              onChangeText={v => {
                const valid = validateMobile(v);
                if (valid !== null) update('phone', valid);
              }}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              keyboardType="phone-pad"
              placeholderTextColor={PLACEHOLDER}
            />
          </View>
        </View>

        {/* Checkboxes row */}
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => update('isMetro', !dealerForm.isMetro)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, dealerForm.isMetro && styles.checkboxChecked]}
            >
              {dealerForm.isMetro && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Is Metro</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => update('tcsApplicable', !dealerForm.tcsApplicable)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                dealerForm.tcsApplicable && styles.checkboxChecked,
              ]}
            >
              {dealerForm.tcsApplicable && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>TCS Applicable</Text>
          </TouchableOpacity>
        </View>

        {renderDropdown('Zone', ZONE_DATA, dealerForm.zone, 'zone')}

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Address Id</Text>
          <TextInput
            style={inputStyle('addressId')}
            value={dealerForm.addressId}
            onChangeText={v => update('addressId', v)}
            onFocus={() => setFocusedField('addressId')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {renderDropdown('Status', STATUS_DATA, dealerForm.status, 'status')}

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={inputStyle('email')}
            value={dealerForm.email}
            // onChangeText={v => update('email', v)}
             onChangeText={v => update('email', validateEmail(v))}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Warehouse Code</Text>
          <TextInput
            style={inputStyle('warehouseCode')}
            value={dealerForm.warehouseCode}
            onChangeText={v => update('warehouseCode', v)}
            onFocus={() => setFocusedField('warehouseCode')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Other Service Code */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Other Service Code</Text>
          <TextInput
            style={inputStyle('otherServiceCode')}
            value={dealerForm.otherServiceCode}
            onChangeText={v => update('otherServiceCode', v)}
            onFocus={() => setFocusedField('otherServiceCode')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {renderDropdown(
          'Financer Scope',
          FINANCER_SCOPE_DATA,
          dealerForm.financerScope,
          'financerScope',
        )}

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>GST Number</Text>
          <TextInput
            style={inputStyle('gstNumber')}
            value={dealerForm.gstNumber}
            onChangeText={v => update('gstNumber', v)}
            onFocus={() => setFocusedField('gstNumber')}
            onBlur={() => setFocusedField(null)}
            autoCapitalize="characters"
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Email Id</Text>
          <TextInput
            style={inputStyle('emailId')}
            value={dealerForm.emailId}
            onChangeText={v => update('emailId', validateEmail(v))}
            onFocus={() => setFocusedField('emailId')}
            onBlur={() => setFocusedField(null)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Registration Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDateModal(true)}
            activeOpacity={0.8}
          >
            <Text
              style={
                dealerForm.registrationDate ? styles.dateText : styles.datePlaceholder
              }
            >
              {dealerForm.registrationDate
                ? formatToDisplay(dealerForm.registrationDate)
                : ''}
            </Text>
            <View style={styles.calendarIconWrap}>
              <Icon name="calendar-today" size={22} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Supplier Code */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Supplier Code</Text>
          <TextInput
            style={inputStyle('supplierCode')}
            value={dealerForm.supplierCode}
            onChangeText={v => update('supplierCode', v)}
            onFocus={() => setFocusedField('supplierCode')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Registration Number */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Registration Number</Text>
          <TextInput
            style={inputStyle('registrationNumber')}
            value={dealerForm.registrationNumber}
            onChangeText={v => update('registrationNumber', v)}
            onFocus={() => setFocusedField('registrationNumber')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {/* Is B2B checkbox */}
        <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => update('isB2B', !dealerForm.isB2B)}
            activeOpacity={0.7}
          >
            <View
              style={[styles.checkbox, dealerForm.isB2B && styles.checkboxChecked]}
            >
              {dealerForm.isB2B && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Is B2B</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Modal
        visible={showDateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarCard}>
            <DatePicker
              mode="calendar"
              isGregorian={true}
              selected={dealerForm.registrationDate || ''}
              onSelectedChange={(date: string) =>
                update('registrationDate', date)
              }
              onDateChange={(date: string) => update('registrationDate', date)}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: RED,
                textDefaultColor: '#000',
                selectedTextColor: '#fff',
                mainColor: RED,
                textSecondaryColor: '#aaa',
                borderColor: '#eee',
              }}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowDateModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <DateModel
  visible={showDateModal}
  onClose={() => setShowDateModal(false)}
  simpleDate={true}
  onDateChange={(date: string) => {
    if (moment(date, 'YYYY/MM/DD', true).isValid()) {
      update('registrationDate', date);
      setShowDateModal(false);
    }
  }}
   monthYearChange={monthYearChange}
/>
    </ScrollView>
  );
};

export default DealerAccountInformationForm;

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
  linedivider: {
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
  inputFocused: {
    borderColor: RED,
    borderWidth: 1.5,
  },

  // Row layout
  row: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 14,
    //justifyContent: 'space-between'
  },
  halfBlock: {
    flex: 1,
    position: 'relative',
  },

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

  // Date input trigger
  dateInput: {
    height: 44,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 8,
    backgroundColor: INPUT_BG,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  datePlaceholder: {
    fontSize: 14,
    color: PLACEHOLDER,
    flex: 1,
  },
  calendarIconWrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Calendar Modal — exact same as CallFollowUpForm
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  calendarBox: {
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 6,
  },
  closeBtn: {
    backgroundColor: RED,
    padding: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //flex: 1,
    gap: 8,
    // justifyContent: 'space-between'
    // width
    alignSelf: 'flex-start'
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: INPUT_BORDER,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: RED,
    borderColor: RED,
  },
  checkmark: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
  },
  checkboxLabel: {
    fontSize: 13,
    color: LABEL_COLOR,
    fontWeight: '500',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarCard: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },

  header: {
    alignItems: 'center',
    marginBottom: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },

  closeButton: {
    marginTop: 18,
    backgroundColor: RED,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },

  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
