import React, { useMemo, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const MAKE_OPTIONS = [
  { id: 1, name: 'Escorts' },
  { id: 2, name: 'Sonalika' },
];

export const MODEL_OPTIONS = [
  { id: 101, name: 'Escorts Farmtrac 60', makeId: 1 },
  { id: 102, name: 'Escorts Farmtrac 45', makeId: 1 },
//   { id: 103, name: 'Escorts Powertrac 439', makeId: 1 },
//   { id: 104, name: 'Escorts Powertrac 445', makeId: 1 },
//   { id: 105, name: 'Escorts Jupiter 26', makeId: 1 },
  { id: 201, name: 'Sonalika Tiger 60', makeId: 2 },
  { id: 202, name: 'Sonalika Tiger 50', makeId: 2 },
//   { id: 203, name: 'Sonalika Sikandar 80', makeId: 2 },
//   { id: 204, name: 'Sonalika Sikandar 75', makeId: 2 },
//   { id: 205, name: 'Sonalika Worldtrac 90', makeId: 2 },
];

export const YEAR_OPTIONS = Array.from({ length: 25 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { id: year, name: String(year) };
});

// type Props = {
//   visible: boolean;
//   onClose: () => void;
//   onSave?: (payload: {
//     makeId: number | null;
//     modelId: number | null;
//     year: number | null;
//   }) => void;
// };


type Props = {
  visible: boolean;
  onClose: () => void;
  onSave?: (payload: {
    makeId: number;
    makeName: string;
    modelId: number;
    modelName: string;
    year: number;
  }) => void;
};

const OwnedTractorModal: React.FC<Props> = ({ visible, onClose, onSave }) => {
  const [makeId, setMakeId] = useState<number | null>(null);
  const [modelId, setModelId] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);

  const filteredModels = useMemo(
    () => MODEL_OPTIONS.filter(m => m.makeId === makeId),
    [makeId],
  );

  const handleSave = () => {
    if (!makeId || !modelId || !year) return;

    const make = MAKE_OPTIONS.find(m => m.id === makeId);
const model = MODEL_OPTIONS.find(m => m.id === modelId);
    onSave?.({
  makeId,
  makeName: make?.name ?? '',
  modelId,
  modelName: model?.name ?? '',
  year,
});

  setMakeId(null)
  setModelId(null)
  setYear(null)

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Owned Tractor</Text>
            <TouchableOpacity onPress={onClose} hitSlop={10}>
              <Icon name="close" size={24} color="#6d6d6d" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>
            Owned Make <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.field}>
            <Dropdown
              style={styles.dropdown}
              //mode="modal"
              data={MAKE_OPTIONS}
              labelField="name"
              valueField="id"
              value={makeId}
              placeholder="Select Brand"
              search
              searchPlaceholder="Search" 
              keyboardAvoiding={false}
              showsVerticalScrollIndicator={true}
              maxHeight={250}
              onChange={(item: { id: number }) => {
                setMakeId(item.id);
                setModelId(null);
              }}
               iconColor="#7f7f7f"
              placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.inputText}
              itemTextStyle={styles.itemText}
              inputSearchStyle={styles.searchInput}
              containerStyle={styles.dropdownContainer}
              
            />
          </View>

          <Text style={styles.label}>
            Owned Model <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.field}>
            <Dropdown
              style={styles.dropdown}
              data={filteredModels}
              labelField="name"
              valueField="id"
              value={modelId}
              placeholder="Select Model"
              search
              searchPlaceholder="Search"
              dropdownPosition="bottom"
              keyboardAvoiding
              showsVerticalScrollIndicator={true}
              maxHeight={250}
              disable={!makeId}
              onChange={(item: { id: number }) => setModelId(item.id)}
              //   placeholderStyle={styles.placeholderText}
              //   selectedTextStyle={styles.selectedText}
              //   itemTextStyle={styles.itemText}
              iconColor="#7f7f7f"
              //  containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.inputText}
              itemTextStyle={styles.itemText}
              inputSearchStyle={styles.searchInput}
              containerStyle={styles.dropdownContainer}
            />
          </View>

          <Text style={styles.label}>
            Purchase Year <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.field}>
            <Dropdown
              style={styles.dropdown}
              data={YEAR_OPTIONS}
              labelField="name"
              valueField="id"
              value={year}
              placeholder="Select Year"
              search
              searchPlaceholder="Search"
              dropdownPosition="top"
              onChange={(item: { id: number }) => setYear(item.id)}
              iconColor="#7f7f7f"
               placeholderStyle={styles.placeholderText}
              selectedTextStyle={styles.inputText}
              itemTextStyle={styles.itemText}
              inputSearchStyle={styles.searchInput}
              containerStyle={styles.dropdownContainer}
             
            />
          </View>

          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            activeOpacity={0.9}
          >
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OwnedTractorModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  backdropPress: {
    flex: 1,
  },
  sheet: {
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15, // 20
    color: '#222',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#d3d3d3',
    marginTop: 14,
    marginBottom: 18,
  },
  label: {
    fontSize: 15, // 20
    color: '#111',
    marginBottom: 8,
    marginTop: 4,
  },
  required: {
    color: '#e30b2c',
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
  dropdown: {
    flex: 1,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    borderRadius: 14,
    // borderWidth: 1,
    // borderColor: '#e2e2e2',
    // marginTop: 2,
    // overflow: 'hidden',
    marginTop: -66,
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
  selectedText: {
    color: '#111',
    fontSize: 40 / 3,
  },
  saveBtn: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#ec0e3d',
    borderRadius: 14,
    paddingHorizontal: 36,
    paddingVertical: 14,
  },
  saveText: {
    color: '#fff',
    fontSize: 34 / 2, // 17
    fontWeight: '700',
  },
});
