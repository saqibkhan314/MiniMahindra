import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

type DriveType = '2WD' | '4WD';

type ModelOption = {
  id: number;
  name: string;
  driveType: DriveType[];
};

const MODEL_OPTIONS: ModelOption[] = [
  { id: 1, name: '475 DI BP', driveType: ['2WD'] },
  { id: 2, name: '575 DI', driveType: ['2WD'] },
  { id: 3, name: '605 DI', driveType: ['4WD'] },
  { id: 4, name: 'Arjun 605', driveType: ['2WD', '4WD'] },
  { id: 5, name: '700 BI', driveType: ['4WD'] },
  { id: 6, name: 'Rahul 605', driveType: ['2WD', '4WD'] },
];

const RED = '#E8192C';

const InterestedModel = ({setInterestedModel}) => {
  const defaultModel = MODEL_OPTIONS[0] ?? null;

  const [selectedModel, setSelectedModel] = useState<number | null>(
    defaultModel?.id ?? null,
  );
  const [selectedDriveType, setSelectedDriveType] = useState<DriveType | null>(
    defaultModel?.driveType[0] ?? null,
  );

  const modelDriveTypes = useMemo<DriveType[]>(() => {
    const model = MODEL_OPTIONS.find(m => m.id === selectedModel);
    return model?.driveType ?? [];
  }, [selectedModel]);

  useEffect(() => {
    if (!modelDriveTypes.length) {
      setSelectedDriveType(null);
      return;
    }

    if (!selectedDriveType || !modelDriveTypes.includes(selectedDriveType)) {
      setSelectedDriveType(modelDriveTypes[0]);
    }
  }, [modelDriveTypes, selectedDriveType]);

  const has2WD = modelDriveTypes.includes('2WD');
  const has4WD = modelDriveTypes.includes('4WD');
  const canSwitch = has2WD && has4WD;

  console.log('canSwitch =====>>>>> ',canSwitch);


  console.log('selectedModel ======>>>>> ',selectedModel);
  //console.log('selectedDriveType ======>>>>> ',selectedDriveType);
  
  
  useEffect(() => {
    const selectedModelName = MODEL_OPTIONS.find( m => m.id === selectedModel)

    console.log('selectedModelName =====>>>>> ', selectedModelName?.name);

     console.log('selectedDriveType ======>>>>> ',selectedDriveType);

     setInterestedModel({
      InterestedModel: selectedModelName?.name,
      DriveType: selectedDriveType
  })
    
  }, [selectedModel, selectedDriveType])
 

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Interested Model</Text>
      <View style={styles.titleDivider} />

      <View style={styles.row}>
        <View style={styles.dropdownWrapper}>
          <View style={styles.field}>
            <Dropdown
              style={styles.dropdown}
              data={MODEL_OPTIONS}
              labelField="name"
              valueField="id"
              value={selectedModel}
              placeholder="Select Model"
              search
              searchPlaceholder="Search"
              inputSearchStyle={styles.searchInput}
              autoScroll={false}
              maxHeight={260}
              dropdownPosition="auto"
              placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.selectedText}
              containerStyle={styles.dropdownContainer}
              activeColor="#efefef"
              onChange={(item: ModelOption) => setSelectedModel(item.id)}
            />
          </View>
        </View>

        <View style={styles.toggleWrapper}>
          {/* <View style={ styles.toggleContainer}> */}
        <View  style={[
    styles.toggleContainer,
    canSwitch && styles.toggleContainerActive
  ]}>
            <TouchableOpacity
              disabled={!canSwitch || !has2WD}
              activeOpacity={canSwitch ? 0.8 : 1}
              onPress={() => canSwitch && setSelectedDriveType('2WD')}
              style={[
                styles.toggleBtn,
                styles.toggleLeft,
                selectedDriveType === '2WD' && styles.toggleActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  selectedDriveType === '2WD' && styles.toggleTextActive,
                ]}
              >
                2WD
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={!canSwitch || !has4WD}
              activeOpacity={canSwitch ? 0.8 : 1}
              onPress={() => canSwitch && setSelectedDriveType('4WD')}
              style={[
                styles.toggleBtn,
                styles.toggleRight,
                selectedDriveType === '4WD' && styles.toggleActive,
              ]}
            >
              <Text
                style={[
                  styles.toggleText,
                  selectedDriveType === '4WD' && styles.toggleTextActive,
                ]}
              >
                4WD
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InterestedModel;

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
    alignItems: 'center',
    gap: 12,
  },
  dropdownWrapper: {
    flex: 1,
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
  toggleWrapper: {},
  toggleContainer: {
    flexDirection: 'row',
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#d0d0d0',
    borderWidth: 0.2
  },
  toggleBtn: {
    paddingHorizontal: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  toggleRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  toggleActive: {
    backgroundColor: RED,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  toggleTextActive: {
    color: '#fff',
  },
  dropdownContainer: {
    borderRadius: 10,
    marginTop: -40,
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
  toggleContainerActive: {
  backgroundColor: '#ffffff',
  borderColor: 'red'
},
});



















