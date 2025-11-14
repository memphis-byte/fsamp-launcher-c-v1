import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { darkTheme } from '../utils/theme';

interface TabItem {
  name: string;
  icon: string;
  label: string;
}

interface BottomNavProps {
  tabs: TabItem[];
  activeTab: number;
  onTabPress: (index: number) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ tabs, activeTab, onTabPress }) => {
  return (
    <LinearGradient colors={['transparent', darkTheme.colors.surface]} style={styles.container}>
      <View style={styles.navBar}>
        {tabs.map((tab, index) => (
          <TouchableOpacity key={index} style={styles.tabButton} onPress={() => onTabPress(index)} activeOpacity={0.7}>
            <Icon
              name={tab.icon}
              size={24}
              color={activeTab === index ? darkTheme.colors.primary : darkTheme.colors.textSecondary}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: activeTab === index ? darkTheme.colors.primary : darkTheme.colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: darkTheme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: darkTheme.colors.border,
    paddingVertical: darkTheme.spacing.sm,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});

export default BottomNav;