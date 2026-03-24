


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

// const RED = '#E8192C';
// const LABEL_COLOR = '#444';
// const INPUT_BORDER = '#d0d0d0';
// const INPUT_BG = '#fff';
// const PLACEHOLDER = '#aaa';

// const ACCOUNT_TYPE_OPTIONS = ['--None--', 'Retail', 'Institutional', 'Dealer', 'Booking'];
// const TYPE_OPTIONS = ['--None--', 'Analyst', 'Competitor', 'Customer', 'Integrator', 'Investor', 'Partner', 'Press', 'Prospect', 'Reseller', 'Other'];
// const QUOTATION_TYPE_OPTIONS = ['--None--', 'Public', 'Private'];
// const STATUS_OPTIONS = ['--None--', 'Active', 'Inactive'];
// const CATEGORY_OPTIONS = ['--None--', 'A', 'B'];
// const LOCATION_AREA_OPTIONS = ['--None--', 'Showroom', 'Service', 'Other Service'];
// const ZONE_OPTIONS = ['--None--', 'North', 'South', 'East', 'West'];
// const FINANCER_SCOPE_OPTIONS = ['--None--', 'All India'];
// const INDUSTRY_OPTIONS = ['--None--', 'Agriculture', 'Apparel', 'Banking', 'Chemicals', 'Construction', 'Education', 'Electronics', 'Energy', 'Engineering', 'Entertainment', 'Finance', 'Food & Beverage', 'Healthcare', 'Hospitality', 'Insurance', 'Manufacturing', 'Media', 'Retail', 'Technology', 'Telecommunications', 'Transportation', 'Other'];
// import Icon from 'react-native-vector-icons/MaterialIcons';

// interface FormState {
//   accountName: string;
//   accountType: string;
//   type: string;
//   website: string;
//   description: string;
//   dealerLocationCode: string;
//   quotationType: string;
//   presentKM: string;
//   remarks: string;
//   town: string;
//   cityTier: boolean;
//   status: string;
//   dealerName: string;
//   category: string;
//   headlamp: string;
//   locationArea: string;
//   isMetro: boolean;
//   zone: string;
//   addressId: string;
//   supplierCode: string;
//   tcsApplicable: boolean;
//   isB2B: boolean;
//   warehouseCode: string;
//   otherServiceCode: string;
//   financerScope: string;
//   // new fields
//   phone: string;
//   industry: string;
//   employees: string;
//   emailId: string;
//   salesPersonName: string;
//   registrationDate: string;
//   bank: string;
//   branch: string;
//   ifscCode: string;
//   bankAccountNo: string;
//   passportNumberOfProposer: string;
//   drivingLicenseNo: string;
//   dob: string;
//   nregaJobIdNumber: string;
//   voterId: string;
//   incorporationDate: string;
//   registrationNumber: string;
//   aadhaarNumber: string;
//   panCardNumber: string;
//   gstNumber: string;
//   einvoiceUsername: string;
//   einvoicePassword: string;
//   email: string;
// }

// const CustomerAccountInformationForm = () => {
//   const [form, setForm] = useState<FormState>({
//     accountName: '',
//     accountType: '--None--',
//     type: '--None--',
//     website: '',
//     description: '',
//     dealerLocationCode: '',
//     quotationType: '--None--',
//     presentKM: '',
//     remarks: '',
//     town: '',
//     cityTier: false,
//     status: '--None--',
//     dealerName: '',
//     category: '--None--',
//     headlamp: '',
//     locationArea: '--None--',
//     isMetro: false,
//     zone: '--None--',
//     addressId: '',
//     supplierCode: '',
//     tcsApplicable: false,
//     isB2B: false,
//     warehouseCode: '',
//     otherServiceCode: '',
//     financerScope: '--None--',
//     phone: '',
//     industry: '--None--',
//     employees: '',
//     emailId: '',
//     salesPersonName: '',
//     registrationDate: '',
//     bank: '',
//     branch: '',
//     ifscCode: '',
//     bankAccountNo: '',
//     passportNumberOfProposer: '',
//     drivingLicenseNo: '',
//     dob: '',
//     nregaJobIdNumber: '',
//     voterId: '',
//     incorporationDate: '',
//     registrationNumber: '',
//     aadhaarNumber: '',
//     panCardNumber: '',
//     gstNumber: '',
//     einvoiceUsername: '',
//     einvoicePassword: '',
//     email: '',
//   });

