import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function Header({ title = "Product Guide", onBack }) {
  const navigation = useNavigation()

   const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
       */}
    
      <View style={styles.redBackground}>
        
        <View style={styles.safeArea}>

          <View style={styles.headerContent}>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={handleBack}
                style={styles.backBtn}
                activeOpacity={0.7}
              >
                <Icon name="arrow-back" size={24} color="#ffffff" />
              </TouchableOpacity>

              <Text style={styles.title}>{title}</Text>

             
              <View style={styles.spacer} />
            </View>
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5", 
  },
  redBackground: {
    backgroundColor: "#D32F2F", 
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingBottom: 4, 
    //paddingVertical: 10
  },
  safeArea: {
    backgroundColor: "#1a1a1a",
    borderBottomLeftRadius: 22, 
    borderBottomRightRadius: 22,
    padding:6,
    
  },
  headerContent: {
    backgroundColor: "#1a1a1a",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    height: 70, 
    justifyContent: 'center',
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
   // width: 80
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    flex: 1,
  },
  spacer: {
    width: 40,
  },
});






















