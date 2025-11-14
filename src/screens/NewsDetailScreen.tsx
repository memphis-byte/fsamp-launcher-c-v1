import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Header from '../components/Header';
import { darkTheme } from '../utils/theme';
import { NewsItem } from '../types';

const NewsDetailScreen = ({ route, navigation }: any) => {
  const { newsItem }: { newsItem: NewsItem } = route.params;

  return (
    <View style={styles.container}>
      <Header title={newsItem.category} showBack onBackPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: newsItem.image }} style={styles.image} />
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.date}>{newsItem.date}</Text>
        <Text style={styles.body}>{newsItem.content}</Text>
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
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: darkTheme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.colors.text,
    marginBottom: darkTheme.spacing.sm,
  },
  date: {
    fontSize: 14,
    color: darkTheme.colors.textSecondary,
    marginBottom: darkTheme.spacing.lg,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: darkTheme.colors.text,
  },
});

export default NewsDetailScreen;