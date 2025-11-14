import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NewsItem as NewsItemType } from '../types';
import { darkTheme } from '../utils/theme';

interface NewsItemProps {
  item: NewsItemType;
  onPress: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: darkTheme.colors.surface,
        borderRadius: 12,
        marginBottom: darkTheme.spacing.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: darkTheme.colors.border,
    },
    image: {
        width: '100%',
        height: 150,
    },
    content: {
        padding: darkTheme.spacing.md,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: darkTheme.colors.text,
        marginBottom: darkTheme.spacing.sm,
    },
    date: {
        fontSize: 12,
        color: darkTheme.colors.textSecondary,
        marginBottom: darkTheme.spacing.xs,
    },
    category: {
        fontSize: 12,
        color: darkTheme.colors.primary,
        fontWeight: 'bold',
    },
});

export default NewsItem;
