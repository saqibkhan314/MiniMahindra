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
import DateModel from '../../DateModel';
import moment from 'moment';

const RED = '#E8192C';
const LABEL_COLOR = '#000000';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const PLACEHOLDER = '#aaa';

const CUSTOMER_STATUS_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Active', value: 'Active' },
  { label: 'Convert', value: 'Convert' },
  { label: 'Drop', value: 'Drop' },
];

const RESPONSE_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Call Back', value: 'Call Back' },
  { label: 'Product Enquiry', value: 'Product Enquiry' },
  { label: 'Convert to Prospect', value: 'Convert to Prospect' },

  {
    label: 'Callback Requested by Customer',
    value: 'Callback Requested by Customer',
  },
  { label: 'Vehicle Sold', value: 'Vehicle Sold' },
  { label: 'Not Interested in EV', value: 'Not Interested in EV' },
  { label: 'Not Interested in Brand', value: 'Not Interested in Brand' },
  { label: 'Customer Migrated', value: 'Customer Migrated' },
  { label: 'Service not Due yet', value: 'Service not Due yet' },
  { label: 'Not Interested in SCV', value: 'Not Interested in SCV' },
  { label: 'Not Interested in Purchase', value: 'Not Interested in Purchase' },
  { label: 'Not Interested', value: 'Not Interested' },
  { label: 'Out of Station/Country', value: 'Out of Station/Country' },
  { label: 'Service Date Confirmed', value: 'Service Date Confirmed' },
  {
    label: 'Insurance ReNewal Confirmed',
    value: 'Insurance ReNewal Confirmed',
  },
  { label: 'Service Already Done', value: 'Service Already Done' },
];

const REASON_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Incoming Barred', value: 'Incoming Barred' },
  { label: 'No Reply', value: 'No Reply' },
  { label: 'Not reachable', value: 'Not reachable' },
  { label: 'Phone Number do not exist', value: 'Phone Number do not exist' },
  { label: 'Phone Number not Available', value: 'Phone Number not Available' },
  { label: 'Ringing no response', value: 'Ringing no response' },
  { label: 'Switched off', value: 'Switched off' },
  { label: 'Wrong Number', value: 'Wrong Number' },
];

const formatToDisplay = (value: string) => {
  if (!value) return '';
  const [y, m, d] = value.split('/');
  return `${d}/${m}/${y}`;
};

