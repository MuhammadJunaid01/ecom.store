import { tw } from "@/constants/theme";
import { AntDesign } from "@expo/vector-icons";
import { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { ThemedText } from "../shared";

interface IProfileTab {
  title: string;
  label: string;
  onPress?: () => void;
}
const ProfileTab: React.FC<IProfileTab> = memo(({ title, label, onPress }) => {
  return (
    <View
      style={tw`   bg-transparent  border-b border-gray-100 h-[${scale(
        72
      )}px]  flex-row px-2 rounded  justify-between items-center gap-y-[${scale(
        3
      )}px] py-[${scale(10)}px] `}
    >
      <View>
        <ThemedText
          fontFamily="OpenSansBold"
          style={tw` leading-8 text-gray-800 text-[${scale(14)}px]`}
        >
          {title}
        </ThemedText>
        <ThemedText
          fontFamily="OpenSansRegular"
          style={tw` text-gray-500 text-[${scale(11)}px]`}
        >
          {label}
        </ThemedText>
      </View>
      <TouchableOpacity
        onPress={() => onPress?.()}
        style={tw` h-[${scale(33)}px] w-[${scale(
          33
        )}px] items-center justify-center`}
      >
        <AntDesign
          name="right"
          size={scale(19)}
          style={tw` mt-1 text-gray-700`}
        />
      </TouchableOpacity>
    </View>
  );
});

export default ProfileTab;
