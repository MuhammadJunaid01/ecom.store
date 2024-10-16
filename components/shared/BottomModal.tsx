import { View } from "react-native";
import React, { useMemo } from "react";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import { Entypo } from "@expo/vector-icons";
import ThemedText from "./ThemedText";
import { tw } from "@/constants/theme";
interface IProps {
  onCloseModal?: void;
  ModalBody: React.ComponentType;
  heights?: string[];
  defaultIndex?: number;
  isShowHeader?: boolean;
}
const BottomModal = React.forwardRef<BottomSheetModal, IProps>(
  (
    {
      ModalBody,
      heights = ["25%", "50%", "70%", "85"],
      defaultIndex = 1,
      isShowHeader = true,
    },
    ref
  ) => {
    //   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // Define the snap points
    const snapPoints = useMemo(() => heights, [heights]);
    return (
      <BottomSheetModal
        ref={ref}
        index={defaultIndex} // The initial index to start with (0 for '25%', 1 for '50%', etc.)
        snapPoints={snapPoints}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} />}
        handleIndicatorStyle={tw` hidden `}
      >
        <View style={tw`flex-1  bg-white`}>
          <Entypo
            name="chevron-thin-down"
            size={16}
            color="black"
            style={tw` text-center`}
          />
          <ThemedText
            // fontFamily="UbuntoRegular"
            style={tw` text-center text-[14px] tracking-[1px]`}
          >
            Pull to close
          </ThemedText>
          <ModalBody />
        </View>
      </BottomSheetModal>
    );
  }
);

export default BottomModal;
