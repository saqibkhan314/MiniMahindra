
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Modal,
//   TextInput,
//   Alert,
// } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
// import { Dropdown } from 'react-native-element-dropdown';
// import ReviewStatus from '../../utils/ReviewStatus.json';
// import Voice from '@react-native-voice/voice';
// import { PermissionsAndroid, Platform } from 'react-native';

// const MAKE_OPTIONS = [
//   { id: 1, name: 'Escorts' },
//   { id: 2, name: 'Sonalika' },
// ];
// const MODEL_OPTIONS = [
//   { id: 1, name: 'PT 445 XL' },
//   { id: 2, name: 'PT 434' } ,
// ];

// const formatToDisplay = (value: string) => {
//   // value from picker: YYYY/MM/DD
//   const [y, m, d] = value.split('/');
//   return `${d}/${m}/${y}`;
// };

// const AddFollowUpForm = ({allCustomerDetailData, allOwnedVehicleData, interestedModel}) => {
//   const today = getFormatedDate(new Date(), 'YYYY/MM/DD');
//   const [openCalendar, setOpenCalendar] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<string>(today);
//   const [reviewStatus, setReviewStatus] = useState<number | null>(null);
//   const [selectedMake, setSelectedMake] = useState<number | null>(null);
//   const [selectedCompetitionModel, setSelectedCompetitionModel] = useState<
//     number | null
//   >(null);
//   const [remarks, setRemarks] = useState('');
//   const [listening, setListening] = useState(false);

//   //console.log('reviewStatus ====>>>> ', reviewStatus);

//   const newFieldToBeEnabled = ReviewStatus.find(r => reviewStatus === r.id);



//   const handleSave = () => {

//       const rewiewStatusName = ReviewStatus.find( r => r.id === reviewStatus)
//    const selectedMakeName = MAKE_OPTIONS.find( m => m.id === selectedMake)
//    const completionModelName = MODEL_OPTIONS.find( m => m.id === selectedCompetitionModel )
//      console.log('allCustomerDetailData in add follow up form =========>>>>>>>> ',allCustomerDetailData);

//   console.log('allOwnedVehicleData in add follow up form ========>>>>>>>> ',allOwnedVehicleData);

//   console.log('selectedDate ====>>>>> ',selectedDate);

 
 
 
//     console.log('rewiewStatusName ====>>>> ', rewiewStatusName?.value);
//   console.log('selectedMakeName ====>>>> ', selectedMakeName?.name);
//   console.log('completionModelName ====>>>> ', completionModelName?.name);
//   console.log('remarks ====>>>> ', remarks);

//   console.log('interestedModel in add follow up form  =====>>>> ', interestedModel);


//   const missingFields = [];

//   console.log('allCustomerDetailData?.customerName ====>>>> ',allCustomerDetailData?.customerName);
  

//   if(!allCustomerDetailData?.customerName) missingFields.push('Customer Name')
//   if(!allCustomerDetailData?.Mobile) missingFields.push('Mobile number')
//   if(!allCustomerDetailData?.customerType) missingFields.push('Customer Type')
//   if(!allCustomerDetailData?.Tehsil) missingFields.push('tehsil')
//   if(!allCustomerDetailData?.village) missingFields.push('Village')
//   if(!allCustomerDetailData?.paymentMode) missingFields.push('Payment Mode')


//   if( allOwnedVehicleData.length === 0) missingFields.push('owned vehicle')  
  
//   if(!selectedDate) missingFields.push('Date')

//   if(!rewiewStatusName) missingFields.push('Review Status')

//   if(!remarks) missingFields.push('Remarks')

//   if(rewiewStatusName?.value === 'product-Customer interested in competition model') {
//     if(!selectedMakeName?.name) missingFields.push('Make Name')
//     if(!completionModelName?.name) missingFields.push('Model Name')
//   }

//   console.log('missingFields =====>>>>>>> ', missingFields);
  

//   if(missingFields.length > 0) {
//     Alert.alert("Missing Fields need to be filled ", `${missingFields}`)
//     return;
//   }

//   Alert.alert("Success")

//   }

//   useEffect(() => {
  
//     Voice.onSpeechStart = onSpeechStart
//     Voice.onSpeechEnd = onSpeechEnd
//     Voice.onSpeechResults = onSpeechResults

  
//   return () => {
//     Voice.destroy().then(Voice.removeAllListeners);
//   };
// }, []); 

// const onSpeechStart = (e) => {
//   console.log('on speech start ======>>>>> ',e);
  
// }
// const onSpeechEnd = (e) => {
//   console.log('on speech end ======>>>>> ',e);
// }
// const onSpeechResults = (e) => {
//   console.log('on speech result ======>>>>> ',e);

//   console.log('results ======>>>>>> ', e.value);
  
// }

// const startRecognizing = async () => {
//   try {
//     await Voice.start('en-US');
//   } catch (error) {
//     console.log('error in start recognizing ====>>>> ',error);
    
//   }
// }



//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Text style={styles.label}>
//           Expected Delivery Date <Text style={{ color: 'red' }}>*</Text>
//         </Text>

//         <TouchableOpacity
//           style={styles.inputBox}
//           onPress={() => setOpenCalendar(true)}
//         >
//           <Text style={styles.dateText}>
//             {selectedDate ? formatToDisplay(selectedDate) : 'Select Date'}
//           </Text>
//           <Icon name="calendar-today" size={22} color="#555" />
//         </TouchableOpacity>

//         <Modal
//           visible={openCalendar}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setOpenCalendar(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.calendarBox}>
//               <DatePicker
//                 mode="calendar"
//                 isGregorian={true}
//                 minimumDate={today}
//                 selected={selectedDate}
//                 onSelectedChange={(date: string) => setSelectedDate(date)}
//                 onDateChange={(date: string) => setSelectedDate(date)}
//                 options={{
//                   backgroundColor: '#fff',
//                   textHeaderColor: '#d32f2f',
//                   textDefaultColor: '#000',
//                   selectedTextColor: '#fff',
//                   mainColor: '#d32f2f',
//                   textSecondaryColor: '#aaa',
//                   borderColor: '#eee',
//                 }}
//               />

//               <TouchableOpacity
//                 style={styles.closeBtn}
//                 onPress={() => setOpenCalendar(false)}
//               >
//                 <Text style={styles.closeText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         <View style={styles.reviewStatus}>
//           <Text style={styles.label}>
//             Review Status <Text style={{ color: 'red' }}>*</Text>
//           </Text>
//         </View>

//         <View style={styles.field}>
//           <Dropdown
//             style={styles.dropdown}
//             data={ReviewStatus}
//             labelField="value"
//             valueField="id"
//             value={reviewStatus}
//             onChange={item => setReviewStatus(item.id)}
//             placeholder="Select status"
//             search
//             searchPlaceholder="Search"
//             autoScroll={false}
//             maxHeight={280}
//             dropdownPosition="bottom"
//             placeholderStyle={styles.placeholderText}
//             selectedTextStyle={styles.inputText}
//             itemTextStyle={styles.itemText}
//             inputSearchStyle={styles.searchInput}
//             activeColor="#efefef"
//             containerStyle={styles.dropdownContainer}
//           />
//         </View>

//         {newFieldToBeEnabled?.value ===
//           'product-Customer interested in competition model' && (
//           <View style={styles.competitionWrap}>
//             <Text style={styles.label}>
//               Make<Text style={styles.required}>*</Text>
//             </Text>
//             <View style={styles.field}>
//               <Dropdown
//                 style={styles.dropdown}
//                 data={MAKE_OPTIONS}
//                 labelField="name"
//                 valueField="id"
//                 value={selectedMake}
//                 placeholder="Select Make"
//                 search
//                 searchPlaceholder="Search"
//                 onChange={item => setSelectedMake(item.id)}
//                 placeholderStyle={styles.placeholderText}
//                 selectedTextStyle={styles.inputText}
//                 itemTextStyle={styles.itemText}
//                 inputSearchStyle={styles.searchInput}
//                 containerStyle={styles.dropdownContainer}
//               />
//             </View>

//             <Text style={[styles.label, { paddingTop: 10 }]}>
//               Model<Text style={styles.required}>*</Text>
//             </Text>
//             <View style={styles.field}>
//               <Dropdown
//                 style={styles.dropdown}
//                 data={MODEL_OPTIONS}
//                 labelField="name"
//                 valueField="id"
//                 value={selectedCompetitionModel}
//                 placeholder="Select Model"
//                 search
//                 searchPlaceholder="Search"
//                 onChange={item => setSelectedCompetitionModel(item.id)}
//                 placeholderStyle={styles.placeholderText}
//                 selectedTextStyle={styles.inputText}
//                 itemTextStyle={styles.itemText}
//                 inputSearchStyle={styles.searchInput}
//                 containerStyle={styles.dropdownContainer}
//               />
//             </View>
//           </View>
//         )}

//         <Text style={[styles.label, { paddingTop: 10 }]}>
//           Next Follow-Up Date <Text style={{ color: 'red' }}>*</Text>
//         </Text>

//         <TouchableOpacity
//           style={styles.inputBox}
//           onPress={() => setOpenCalendar(true)}
//         >
//           <Text style={styles.dateText}>
//             {selectedDate ? formatToDisplay(selectedDate) : 'Select Date'}
//           </Text>
//           <Icon name="calendar-today" size={22} color="#555" />
//         </TouchableOpacity>

//         <Modal
//           visible={openCalendar}
//           transparent
//           animationType="fade"
//           onRequestClose={() => setOpenCalendar(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.calendarBox}>
//               <DatePicker
//                 mode="calendar"
//                 isGregorian={true}
//                 minimumDate={today}
//                 selected={selectedDate}
//                 onSelectedChange={(date: string) => setSelectedDate(date)}
//                 onDateChange={(date: string) => setSelectedDate(date)}
//                 options={{
//                   backgroundColor: '#fff',
//                   textHeaderColor: '#d32f2f',
//                   textDefaultColor: '#000',
//                   selectedTextColor: '#fff',
//                   mainColor: '#d32f2f',
//                   textSecondaryColor: '#aaa',
//                   borderColor: '#eee',
//                 }}
//               />

//               <TouchableOpacity
//                 style={styles.closeBtn}
//                 onPress={() => setOpenCalendar(false)}
//               >
//                 <Text style={styles.closeText}>Close</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* <Text style={[styles.label, {paddingTop: 10}]}>
//           Remarks <Text style={{ color: 'red' }}>*</Text>
//         </Text>
//           <TextInput style={styles.remarks}/>  */}

//         <View>
//           <Text style={[styles.label, { paddingTop: 10 }]}>
//             Remarks <Text style={{ color: 'red' }}>*</Text>
//           </Text>

//           <View style={styles.remarksWrap}>
//             {/* <TextInput
//       style={styles.remarks}
//       multiline
//       numberOfLines={4}
//       placeholder="Add Remarks Here"
//       placeholderTextColor="#8b8b8b"
//       textAlignVertical="top"
//     /> */}

//             <TextInput
//               style={styles.remarks}
//               multiline
//               numberOfLines={4}
//               placeholder="Add Remarks Here"
//               placeholderTextColor="#8b8b8b"
//               textAlignVertical="top"
//               value={remarks}
//               onChangeText={setRemarks}
//             />

//             <TouchableOpacity onPress={() => startRecognizing()}>
//               <Icon
//                 name="mic"
//                 size={24}
//                 color="#8b8b8b"
//                 style={styles.micIcon}
//               />
//             </TouchableOpacity>

//             {listening && (
//     <Text style={styles.listeningText}>Listening... Speak now</Text>
//   )}

//             {/* <TouchableOpacity
//   // onPressIn={startListening}
//   // onPressOut={stopListening}
//   onPress={startListening}
// >
//   {/* <Icon name="mic" size={24} color="#8b8b8b" style={styles.micIcon} /> */}
//             {/* <Icon name="mic" size={24} color={listening ? 'red' : '#8b8b8b'} />
// </TouchableOpacity> */}

           
//           </View>
//         </View>
//       </View>
//       <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
//       <View style={styles.submitBtn}>
        
//           <Text style={styles.submitText}>Save & Submit</Text>
        
//       </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default AddFollowUpForm;

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     backgroundColor: '#ffffff',
//   },
//   card: {
//     borderWidth: 0.5,
//     borderColor: '#c7c7c7',
//     borderRadius: 12,
//     padding: 14,
//     backgroundColor: '#ffffff',
//     elevation: 3,
//   },
//   label: {
//     fontSize: 12,
//     marginBottom: 8,
//     color: '#000',
//     //fontWeight: '500'
//   },
//   inputBox: {
//     height: 55,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 14,
//     paddingHorizontal: 15,
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flexDirection: 'row',
//     backgroundColor: '#f9f9f9',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#000',
//   },
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
//     backgroundColor: '#d32f2f',
//     padding: 16,
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     marginHorizontal:10,
//     marginBottom: 10,
//     borderRadius: 10
//   },
//   closeText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: 'bold',
//   },
//   reviewStatus: {
//     paddingTop: 17,
//   },
//   field: {
//     height: 52,
//     borderWidth: 0.8,
//     borderColor: '#e7e7e7',
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     overflow: 'visible',
//   },
//   //   reviewStatus: {
//   //   marginTop: 14,
//   // },
//   // field: {
//   //   height: 55,
//   //   borderWidth: 1,
//   //   borderColor: '#d9d9d9',
//   //   borderRadius: 14,
//   //   backgroundColor: '#fff',
//   //   justifyContent: 'center',
//   // },
//   dropdown: {
//     flex: 1,
//     paddingHorizontal: 12,
//   },
//   dropdownContainer: {
//     borderRadius: 14,
//     // borderWidth: 1,
//     // borderColor: '#e2e2e2',
//     // marginTop: 2,
//     // overflow: 'hidden',
//     marginTop: -40,
//   },
//   searchInput: {
//     height: 48,
//     borderWidth: 0,
//     borderBottomWidth: 1,
//     borderBottomColor: '#cfcfcf',
//     marginHorizontal: 10,
//     fontSize: 14,
//     color: '#666',
//     backgroundColor: 'transparent',
//   },
//   itemText: {
//     fontSize: 14,
//     color: '#555',
//   },
//   placeholderText: {
//     fontSize: 14,
//     color: '#8c8c8c',
//   },
//   inputText: {
//     fontSize: 14,
//     color: '#222',
//   },
//   competitionWrap: { marginTop: 14 },
//   conditionalLabel: {
//     fontSize: 16,
//     color: '#111',
//     marginBottom: 8,
//     fontWeight: '500',
//   },
//   required: { color: 'red' },
//   // remarks: {
//   //   height: 100,
//   //   borderWidth: 1,
//   //   borderColor: '#ccc',
//   //   borderRadius: 14,
//   //   paddingHorizontal: 15,
//   //   justifyContent: 'space-between',
//   //   alignItems: 'center',
//   //   flexDirection: 'row',
//   //   backgroundColor: '#f9f9f9',
//   //   color: '#000'
//   // },

//   remarks: {
//     height: 100,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 14,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     backgroundColor: '#f9f9f9',
//     color: '#000',
//     fontSize: 14,
//   },
//   remarksWrap: {
//     position: 'relative',
//   },
//   micIcon: {
//     position: 'absolute',
//     right: 14,
//     bottom: 12,
//   },
//   // submitBtn : {
//   //   margin: 10,
//   //   padding: 10,
//   //   justifyContent: 'center',
//   //   paddingLeft: 22,
//   //   backgroundColor: 'red',
//   //   alignItems: 'center',
//   //   borderRadius: 10,
//   //   width: 125,
//   // },
//   // submitText : {
//   //   fontWeight:500,
//   //   justifyContent: 'center',
//   //   color: '#fff'
//   // }

//   submitBtn: {
//   marginTop: 12,
//   alignSelf: 'center',
//   height: 46,
//   minWidth: 145,
//   paddingHorizontal: 22,
//   borderRadius: 10,
//   backgroundColor: '#e30613',
//   justifyContent: 'center',
//   alignItems: 'center',
//   elevation: 2,
// },
// submitText: {
//   color: '#fff',
//   fontSize: 15,
//   fontWeight: '600',
// },

// });























import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { Dropdown } from 'react-native-element-dropdown';
import ReviewStatus from '../../utils/ReviewStatus.json';
import Voice from '@react-native-voice/voice';
import { PermissionsAndroid, Platform } from 'react-native';