//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [activeDatePicker, setActiveDatePicker] = useState<keyof FormState | null>(null);

//   const update = (key: keyof FormState, value: string | boolean) =>
//     setForm(prev => ({ ...prev, [key]: value }));

//   const inputStyle = (field: string) => [
//     styles.input,
//     focusedField === field && styles.inputFocused,
//   ];

//   const toggleDropdown = (name: string) =>
//     setOpenDropdown(prev => (prev === name ? null : name));

//   const formatDisplayDate = (raw: string): string => {
//     if (!raw) return '';
//     const parts = raw.split('/');
//     if (parts.length !== 3) return raw;
//     return `${parts[2]}/${parts[1]}/${parts[0]}`;
//   };

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
//                 <Text style={[styles.dropdownItemText, value === opt && styles.dropdownItemActive]}>
//                   {opt}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </View>
//     </View>
//   );

//   const renderCheckbox = (label: string, formKey: keyof FormState, checked: boolean) => (
//     <View style={styles.fieldBlock}>
//       <TouchableOpacity
//         style={styles.checkboxRow}
//         onPress={() => update(formKey, !checked)}
//         activeOpacity={0.7}
//       >
//         <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
//           {checked && <Text style={styles.checkmark}>✓</Text>}
//         </View>
//         <Text style={styles.checkboxLabel}>{label}</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderDateField = (label: string, formKey: keyof FormState) => (
//     <View style={styles.fieldBlock}>
//       <Text style={styles.label}>{label}</Text>
//       <TouchableOpacity
//         style={styles.dateInput}
//         onPress={() => setActiveDatePicker(formKey)}
//         activeOpacity={0.8}
//       >
//         <Text style={form[formKey] ? styles.dateText : styles.datePlaceholder}>
//           {form[formKey] ? formatDisplayDate(form[formKey] as string) : ''}
//         </Text>
//         <Icon name="calendar-today" size={22} color="#000000" />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderTextField = (
//     label: string,
//     formKey: keyof FormState,
//     options?: {
//       keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
//       autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
//       secureTextEntry?: boolean;
//     },
//   ) => (
//     <View style={styles.fieldBlock}>
//       <Text style={styles.label}>{label}</Text>
//       <TextInput
//         style={inputStyle(formKey)}
//         value={form[formKey] as string}
//         onChangeText={v => update(formKey, v)}
//         onFocus={() => setFocusedField(formKey)}
//         onBlur={() => setFocusedField(null)}
//         placeholderTextColor={PLACEHOLDER}
//         keyboardType={options?.keyboardType ?? 'default'}
//         autoCapitalize={options?.autoCapitalize ?? 'sentences'}
//         secureTextEntry={options?.secureTextEntry ?? false}
//       />
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

//         {renderFullDropdown('accountType', 'Account Type', form.accountType, ACCOUNT_TYPE_OPTIONS, 'accountType')}
//         {renderFullDropdown('type', 'Type', form.type, TYPE_OPTIONS, 'type')}
//         {renderTextField('Website', 'website', { keyboardType: 'url', autoCapitalize: 'none' })}

//         {/* Description */}
//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={[styles.textArea, focusedField === 'description' && styles.inputFocused]}
//             value={form.description}
//             onChangeText={v => update('description', v)}
//             onFocus={() => setFocusedField('description')}
//             onBlur={() => setFocusedField(null)}
//             placeholder=""
//             placeholderTextColor={PLACEHOLDER}
//             multiline
//             numberOfLines={4}
//             textAlignVertical="top"
//           />
//         </View>

