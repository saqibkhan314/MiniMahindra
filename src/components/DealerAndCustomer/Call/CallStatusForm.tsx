// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
// } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const RED = '#E8192C';
// const LABEL_COLOR = '#444';
// const INPUT_BORDER = '#d0d0d0';
// const INPUT_BG = '#fff';
// const PLACEHOLDER = '#aaa';

// const SOURCE_DATA = [
//   { label: '--None--', value: '--None--' },
//   { label: 'Broker Leads', value: 'Broker Leads' },
//   { label: 'Call Centre', value: 'Call Centre' },
//   { label: 'Digital-Dealer', value: 'Digital-Dealer' },
//   { label: 'Field', value: 'Field' },
//   { label: 'Referral', value: 'Referral' },
//   { label: 'Showroom', value: 'Showroom' },
//   { label: 'Digital', value: 'Digital' },
//   { label: 'Agency Data', value: 'Agency Data' },
//   { label: 'Govt. Website', value: 'Govt. Website' },
//   { label: 'Tender Portal', value: 'Tender Portal' },
// ];

// const PRIMARY_APPLICATION_DATA = [
//   { label: '--None--', value: '--None--' },
//   { label: 'E Com/Quick Com', value: 'E Com/Quick Com' },
//   { label: 'Construction Materials', value: 'Construction Materials' },
//   { label: 'Industrial Goods', value: 'Industrial Goods' },
//   { label: 'Catering', value: 'Catering' },
//   { label: 'Agri', value: 'Agri' },
//   { label: 'Furnitures', value: 'Furnitures' },
//   { label: 'FMCG', value: 'FMCG' },
//   { label: 'Telecom', value: 'Telecom' },
//   { label: 'Parcel & Couriers', value: 'Parcel & Couriers' },
//   { label: 'Food', value: 'Food' },
//   { label: 'Beverages', value: 'Beverages' },
//   { label: 'Outbound Logistics', value: 'Outbound Logistics' },
//   { label: 'Waste Management', value: 'Waste Management' },
//   { label: 'Dairy', value: 'Dairy' },
//   { label: 'Gas cylinder', value: 'Gas cylinder' },
//   { label: 'Auto Ancillary', value: 'Auto Ancillary' },
//   { label: 'Special Application', value: 'Special Application' },
//   { label: 'FMCD', value: 'FMCD' },
//   { label: 'Cold chain', value: 'Cold chain' },
//   { label: 'Pharma', value: 'Pharma' },
//   { label: 'Event Management', value: 'Event Management' },
//   { label: 'Packers & Movers', value: 'Packers & Movers' },
//   { label: 'Poultry', value: 'Poultry' },
//   { label: 'Textiles', value: 'Textiles' },
//   { label: 'TBD', value: 'TBD' }, 
// ];

// const CONTACTED_DATA = [
//     { label: '--None--', value: '--None--' },
//   { label: 'No', value: 'No' },
//   { label: 'Yes', value: 'Yes' },
// ];

// // Same helper as CallFollowUpForm
// const formatToDisplay = (value: string) => {
//   if (!value) return '';
//   const [y, m, d] = value.split('/');
//   return `${d}/${m}/${y}`;
// };

// const CallStatusForm = () => {
//   const today = getFormatedDate(new Date(), 'YYYY/MM/DD');

//   const [source, setSource] = useState<string>('--None--');
//   const [primaryApplication, setPrimaryApplication] = useState<string>('--None--');
//   const [contacted, setContacted] = useState<string>('No');
//   const [nextFollowUp, setNextFollowUp] = useState<string>('');
//   const [showCalendar, setShowCalendar] = useState(false);

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
//         <Text style={styles.sectionTitle}>Contact Status</Text>
//         <View style={styles.divider} />

//         {/* Source */}
//         {renderDropdown('Source', SOURCE_DATA, source, setSource, true)}

//         {/* Primary Application */}
//         {renderDropdown('Primary Application', PRIMARY_APPLICATION_DATA, primaryApplication, setPrimaryApplication)}

//         {/* Contacted */}
//         {renderDropdown('Contacted', CONTACTED_DATA, contacted, setContacted, true)}

