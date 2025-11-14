import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  setServers,
  setSearchQueryAndFilter,
  toggleFavorite,
  setLoading,
  setError,
} from '../redux/slices/serversSlice';
import { serverAPI } from '../services/api';
import ServerCard from '../components/ServerCard';
import Header from '../components/Header';
import { darkTheme } from '../utils/theme';
import { Server } from '../types';

const ServersScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredList, loading, error, favorites, searchQuery } = useSelector(
    (state: RootState) => state.servers
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        dispatch(setLoading(true));
        const servers = await serverAPI.getServers();
        const serversWithPing = await Promise.all(
          servers.map(async s => ({ ...s, ping: await serverAPI.pingServer(s.ip, s.port) }))
        );
        dispatch(setServers(serversWithPing));
      } catch (e) {
        dispatch(setError('Failed to fetch servers.'));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchServers();
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const servers = await serverAPI.getServers();
      const serversWithPing = await Promise.all(
        servers.map(async s => ({ ...s, ping: await serverAPI.pingServer(s.ip, s.port) }))
      );
      dispatch(setServers(serversWithPing));
    } catch (e) {
      dispatch(setError('Failed to fetch servers.'));
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQueryAndFilter(query));
  };

  const handleFavoriteToggle = (server: Server) => {
    dispatch(toggleFavorite(server));
  };

  const handleServerPress = (server: Server) => {
    navigation.navigate('ServerDetail', { server });
  };

  const renderItem = ({ item }: { item: Server }) => (
    <ServerCard
      server={{ ...item, isFavorite: favorites.some(f => f.id === item.id) }}
      onPress={handleServerPress}
      onFavoritePress={handleFavoriteToggle}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Servers" rightIcon="magnify" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or mode..."
        placeholderTextColor={darkTheme.colors.textSecondary}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color={darkTheme.colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={darkTheme.colors.primary} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  searchInput: {
    height: 40,
    backgroundColor: darkTheme.colors.surface,
    paddingHorizontal: darkTheme.spacing.md,
    margin: darkTheme.spacing.md,
    borderRadius: 8,
    color: darkTheme.colors.text,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
  },
});

export default ServersScreen;