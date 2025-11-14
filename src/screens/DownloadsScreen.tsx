import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { pauseDownload, resumeDownloadAndSimulate, cancelDownload } from '../redux/slices/downloadSlice';
import Header from '../components/Header';
import DownloadItem from '../components/DownloadItem';
import { darkTheme } from '../utils/theme';
import { DownloadableFile } from '../types';

const MOCK_FILES: DownloadableFile[] = [
  {
    id: 'map1',
    name: 'Official Map Pack 1',
    description: 'Includes 5 new multiplayer maps.',
    size: 125,
    url: '',
    version: '1.2',
  },
  {
    id: 'texturepack',
    name: 'HD Texture Pack',
    description: 'Replaces all default textures with high-resolution alternatives.',
    size: 512,
    url: '',
    version: '2.0',
  },
  {
    id: 'soundtrack',
    name: 'Official Soundtrack',
    description: 'The complete original soundtrack.',
    size: 80,
    url: '',
    version: '1.0',
  },
];

const DownloadsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const downloadProgress = useSelector((state: RootState) => state.downloads.progress);

  const handlePause = (fileId: string) => {
    dispatch(pauseDownload(fileId));
  };

  const handleResume = (fileId: string) => {
    dispatch(resumeDownloadAndSimulate(fileId) as any);
  };

  const handleCancel = (fileId: string) => {
    dispatch(cancelDownload(fileId));
  };

  const renderItem = ({ item }: { item: DownloadableFile }) => (
    <DownloadItem
      file={item}
      progress={downloadProgress[item.id]}
      onPause={handlePause}
      onResume={handleResume}
      onCancel={handleCancel}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Available Downloads" />
      <FlatList
        data={MOCK_FILES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  listContent: {
    padding: darkTheme.spacing.md,
  },
});

export default DownloadsScreen;
