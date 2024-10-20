import { tw } from "@/constants/theme";
import { IEcomAddress } from "@/lib/interfaces";
import { generateFullAddress } from "@/lib/utils/utility";
import { Feather } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MutableRefObject, useCallback } from "react";
import { Pressable, View, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { ThemedText } from "../shared";
import React from "react";

interface IProps {
  selectedAddress: IEcomAddress | null;
  onSelect: (add: IEcomAddress) => void;
  address: IEcomAddress[];
}
const ShippingAddress = React.forwardRef<BottomSheetModal, IProps>(
  ({ selectedAddress, onSelect, address }, ref) => {
    return (
      <View style={tw` h-[${scale(60)}px]   mx-2`}>
        {/* <FlatList
          data={address}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
        /> */}
        {address.map((item, i) => {
          return (
            <Pressable
              key={i}
              onPress={() => onSelect(item)}
              style={tw` h-full overflow-hidden  rounded  shadow bg-white  my-1 p-2 flex-row items-start justify-between`}
            >
              <View style={tw` flex-row gap-x-2`}>
                <View
                  style={tw` h-[${scale(16)}px] w-[${scale(
                    16
                  )}px] rounded-full items-center justify-center bg-black`}
                >
                  <View
                    style={tw` h-[${scale(14)}px] w-[${scale(
                      14
                    )}px] rounded-full items-center justify-center bg-white`}
                  >
                    <View
                      style={tw` h-[${scale(12)}px] w-[${scale(
                        12
                      )}px] rounded-full items-center justify-center ${
                        selectedAddress?._id == item?._id
                          ? "bg-gray-700"
                          : "bg-gray-400"
                      }`}
                    ></View>
                  </View>
                </View>
                <View>
                  <ThemedText
                    fontFamily="OpenSansMedium"
                    style={tw` text-[${scale(13)}px]`}
                  >
                    {item?.addressType}
                  </ThemedText>
                  <ThemedText style={tw` text-[${scale(10)}px]`}>
                    {generateFullAddress(item)}
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  if ((ref as MutableRefObject<BottomSheetModal>).current) {
                    (
                      ref as MutableRefObject<BottomSheetModal>
                    ).current.present();
                    onSelect(item);
                  }
                }}
                style={tw` flex-1  items-end py-2`}
              >
                <Feather name="edit" size={scale(11)} color="black" />
              </TouchableOpacity>
            </Pressable>
          );
        })}
      </View>
    );
  }
);
export default ShippingAddress;
