import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import { darkTheme } from '../utils/theme';
import { Server } from '../types';
import { AppDispatch, RootState } from '../redux/store';
import { toggleFavorite } from '../redux/slices/serversSlice';

const ServerDetailScreen = ({ route, navigation }: any) => {
  const { server }: { server: Server } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.servers);
  const [isConnecting, setIsConnecting] = useState(false);

  const isFavorite = favorites.some(f => f.id === server.id);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(server));
  };

  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      Alert.alert('Connection Successful', `You have successfully connected to ${server.name}.`);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Header title={server.name} showBack onBackPress={() => navigation.goBack()} />
      <ScrollView>
        <Image source={{ uri: server.bannerUrl }} style={styles.banner} />
        <View style={styles.content}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{server.ip}:{server.port}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Players:</Text>
            <Text style={styles.value}>{server.players} / {server.maxPlayers}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Mode:</Text>
            <Text style={styles.value}>{server.mode}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Version:</Text>
            <Text style={styles.value}>{server.version}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Website:</Text>
            <Text style={styles.value}>{server.website}</Text>
          </View>
          <Text style={styles.description}>{server.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="Connect" onPress={handleConnect} loading={isConnecting} />
        <CustomButton
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          onPress={handleFavoriteToggle}
          variant="outline"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  banner: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: darkTheme.spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: darkTheme.spacing.md,
    padding: darkTheme.spacing.sm,
    backgroundColor: darkTheme.colors.surface,
    borderRadius: 8,
  },
  label: {
    color: darkTheme.colors.textSecondary,
    fontSize: 16,
  },
  value: {
    color: darkTheme.colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: darkTheme.colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginTop: darkTheme.spacing.md,
  },
  buttonContainer: {
    padding: darkTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: darkTheme.colors.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: darkTheme.spacing.md,
  },
});

export default ServerDetailScreen;