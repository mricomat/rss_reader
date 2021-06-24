import React, { FC } from 'react';
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle, TouchableOpacity } from 'react-native';

import colors from 'src/assets/colors';
import { IFunction } from 'src/types/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 140,
    borderRadius: 8,
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    position: 'absolute',
    opacity: 0.2,
  },
  placeHolder: {
    position: 'absolute',
    margin: 10,
    backgroundColor: colors.grey30,
  },
  contentContainer: {
    flexDirection: 'row',
    height: '100%',
    padding: 10,
  },
  image: {
    width: 80,
    height: '100%',
    borderRadius: 6,
  },
  infoContainer: {
    paddingHorizontal: 6,
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginTop: 8,
  },
});

export interface INewsItem {
  style?: StyleProp<ViewStyle>;
  uri?: string;
  title?: string;
  description?: string;
  onPress?: IFunction;
}

const NewsItem: FC<INewsItem> = props => {
  const { style = {}, uri, title, description, onPress } = props;

  const renderPlaceHolder = () => <View style={[styles.image, styles.placeHolder]} />;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress} testID="newsItem">
      <Image style={styles.background} source={{ uri }} />
      <View style={styles.contentContainer}>
        {renderPlaceHolder()}
        <Image style={styles.image} source={{ uri }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NewsItem;
