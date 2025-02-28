import { Text, View } from 'react-native';
import { useThemedStyles } from '@/hooks';

export default function Feature() {

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
  });

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Feature</Text>
    </View>
  );
}
