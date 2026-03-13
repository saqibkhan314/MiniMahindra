import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAKE_OPTIONS, MODEL_OPTIONS } from './OwnedTractorModal'; // Import these

 const EXCHANGE_MODES = [
    { id: 1, name: 'Sold Outside' },
    { id: 2, name: 'Exchange by Dealer' },
  ];

type ExchangeDetailsProps = {
  tractors: any[];
  exchangeHistory: any[];
  visible: boolean;
  onSelectExchangeModel: (modelId: number) => void;
};

const ExchangeDetails = ({
  tractors,
  exchangeHistory,
  visible,
  onSelectExchangeModel,
}: ExchangeDetailsProps) => {
  const [selectedExchangeModel, setSelectedExchangeModel] =
    useState(null);
  const [exchangeMode, setExchangeMode] = useState(1); 

  const [customerPrice, setCustomerPrice] = useState('');
const [marketPrice, setMarketPrice] = useState('');

const onlyDigits = (text: string) => text.replace(/\D/g, ''); 

  const currentExchange = tractors.find(t => t.exchange === true);

  const currentExchangeLabel = currentExchange
    ? exchangeHistory.find(h => h.modelId === currentExchange.modelId)?.name
    : null;

  useEffect(() => {
    if (currentExchange) {
      setSelectedExchangeModel(currentExchange.modelId);
    }
  }, [currentExchange]);

  if (!visible) return null;

  
  const exchangeTractors = tractors.filter(t => t.exchange === true);

  if (exchangeTractors.length === 0) return null;

  
  const exchangeModelItems = exchangeTractors
    .map(tractor => {
      const make = MAKE_OPTIONS.find(m => m.id === tractor.makeId);
      const model = MODEL_OPTIONS.find(m => m.id === tractor.modelId);

      if (make && model) {
        return {
          id: tractor.modelId,
          name: `${make.name} - ${model.name}`,
          makeId: tractor.makeId,
          modelId: tractor.modelId,
          uniqueKey: `${tractor.makeId}-${tractor.modelId}-${Date.now()}`, // Ensures uniqueness
        };
      }
      return null;
    })
    .filter(item => item !== null);


    console.log('exchangeMode =====>>>> ', exchangeMode);

    const exchangeModeValue = EXCHANGE_MODES.find(e => e.id === exchangeMode)
    
    console.log('exchangeModeValue ====>>>> ', exchangeModeValue?.name);
    

 

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Exchange Details</Text>
      <View style={styles.titleDivider} />

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Exchange Model *</Text>
          <Dropdown
            style={styles.dropdown}
            // data={exchangeModelItems}
            data={exchangeHistory}
            labelField="name"
            valueField="id"
            placeholder={currentExchangeLabel}
            value={selectedExchangeModel}
            //onChange={(item) => setSelectedExchangeModel(item.id)}
            onChange={item => {
              setSelectedExchangeModel(item.id);
              onSelectExchangeModel(item.modelId);
            }}
          />
        </View>

        <View style={[styles.col, { paddingBottom: 10 }]}>
          <Text style={styles.label}>Exchange Mode *</Text>
          <Dropdown
            style={styles.dropdown}
            data={EXCHANGE_MODES}
            labelField="name"
            valueField="id"
            placeholder="Select"
            value={exchangeMode}
            onChange={item => setExchangeMode(item.id)}
          />
        </View>
      </View>
      {exchangeModeValue?.name === 'Exchange by Dealer' ? 
       <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Customer Price *</Text>
          <TextInput 
          style={styles.textInput} 
          placeholder='₹' 
          placeholderTextColor='#9a9a9a' 
          keyboardType='number-pad' 
          maxLength={7}
          value={customerPrice}
         onChangeText={(text) => setCustomerPrice(onlyDigits(text))}
          />
        </View>
         <View style={styles.col}>
          <Text style={styles.label}>Market Price *</Text>
          <TextInput 
          style={styles.textInput}   
          placeholder='₹' 
          placeholderTextColor='#9a9a9a' 
          maxLength={7}
          value={marketPrice}
          onChangeText={(text) => setMarketPrice(onlyDigits(text))}
          />
        </View>

      </View>
       : null}
      
    </View>
  );
};

export default ExchangeDetails;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#d87a94',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginBottom: 10,
  },
  titleDivider: {
    height: 1,
    backgroundColor: '#3d3d3d',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 6,
  },
  col: {
    width: '48%',
    paddingTop: 6,
  },
  label: {
    fontSize: 13,
    color: '#777',
    marginBottom: 4,
  },
  dropdown: {
    height: 44,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  selectedTractorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  tractorList: {
    marginTop: 10,
    paddingHorizontal: 4,
  },
  tractorListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  tractorListItemText: {
    fontSize: 12,
    color: '#444',
    marginLeft: 8,
  },
  textInput: {
     height: 44,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000'
  }
});
