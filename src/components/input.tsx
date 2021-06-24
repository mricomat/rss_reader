import React, { forwardRef, ForwardRefRenderFunction, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';

import colors from 'src/assets/colors';

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    color: colors.grey80,
    borderRadius: 6,
    fontSize: 15,
  },
});

export interface IInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>; // overall style
  inputStyle?: StyleProp<TextStyle>; // input native component
}

const Input: ForwardRefRenderFunction<TextInput, IInputProps> = (props, ref) => {
  const { style = {}, onChangeText, value, inputStyle, ...params } = props;

  const [currentValue, setValue] = useState(value);
  const testInput = useRef<TextInput>();

  useEffect(() => {
    if (value !== currentValue) setValue(value);
  }, [value]);

  useEffect(() => {
    // @ts-ignore
    if (ref?.current) testInput.current = ref.current;
  }, [ref]);

  return (
    <View style={style}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={colors.grey50}
        selectionColor={colors.black}
        multiline={false}
        numberOfLines={1}
        onChangeText={text => {
          setValue(text);
          if (onChangeText) onChangeText(text);
        }}
        value={currentValue}
        autoCorrect={false}
        // @ts-ignore
        ref={ref || testInput}
        testID="Input"
        {...params}
      />
    </View>
  );
};

export default forwardRef(Input);