//         {renderTextField('Dealer Location Code', 'dealerLocationCode')}
//         {renderFullDropdown('quotationType', 'Quotation Type', form.quotationType, QUOTATION_TYPE_OPTIONS, 'quotationType')}
//         {renderTextField('Present KM', 'presentKM', { keyboardType: 'numeric' })}
//         {renderTextField('Remarks', 'remarks')}
//         {renderTextField('Town', 'town')}
//         {renderCheckbox('City Tier', 'cityTier', form.cityTier)}
//         {renderFullDropdown('status', 'Status', form.status, STATUS_OPTIONS, 'status')}
//         {renderTextField('Dealer Name', 'dealerName')}
//         {renderFullDropdown('category', 'Category', form.category, CATEGORY_OPTIONS, 'category')}
//         {renderTextField('Headlamp', 'headlamp')}
//         {renderFullDropdown('locationArea', 'Location Area', form.locationArea, LOCATION_AREA_OPTIONS, 'locationArea')}
//         {renderCheckbox('Is Metro', 'isMetro', form.isMetro)}
//         {renderFullDropdown('zone', 'Zone', form.zone, ZONE_OPTIONS, 'zone')}
//         {renderTextField('Address Id', 'addressId')}
//         {renderTextField('Supplier Code', 'supplierCode')}
//         {renderCheckbox('TCS Applicable', 'tcsApplicable', form.tcsApplicable)}
//         {renderCheckbox('Is B2B', 'isB2B', form.isB2B)}
//         {renderTextField('Warehouse Code', 'warehouseCode')}
//         {renderTextField('Other Service Code', 'otherServiceCode')}
//         {renderFullDropdown('financerScope', 'Financer Scope', form.financerScope, FINANCER_SCOPE_OPTIONS, 'financerScope')}

//         {/* ── NEW FIELDS (Images 1–4) ── */}

//         {renderTextField('Phone', 'phone', { keyboardType: 'phone-pad' })}
//         {renderFullDropdown('industry', 'Industry', form.industry, INDUSTRY_OPTIONS, 'industry')}
//         {renderTextField('Employees', 'employees', { keyboardType: 'numeric' })}
//         {renderTextField('Email Id', 'emailId', { keyboardType: 'email-address', autoCapitalize: 'none' })}
//         {renderTextField('Sales Person Name', 'salesPersonName')}
//         {renderDateField('Registration Date', 'registrationDate')}
//         {renderTextField('Bank', 'bank')}
//         {renderTextField('Branch', 'branch')}
//         {renderTextField('IFSC Code', 'ifscCode', { autoCapitalize: 'characters' })}
//         {renderTextField('Bank Account No', 'bankAccountNo', { keyboardType: 'numeric' })}
//         {renderTextField('Passport Number of Proposer', 'passportNumberOfProposer', { autoCapitalize: 'characters' })}
//         {renderTextField('Driving License No. of Proposer', 'drivingLicenseNo', { autoCapitalize: 'characters' })}
//         {renderDateField('DOB', 'dob')}
//         {renderTextField('Nrega Job Id Number of Proposer', 'nregaJobIdNumber')}
//         {renderTextField('Voter Id', 'voterId', { autoCapitalize: 'characters' })}
//         {renderDateField('Incorporation Date', 'incorporationDate')}
//         {renderTextField('Registration Number', 'registrationNumber')}
//         {renderTextField('Aadhaar Number', 'aadhaarNumber', { keyboardType: 'numeric' })}
//         {renderTextField('PAN Card Number', 'panCardNumber', { autoCapitalize: 'characters' })}
//         {renderTextField('GST Number', 'gstNumber', { autoCapitalize: 'characters' })}
//         {renderTextField('Einvoice Username', 'einvoiceUsername', { autoCapitalize: 'none' })}
//         {renderTextField('Einvoice Password', 'einvoicePassword', { autoCapitalize: 'none', secureTextEntry: true })}
//         {renderTextField('Email', 'email', { keyboardType: 'email-address', autoCapitalize: 'none' })}
//       </View>

