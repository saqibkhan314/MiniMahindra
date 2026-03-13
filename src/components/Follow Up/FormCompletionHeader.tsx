import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

interface Step {
  label: string;
}

interface FormCompletionHeaderProps {
  steps?: Step[];
  currentStep?: number;
  onStepPress?: (index: number) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const DEFAULT_STEPS: Step[] = [
  { label: 'Edit Details' },
  { label: 'Add Follow-Up' },
];

const RED = '#E8192C';
const GREEN = '#2ECC71';
const INACTIVE_GRAY = '#c0bcbc';
const TEXT_DARK = '#000000';

const FormCompletionHeader: React.FC<FormCompletionHeaderProps> = ({
  steps = DEFAULT_STEPS,
  currentStep = 0,
  onStepPress,
  onNext,
  onPrev,
}) => {
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <View style={styles.wrapper}>
      {/* Left Arrow */}
      <TouchableOpacity
        onPress={onPrev}
        disabled={isFirst}
        style={styles.arrowButton}
      >
        <Text style={[styles.arrowText, isFirst && styles.disabledOpacity]}>‹</Text>
      </TouchableOpacity>

      <View style={styles.stepperContainer}>
        <View style={styles.stepsRow}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isLastItem = index === steps.length - 1;

            return (
              <React.Fragment key={index}>
                
                <TouchableOpacity
                  style={styles.stepToucharea}
                  onPress={() => onStepPress?.(index)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.dot,
                      isActive && styles.dotActive,
                      isCompleted && styles.dotCompleted,
                      (!isActive && !isCompleted) && styles.dotInactive,
                    ]}
                  />
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.label,
                      isActive ? styles.labelActive : styles.labelInactive,
                    ]}
                  >
                    {step.label}
                  </Text>
                </TouchableOpacity>

              
                {!isLastItem && (
                  <View 
                    style={[
                      styles.connector, 
                      isCompleted ? styles.connectorGreen : styles.connectorGray
                    ]} 
                  />
                )}
              </React.Fragment>
            );
          })}
        </View>
      </View>

      
      <TouchableOpacity
        onPress={onNext}
        disabled={isLast}
        style={styles.arrowButton}
      >
        <Text style={[styles.arrowText, styles.arrowRed, isLast && styles.disabledOpacity]}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormCompletionHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  arrowButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 32,
    color: INACTIVE_GRAY,
    fontWeight: '300',
    marginTop: -4, 
  },
  arrowRed: {
    color: RED,
  },
  disabledOpacity: {
    opacity: 1,
  },
  stepperContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepToucharea: {
    alignItems: 'center',
    width: 65, 
    
  },
  connector: {
    width: 130, 
    height: 1,
    backgroundColor: INACTIVE_GRAY,
    marginBottom: 20, 
    marginHorizontal: -20, 
  },
  connectorGray: {
    backgroundColor: INACTIVE_GRAY,
  },
  connectorGreen: {
    backgroundColor: GREEN,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: 6,
    zIndex: 5,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 6,
    borderColor: RED,
  },
  dotInactive: {
    backgroundColor: INACTIVE_GRAY,
  },
  dotCompleted: {
    backgroundColor: GREEN,
  },
  label: {
    fontSize: 11,
    textAlign: 'center',
    fontWeight: '500',
    width: 90,
    color: TEXT_DARK,
  },
  labelActive: {
    color: TEXT_DARK,
  },
  // labelInactive: {
  //   color: INACTIVE_GRAY,
  // },
});