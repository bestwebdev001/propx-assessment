import React, { useEffect, useState } from 'react';
import { View, Animated, useWindowDimensions, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Button from '../Button';

const styles = StyleSheet.create({
  tabsContainer: {
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
  },
});

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  indicatorStyle?: ViewStyle;
  tabStyle?: ViewStyle;
  activeTabStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  activeTabTextStyle?: TextStyle;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  indicatorStyle = {},
  tabStyle = {},
  activeTabStyle = {},
  tabTextStyle = {},
  activeTabTextStyle = {},
}) => {
  const { width } = useWindowDimensions();
  const tabWidth = width / tabs.length;
  const [borderPosition] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(borderPosition, {
      toValue: tabs.indexOf(activeTab) * tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <Button
            title={tab}
            titleStyle={[styles.tabText, tabTextStyle, isActive && activeTabTextStyle]}
            style={[styles.tab, tabStyle, isActive && activeTabStyle]}
            onPress={() => setActiveTab(tab)}
          />
        );
      })}
      <Animated.View
        style={[
          styles.activeTabIndicator,
          { transform: [{ translateX: borderPosition }], width: tabWidth },
          indicatorStyle,
        ]}
      />
    </View>
  );
};

export default Tabs;