const CallFollowUpForm = () => {
  const [callLineItemNo, setCallLineItemNo] = useState('');
  const [subject, setSubject] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [customerStatus, setCustomerStatus] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  const [callDate, setCallDate] = useState<string>('');
  const [nextFollowUp, setNextFollowUp] = useState<string>('');

  const [openCalendar, setOpenCalendar] = useState<
    'callDate' | 'nextFollowUp' | null
  >(null);

  const onSave = () => {
    const formData = {
      callLineItemNo,
      customerStatus,
      response,
      reason,
      subject,
      callDate,
      nextFollowUp,
    };

    console.log('Saved Form Data:', formData);

    setCallLineItemNo('');
    setSubject('');
    setCustomerStatus(null);
    setResponse(null);
    setReason(null);
    setCallDate('');
    setNextFollowUp('');
  };


   const handleCallDateChange = (selectedDate: string) => {
    if (moment(selectedDate, 'YYYY/MM/DD', true).isValid()) {
      setCallDate(selectedDate)
      setOpenCalendar(null);
    }
  };
  
  
  const handleNextFollowUpChange = (selectedDate: string) => {
    if (moment(selectedDate, 'YYYY/MM/DD', true).isValid()) {
      // update('nextFollowUp', selectedDate);
      setNextFollowUp(selectedDate)
      setOpenCalendar(null);
    }
  };
  
  
    const monthYearChange = (monthYear: string) => {
   
    // We don't need to do anything here
    // Just needs to exist as a function to prevent the crash
  };

  const renderDropdown = (
    label: string,
    data: { label: string; value: string }[],
    value: string | null,
    onChange: (val: string) => void,
  ) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          search
          searchPlaceholder="Search"
          itemTextStyle={styles.dropdownItemText}
          selectedTextStyle={styles.dropdownSelectedText}
          placeholderStyle={styles.dropdownPlaceholder}
          dropdownPosition="auto"
          activeColor="#ffffff"
          data={data}
          labelField="label"
          valueField="value"
          placeholder="--None--"
          value={value}
          onChange={item => onChange(item.value)}
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

  const renderDateField = (
    label: string,
    value: string,
    key: 'callDate' | 'nextFollowUp',
  ) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setOpenCalendar(key)}
        activeOpacity={0.8}
      >
        <Text style={value ? styles.dateText : styles.datePlaceholder}>
          {value ? formatToDisplay(value) : ''}
        </Text>
        <Icon name="calendar-today" size={22} color="#555" />
      </TouchableOpacity>
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
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.divider} />

        {/* Call Line Item No */}
        <View style={styles.fieldBlock}>
          <Text style={styles.label}>Call Line Item No</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'callLineItemNo' && styles.inputFocused,
            ]}
            value={callLineItemNo}
            onChangeText={setCallLineItemNo}
            onFocus={() => setFocusedField('callLineItemNo')}
            onBlur={() => setFocusedField(null)}
            keyboardType="numeric"
            placeholderTextColor={PLACEHOLDER}
          />
        </View>

        {renderDropdown(
          'Customer Status',
          CUSTOMER_STATUS_DATA,
          customerStatus,
          setCustomerStatus,
        )}
        {renderDropdown('Response', RESPONSE_DATA, response, setResponse)}
        {renderDateField('Call Date', callDate, 'callDate')}
        {renderDateField('Next Follow-up', nextFollowUp, 'nextFollowUp')}
        {renderDropdown('Reason', REASON_DATA, reason, setReason)}

        {/* Subject */}
        <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === 'subject' && styles.inputFocused,
            ]}
            value={subject}
            onChangeText={setSubject}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            placeholderTextColor={PLACEHOLDER}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={onSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      {/* <Modal
        visible={openCalendar === 'callDate'}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenCalendar(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarCard}>
            <DatePicker
              mode="calendar"
              isGregorian={true}
              selected={callDate || ''}
              onSelectedChange={(date: string) => {
                if (date !== callDate) setCallDate(date);
              }}
              onDateChange={(date: string) => {
                if (date !== callDate) setCallDate(date);
              }}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: RED,
                textDefaultColor: '#333',
                selectedTextColor: '#fff',
                mainColor: RED,
                textSecondaryColor: '#888',
                borderColor: '#eee',
              }}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenCalendar(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={openCalendar === 'nextFollowUp'}
        transparent
        animationType="fade"
        onRequestClose={() => setOpenCalendar(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarCard}>
            <DatePicker
              mode="calendar"
              isGregorian={true}
              selected={nextFollowUp || ''}
              onSelectedChange={(date: string) => {
                if (date !== nextFollowUp) setNextFollowUp(date);
              }}
              onDateChange={(date: string) => {
                if (date !== nextFollowUp) setNextFollowUp(date);
              }}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: RED,
                textDefaultColor: '#333',
                selectedTextColor: '#fff',
                mainColor: RED,
                textSecondaryColor: '#888',
                borderColor: '#eee',
              }}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setOpenCalendar(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}


            <DateModel
  visible={openCalendar === 'callDate'}
  onClose={() => setOpenCalendar(null)}
  onDateChange={handleCallDateChange}
  simpleDate={true}
  monthYearChange={monthYearChange}
/>

<DateModel
  visible={openCalendar === 'nextFollowUp'}
  onClose={() => setOpenCalendar(null)}
  onDateChange={handleNextFollowUpChange}
  simpleDate={true}
   monthYearChange={monthYearChange}
/>
    </ScrollView>
  );
};

export default CallFollowUpForm;

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

  // Text input
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
  calendarIcon: {
    fontSize: 16,
  },

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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  calendarCard: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },

  closeButton: {
    marginTop: 15,
    backgroundColor: RED,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

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
// import { Dropdown } from 'react-native-element-dropdown';
// import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// const RED = '#E8192C';
// const LABEL_COLOR = '#000000';
// const INPUT_BORDER = '#d0d0d0';
// const INPUT_BG = '#fff';
// const PLACEHOLDER = '#aaa';

// const NO_SELECTION = '1900/01/01';

// const CUSTOMER_STATUS_DATA = [
//   { label: '--None--', value: '--None--' },
//   { label: 'Active', value: 'Active' },
//   { label: 'Convert', value: 'Convert' },
//   { label: 'Drop', value: 'Drop' },
// ];

// const RESPONSE_DATA = [
//   { label: '--None--', value: '--None--' },
//   { label: 'Call Back', value: 'Call Back' },
//   { label: 'Product Enquiry', value: 'Product Enquiry' },
//   { label: 'Convert to Prospect', value: 'Convert to Prospect' },
//   {
//     label: 'Callback Requested by Customer',
//     value: 'Callback Requested by Customer',
//   },
//   { label: 'Vehicle Sold', value: 'Vehicle Sold' },
//   { label: 'Not Interested in EV', value: 'Not Interested in EV' },
//   { label: 'Not Interested in Brand', value: 'Not Interested in Brand' },
//   { label: 'Customer Migrated', value: 'Customer Migrated' },
//   { label: 'Service not Due yet', value: 'Service not Due yet' },
//   { label: 'Not Interested in SCV', value: 'Not Interested in SCV' },
//   { label: 'Not Interested in Purchase', value: 'Not Interested in Purchase' },
//   { label: 'Not Interested', value: 'Not Interested' },
//   { label: 'Out of Station/Country', value: 'Out of Station/Country' },
//   { label: 'Service Date Confirmed', value: 'Service Date Confirmed' },
//   {
//     label: 'Insurance ReNewal Confirmed',
//     value: 'Insurance ReNewal Confirmed',
//   },
//   { label: 'Service Already Done', value: 'Service Already Done' },
// ];

// const REASON_DATA = [
//   { label: '--None--', value: '--None--' },
//   { label: 'Incoming Barred', value: 'Incoming Barred' },
//   { label: 'No Reply', value: 'No Reply' },
//   { label: 'Not reachable', value: 'Not reachable' },
//   { label: 'Phone Number do not exist', value: 'Phone Number do not exist' },
//   { label: 'Phone Number not Available', value: 'Phone Number not Available' },
//   { label: 'Ringing no response', value: 'Ringing no response' },
//   { label: 'Switched off', value: 'Switched off' },
//   { label: 'Wrong Number', value: 'Wrong Number' },
// ];

// const formatToDisplay = (value: string) => {
//   if (!value) return '';
//   const [y, m, d] = value.split('/');
//   return `${d}/${m}/${y}`;
// };

// const CallFollowUpForm = () => {
//   const today = getFormatedDate(new Date(), 'YYYY/MM/DD');

//   const [callLineItemNo, setCallLineItemNo] = useState('');
//   const [subject, setSubject] = useState('');
//   const [focusedField, setFocusedField] = useState<string | null>(null);
//   const [customerStatus, setCustomerStatus] = useState<string | null>(null);
//   const [response, setResponse] = useState<string | null>(null);
//   const [reason, setReason] = useState<string | null>(null);

//   const [callDate, setCallDate] = useState<string>('');
//   const [nextFollowUp, setNextFollowUp] = useState<string>('');

//   const [tempCallDate, setTempCallDate] = useState<string>('');
//   const [tempNextFollowUp, setTempNextFollowUp] = useState<string>('');

//   const [openCalendar, setOpenCalendar] = useState<
//     'callDate' | 'nextFollowUp' | null
//   >(null);

//   // ── Key counters — incrementing forces DatePicker to fully remount ──
//   const [callDatePickerKey, setCallDatePickerKey] = useState(0);
//   const [nextFollowUpPickerKey, setNextFollowUpPickerKey] = useState(0);

//   const openDatePicker = (key: 'callDate' | 'nextFollowUp') => {
//     if (key === 'callDate') setTempCallDate(callDate);
//     else setTempNextFollowUp(nextFollowUp);
//     setOpenCalendar(key);
//   };

//   const closeAndCommit = (key: 'callDate' | 'nextFollowUp') => {
//     if (key === 'callDate') {
//       if (tempCallDate && tempCallDate !== NO_SELECTION)
//         setCallDate(tempCallDate);
//     } else {
//       if (tempNextFollowUp && tempNextFollowUp !== NO_SELECTION)
//         setNextFollowUp(tempNextFollowUp);
//     }
//     setOpenCalendar(null);
//   };

//   const clearSelection = (key: 'callDate' | 'nextFollowUp') => {
//     if (key === 'callDate') {
//       setTempCallDate('');
//       setCallDatePickerKey(k => k + 1);
//     } else {
//       setTempNextFollowUp('');
//       setNextFollowUpPickerKey(k => k + 1);
//     }

//   };

//   const onSave = () => {
//     const formData = {
//       callLineItemNo,
//       customerStatus,
//       response,
//       reason,
//       subject,
//       callDate,
//       nextFollowUp,
//     };
//     console.log('Saved Form Data:', formData);
//     setCallLineItemNo('');
//     setSubject('');
//     setCustomerStatus(null);
//     setResponse(null);
//     setReason(null);
//     setCallDate('');
//     setNextFollowUp('');
//   };

//   const renderDropdown = (
//     label: string,
//     data: { label: string; value: string }[],
//     value: string | null,
//     onChange: (val: string) => void,
//   ) => (
//     <View style={styles.fieldBlock}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={styles.dropdownWrapper}>
//         <Dropdown
//           style={styles.dropdown}
//           containerStyle={styles.dropdownContainer}
//           search
//           searchPlaceholder="Search"
//           itemTextStyle={styles.dropdownItemText}
//           selectedTextStyle={styles.dropdownSelectedText}
//           placeholderStyle={styles.dropdownPlaceholder}
//           dropdownPosition="auto"
//           activeColor="#ffffff"
//           data={data}
//           labelField="label"
//           valueField="value"
//           placeholder="--None--"
//           value={value}
//           onChange={item => onChange(item.value)}
//           renderRightIcon={() => (
//             <MaterialIcons
//               name="keyboard-arrow-down"
//               color="#d0d0d0"
//               size={24}
//             />
//           )}
//         />
//       </View>
//     </View>
//   );

//   const renderDateField = (
//     label: string,
//     value: string,
//     key: 'callDate' | 'nextFollowUp',
//   ) => (
//     <View style={styles.fieldBlock}>
//       <Text style={styles.label}>{label}</Text>
//       <TouchableOpacity
//         style={styles.dateInput}
//         onPress={() => openDatePicker(key)}
//         activeOpacity={0.8}
//       >
//         <Text style={value ? styles.dateText : styles.datePlaceholder}>
//           {value ? formatToDisplay(value) : ''}
//         </Text>
//         <Icon name="calendar-today" size={22} color="#555" />
//       </TouchableOpacity>
//     </View>
//   );

//   const renderCalendarModal = (
//     visible: boolean,
//     tempValue: string,
//     onTempChange: (d: string) => void,
//     key: 'callDate' | 'nextFollowUp',
//     pickerKey: number,
//   ) => (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="fade"
//       onRequestClose={() => setOpenCalendar(null)}
//     >
//       <View style={styles.modalOverlay}>
//         <View style={styles.calendarCard}>

//           <DatePicker
//             key={pickerKey}
//             mode="calendar"
//             isGregorian={true}
//             selected={tempValue || NO_SELECTION}
//             onSelectedChange={(date: string) => {
//               if (date !== NO_SELECTION) onTempChange(date);
//             }}
//             onDateChange={(date: string) => {
//               if (date !== NO_SELECTION) onTempChange(date);
//             }}
//             options={{
//               backgroundColor: '#fff',
//               textHeaderColor: RED,
//               textDefaultColor: '#333',
//               selectedTextColor: '#fff',
//               mainColor: RED,
//               textSecondaryColor: '#888',
//               borderColor: '#eee',
//             }}
//           />

//           <View style={styles.calendarBtnRow}>
//             <TouchableOpacity
//               style={styles.clearButton}
//               onPress={() => clearSelection(key)}
//             >
//               <Text style={styles.clearButtonText}>Clear</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => closeAndCommit(key)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <ScrollView
//       style={styles.scroll}
//       contentContainerStyle={styles.scrollContent}
//       keyboardShouldPersistTaps="handled"
//     >
//       <View style={styles.card}>
//         <Text style={styles.sectionTitle}>Information</Text>
//         <View style={styles.divider} />

//         <View style={styles.fieldBlock}>
//           <Text style={styles.label}>Call Line Item No</Text>
//           <TextInput
//             style={[
//               styles.input,
//               focusedField === 'callLineItemNo' && styles.inputFocused,
//             ]}
//             value={callLineItemNo}
//             onChangeText={setCallLineItemNo}
//             onFocus={() => setFocusedField('callLineItemNo')}
//             onBlur={() => setFocusedField(null)}
//             keyboardType="numeric"
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>

//         {renderDropdown(
//           'Customer Status',
//           CUSTOMER_STATUS_DATA,
//           customerStatus,
//           setCustomerStatus,
//         )}
//         {renderDropdown('Response', RESPONSE_DATA, response, setResponse)}
//         {renderDateField('Call Date', callDate, 'callDate')}
//         {renderDateField('Next Follow-up', nextFollowUp, 'nextFollowUp')}
//         {renderDropdown('Reason', REASON_DATA, reason, setReason)}

//         <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
//           <Text style={styles.label}>Subject</Text>
//           <TextInput
//             style={[
//               styles.input,
//               focusedField === 'subject' && styles.inputFocused,
//             ]}
//             value={subject}
//             onChangeText={setSubject}
//             onFocus={() => setFocusedField('subject')}
//             onBlur={() => setFocusedField(null)}
//             placeholderTextColor={PLACEHOLDER}
//           />
//         </View>
//       </View>

//       <TouchableOpacity style={styles.saveButton} onPress={onSave}>
//         <Text style={styles.saveButtonText}>Save</Text>
//       </TouchableOpacity>

//       {renderCalendarModal(
//         openCalendar === 'callDate',
//         tempCallDate,
//         setTempCallDate,
//         'callDate',
//         callDatePickerKey,
//       )}

//       {renderCalendarModal(
//         openCalendar === 'nextFollowUp',
//         tempNextFollowUp,
//         setTempNextFollowUp,
//         'nextFollowUp',
//         nextFollowUpPickerKey,
//       )}
//     </ScrollView>
//   );
// };

// export default CallFollowUpForm;

// const styles = StyleSheet.create({
//   scroll: { flex: 1, backgroundColor: '#ffffff' },
//   scrollContent: { padding: 16, paddingBottom: 40 },
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
//   divider: { height: 1, backgroundColor: '#e0e0e0', marginBottom: 16 },
//   fieldBlock: { marginBottom: 14 },
//   label: {
//     fontSize: 13,
//     color: LABEL_COLOR,
//     marginBottom: 6,
//     fontWeight: '500',
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
//   inputFocused: { borderColor: RED, borderWidth: 1.5 },
//   dropdownWrapper: {
//     borderWidth: 1,
//     borderColor: INPUT_BORDER,
//     borderRadius: 8,
//     backgroundColor: INPUT_BG,
//   },
//   dropdown: { height: 44, paddingHorizontal: 12 },
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
//   dropdownSelectedText: { fontSize: 14, color: '#1a1a1a' },
//   dropdownPlaceholder: { fontSize: 14, color: '#1a1a1a' },
//   dropdownItemText: { fontSize: 14, color: '#333' },
//   dropdownArrow: { fontSize: 14, color: '#888' },
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
//   dateText: { fontSize: 14, color: '#1a1a1a', flex: 1 },
//   datePlaceholder: { fontSize: 14, color: PLACEHOLDER, flex: 1 },
//   calendarIcon: { fontSize: 16 },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.35)',
//   },
//   calendarBox: {
//     marginHorizontal: 20,
//     borderRadius: 16,
//     overflow: 'hidden',
//     backgroundColor: '#fff',
//     elevation: 6,
//   },
//   closeBtn: {
//     backgroundColor: RED,
//     padding: 16,
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   closeText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
//   saveButton: {
//     backgroundColor: '#E8192C',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   calendarCard: {
//     width: '92%',
//     backgroundColor: '#fff',
//     borderRadius: 18,
//     padding: 20,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 5 },
//   },
//   calendarBtnRow: { flexDirection: 'row', gap: 10, marginTop: 15 },
//   clearButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     borderWidth: 1.5,
//     borderColor: RED,
//     alignItems: 'center',
//   },
//   clearButtonText: { color: RED, fontSize: 16, fontWeight: '600' },
//   closeButton: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     backgroundColor: RED,
//     alignItems: 'center',
//   },
//   closeButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });
