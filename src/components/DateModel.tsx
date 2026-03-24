// import React, { useEffect, useRef } from 'react';
// import {
//   Modal,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
// } from 'react-native';
// import DatePicker from 'react-native-modern-datepicker';

// const RED = '#E8192C';

// const DateModel = ({
//   visible,
//   onClose,
//   onDateChange,
//   simpleDate = false,
//   expectedDate = false,
//  monthYearChange
// }: {
//   visible: boolean;
//   onClose: () => void;
//   onDateChange: (date: string) => void;
//   simpleDate?: boolean;
//   expectedDate?: boolean;
//   monthYearChange: (date: string) => void
// }) => {
//   const scaleAnim = useRef(new Animated.Value(0.8)).current;
//   const opacityAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (visible) {
//       Animated.parallel([
//         Animated.timing(scaleAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//         Animated.timing(opacityAnim, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     } else {
//       scaleAnim.setValue(0.8);
//       opacityAnim.setValue(0);
//     }
//   }, [visible]);

//   const formatDate = (date: Date) => date.toISOString().split('T')[0];

//   const today = new Date();
//   let minimumDate: string | undefined = formatDate(today);
//   let maximumDate: string | undefined = formatDate(today);

//   if (simpleDate) {
//     minimumDate = undefined;
//     maximumDate = undefined;
//   } else if (expectedDate) {
//     minimumDate = formatDate(today);
//     maximumDate = undefined;
//   }

//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View style={styles.modalContainer}>
//         <Animated.View
//           style={[
//             styles.modalContent,
//             {
//               transform: [{ scale: scaleAnim }],
//               opacity: opacityAnim,
//             },
//           ]}
//         >
//           <DatePicker
//             mode="calendar"
//             isGregorian={true}
//             onDateChange={onDateChange}
//             onMonthYearChange={monthYearChange}
//             minimumDate={minimumDate}
//             maximumDate={maximumDate}
//             options={{
//               backgroundColor: '#fff',
//               textHeaderColor: RED,
//               textDefaultColor: '#333',
//               selectedTextColor: '#fff',
//               mainColor: RED,
//               textSecondaryColor: '#888',
//               borderColor: '#eee',
//               textFontSize: 13,
//             }}
//           />
//           <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     elevation: 5,
//   },
//   closeButton: {
//     marginTop: 0,
//     backgroundColor: RED,
//     paddingVertical: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// export default DateModel;






















import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

const RED = '#E8192C';

const DateModel = ({
  visible,
  onClose,
  onDateChange,
  simpleDate = false,
  expectedDate = false,
  monthYearChange,
}: {
  visible: boolean;
  onClose: () => void;
  onDateChange: (date: string) => void;
  simpleDate?: boolean;
  expectedDate?: boolean;
  monthYearChange?: (date: string) => void;
}) => {

  console.log('DateModel visible:', visible);
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // For smooth month transition
  const calendarOpacity = useRef(new Animated.Value(1)).current;
  const calendarTranslateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {

     calendarOpacity.setValue(1);
    calendarTranslateX.setValue(0);

    if (visible) {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.8);
      opacityAnim.setValue(0);

      calendarOpacity.setValue(1);
    calendarTranslateX.setValue(0);
    }
  }, [visible]);

  const handleMonthYearChange = (monthYear: string) => {
    // Slide out
    Animated.parallel([
      Animated.timing(calendarOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(calendarTranslateX, {
        toValue: -30,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset position to right side
      calendarTranslateX.setValue(30);
      // Slide in
      Animated.parallel([
        Animated.timing(calendarOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(calendarTranslateX, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    });

    // Call parent handler if provided
    if (monthYearChange) monthYearChange(monthYear);
  };

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const today = new Date();
  let minimumDate: string | undefined = formatDate(today);
  let maximumDate: string | undefined = formatDate(today);

  if (simpleDate) {
    minimumDate = undefined;
    maximumDate = undefined;
  } else if (expectedDate) {
    minimumDate = formatDate(today);
    maximumDate = undefined;
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          {/* Smooth slide animation wrapper */}
          <Animated.View
            style={{
              opacity: calendarOpacity,
              transform: [{ translateX: calendarTranslateX }],
            }}
          >
            <DatePicker
              mode="calendar"
              isGregorian={true}
              onDateChange={onDateChange}
              onMonthYearChange={handleMonthYearChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              options={{
                backgroundColor: '#fff',
                textHeaderColor: RED,
                textDefaultColor: '#333',
                selectedTextColor: '#fff',
                mainColor: RED,
                textSecondaryColor: '#888',
                borderColor: '#eee',
                textFontSize: 13,
              }}
            />
          </Animated.View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    marginTop: 8,
    backgroundColor: RED,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default DateModel;