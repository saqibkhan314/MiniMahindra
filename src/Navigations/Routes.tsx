import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import TractorsDetailScreen from '../screens/TractorsDetailScreen';
import ProductGuide from '../screens/ProductGuideScreen';
import CompareVariantsScreen from '../screens/CompareVariantsScreen';
import EnquiryFollowUpScreen from '../screens/EnquiryFollowUpScreen';
import DealerAndAccountScreen from '../screens/DealerAndAccountScreen';

const Routes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProductGuide" component={ProductGuide} />
        <Stack.Screen name="TractorDetails" component={TractorsDetailScreen} />
        <Stack.Screen name="CompareVariants" component={CompareVariantsScreen} />
        <Stack.Screen name="EnquiryFollowUp" component={EnquiryFollowUpScreen} />
        <Stack.Screen name="DealerAndAccount" component={DealerAndAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
