import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import ShippingAddress from "./ShippingAddress";
import { tw } from "@/constants/theme";
import { IEcomAddress } from "@/lib/interfaces";
import { useAppSelector } from "@/redux/hooks";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomModal, ThemedText } from "../shared";
import EditShippingAddress from "./EditShippingAddress";
interface IProps {
  selectedAddress: IEcomAddress | null;
  setSelectedAddress: React.Dispatch<React.SetStateAction<IEcomAddress | null>>;
}
const SelectDeliveryAddress: React.FC<IProps> = ({
  selectedAddress,
  setSelectedAddress,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { user } = useAppSelector((state) => state.user);

  return (
    <View style={tw` flex-1`}>
      <ShippingAddress
        ref={bottomSheetRef}
        selectedAddress={selectedAddress}
        address={user?.addresses as IEcomAddress[]}
        onSelect={(address) => setSelectedAddress(address)}
      />
      <BottomModal
        defaultIndex={3}
        ref={bottomSheetRef}
        ModalBody={() => (
          <View style={tw` flex-1 p-3`}>
            <EditShippingAddress
              ref={bottomSheetRef}
              address={selectedAddress as IEcomAddress}
            />
          </View>
        )}
      />
    </View>
  );
};

export default SelectDeliveryAddress;
