import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleAutoUpdate, toggleNotifications, setVideoQuality, setMusicVolume } from '../redux/slices/settingsSlice';
import Header from '../components/Header';
import { darkTheme } from '../utils/theme';
import CustomButton from '../components/CustomButton';
import Slider from '@react-native-community/slider';

const SettingsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);

  return (
    <View style={styles.container}>
      <Header title="Settings" />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Auto-update Game</Text>
          <Switch
            value={settings.autoUpdate}
            onValueChange={() => dispatch(toggleAutoUpdate())}
            trackColor={{ false: darkTheme.colors.surface, true: darkTheme.colors.primary }}
            thumbColor={darkTheme.colors.background}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={settings.notifications}
            onValueChange={() => dispatch(toggleNotifications())}
            trackColor={{ false: darkTheme.colors.surface, true: darkTheme.colors.primary }}
            thumbColor={darkTheme.colors.background}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Video Quality</Text>
          <View style={styles.buttonGroup}>
            <CustomButton
              title="Low"
              onPress={() => dispatch(setVideoQuality('low'))}
              variant={settings.videoQuality === 'low' ? 'primary' : 'secondary'}
              size="small"
            />
            <CustomButton
              title="Medium"
              onPress={() => dispatch(setVideoQuality('medium'))}
              variant={settings.videoQuality === 'medium' ? 'primary' : 'secondary'}
              size="small"
            />
            <CustomButton
              title="High"
              onPress={() => dispatch(setVideoQuality('high'))}
              variant={settings.videoQuality === 'high' ? 'primary' : 'secondary'}
              size="small"
            />
          </View>
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Music Volume</Text>
          <Slider
            style={{ width: 150, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={settings.musicVolume}
            onSlidingComplete={(value) => dispatch(setMusicVolume(value))}
            minimumTrackTintColor={darkTheme.colors.primary}
            maximumTrackTintColor={darkTheme.colors.border}
            thumbTintColor={darkTheme.colors.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkTheme.colors.background,
    },
    content: {
        padding: darkTheme.spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: darkTheme.colors.surface,
        borderRadius: 12,
        padding: darkTheme.spacing.md,
        marginBottom: darkTheme.spacing.md,
        borderWidth: 1,
        borderColor: darkTheme.colors.border,
    },
    settingText: {
        color: darkTheme.colors.text,
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: darkTheme.spacing.sm,
    },
});

export default SettingsScreen;