import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { darkTheme } from '../utils/theme';
import { DownloadableFile, DownloadProgress } from '../types';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DownloadItemProps {
  file: DownloadableFile;
  progress: DownloadProgress | undefined;
  onPause: (fileId: string) => void;
  onResume: (fileId: string) => void;
  onCancel: (fileId: string) => void;
}

const DownloadItem: React.FC<DownloadItemProps> = ({ file, progress, onPause, onResume, onCancel }) => {
  const getStatusText = () => {
    if (!progress) return 'Not started';
    switch (progress.status) {
      case 'downloading':
        return `Downloading... ${progress.progress.toFixed(1)}%`;
      case 'paused':
        return `Paused at ${progress.progress.toFixed(1)}%`;
      case 'completed':
        return 'Download complete';
      case 'failed':
        return `Failed: ${progress.error}`;
      default:
        return 'Queued';
    }
  };

  const renderButtons = () => {
    if (!progress || progress.status === 'pending') {
      return <CustomButton title="Start Download" onPress={() => onResume(file.id)} size="small" />;
    }

    if (progress.status === 'downloading') {
      return <CustomButton title="Pause" onPress={() => onPause(file.id)} size="small" variant="secondary" />;
    }

    if (progress.status === 'paused') {
      return <CustomButton title="Resume" onPress={() => onResume(file.id)} size="small" />;
    }

    if (progress.status === 'failed') {
      return <CustomButton title="Retry" onPress={() => onResume(file.id)} size="small" variant="warning" />;
    }

    return null; // Completed or other states
  };

  return (
    <View style={styles.container}>
      <Icon name="file-cloud" size={30} color={darkTheme.colors.primary} />
      <View style={styles.fileInfo}>
        <Text style={styles.fileName}>{file.name}</Text>
        <Text style={styles.fileDescription}>{file.description}</Text>
        <Text style={styles.fileMeta}>Version: {file.version} | Size: {file.size}MB</Text>
      </View>
      <View style={styles.controls}>
        <Text style={styles.statusText}>{getStatusText()}</Text>
        <View style={styles.buttonContainer}>
          {renderButtons()}
          {progress && progress.status !== 'completed' && (
            <CustomButton
              title="Cancel"
              onPress={() => onCancel(file.id)}
              size="small"
              variant="danger"
              style={{ marginLeft: 8 }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: darkTheme.colors.surface,
    padding: darkTheme.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: darkTheme.spacing.md,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
  },
  fileInfo: {
    flex: 1,
    marginLeft: darkTheme.spacing.md,
  },
  fileName: {
    color: darkTheme.colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileDescription: {
    color: darkTheme.colors.textSecondary,
    fontSize: 12,
    marginVertical: 4,
  },
  fileMeta: {
    color: darkTheme.colors.textSecondary,
    fontSize: 10,
  },
  controls: {
    alignItems: 'flex-end',
  },
  statusText: {
    color: darkTheme.colors.primary,
    fontSize: 12,
    marginBottom: darkTheme.spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});

export default DownloadItem;
