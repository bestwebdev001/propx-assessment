import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@/theme';
import { usePropxTheme } from '@/providers';

export default function TabLayout() {
  const { theme } = usePropxTheme()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarInactiveBackgroundColor: theme.colors.background,
        tabBarActiveTintColor: colors.purple,
        tabBarActiveBackgroundColor: theme.colors.background,
        tabBarStyle: { backgroundColor: theme.colors.background, paddingTop: 12 }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: 'Sports',
          tabBarIcon: ({ color }) => <AntDesign name="Trophy" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="feature"
        options={{
          title: 'Feature',
          tabBarIcon: ({ color }) => <AntDesign name="antdesign" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
