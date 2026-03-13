
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import hierarchy from '../../utils/rural_administration_hierarchy.json';

type Tehsil = {
  id: number;
  name: string;
  district: string;
  state: string;
  has_blocks: boolean;
};
type Block = { id: number; name: string; tehsil_id: number };
type Village = {
  id: number;
  name: string;
  block_id: number | null;
  admin_level: 'block' | 'tehsil';
};

const tehsils = hierarchy.tehsils as Tehsil[];
const blocks = hierarchy.blocks as Block[];
const villages = hierarchy.villages as Village[];

const CustomerDetailsForm = ({ownedTractor, setAllCustomerDetailData}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [tractorOwned, setTractorOwned] = useState('');

  const [selectedTehsilId, setSelectedTehsilId] = useState<number | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [selectedVillageId, setSelectedVillageId] = useState<number | null>(
    null,
  );

  const [selectedPaymentModeId, setSelectedPaymentModeId] = useState<
    number | null
  >(1);

  console.log('ownedTractor ====>>>> ', ownedTractor);

  const exchangeYes = ownedTractor.find(o => o.exchange === true)

  console.log('exchangeYes ====>>>>> ', exchangeYes);
  

  const customerType =
  ownedTractor.length === 0
    ? 'FTB'
    : exchangeYes === undefined
    ? 'Repeat'
    : 'Exchange';

//   const handleNameChange = (text: string) => {
//   const formatted = text
//     .toLowerCase()
//     .replace(/\b\w/g, (c) => c.toUpperCase()); // first letter of each word

//   setName(formatted);
// };

const handleNameChange = (text: string) => {
  const lettersOnly = text.replace(/[^a-zA-Z\s]/g, ''); 

  const formatted = lettersOnly
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());

  setName(formatted);
};



  const handleMobileChange = (text: string) => {
  
  let digits = text.replace(/\D/g, '');

  
  digits = digits.slice(0, 10);

  
  if (digits.length > 0 && !/^[6-9]/.test(digits)) {
    return; 
  }

  
  if (/(\d)\1{3}/.test(digits)) {
    return;
  }

  setMobile(digits);
};



  

  const paymentModeOptions = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Finance' },
  ];

  const selectedTehsil = useMemo(
    () => tehsils.find(t => t.id === selectedTehsilId) ?? null,
    [selectedTehsilId],
  );

  const blockOptions = useMemo(() => {
    if (!selectedTehsilId) return [];
    return blocks.filter(b => b.tehsil_id === selectedTehsilId);
  }, [selectedTehsilId]);

  // const villageOptions = useMemo(() => {
  //   if (!selectedTehsilId) return [];

    
  //   if (selectedTehsil?.has_blocks) {
  //     if (!selectedBlockId) return [];
  //     return villages.filter(
  //       v => v.admin_level === 'block' && v.block_id === selectedBlockId,
  //     );
  //   }

    
  //   return villages.filter(
  //     v => v.admin_level === 'tehsil' && v.tehsil_id === selectedTehsilId,
  //   );
  // }, [selectedTehsilId, selectedBlockId, selectedTehsil]);

  const villageOptions = useMemo(() => {
  if (!selectedTehsilId) return [];

  if (selectedTehsil?.has_blocks) {
   //blk not selectedd then show all village
    if (!selectedBlockId) {
      const blockIdsForTehsil = blocks
        .filter(b => b.tehsil_id === selectedTehsilId)
        .map(b => b.id);

      return villages.filter(
        v =>
          v.admin_level === 'block' &&
          v.block_id !== null &&
          blockIdsForTehsil.includes(v.block_id),
      );
    }

    // if blk selected show its villages
    return villages.filter(
      v => v.admin_level === 'block' && v.block_id === selectedBlockId,
    );
  }

  // tehsil without blks
  return villages.filter(
    v => v.admin_level === 'tehsil' && v.tehsil_id === selectedTehsilId,
  );
}, [selectedTehsilId, selectedBlockId, selectedTehsil]);


  console.log('selectedTehsil ====>>>> ', selectedTehsil);

  // const tehsilName  = selectedTehsil?.name;

  //console.log('tehsilName ====>>>> ', tehsilName);

  console.log('villageOptions ====>>>> ',villageOptions);

  console.log('selectedVillageId ====>>>>> ',selectedVillageId);
  
  // const selectedVillage = villageOptions?.find( v=> v.id === selectedVillageId)

  //console.log('selectedVillage ====>>>> ',selectedVillage);


  console.log('selectedPaymentModeId ====>>>> ',selectedPaymentModeId);
  
  // const paymentMode = paymentModeOptions.find( p => p.id === selectedPaymentModeId)


  //console.log('paymentMode ====>>>>> ', paymentMode);
  
  
  useEffect(()=> {
    const tehsilName  = selectedTehsil?.name;
    const selectedVillage = villageOptions?.find( v=> v.id === selectedVillageId)
    const paymentMode = paymentModeOptions.find( p => p.id === selectedPaymentModeId)

    setAllCustomerDetailData({
    customerName: name,
    Mobile: mobile,
    customerType: customerType,
    Tehsil: tehsilName,
    village: selectedVillage?.name,
    paymentMode: paymentMode?.name
  })
    
  },[name, mobile, customerType, selectedTehsilId, selectedVillageId, selectedPaymentModeId])
  

  


  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Customer Details</Text>
        <View style={styles.titleDivider} />

        <View style={styles.section}>
          <Label text="Customer Name" required />
          <InputField value={name} onChangeText={handleNameChange} />
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Label text="Mobile Number" required />
            <InputField
              value={mobile}
              onChangeText={handleMobileChange}
              keyboardType="number-pad"
              maxLength={10}
            />
          </View>
          <View style={styles.col}>
            <Label text="Customer Type" required />
           <Field value={customerType} muted />

            {/* {ownedTractor.length === 0 ?  <Field value="FTB" muted /> :  (exchangeYes === undefined ? <Field value="Exchange" muted /> : <Field value="Repeat" muted />)} */}
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Label text="Tehsil" required />
            <DropField
              data={tehsils}
              value={selectedTehsilId}
              placeholder=""
              onChange={item => {
                setSelectedTehsilId(item.id);
                setSelectedBlockId(null);
                setSelectedVillageId(null);
              }}
            />
          </View>

          <View style={styles.col}>
            <Label text="Block" />
            <DropField
              data={blockOptions}
              value={selectedBlockId}
              placeholder=""
              onChange={item => {
                setSelectedBlockId(item.id);
                setSelectedVillageId(null);
              }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            <Label text="Village" required />
            <DropField
              data={villageOptions}
              value={selectedVillageId}
              placeholder=""
              onChange={item => setSelectedVillageId(item.id)}
            />
          </View>

          <View style={styles.col}>
            <Label text="Tractor Owned" />
            <InputField
              style={styles.tractorOwned}
              value={tractorOwned}
              onChangeText={setTractorOwned}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* <View style={styles.singleCol}>
          <Label text="Payment Mode" required />
          <Field value="Cash" dropdown />
        </View> */}

        <View style={styles.singleCol}>
          <Label text="Payment Mode" required />
          <DropField
            data={paymentModeOptions}
            value={selectedPaymentModeId}
            placeholder=""
            onChange={item => setSelectedPaymentModeId(item.id)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const Label = ({
  text,
  required = false,
}: {
  text: string;
  required?: boolean;
}) => (
  <Text style={styles.label}>
    {text}
    {required ? <Text style={styles.required}> *</Text> : null}
  </Text>
);

const InputField = ({
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  style,
}: {
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'number-pad';
  maxLength?: number;
}) => (
  <View style={[styles.field, style]}>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={styles.inputText}
      placeholderTextColor="#8b8b8b"
      keyboardType={keyboardType}
      maxLength={maxLength}
    />
  </View>
);

const Field = ({
  value,
  dropdown = false,
  muted = false,
}: {
  value: string;
  dropdown?: boolean;
  muted?: boolean;
}) => (
  <View style={[styles.field, styles.staticField, muted && styles.fieldMuted]}>
    <Text style={styles.fieldText}>{value}</Text>
    {dropdown ? <Text style={styles.chevron}>⌄</Text> : null}
  </View>
);

const DropField = ({
  data,
  value,
  placeholder,
  onChange,
}: {
  data: Array<{ id: number; name: string }>;
  value: number | null;
  placeholder: string;
  onChange: (item: { id: number; name: string }) => void;
}) => (
  <View style={styles.field}>
    <Dropdown
      style={styles.dropdown}
      data={data}
      labelField="name"
      valueField="id"
      itemTextStyle={styles.itemText}
      value={value}
      placeholder={placeholder}
      search
      searchPlaceholder="Search"
      inputSearchStyle={styles.searchInput}
      autoScroll={false}
      maxHeight={260}
      dropdownPosition="bottom"
      placeholderStyle={styles.placeholderText}
      selectedTextStyle={styles.inputText}
      // itemTextStyle={styles.dropdownItemText}
      activeColor="#efefef"
      containerStyle={styles.dropdownContainer}
      //   inputSearchStyle={styles.dropdownSearchInput}
      //   iconStyle={styles.iconStyle}
      onChange={onChange}
    />
  </View>
);

export default CustomerDetailsForm;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  card: {
    borderWidth: 1,
    borderColor: '#d87a94',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
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
  section: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  col: {
    width: '47.5%',
  },
  singleCol: {
    width: '47.5%',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: '#7c7c7c',
    marginBottom: 6,
    fontWeight: '400',
  },
  required: {
    color: '#d30022',
    fontWeight: '700',
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
  fieldMuted: {
    backgroundColor: '#d0d0d0',
  },
  fieldText: {
    fontSize: 13,
    color: '#111',
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: '#111',
    paddingVertical: 0,
    paddingLeft: 12,
  },
  dropdown: {
    flex: 1,
    //marginBottom :10
    //paddingBottom: 10
    //backgroundColor : 'green'
    paddingRight: 10,
  },
  placeholderText: {
    color: '#8b8b8b',
    fontSize: 13,
  },
  iconStyle: {
    width: 18,
    height: 18,
  },
  chevron: {
    fontSize: 22,
    color: '#7d7d7d',
    lineHeight: 22,
    marginTop: -1,
    marginLeft: 8,
  },
  dropdownContainer: {
    borderRadius: 10,
    // borderColor: '#d8d8d8',
    // borderWidth: 1,
    // overflow: 'hidden',
    // width: '30%'
    marginTop: -40,
    //width: 52
  },
  dropdownSearchInput: {
    height: 48,
    fontSize: 16,
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    // marginHorizontal: 10,
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  searchInput: {
    height: 46,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cfcfcf',
    marginHorizontal: 10,
    fontSize: 16,
    color: '#555',
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#4a4a4a',
    fontSize: 14,
  },

  staticField: {
    paddingHorizontal: 12,
  },

  tractorOwned: {
    backgroundColor: '#d0d0d0',
  },
});