//         {/* Next Follow-up — same date field UI as CallFollowUpForm */}
//         <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
//           <Text style={styles.label}>Next Follow-up</Text>
//           <TouchableOpacity
//             style={styles.dateInput}
//             onPress={() => setShowCalendar(true)}
//             activeOpacity={0.8}
//           >
//             <Text style={nextFollowUp ? styles.dateText : styles.datePlaceholder}>
//               {nextFollowUp ? formatToDisplay(nextFollowUp) : ''}
//             </Text>
//             <Icon name="calendar-today" size={22} color="#000000" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* ── Calendar Modal — exact same pattern as CallFollowUpForm ── */}
//       <Modal
//         visible={showCalendar}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setShowCalendar(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.calendarBox}>
//             <DatePicker
//               mode="calendar"
//               isGregorian={true}
//               selected={nextFollowUp || today}
//               onSelectedChange={(date: string) => setNextFollowUp(date)}
//               onDateChange={(date: string) => setNextFollowUp(date)}
//               options={{
//                 backgroundColor: '#fff',
//                 textHeaderColor: RED,
//                 textDefaultColor: '#000',
//                 selectedTextColor: '#fff',
//                 mainColor: RED,
//                 textSecondaryColor: '#aaa',
//                 borderColor: '#eee',
//               }}
//             />
//             <TouchableOpacity
//               style={styles.closeBtn}
//               onPress={() => setShowCalendar(false)}
//             >
//               <Text style={styles.closeText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default CallStatusForm;

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

//   // Calendar Modal — exact same as CallFollowUpForm
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
//   closeText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
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
import DateModel from '../../../components/DateModel'; // update path
import moment from 'moment';

const RED = '#E8192C';
const LABEL_COLOR = '#000000';
const INPUT_BORDER = '#d0d0d0';
const INPUT_BG = '#fff';
const PLACEHOLDER = '#aaa';

const SOURCE_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Broker Leads', value: 'Broker Leads' },
  { label: 'Call Centre', value: 'Call Centre' },
  { label: 'Digital-Dealer', value: 'Digital-Dealer' },
  { label: 'Field', value: 'Field' },
  { label: 'Referral', value: 'Referral' },
  { label: 'Showroom', value: 'Showroom' },
  { label: 'Digital', value: 'Digital' },
  { label: 'Agency Data', value: 'Agency Data' },
  { label: 'Govt. Website', value: 'Govt. Website' },
  { label: 'Tender Portal', value: 'Tender Portal' },
];

const PRIMARY_APPLICATION_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'E Com/Quick Com', value: 'E Com/Quick Com' },
  { label: 'Construction Materials', value: 'Construction Materials' },
  { label: 'Industrial Goods', value: 'Industrial Goods' },
  { label: 'Catering', value: 'Catering' },
  { label: 'Agri', value: 'Agri' },
  { label: 'Furnitures', value: 'Furnitures' },
  { label: 'FMCG', value: 'FMCG' },
  { label: 'Telecom', value: 'Telecom' },
  { label: 'Parcel & Couriers', value: 'Parcel & Couriers' },
  { label: 'Food', value: 'Food' },
  { label: 'Beverages', value: 'Beverages' },
  { label: 'Outbound Logistics', value: 'Outbound Logistics' },
  { label: 'Waste Management', value: 'Waste Management' },
  { label: 'Dairy', value: 'Dairy' },
  { label: 'Gas cylinder', value: 'Gas cylinder' },
  { label: 'Auto Ancillary', value: 'Auto Ancillary' },
  { label: 'Special Application', value: 'Special Application' },
  { label: 'FMCD', value: 'FMCD' },
  { label: 'Cold chain', value: 'Cold chain' },
  { label: 'Pharma', value: 'Pharma' },
  { label: 'Event Management', value: 'Event Management' },
  { label: 'Packers & Movers', value: 'Packers & Movers' },
  { label: 'Poultry', value: 'Poultry' },
  { label: 'Textiles', value: 'Textiles' },
  { label: 'TBD', value: 'TBD' },
];

const CONTACTED_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'No', value: 'No' },
  { label: 'Yes', value: 'Yes' },
];


