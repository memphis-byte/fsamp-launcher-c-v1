import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import Header from '../components/Header';
import NewsItem from '../components/NewsItem';
import { darkTheme } from '../utils/theme';
import { NewsItem as NewsItemType } from '../types';

const MOCK_NEWS: NewsItemType[] = [
  {
    id: '1',
    title: 'New Summer Update Released!',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
    imageUrl: 'https://via.placeholder.com/400x200.png/FFC107/000000?Text=Summer+Update',
    date: '2024-07-20',
    category: 'Updates',
  },
  {
    id: '2',
    title: 'Community Spotlight: Amazing Fan Art',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ...',
    imageUrl: 'https://via.placeholder.com/400x200.png/E91E63/FFFFFF?Text=Fan+Art',
    date: '2024-07-18',
    category: 'Community',
  },
  {
    id: '3',
    title: 'Upcoming Tournament Announcement',
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ...',
    imageUrl: 'https://via.placeholder.com/400x200.png/4CAF50/FFFFFF?Text=Tournament',
    date: '2024-07-15',
    category: 'Esports',
  },
];

const NewsScreen = () => {
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNews(MOCK_NEWS);
    }, 1000);
  }, []);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header title="News & Updates" />
      <TextInput
        style={styles.searchBar}
        placeholder="Search news..."
        placeholderTextColor={darkTheme.colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredNews}
        renderItem={({ item }) => <NewsItem item={item} onPress={() => { /* Handle news press */ }} />}
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
  searchBar: {
    backgroundColor: darkTheme.colors.surface,
    padding: darkTheme.spacing.md,
    margin: darkTheme.spacing.md,
    borderRadius: 12,
    color: darkTheme.colors.text,
    fontSize: 16,
    borderWidth: 1,
    borderColor: darkTheme.colors.border,
  },
  listContent: {
    paddingHorizontal: darkTheme.spacing.md,
  },
});

export default NewsScreen;
