import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Server } from '../types';
import { darkTheme } from '../utils/theme';

interface ServerCardProps {
  server: Server;
  onPress: (server: Server) => void;
  onFavoritePress: (server: Server) => void;
}

const ServerCard: React.FC<ServerCardProps> = ({ server, onPress, onFavoritePress }) => {
  const playerPercentage = (server.players / server.maxPlayers) * 100;
  const pingColor = server.ping ? (server.ping < 100 ? darkTheme.colors.success : darkTheme.colors.warning) : darkTheme.colors.textSecondary;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity onPress={() => onPress(server)} activeOpacity={0.7}>
        <LinearGradient
          colors={[darkTheme.colors.surface, '#2A2A2A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <View style={styles.header}>
            <Text style={styles.serverName} numberOfLines={1}>
              {server.name}
            </Text>
            <TouchableOpacity onPress={() => onFavoritePress(server)}>
              <Icon name={server.isFavorite ? 'heart' : 'heart-outline'} size={20} color={darkTheme.colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <View style={styles.infoItem}>
              <Icon name="server" size={14} color={darkTheme.colors.textSecondary} />
              <Text style={styles.infoText}>{server.ip}:{server.port}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="gamepad-variant" size={14} color={darkTheme.colors.textSecondary} />
              <Text style={styles.infoText} numberOfLines={1}>
                {server.mode}
              </Text>
            </View>
          </View>

          <View style={styles.stats}>
            <View style={styles.playerInfo}>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${playerPercentage}%` }]} />
              </View>
              <Text style={styles.playerText}>
                {server.players}/{server.maxPlayers}
              </Text>
            </View>
            <Text style={[styles.ping, { color: pingColor }]}>
              {server.ping ? `${server.ping}ms` : 'checking...'}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: darkTheme.spacing.md,
    marginVertical: darkTheme.spacing.sm,
    padding: darkTheme.spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: darkTheme.spacing.sm,
  },
  serverName: {
    fontSize: 16,
    fontWeight: '700',
    color: darkTheme.colors.text,
    flex: 1,
  },
  info: {
    gap: darkTheme.spacing.xs,
    marginBottom: darkTheme.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: darkTheme.spacing.xs,
  },
  infoText: {
    fontSize: 12,
    color: darkTheme.colors.textSecondary,
    flex: 1,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerInfo: {
    flex: 1,
    marginRight: darkTheme.spacing.md,
  },
  progressContainer: {
    height: 4,
    backgroundColor: darkTheme.colors.border,
    borderRadius: 2,
    marginBottom: darkTheme.spacing.xs,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: darkTheme.colors.primary,
    borderRadius: 2,
  },
  playerText: {
    fontSize: 12,
    color: darkTheme.colors.textSecondary,
  },
  ping: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ServerCard;
