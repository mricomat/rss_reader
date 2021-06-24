
import { GestureResponderEvent } from 'react-native';

export type IFunction<T = GestureResponderEvent | void, U = void> = (props: T) => U;
