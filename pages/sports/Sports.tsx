import { Text, View } from 'react-native';
import Button from '@/components/elements/Button';
import { colors } from '@/theme';
import BottomSheet from '@/components/elements/BottomSheet';
import { useState } from 'react';
import BetSlip from '@/components/layouts/BetSlip';
import { useThemedStyles } from '@/hooks/useThemeStyles';

export default function Sports() {
  const [isOpen, setIsOpen] = useState(false);

  const styles = useThemedStyles({
    root: (theme: any) => ({
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background
    }),
    title: (theme: any) => ({
      fontSize: 24,
      marginBottom: 20,
      color: theme.colors.text
    }),
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: colors.yellow,
      height: 44,
      width: '90%',
      position: 'absolute',
      bottom: 16
    },
    buttonTitle: {
      fontSize: 16,
      textAlign: 'center',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      color: colors.black
    }
  })

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Sports</Text>

      <Button
        title="Open Bet Slip"
        titleStyle={styles.buttonTitle}
        style={styles.button}
        onPress={() => setIsOpen(true)}
      />
      <BottomSheet
        isOpen={isOpen}
        backgroundStyle={{ backgroundColor: '#1a1e22', opacity: 0.9 }}
      >
        <BetSlip onClose={() => setIsOpen(false)} />
      </BottomSheet>
    </View>
  );
}