//       {/* ── Modern Date Picker Modal ── */}
//       <Modal
//         visible={activeDatePicker !== null}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setActiveDatePicker(null)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalCard}>
//             <View style={styles.modalHeader}>
//               <Text style={styles.modalTitle}>Select Date</Text>
//               <TouchableOpacity onPress={() => setActiveDatePicker(null)}>
//                 <Text style={styles.modalClose}>✕</Text>
//               </TouchableOpacity>
//             </View>
//             <DatePicker
//               mode="calendar"
//               selected={(activeDatePicker ? form[activeDatePicker] as string : '') || undefined}
//               onDateChange={(date: string) => {
//                 if (activeDatePicker) update(activeDatePicker, date);
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
//             <TouchableOpacity
//               style={styles.modalConfirmBtn}
//               onPress={() => setActiveDatePicker(null)}
//             >
//               <Text style={styles.modalConfirmText}>Confirm</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default CustomerAccountInformationForm;

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

//   // Single-line input
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

//   // Multiline textarea
//   textArea: {
//     minHeight: 100,
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//     paddingHorizontal: 12,
//     paddingTop: 10,
//     paddingBottom: 10,
//     fontSize: 14,
//     color: '#1a1a1a',
//   },

//   // Focus state
//   inputFocused: {
//     borderColor: RED,
//     borderWidth: 1.5,
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

//   // Date input
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
//   calendarIcon: {
//     fontSize: 16,
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { formatName } from '../../../utils/Validation';
import DateModel from '../../DateModel';
import moment from 'moment';


const RED = '#E8192C';
const LABEL_COLOR = '#444';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const PLACEHOLDER = '#aaa';

// ── Dropdown data arrays ──
const toData = (arr: string[]) => arr.map(v => ({ label: v, value: v }));

const ACCOUNT_TYPE_DATA = toData(['--None--', 'Retail', 'Institutional', 'Dealer', 'Booking']);
const TYPE_DATA = toData(['--None--', 'Analyst', 'Competitor', 'Customer', 'Integrator', 'Investor', 'Partner', 'Press', 'Prospect', 'Reseller', 'Other']);
const QUOTATION_TYPE_DATA = toData(['--None--', 'Public', 'Private']);
const STATUS_DATA = toData(['--None--', 'Active', 'Inactive']);
const CATEGORY_DATA = toData(['--None--', 'A', 'B']);
const LOCATION_AREA_DATA = toData(['--None--', 'Showroom', 'Service', 'Other Service']);
const ZONE_DATA = toData(['--None--', 'North', 'South', 'East', 'West']);
const FINANCER_SCOPE_DATA = toData(['--None--', 'All India']);
const INDUSTRY_DATA = toData(['--None--', 'Agriculture', 'Apparel', 'Banking', 'Chemicals', 'Construction', 'Education', 'Electronics', 'Energy', 'Engineering', 'Entertainment', 'Finance', 'Food & Beverage', 'Healthcare', 'Hospitality', 'Insurance', 'Manufacturing', 'Media', 'Retail', 'Technology', 'Telecommunications', 'Transportation', 'Other']);

// Same helper as CallFollowUpForm
const formatToDisplay = (value: string) => {
  if (!value) return '';
  const [y, m, d] = value.split('/');
  return `${d}/${m}/${y}`;
};

interface FormState {
  accountName: string;
  accountType: string;
  type: string;
  website: string;
  description: string;
  dealerLocationCode: string;
  quotationType: string;
  presentKM: string;
  remarks: string;
  town: string;
  cityTier: boolean;
  status: string;
  dealerName: string;
  category: string;
  headlamp: string;
  locationArea: string;
  isMetro: boolean;
  zone: string;
  addressId: string;
  supplierCode: string;
  tcsApplicable: boolean;
  isB2B: boolean;
  warehouseCode: string;
  otherServiceCode: string;
  financerScope: string;
  phone: string;
  industry: string;
  employees: string;
  emailId: string;
  salesPersonName: string;
  registrationDate: string;
  bank: string;
  branch: string;
  ifscCode: string;
  bankAccountNo: string;
  passportNumberOfProposer: string;
  drivingLicenseNo: string;
  dob: string;
  nregaJobIdNumber: string;
  voterId: string;
  incorporationDate: string;
  registrationNumber: string;
  aadhaarNumber: string;
  panCardNumber: string;
  gstNumber: string;
  einvoiceUsername: string;
  einvoicePassword: string;
  email: string;
}

