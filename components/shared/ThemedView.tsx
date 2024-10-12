import { View, Text, ViewProps } from "react-native";
import React from "react";
import { tw } from "@/constants/theme";
interface IProps extends ViewProps {}
const ThemedView: React.FC<IProps> = (props) => {
  const { style, ...rest } = props;
  return <View style={[tw``, style]} {...rest} />;
};

export default ThemedView;
