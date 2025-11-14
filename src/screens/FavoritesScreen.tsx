import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { toggleFavorite } from '../redux/slices/serversSlice';
import ServerCard from '../components/ServerCard';
import Header from '../components/Header';
import { darkTheme } from '../utils/theme';
import { Server } from '../types';

const FavoritesScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.servers);

  const handleFavoriteToggle = (server: Server) => {
    dispatch(toggleFavorite(server));
  };

  const handleServerPress = (server: Server) => {
    navigation.navigate('ServerDetail', { server });
  };

  const renderItem = ({ item }: { item: Server }) => (
    <ServerCard
      server={{ ...item, isFavorite: true }} // Always true on this screen
      onPress={handleServerPress}
      onFavoritePress={handleFavoriteToggle}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Favorites" />
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: darkTheme.spacing.md }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't added any servers to your favorites yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: darkTheme.spacing.lg,
  },
  emptyText: {
    color: darkTheme.colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FavoritesScreen;