const SECONDARY_APPLICATION_DATA = [
  { label: '--None--', value: '--None--' },

  { label: 'Quick commerce', value: 'Quick commerce' },
  { label: 'Metal Fabrication', value: 'Metal Fabrication' },
  { label: 'Lubricants', value: 'Lubricants' },
  { label: 'Battery distribution', value: 'Battery distribution' },
  { label: 'E-commerce', value: 'E-commerce' },
  { label: 'Sweets & Savouries', value: 'Sweets & Savouries' },
  { label: 'Food distribution', value: 'Food distribution' },
  { label: 'Fertilizers', value: 'Fertilizers' },

  { label: 'Furnitures distribution', value: 'Furnitures distribution' },
  { label: 'Grocery', value: 'Grocery' },
  { label: 'Telecom Equipments', value: 'Telecom Equipments' },
  { label: 'Parcel & Couriers', value: 'Parcel & Couriers' },
  { label: 'Plastic products', value: 'Plastic products' },
  { label: 'Rice & Pulses distribution', value: 'Rice & Pulses distribution' },
  { label: 'Aerated Beverages', value: 'Aerated Beverages' },
  { label: 'Vegetables', value: 'Vegetables' },

  { label: 'Bio Products', value: 'Bio Products' },
  { label: 'Medical Waste', value: 'Medical Waste' },
  { label: 'Cement distribution', value: 'Cement distribution' },
  { label: 'Milk distribution', value: 'Milk distribution' },
  { label: 'Domestic Waste', value: 'Domestic Waste' },
  { label: 'Plywood distribution', value: 'Plywood distribution' },
  { label: 'Domestic Gas cylinder', value: 'Domestic Gas cylinder' },
  { label: 'Tyres distribution', value: 'Tyres distribution' },

  { label: 'Transformer repair solution', value: 'Transformer repair solution' },
  { label: 'Highway Patrolling', value: 'Highway Patrolling' },
  { label: 'Water', value: 'Water' },
  { label: 'Packaging materials distribution', value: 'Packaging materials distribution' },
  { label: 'Stationery distribution', value: 'Stationery distribution' },
  { label: 'Hardwares', value: 'Hardwares' },
  { label: 'Spare parts distribution', value: 'Spare parts distribution' },
  { label: 'Electronic Appliances', value: 'Electronic Appliances' },

  { label: 'Bakery', value: 'Bakery' },
  { label: 'Paints', value: 'Paints' },
  { label: 'Medicines', value: 'Medicines' },
  { label: 'Edible Oil distribution', value: 'Edible Oil distribution' },
  { label: 'Glass Bottle recycler', value: 'Glass Bottle recycler' },
  { label: 'Packaged Snacks', value: 'Packaged Snacks' },
  { label: 'White Goods', value: 'White Goods' },
  { label: 'Toys distribution', value: 'Toys distribution' },

  { label: 'Home décor', value: 'Home décor' },
  { label: 'Surgical products', value: 'Surgical products' },
  { label: 'Sound & Video solutions', value: 'Sound & Video solutions' },
  { label: 'Packers & Movers', value: 'Packers & Movers' },
  { label: 'Poultry', value: 'Poultry' },
  { label: 'NGO - Food distribution', value: 'NGO - Food distribution' },
  { label: 'Fabric', value: 'Fabric' },
  { label: 'Cleaning products', value: 'Cleaning products' },

  { label: 'Carpet distribution', value: 'Carpet distribution' },
  { label: 'Resorts', value: 'Resorts' },
  { label: 'Laundry', value: 'Laundry' },
  { label: 'Foot wear distribution', value: 'Foot wear distribution' },
  { label: 'Mushrooms', value: 'Mushrooms' },
  { label: 'Mattress distribution', value: 'Mattress distribution' },
  { label: 'Irrigation products', value: 'Irrigation products' },
  { label: 'Solar panels', value: 'Solar panels' },
];
const CUSTOMER_STATUS_DATA = [
  { label: '--None--', value: '--None--' },
  { label: 'Active', value: 'Hot' },
  { label: 'Convert', value: 'Warm' },
  { label: 'Drop', value: 'Cold' },
];