const CustomerAccountInformationForm = ({customerForm, setCustomerForm}) => {
  const today = getFormatedDate(new Date(), 'YYYY/MM/DD');

  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const [activeDatePicker, setActiveDatePicker] = useState<keyof FormState | null>(null);

  const update = (key: keyof FormState, value: string | boolean) =>
    setCustomerForm(prev => ({ ...prev, [key]: value }));


  const monthYearChange = (monthYear: string) => {
 
  // We don't need to do anything here
  // Just needs to exist as a function to prevent the crash
};

  const inputStyle = (field: string) => [
    styles.input,
    focusedField === field && styles.inputFocused,
  ];

  
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
          searchPlaceholder='Search'
          dropdownPosition='auto'
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
          renderRightIcon={() =>  <MaterialIcons  name="keyboard-arrow-down" color="#d0d0d0"  size={24}/>}
        />
      </View>
    </View>
  );

  const renderCheckbox = (label: string, formKey: keyof FormState, checked: boolean) => (
    <View style={styles.fieldBlock}>
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => update(formKey, !checked)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );

  
  const renderDateField = (label: string, formKey: keyof FormState) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setActiveDatePicker(formKey)}
        activeOpacity={0.8}
      >
        <Text style={customerForm[formKey] ? styles.dateText : styles.datePlaceholder}>
          {customerForm[formKey] ? formatToDisplay(customerForm[formKey] as string) : ''}
        </Text>
        <Icon name="calendar-today" size={22} color="#000000" />
      </TouchableOpacity>
    </View>
  );

  const renderTextField = (
    label: string,
    formKey: keyof FormState,
    options?: {
      keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
      autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
      secureTextEntry?: boolean;
    },
  ) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={inputStyle(formKey)}
        value={customerForm[formKey] as string}
        onChangeText={v => update(formKey, v)}
        onFocus={() => setFocusedField(formKey)}
        onBlur={() => setFocusedField(null)}
        placeholderTextColor={PLACEHOLDER}
        keyboardType={options?.keyboardType ?? 'default'}
        autoCapitalize={options?.autoCapitalize ?? 'sentences'}
        secureTextEntry={options?.secureTextEntry ?? false}
      />
    </View>
  );

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.divider} />

        {/* Account Name */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>
            Account Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={inputStyle('accountName')}
            value={customerForm.accountName}
            onChangeText={v => update('accountName', formatName(v))}
            onFocus={() => setFocusedField('accountName')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {renderDropdown('Account Type', ACCOUNT_TYPE_DATA, customerForm.accountType, 'accountType')}
        {renderDropdown('Type', TYPE_DATA, customerForm.type, 'type')}
        {renderTextField('Website', 'website', { keyboardType: 'url', autoCapitalize: 'none' })}

        {/* Description */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.textArea, focusedField === 'description' && styles.inputFocused]}
            value={customerForm.description}
            onChangeText={v => update('description', v)}
            onFocus={() => setFocusedField('description')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {renderTextField('Dealer Location Code', 'dealerLocationCode')}
        {renderDropdown('Quotation Type', QUOTATION_TYPE_DATA, customerForm.quotationType, 'quotationType')}
        {renderTextField('Present KM', 'presentKM', { keyboardType: 'numeric' })}
        {renderTextField('Remarks', 'remarks')}
        {renderTextField('Town', 'town')}
        {renderCheckbox('City Tier', 'cityTier', customerForm.cityTier)}
        {renderDropdown('Status', STATUS_DATA, customerForm.status, 'status')}
        {renderTextField('Dealer Name', 'dealerName')}
        {renderDropdown('Category', CATEGORY_DATA, customerForm.category, 'category')}
        {renderTextField('Headlamp', 'headlamp')}
        {renderDropdown('Location Area', LOCATION_AREA_DATA, customerForm.locationArea, 'locationArea')}
        {renderCheckbox('Is Metro', 'isMetro', customerForm.isMetro)}
        {renderDropdown('Zone', ZONE_DATA, customerForm.zone, 'zone')}
        {renderTextField('Address Id', 'addressId')}
        {renderTextField('Supplier Code', 'supplierCode')}
        {renderCheckbox('TCS Applicable', 'tcsApplicable', customerForm.tcsApplicable)}
        {renderCheckbox('Is B2B', 'isB2B', customerForm.isB2B)}
        {renderTextField('Warehouse Code', 'warehouseCode')}
        {renderTextField('Other Service Code', 'otherServiceCode')}
        {renderDropdown('Financer Scope', FINANCER_SCOPE_DATA, customerForm.financerScope, 'financerScope')}
        {renderTextField('Phone', 'phone', { keyboardType: 'phone-pad' })}
        {renderDropdown('Industry', INDUSTRY_DATA, customerForm.industry, 'industry')}
        {renderTextField('Employees', 'employees', { keyboardType: 'numeric' })}
        {renderTextField('Email Id', 'emailId', { keyboardType: 'email-address', autoCapitalize: 'none' })}
        {renderTextField('Sales Person Name', 'salesPersonName')}
        {renderDateField('Registration Date', 'registrationDate')}
        {renderTextField('Bank', 'bank')}
        {renderTextField('Branch', 'branch')}
        {renderTextField('IFSC Code', 'ifscCode', { autoCapitalize: 'characters' })}
        {renderTextField('Bank Account No', 'bankAccountNo', { keyboardType: 'numeric' })}
        {renderTextField('Passport Number of Proposer', 'passportNumberOfProposer', { autoCapitalize: 'characters' })}
        {renderTextField('Driving License No. of Proposer', 'drivingLicenseNo', { autoCapitalize: 'characters' })}
        {renderDateField('DOB', 'dob')}
        {renderTextField('Nrega Job Id Number of Proposer', 'nregaJobIdNumber')}
        {renderTextField('Voter Id', 'voterId', { autoCapitalize: 'characters' })}
        {renderDateField('Incorporation Date', 'incorporationDate')}
        {renderTextField('Registration Number', 'registrationNumber')}
        {renderTextField('Aadhaar Number', 'aadhaarNumber', { keyboardType: 'numeric' })}
        {renderTextField('PAN Card Number', 'panCardNumber', { autoCapitalize: 'characters' })}
        {renderTextField('GST Number', 'gstNumber', { autoCapitalize: 'characters' })}
        {renderTextField('Einvoice Username', 'einvoiceUsername', { autoCapitalize: 'none' })}
        {renderTextField('Einvoice Password', 'einvoicePassword', { autoCapitalize: 'none', secureTextEntry: true })}
        {renderTextField('Email', 'email', { keyboardType: 'email-address', autoCapitalize: 'none' })}
      </View>

    
      {/* <Modal
        visible={activeDatePicker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setActiveDatePicker(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarBox}>
            <DatePicker
              mode="calendar"
              isGregorian={true}
              selected={(activeDatePicker ? customerForm[activeDatePicker] as string : '') || today}
              onSelectedChange={(date: string) => {
                if (activeDatePicker) update(activeDatePicker, date);
              }}
              onDateChange={(date: string) => {
                if (activeDatePicker) update(activeDatePicker, date);
              }}
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
              style={styles.closeBtn}
              onPress={() => setActiveDatePicker(null)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}

      <DateModel
  visible={activeDatePicker !== null}
  onClose={() => setActiveDatePicker(null)}
  simpleDate={true}
  onDateChange={(date: string) => {
    if (moment(date, 'YYYY/MM/DD', true).isValid()) {
      if (activeDatePicker) update(activeDatePicker, date);
      setActiveDatePicker(null);
    }
  }}

  monthYearChange={monthYearChange}
/>
    </ScrollView>
  );
};

export default CustomerAccountInformationForm;

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

  // Dropdown — react-native-element-dropdown
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
    gap: 8,
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
});