import { Stack } from 'expo-router';
import NavigationHeaderTitle from '@/components/layouts/NavigationHeaderTitle';
import { usePropxTheme } from '@/providers';

export default function SportsStackLayout() {
  const { theme } = usePropxTheme()

  return (
    <Stack
      screenOptions={{
        headerTintColor: theme.colors.text,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleStyle: { fontSize: 18 },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Sports',
          headerTitle: () => <NavigationHeaderTitle />,
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
}