// Same helper as CallFollowUpForm
const formatToDisplay = (value: string) => {
  if (!value) return '';
  const [y, m, d] = value.split('/');
  return `${d}/${m}/${y}`;
};

interface Props {
  form: any;
  update: (key: string, value: string) => void;
  openCalendar: 'callDate' | 'nextFollowUp' | null;
  setOpenCalendar: React.Dispatch<
    React.SetStateAction<'callDate' | 'nextFollowUp' | null>
  >;
  onSave: () => void;
}


const CallStatusForm = ({form,  setCallForm, openCalendar,setOpenCalendar, onSave }: Props) => {

  const update = (key: keyof typeof form, value: string) => {
    setCallForm(prev => ({ ...prev, [key]: value }));
  };
  const today = getFormatedDate(new Date(), 'YYYY/MM/DD');

  const [focusedField, setFocusedField] = useState<string | null>(null);


  const handleCallDateChange = (selectedDate: string) => {
  if (moment(selectedDate, 'YYYY/MM/DD', true).isValid()) {
    update('callDate', selectedDate);
    setOpenCalendar(null);
  }
};


const handleNextFollowUpChange = (selectedDate: string) => {
  if (moment(selectedDate, 'YYYY/MM/DD', true).isValid()) {
    update('nextFollowUp', selectedDate);
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
          renderRightIcon={() =>  <MaterialIcons name="keyboard-arrow-down" color="#d0d0d0" size={24} />}
        />
      </View>
    </View>
  );

  const renderDateField = (
    label: string,
    value: string,
    key: 'callDate' | 'nextFollowUp',
    required?: boolean,
  ) => (
    <View style={styles.fieldBlock}>
      <Text style={styles.label}>
        {required && <Text style={styles.required}>* </Text>}
        {label}
      </Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setOpenCalendar(key)}
        activeOpacity={0.8}
      >
        <Text style={value ? styles.dateText : styles.datePlaceholder}>
          {value ? formatToDisplay(value) : ''}
        </Text>
        <Icon name="calendar-today" size={22} color="#000000" />
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
       
        <Text style={styles.sectionTitle}>Contact Status</Text>
        <View style={styles.divider} />

       
        {renderDropdown('Source', SOURCE_DATA, form.source, v => update('source', v), true)}

        
        {renderDropdown('Primary Application', PRIMARY_APPLICATION_DATA,  form.primaryApplication, v => update('primaryApplication', v))}

        
        {renderDropdown('Contacted', CONTACTED_DATA, form.contacted, v => update('contacted', v), true)}

        
        {renderDateField('Next Follow-up', form.nextFollowUp, 'nextFollowUp')}

       

        
        {renderDateField('Call Date', form.callDate, 'callDate')}

       
        {renderDropdown('Secondary Application', SECONDARY_APPLICATION_DATA, form.secondaryApplication, v => update('secondaryApplication', v))}

        
        {renderDropdown('Customer Status', CUSTOMER_STATUS_DATA, form.customerStatus, v => update('customerStatus', v))}

        
        <View style={[styles.fieldBlock, { marginBottom: 6 }]}>
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            style={[
              styles.textArea,
              focusedField === 'remarks' && styles.textAreaFocused,
            ]}
            // value={remarks}
            // onChangeText={setRemarks}
            value={form.remarks}
onChangeText={v => update('remarks', v)}
            onFocus={() => setFocusedField('remarks')}
            onBlur={() => setFocusedField(null)}
            placeholder=""
            placeholderTextColor={PLACEHOLDER}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
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
        selected={form.callDate || ''}
        onSelectedChange={(date: string) => update('callDate', date)}
        onDateChange={(date: string) => update('callDate', date)}
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
        disableMonthChange={true}
        isGregorian={true}
        selected={form.nextFollowUp || ''}
        onSelectedChange={(date: string) => update('nextFollowUp', date)}
        onDateChange={(date: string) => update('nextFollowUp', date)}
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

export default CallStatusForm;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 8,
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

  // Textarea
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
  textAreaFocused: {
    borderColor: RED,
    borderWidth: 1.5,
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