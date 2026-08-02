import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';

// react-navigation's navigation/route prop types include dozens of methods
// (push, goBack, setOptions, addListener, ...) that screens under test never call.
// This factory is the single place that bridges a partial test double to the
// real prop type, so individual test files never need their own `as` cast.
export function createMockNavigation<Screen extends keyof RootStackParamList>(
  overrides: Partial<NativeStackNavigationProp<RootStackParamList, Screen>>,
): NativeStackNavigationProp<RootStackParamList, Screen> {
  return overrides as NativeStackNavigationProp<RootStackParamList, Screen>;
}

export function createMockRoute<Screen extends keyof RootStackParamList>(
  name: Screen,
  params: RootStackParamList[Screen],
): RouteProp<RootStackParamList, Screen> {
  return { key: name, name, params } as unknown as RouteProp<RootStackParamList, Screen>;
}
