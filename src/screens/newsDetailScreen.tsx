import React, { FC } from 'react';
import { StyleSheet, Text, Linking, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, lang } from 'src/assets';
import { routeNames } from 'src/hooks/use-navigation';
import { IRssItem } from 'src/types/data';
import { RootStackScreenType } from 'src/types/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blueTMDB,
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 10,
  },
  returnLabel: {
    color: colors.white,
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 12,
  },
  titleLabel: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    paddingHorizontal: 12,
  },
  descriptionLabel: {
    color: colors.white,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});

const defRssData: IRssItem = {
  id: '',
  links: [],
  title: '',
  description: '',
  enclosures: [{ url: '', length: '', mimeType: '' }],
};

const NewDetailScreen: FC<RootStackScreenType<routeNames.NewsDetail>> = ({ route, navigation }) => {
  const {params} = route;
  const rssData: IRssItem = { ...defRssData, ...params };

  const renderTouchable = (text: string, onPress: () => void) => (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.returnLabel}>{text}</Text>
      </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container}>
      {renderTouchable(lang.return, () => navigation.goBack())}
      <Text style={styles.titleLabel}>{rssData.title}</Text>
      <Image style={styles.image} source={{ uri: rssData.enclosures[0].url }} />
      <Text style={styles.descriptionLabel}>{rssData.description}</Text>
      {renderTouchable(lang.navigateLink, () => Linking.openURL(rssData.links[0].url))}
    </SafeAreaView>
  );
};

export default NewDetailScreen;
