import { Stack } from 'expo-router';
import NavigationHeaderTitle from '@/components/layouts/NavigationHeaderTitle';
import { colors } from '@/theme';
import { usePropxTheme } from '@/providers';

export default function FeatureStackLayout() {
  const { theme } = usePropxTheme()

  return (
    <Stack
      screenOptions={{
        headerTintColor: colors.white,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: { fontSize: 18 },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Feature',
          headerTitle: () => <NavigationHeaderTitle />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
