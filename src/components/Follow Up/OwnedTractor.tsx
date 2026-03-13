import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OwnedTractorModal from './OwnedTractorModal';
import {MAKE_OPTIONS, MODEL_OPTIONS, YEAR_OPTIONS} from './OwnedTractorModal.tsx'
import { Dropdown } from 'react-native-element-dropdown';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-paper';
import ExchangeDetails from './ExchangeDetails.tsx';

// type Tractor = {
//   makeId: number;
//   makeName: string;
//   modelId: number;
//   modelName: string;
//   year: number;
// };
type Tractor = {
  makeId: number | null;
  modelId: number | null;
  year: number | null;
  exchange: boolean | null;
};

const OwnedTractor = ({setOwnedTractor, setAllOwnedVehicleData}) => {
  const [showOwnedTractorModal, setOwnedTractorModal] = useState(false);
  //const [tractors, setTractors] = useState([]);
 const [tractors, setTractors] = useState<Tractor[]>([]);
 const [exchangeHistory, setExchangeHistory] = useState<any[]>([]);

//  const [tractors, setTractors] = useState<Tractor[]>([
//   { makeId: null, modelId: null, year: null, exchange: null  }
// ]);


  console.log('tractors in owned tractors =====>>>>>> ', tractors);
  setOwnedTractor(tractors);
  console.log('showOwnedTractorModal in owned tractors =====>>>>>> ', showOwnedTractorModal);
  console.log('exchangeHistory in owned tractors =====>>>>>> ', exchangeHistory);
  


const updateTractor = (index: number, field: string, value: any) => {
  setTractors(prev =>
    prev.map((tractor, i) => {
      if (field === 'exchange' && value === true) {

      
        const selected = prev[index];

        const make = MAKE_OPTIONS.find(m => m.id === selected.makeId);
        const model = MODEL_OPTIONS.find(m => m.id === selected.modelId);

        if (make && model) {
          setExchangeHistory(history => {
            const exists = history.some(
              h => h.modelId === model.id
            );
            if (exists) return history;

            return [
              ...history,
              {
                id: model.id,
                name: `${make.name} - ${model.name}`,
                makeId: make.id,
                modelId: model.id
              }
            ];
          });
        }

        return {
          ...tractor,
          exchange: i === index, // only one YES
        };
      }

      if (i === index) {
        return {
          ...tractor,
          [field]: value,
          ...(field === 'makeId' ? { modelId: null } : {}),
        };
      }

      return tractor;
    })
  );
};
const removeTractor = (index: number) => {
  setTractors(prev => prev.filter((_, i) => i !== index));
};

  const handleSaveTractor = (tractor) => {
    const newTractor = { ...tractor, exchange: false };
  setTractors(prev => [...prev, newTractor]);
};


const handleSelectExchangeModel = (modelId: number) => {
  setTractors(prev =>
    prev.map(t => ({
      ...t,
      exchange: t.modelId === modelId, // only selected true
    }))
  );
};

const showTractorFields =
  tractors.length > 0 &&
  tractors.some(
    t =>
      t.makeId !== null ||
      t.modelId !== null ||
      t.year !== null ||
      t.exchange !== null
  );

  const hasExchangeYes = tractors.some(t => t.exchange === true);


  useEffect(() => {
  setAllOwnedVehicleData(tractors);
}, [tractors]);


  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>Owned Vehicles</Text>
        <View style={styles.titleDivider} />

       



          {showTractorFields && tractors.map((tractor, index) => {
  const filteredModels = MODEL_OPTIONS.filter(
    m => m.makeId === tractor.makeId
  );

  return ( 
    <View key={index} style={styles.tractorBlock}>

      
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Make <Text style={styles.required}> *</Text></Text>
          <View style={styles.field}>
          <Dropdown
            style={styles.dropdown}
            data={MAKE_OPTIONS}
            labelField="name"
            valueField="id"
            value={tractor.makeId}
            placeholder="Select"
            onChange={(item) =>
              updateTractor(index, 'makeId', item.id)
            }
          containerStyle={styles.dropdownContainer}
            search
           searchPlaceholder="Search"
          inputSearchStyle={styles.searchInput}
           placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.selectedText}
          />
          </View>
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Model <Text style={styles.required}> *</Text></Text>
          <Dropdown
            style={styles.dropdown}
            data={filteredModels}
            labelField="name"
            valueField="id"
            value={tractor.modelId}
            placeholder="Select"
            disable={!tractor.makeId}
            onChange={(item) =>
              updateTractor(index, 'modelId', item.id)
            }
            containerStyle={styles.dropdownContainer}
            search
           searchPlaceholder="Search"
          inputSearchStyle={styles.searchInput}
           placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.selectedText}
          />
        </View>
      </View>

      
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Year <Text style={styles.required}> *</Text></Text>
          <Dropdown
            style={styles.dropdown}
            data={YEAR_OPTIONS}
            labelField="name"
            valueField="id"
            value={tractor.year}
            placeholder="Select"
            onChange={(item) =>
              updateTractor(index, 'year', item.id)
            }
            containerStyle={styles.dropdownContainer}
            search
           searchPlaceholder="Search"
          inputSearchStyle={styles.searchInput}
           placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.selectedText}
          />
        </View>

        <View style={styles.col}>
          <Text style={styles.label}>Exchange</Text>


          <View style={styles.radioRow}>

  
  <TouchableOpacity
    style={styles.radioItem}
    onPress={() => updateTractor(index, 'exchange', true)}
  >
    <RadioButton
      value="yes"
      status={tractor.exchange === true ? 'checked' : 'unchecked'}
      onPress={() => updateTractor(index, 'exchange', true)}
      color="#ff1900"
    />
    <Text>Yes</Text>
  </TouchableOpacity>

 
  <TouchableOpacity
    style={styles.radioItem}
    onPress={() => updateTractor(index, 'exchange', false)}
  >
    <RadioButton
      value="no"
      status={tractor.exchange === false ? 'checked' : 'unchecked'}
      onPress={() => updateTractor(index, 'exchange', false)}
      color="#ff1900"
    />
    <Text>No</Text>
  </TouchableOpacity>

</View>
        </View>
      </View>

      
      <TouchableOpacity style={{alignSelf:'flex-start'}} onPress={() => removeTractor(index)}>
        <Text style={styles.remove}>
          Remove Tractor <MaterialCommunityIcons name="trash-can-outline" color="#fc0000" size={17} />
        </Text>
      </TouchableOpacity>

      <View style={styles.divider}/>
    </View>
  );
})}

        <View style={styles.addBtnRow}>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={() => setOwnedTractorModal(true)}
          >
            <Text style={styles.addBtnText}>Add Tractor</Text>
          </TouchableOpacity>
        </View>
      </View>



       {/* <ExchangeDetails 
        tractors={tractors} 
        visible={hasExchangeYes} 
      /> */}

      <ExchangeDetails 
  tractors={tractors}
  exchangeHistory={exchangeHistory}
  visible={hasExchangeYes}
  onSelectExchangeModel={handleSelectExchangeModel}
