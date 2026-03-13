
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import FormCompletionHeader from '../components/Follow Up/FormCompletionHeader';
import CustomerDetailsForm from '../components/Follow Up/CustomerDetailsForm';
import AddFollowUpForm from '../components/Follow Up/AddFollowUpForm';
import InterestedModel from '../components/Follow Up/InterestedModel';
import OwnedTractor from '../components/Follow Up/OwnedTractor';

const EnquiryFollowUpScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ownedTractor, setOwnedTractor] = useState<any[]>([]);

  const [allCustomerDetailData, setAllCustomerDetailData] = useState([]);
  const [allOwnedVehicleData, setAllOwnedVehicleData] = useState([]);

  const [interestedModel, setInterestedModel] = useState([]);


  

 return (
  <View style={styles.container}>
    <Header title="Enquiry Follow Up" />

    <FormCompletionHeader
      currentStep={currentStep}
      onNext={() => setCurrentStep(prev => prev + 1)}
      onPrev={() => setCurrentStep(prev => prev - 1)}
    />

    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {currentStep === 0 && (
        <>
          <CustomerDetailsForm  ownedTractor={ownedTractor} setAllCustomerDetailData={setAllCustomerDetailData} />
          <InterestedModel setInterestedModel={setInterestedModel}/>
            <OwnedTractor  setOwnedTractor={setOwnedTractor} setAllOwnedVehicleData={setAllOwnedVehicleData} />
        </>
      )}

      {currentStep === 1 && <AddFollowUpForm allCustomerDetailData={allCustomerDetailData} allOwnedVehicleData={allOwnedVehicleData} interestedModel={interestedModel}/>}

    
    </ScrollView>

  </View>
);
}

export default EnquiryFollowUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
