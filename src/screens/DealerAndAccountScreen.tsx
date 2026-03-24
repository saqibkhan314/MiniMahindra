// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import Header from '../components/Header'
// import CompletionHeader from '../components/DealerAndCustomer/CompletionHeader'
// import DealerAccountSummaryForm from '../components/DealerAndCustomer/DealerDetails/DealerAccountSummaryForm'
// import DealerAddressInformationForm from '../components/DealerAndCustomer/DealerDetails/DealerAddressInformationForm'
// import DealerAccountInformationForm from '../components/DealerAndCustomer/DealerDetails/DealerAccountInformationForm'

// const DealerAndAccountScreen = () => {
//      const [currentStep, setCurrentStep] = useState(0);

//      const [formToSelect, setFormToSelect] = useState()

//   return (
//     <View style={styles.container}>
//       <Header title='Dealer and Customer'/>

//     <CompletionHeader
//           currentStep={currentStep}
//       onNext={() => setCurrentStep(prev => prev + 1)}
//       onPrev={() => setCurrentStep(prev => prev - 1)}
//     />

//      <ScrollView
//           showsVerticalScrollIndicator={false}
//           contentContainerStyle={{ paddingBottom: 40 }}
//         >
//           {currentStep === 0 && <DealerAccountInformationForm/>}

//           {currentStep === 1 && <DealerAccountSummaryForm />}
//           {currentStep === 2 && <DealerAddressInformationForm  />}

//         </ScrollView>

//     </View>
//   )
// }

// export default DealerAndAccountScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff'
//     }
// })

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from '../components/Header';
import CompletionHeader from '../components/DealerAndCustomer/CompletionHeader';
import DealerAccountSummaryForm from '../components/DealerAndCustomer/DealerDetails/DealerAccountSummaryForm';
import DealerAddressInformationForm from '../components/DealerAndCustomer/DealerDetails/DealerAddressInformationForm';
import DealerAccountInformationForm from '../components/DealerAndCustomer/DealerDetails/DealerAccountInformationForm';
import CustomerAccountInformationForm from '../components/DealerAndCustomer/CustomerDetails/CustomerAccountInformationForm';
import CustomerAddressInformationForm from '../components/DealerAndCustomer/CustomerDetails/CustomerAddressInformationForm';
import CustomerAccountSummaryForm from '../components/DealerAndCustomer/CustomerDetails/CustomerAccountSummaryForm';
import CallFollowUpForm from '../components/DealerAndCustomer/CallFollowUp/CallFollowUpForm';
import GeneralInformationForm from '../components/DealerAndCustomer/Call/GeneralInformationForm';
import CallStatusForm from '../components/DealerAndCustomer/Call/CallStatusForm';

type FormType = 'dealer' | 'customer' | 'CallFollowUp' | 'Call';

const DEALER_STEPS = [
  { label: 'Account Info' },
  { label: 'Account Summary' },
  { label: 'Address Info' },
];

const CUSTOMER_STEPS = [
  { label: 'Account Info' },
  { label: 'Account Summary' },
  { label: 'Address Info' },
];

const CALL_STEPS = [{ label: 'General Info' }, { label: 'Contact Status' }];

const DealerAndAccountScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formType, setFormType] = useState<FormType>('dealer');
  const [openCalendar, setOpenCalendar] = useState<
    'callDate' | 'nextFollowUp' | null
  >(null);
  const [callForm, setCallForm] = useState({
    entity: '--None--',
    title: '--None--',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    street: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',

    source: '--None--',
    primaryApplication: '--None--',
    contacted: '--None--',
    nextFollowUp: '',
    callDate: '',
    secondaryApplication: '--None--',
    customerStatus: '--None--',
    remarks: '',
  });

  const [dealerForm, setDealerForm] = useState({
    accountName: '',
    dealerCode: '',
    category: '--None--',
    panNumber: '',
    phone: '',
    isMetro: false,
    tcsApplicable: false,
    zone: '--None--',
    addressId: '',
    status: '--None--',
    email: '',
    warehouseCode: '',
    otherServiceCode: '',
    financerScope: '--None--',
    gstNumber: '',
    emailId: '',
    registrationDate: '',
    supplierCode: '',
    registrationNumber: '',
    isB2B: false,

    customerAdditionalDetails: '',
    relatedTo: '',

    addressSearch: '',
    billingStreet: '',
    billingCity: '',
    billingZip: '',
    billingState: '',
    billingCountry: '',
    town: '',
    shippingAddressSearch: '',
    shippingStreet: '',
    shippingCity: '',
    shippingZip: '',
    shippingState: '',
    shippingCountry: '',
  });

  const [customerForm, setCustomerForm] = useState({
    accountName: '',
    accountType: '--None--',
    type: '--None--',
    website: '',
    description: '',
    dealerLocationCode: '',
    quotationType: '--None--',
    presentKM: '',
    remarks: '',
    town: '',
    cityTier: false,
    status: '--None--',
    dealerName: '',
    category: '--None--',
    headlamp: '',
    locationArea: '--None--',
    isMetro: false,
    zone: '--None--',
    addressId: '',
    supplierCode: '',
    tcsApplicable: false,
    isB2B: false,
    warehouseCode: '',
    otherServiceCode: '',
    financerScope: '--None--',
    phone: '',
    industry: '--None--',
    employees: '',
    emailId: '',
    salesPersonName: '',
    registrationDate: '',
    bank: '',
    branch: '',
    ifscCode: '',
    bankAccountNo: '',
    passportNumberOfProposer: '',
    drivingLicenseNo: '',
    dob: '',
    nregaJobIdNumber: '',
    voterId: '',
    incorporationDate: '',
    registrationNumber: '',
    aadhaarNumber: '',
    panCardNumber: '',
    gstNumber: '',
    einvoiceUsername: '',
    einvoicePassword: '',
    email: '',

    customerAdditionalDetails: '',
    relatedTo: '',

    addressSearch: '',
    billingStreet: '',
    billingCity: '',
    billingZip: '',
    billingState: '',
    billingCountry: '',
    shippingAddressSearch: '',
    shippingStreet: '',
    shippingCity: '',
    shippingZip: '',
    shippingState: '',
    shippingCountry: '',
  });

  console.log('customerForm =====>>>>> ', customerForm);

  // console.log('dealerForm =====>>>>> ',dealerForm);

  // const updateCallForm = (key: keyof typeof callForm, value: string) => {
  //   setCallForm(prev => ({ ...prev, [key]: value }));
  // };

  const updateCallForm = useCallback(
    (key: keyof typeof callForm, value: string) => {
      setCallForm(prev => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSave = () => {
    const requiredFields = [
      'entity',
      'title',
      'firstName',
      'lastName',
      'mobileNumber',
      'street',
      'city',
      'postalCode',
      'state',
      'country',
      'source',
      'contacted',
    ];

    console.log('callForm in save ====>>>>> ',callForm);
    

    const missingFields = requiredFields.filter(
      field => !callForm[field] || callForm[field] === '--None--',
    );

    // if (missingFields.length > 0) {
    //   alert(`Please fill required fields: ${missingFields.join(', ')}`);
    //   return;
    // }
  };

  const handleDealerSave = () => {
    const requiredFields = ['accountName'];

    const missingFields = requiredFields.filter(field => !dealerForm[field]);

    console.log('dealerForm  =====>>>>> ', dealerForm);
  };


  const handleCustomerSave = () => {
    const requiredFields = ['accountName'];

    const missingFields = requiredFields.filter(field => !customerForm[field]);

    console.log('customerform  saved =====>>>>> ', customerForm);
  };

  const steps =
    formType === 'Call'
      ? CALL_STEPS
      : formType === 'customer'
      ? CUSTOMER_STEPS
      : DEALER_STEPS;

  const handleTabSwitch = (type: FormType) => {
    setFormType(type);
    setCurrentStep(0);
  };

  const renderDealerForms = () => (
    <>
      {currentStep === 0 && (
        <DealerAccountInformationForm
          setDealerForm={setDealerForm}
          dealerForm={dealerForm}
        />
      )}
      {currentStep === 1 && (
        <DealerAccountSummaryForm
          setDealerForm={setDealerForm}
          dealerForm={dealerForm}
        />
      )}
      {currentStep === 2 && (
        <DealerAddressInformationForm
          setDealerForm={setDealerForm}
          dealerForm={dealerForm}
          onSave={handleDealerSave}
        />
      )}

      {/* {currentStep === 2 && (
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )} */}
    </>
  );

  const renderCustomerForms = () => (
    <>
      {currentStep === 0 && (
        <CustomerAccountInformationForm
          customerForm={customerForm}
          setCustomerForm={setCustomerForm}
        />
      )}
      {currentStep === 1 && (
        <CustomerAccountSummaryForm
          customerForm={customerForm}
          setCustomerForm={setCustomerForm}
        />
      )}
      {currentStep === 2 && (
        <CustomerAddressInformationForm
          customerForm={customerForm}
          setCustomerForm={setCustomerForm}
          onSave={handleCustomerSave}
        />
      )}
    </>
  );

  const renderCallFollowUpForm = () => <CallFollowUpForm />;
  const renderCallForm = () => (
    <>
      {currentStep === 0 && (
        <GeneralInformationForm form={callForm} update={updateCallForm} />
      )}
      {currentStep === 1 && (
        <CallStatusForm
          form={callForm}
          setCallForm={setCallForm}
          openCalendar={openCalendar}
          setOpenCalendar={setOpenCalendar}
          onSave={handleSave}
        />
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <Header title="Dealer and Customer" />

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, formType === 'dealer' && styles.activeTab]}
          onPress={() => handleTabSwitch('dealer')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'dealer' && styles.activeTabText,
            ]}
          >
            Dealer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, formType === 'customer' && styles.activeTab]}
          onPress={() => handleTabSwitch('customer')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'customer' && styles.activeTabText,
            ]}
          >
            Customer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, formType === 'CallFollowUp' && styles.activeTab]}
          onPress={() => handleTabSwitch('CallFollowUp')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'CallFollowUp' && styles.activeTabText,
            ]}
          >
            Call Follow up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, formType === 'Call' && styles.activeTab]}
          onPress={() => handleTabSwitch('Call')}
        >
          <Text
            style={[
              styles.tabText,
              formType === 'Call' && styles.activeTabText,
            ]}
          >
            Call
          </Text>
        </TouchableOpacity>
      </View>

      {formType !== 'CallFollowUp' ? (
        <CompletionHeader
          steps={steps}
          currentStep={currentStep}
          onNext={() => setCurrentStep(prev => prev + 1)}
          onPrev={() => setCurrentStep(prev => prev - 1)}
        />
      ) : null}

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      > */}
        {formType === 'dealer' && renderDealerForms()}
        {formType === 'customer' && renderCustomerForms()}
        {formType === 'CallFollowUp' && renderCallFollowUpForm()}
        {formType === 'Call' && renderCallForm()}
      {/* </ScrollView> */}
    </View>
  );
};

export default DealerAndAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#1976D2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#757575',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  saveButton: {
    backgroundColor: '#E8192C',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 12
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