const MAKE_OPTIONS = [
  { id: 1, name: 'Escorts' },
  { id: 2, name: 'Sonalika' },
];
const MODEL_OPTIONS = [
  { id: 1, name: 'PT 445 XL' },
  { id: 2, name: 'PT 434' } ,
];

const formatToDisplay = (value: string) => {
  const [y, m, d] = value.split('/');
  return `${d}/${m}/${y}`;
};

const AddFollowUpForm = ({allCustomerDetailData, allOwnedVehicleData, interestedModel}) => {
  const today = getFormatedDate(new Date(), 'YYYY/MM/DD');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [reviewStatus, setReviewStatus] = useState<number | null>(null);
  const [selectedMake, setSelectedMake] = useState<number | null>(null);
  const [selectedCompetitionModel, setSelectedCompetitionModel] = useState<
    number | null
  >(null);
  const [remarks, setRemarks] = useState('');
  const [listening, setListening] = useState(false);
  const [isVoiceAvailable, setIsVoiceAvailable] = useState(true);

  const newFieldToBeEnabled = ReviewStatus.find(r => reviewStatus === r.id);

  const handleSave = () => {
    const rewiewStatusName = ReviewStatus.find( r => r.id === reviewStatus)
    const selectedMakeName = MAKE_OPTIONS.find( m => m.id === selectedMake)
    const completionModelName = MODEL_OPTIONS.find( m => m.id === selectedCompetitionModel )
    
    console.log('allCustomerDetailData in add follow up form =========>>>>>>>> ',allCustomerDetailData);
    console.log('allOwnedVehicleData in add follow up form ========>>>>>>>> ',allOwnedVehicleData);
    console.log('selectedDate ====>>>>> ',selectedDate);
    console.log('rewiewStatusName ====>>>> ', rewiewStatusName?.value);
    console.log('selectedMakeName ====>>>> ', selectedMakeName?.name);
    console.log('completionModelName ====>>>> ', completionModelName?.name);
    console.log('remarks ====>>>> ', remarks);
    console.log('interestedModel in add follow up form  =====>>>> ', interestedModel);

    const missingFields = [];
    console.log('allCustomerDetailData?.customerName ====>>>> ',allCustomerDetailData?.customerName);

    if(!allCustomerDetailData?.customerName) missingFields.push('Customer Name')
    if(!allCustomerDetailData?.Mobile) missingFields.push('Mobile number')
    if(!allCustomerDetailData?.customerType) missingFields.push('Customer Type')
    if(!allCustomerDetailData?.Tehsil) missingFields.push('tehsil')
    if(!allCustomerDetailData?.village) missingFields.push('Village')
    if(!allCustomerDetailData?.paymentMode) missingFields.push('Payment Mode')

    if( allOwnedVehicleData.length === 0) missingFields.push('owned vehicle')  
    if(!selectedDate) missingFields.push('Date')
    if(!rewiewStatusName) missingFields.push('Review Status')
    if(!remarks) missingFields.push('Remarks')

    if(rewiewStatusName?.value === 'product-Customer interested in competition model') {
      if(!selectedMakeName?.name) missingFields.push('Make Name')
      if(!completionModelName?.name) missingFields.push('Model Name')
    }

    console.log('missingFields =====>>>>>>> ', missingFields);

    if(missingFields.length > 0) {
      Alert.alert("Missing Fields need to be filled ", `${missingFields}`)
      return;
    }

    Alert.alert("Success")
  }

  // Request microphone permission for Android
  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message: 'This app needs access to your microphone to recognize speech.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS doesn't need explicit permission request here
  };

  useEffect(() => {
    // Check if Voice is available
    if (!Voice) {
      console.log('Voice module is not available');
      setIsVoiceAvailable(false);
      return;
    }

    // Set up event listeners
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    // Clean up function
    return () => {
      if (Voice) {
        Voice.destroy().then(() => {
          Voice.removeAllListeners();
        }).catch(error => console.log('Error destroying Voice:', error));
      }
    };
  }, []); 

  const onSpeechStart = (e) => {
    console.log('on speech start ======>>>>> ',e);
    setListening(true);
  }

  const onSpeechEnd = (e) => {
    console.log('on speech end ======>>>>> ',e);
    setListening(false);
  }

  const onSpeechResults = (e) => {
    console.log('on speech result ======>>>>> ',e);
    console.log('results ======>>>>>> ', e.value);
    if (e.value && e.value.length > 0) {
      setRemarks(prevRemarks => {
        // Append new text or replace based on your requirement
        const newText = prevRemarks ? `${prevRemarks} ${e.value[0]}` : e.value[0];
        return newText;
      });
    }
    setListening(false);
  }

  const onSpeechError = (e) => {
    console.log('on speech error ======>>>>> ',e);
    setListening(false);
    Alert.alert('Speech Recognition Error', e.error?.message || 'An error occurred');
  }

  const startRecognizing = async () => {
    try {
      // Check if Voice is available
      if (!Voice) {
        Alert.alert('Error', 'Voice recognition is not available');
        return;
      }

      // Request permission for Android
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Microphone permission is required for voice input');
        return;
      }

      // Stop any ongoing recognition
      if (listening) {
        await Voice.stop();
      }

      // Check if Voice module is properly initialized
      const isAvailable = await Voice.isAvailable();
      if (!isAvailable) {
        Alert.alert('Error', 'Speech recognition is not available on this device');
        return;
      }

      // Start recognition
      setListening(true);
      await Voice.start('en-US');
    } catch (error) {
      console.log('error in start recognizing ====>>>> ',error);
      setListening(false);
      Alert.alert('Error', 'Failed to start speech recognition');
    }
  }

  const stopRecognizing = async () => {
    try {
      if (Voice && listening) {
        await Voice.stop();
      }
    } catch (error) {
      console.log('error in stop recognizing ====>>>> ',error);
    } finally {
      setListening(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>
          Expected Delivery Date <Text style={{ color: 'red' }}>*</Text>
        </Text>

        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setOpenCalendar(true)}
        >
          <Text style={styles.dateText}>
            {selectedDate ? formatToDisplay(selectedDate) : 'Select Date'}
          </Text>
          <Icon name="calendar-today" size={22} color="#555" />
        </TouchableOpacity>

        <Modal
          visible={openCalendar}
          transparent
          animationType="fade"
          onRequestClose={() => setOpenCalendar(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.calendarBox}>
              <DatePicker
                mode="calendar"
                isGregorian={true}
                minimumDate={today}
                selected={selectedDate}
                onSelectedChange={(date: string) => setSelectedDate(date)}
                onDateChange={(date: string) => setSelectedDate(date)}
                options={{
                  backgroundColor: '#fff',
                  textHeaderColor: '#d32f2f',
                  textDefaultColor: '#000',
                  selectedTextColor: '#fff',
                  mainColor: '#d32f2f',
                  textSecondaryColor: '#aaa',
                  borderColor: '#eee',
                }}
              />

              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setOpenCalendar(false)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={styles.reviewStatus}>
          <Text style={styles.label}>
            Review Status <Text style={{ color: 'red' }}>*</Text>
          </Text>
        </View>

        <View style={styles.field}>
          <Dropdown
            style={styles.dropdown}
            data={ReviewStatus}
            labelField="value"
            valueField="id"
            value={reviewStatus}
            onChange={item => setReviewStatus(item.id)}
            placeholder="Select status"
            search
            searchPlaceholder="Search"
            autoScroll={false}
            maxHeight={280}
            dropdownPosition="bottom"
            placeholderStyle={styles.placeholderText}
            selectedTextStyle={styles.inputText}
            itemTextStyle={styles.itemText}
            inputSearchStyle={styles.searchInput}
            activeColor="#efefef"
            containerStyle={styles.dropdownContainer}
          />
        </View>

        {newFieldToBeEnabled?.value ===
          'product-Customer interested in competition model' && (
          <View style={styles.competitionWrap}>
            <Text style={styles.label}>
              Make<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.field}>
              <Dropdown
                style={styles.dropdown}
                data={MAKE_OPTIONS}
                labelField="name"
                valueField="id"
                value={selectedMake}
                placeholder="Select Make"
                search
                searchPlaceholder="Search"
                onChange={item => setSelectedMake(item.id)}
                placeholderStyle={styles.placeholderText}
                selectedTextStyle={styles.inputText}
                itemTextStyle={styles.itemText}
                inputSearchStyle={styles.searchInput}
                containerStyle={styles.dropdownContainer}
              />
            </View>

            <Text style={[styles.label, { paddingTop: 10 }]}>
              Model<Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.field}>
              <Dropdown
                style={styles.dropdown}
                data={MODEL_OPTIONS}
                labelField="name"
                valueField="id"
                value={selectedCompetitionModel}
                placeholder="Select Model"
                search
                searchPlaceholder="Search"
                onChange={item => setSelectedCompetitionModel(item.id)}
                placeholderStyle={styles.placeholderText}
                selectedTextStyle={styles.inputText}
                itemTextStyle={styles.itemText}
                inputSearchStyle={styles.searchInput}
                containerStyle={styles.dropdownContainer}
              />
            </View>
          </View>
        )}

        <Text style={[styles.label, { paddingTop: 10 }]}>
          Next Follow-Up Date <Text style={{ color: 'red' }}>*</Text>
        </Text>

        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setOpenCalendar(true)}
        >
          <Text style={styles.dateText}>
            {selectedDate ? formatToDisplay(selectedDate) : 'Select Date'}
          </Text>
          <Icon name="calendar-today" size={22} color="#555" />
        </TouchableOpacity>

        <View>
          <Text style={[styles.label, { paddingTop: 10 }]}>
            Remarks <Text style={{ color: 'red' }}>*</Text>
          </Text>

          <View style={styles.remarksWrap}>
            <TextInput
              style={styles.remarks}
              multiline
              numberOfLines={4}
              placeholder="Add Remarks Here"
              placeholderTextColor="#8b8b8b"
              textAlignVertical="top"
              value={remarks}
              onChangeText={setRemarks}
            />

            <TouchableOpacity 
              onPressIn={startRecognizing}
              onPressOut={stopRecognizing}
              disabled={!isVoiceAvailable}
            >
              <Icon
                name="mic"
                size={24}
                color={listening ? '#e30613' : '#8b8b8b'}
                style={styles.micIcon}
              />
            </TouchableOpacity>

            {listening && (
              <Text style={styles.listeningText}>Listening... Speak now</Text>
            )}
          </View>
        </View>
      </View>
      
      <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
        <View style={styles.submitBtn}>
          <Text style={styles.submitText}>Save & Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddFollowUpForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  card: {
    borderWidth: 0.5,
    borderColor: '#c7c7c7',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#ffffff',
    elevation: 3,
  },
  label: {
    fontSize: 12,
    marginBottom: 8,
    color: '#000',
  },
  inputBox: {
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
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
    backgroundColor: '#d32f2f',
    padding: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal:10,
    marginBottom: 10,
    borderRadius: 10
  },
  closeText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  reviewStatus: {
    paddingTop: 17,
  },
  field: {
    height: 52,
    borderWidth: 0.8,
    borderColor: '#e7e7e7',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  dropdown: {
    flex: 1,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    borderRadius: 14,
    marginTop: -40,
  },
  searchInput: {
    height: 48,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    marginHorizontal: 10,
    fontSize: 14,
    color: '#666',
    backgroundColor: 'transparent',
  },
  itemText: {
    fontSize: 14,
    color: '#555',
  },
  placeholderText: {
    fontSize: 14,
    color: '#8c8c8c',
  },
  inputText: {
    fontSize: 14,
    color: '#222',
  },
  competitionWrap: { marginTop: 14 },
  conditionalLabel: {
    fontSize: 16,
    color: '#111',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: { color: 'red' },
  remarks: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
    color: '#000',
    fontSize: 14,
    paddingRight: 50, // Make room for mic icon
  },
  remarksWrap: {
    position: 'relative',
  },
  micIcon: {
    position: 'absolute',
    right: 14,
    bottom: 12,
  },
  listeningText: {
    position: 'absolute',
    bottom: -20,
    left: 15,
    fontSize: 12,
    color: '#e30613',
    fontStyle: 'italic',
  },
  submitBtn: {
    marginTop: 12,
    alignSelf: 'center',
    height: 46,
    minWidth: 50,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: '#e30613',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});