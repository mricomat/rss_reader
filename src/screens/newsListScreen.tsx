import React, { useEffect, useState, FC } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, lang } from 'src/assets';
import Input from 'src/components/input';
import NewsItem from 'src/components/newsItem';
import { routeNames } from 'src/hooks/use-navigation';
import { useRssParser } from 'src/hooks/use-rss-parser';
import { IRssItem } from 'src/types/data';
import { RootStackScreenType } from 'src/types/navigation';
import Config from 'src/utils/config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueTMDB,
    paddingHorizontal: 8,
  },
});

const NewListScreen: FC<RootStackScreenType<routeNames.NewsList>> = ({ navigation }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [newsList, setNewsList] = useState<IRssItem[]>([]);

  const { items } = useRssParser(Config.apiUrl, '', true, 24 * 3600000);

  useEffect(() => {
    setNewsList([...items]);
  }, [items]);

  useEffect(() => {
    filterItems();
  }, [searchText]);

  const filterItems = () => {
    const newItems = items.filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()));
    setNewsList([...newItems]);
  };

  const renderItem = ({ item }: { item: IRssItem }) => (
    <NewsItem
      uri={item.enclosures[0].url}
      title={item.title}
      description={item.description}
      style={{ marginBottom: 10 }}
      onPress={() => navigation.navigate(routeNames.NewsDetail, item)}
    />
  );

  const renderList = () => (
    <FlatList
      renderItem={renderItem}
      data={newsList}
      initialNumToRender={10}
      keyExtractor={(item, index) => item.id + index}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Input
        value={searchText}
        onChangeText={text => setSearchText(text)}
        style={{ marginVertical: 12 }}
        placeholder={lang.searchNewsPlaceHolder}
      />
      {renderList()}
    </SafeAreaView>
  );
};

export default NewListScreen;
