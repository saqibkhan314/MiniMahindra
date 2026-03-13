import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FloatingAction } from "react-native-floating-action";

type FloatingButtonProps = {
    onPress : () => void
};

const FloatingButton: React.FC<FloatingButtonProps> = ({onPress}) => {
 return (
    <View pointerEvents="box-none" style={styles.container}>
      <FloatingAction
        actions={[]}
        onPressMain={onPress}
        color="#ff1900"
        showBackground={false}
      />
    </View>
  );
}

export default FloatingButton

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});