/>
      
       <OwnedTractorModal
        visible={showOwnedTractorModal}
        onClose={() => setOwnedTractorModal(false)}
        onSave={handleSaveTractor}
      />
      
      
    </>
  );
};

export default OwnedTractor;

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
  addBtnRow: {
    alignItems: 'flex-end',
    marginTop: 5,
    marginBottom: 5,
  },
  addBtn: {
    minWidth: 100,
    height: 40,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#f0063c',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  addBtnText: {
    color: '#f0063c',
    fontSize: 13,
    fontWeight: '600',
  },
  tractorRow: {
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
  paddingVertical: 10,
},

tractorText: {
  fontSize: 14,
  color: '#333',
},


tractorBlock: {
  marginBottom: 10,
},

row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: 6
},

col: {
  width: '48%',
  paddingTop: 6
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

radioRow: {
  flexDirection: 'row',
  //marginTop: 8,
},

radioItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20,
  paddingBottom: 5
},

radioCircle: {
  width: 18,
  height: 18,
  borderRadius: 9,
  borderWidth: 2,
  borderColor: '#999',
  marginRight: 6,
},

radioSelected: {
  borderColor: '#e30b2c',
  backgroundColor: '#e30b2c',
},

remove: {
  color: '#e30b2c',
  marginTop: 10,
  fontWeight: '500',

},

divider: {
  height: 1,
  backgroundColor: '#b1abab',
  marginTop: 14,
},
required: {
    color: '#d30022',
    fontWeight: '700',
  },
  dropdownContainer : {
    marginBottom: -40,
    borderRadius: 10
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
  placeholderText: {
    color: '#8b8b8b',
    fontSize: 13,
  },
  selectedText: {
    fontSize: 13,
    color: '#111',
    paddingLeft: 10,
  },
});
