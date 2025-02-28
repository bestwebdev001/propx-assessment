import React, { useRef, memo, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RNBottomSheet, {
  BottomSheetProps as RNBottomSheetProps,
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  root: { width: '100%' },
  container: {
    width: '100%',
  },
});

export interface BottomSheetProps extends RNBottomSheetProps {
  isOpen: boolean;
  initialOpen?: boolean;
  children: React.ReactNode;
}

const BottomSheet = memo(function BottomSheet({
  isOpen,
  initialOpen,
  children,
  ...others
}: BottomSheetProps) {
  const bottomSheetRef = useRef<RNBottomSheet>(null);

  useEffect(() => {
    if (isOpen) bottomSheetRef.current?.snapToIndex(0);
    else bottomSheetRef.current?.close();
  }, [isOpen]);

  const renderBackdropComponent = (backdropProps: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...backdropProps} disappearsOnIndex={-1} pressBehavior="none" />
  );

  return (
    <RNBottomSheet
      ref={bottomSheetRef}
      animateOnMount
      enableDynamicSizing
      enablePanDownToClose={false}
      backdropComponent={(renderBackdropComponent)}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      handleIndicatorStyle={{ backgroundColor: '#54565a', width: 120, height: 4, marginTop: 12 }}
      index={initialOpen ? 0 : -1}
      {...others}>
      <BottomSheetScrollView contentContainerStyle={styles.container} style={styles.root}>
        {children}
      </BottomSheetScrollView>
    </RNBottomSheet>
  );
});

export default BottomSheet;
