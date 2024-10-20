import React from "react";
import { ThemedView } from "@/components/shared";
import { tw } from "@/constants/theme";
import { Favorites } from "@/components";
import { useAppSelector } from "@/redux/hooks";

const FavoritesScreen = () => {
  const { wishlist } = useAppSelector((state) => state.cart);
  return (
    <ThemedView style={tw` flex-1 h-full w-full bg-white`}>
      <Favorites favorites={wishlist} />
    </ThemedView>
  );
};

export default FavoritesScreen;
