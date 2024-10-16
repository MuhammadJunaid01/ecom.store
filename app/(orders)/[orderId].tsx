import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/shared";
import { tw } from "@/constants/theme";
import { useLazyGetProductByProductIdQuery } from "@/redux/apis/productsApiSlice";
import { OrderDetails } from "@/components/MyOrders";
import { IProduct } from "@/lib/interfaces";

const OrderDetailsScreen = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const [getProduct, { isLoading, data }] = useLazyGetProductByProductIdQuery();
  useEffect(() => {
    if (orderId) {
      getProduct(orderId);
    }
  }, []);
  if (isLoading) {
    return (
      <ThemedView style={tw` flex-1 items-center justify-center bg-white`}>
        <ActivityIndicator size={"large"} color={"black"} />
      </ThemedView>
    );
  }
  return (
    <ThemedView style={tw`flex-1 h-full w-full bg-white`}>
      <OrderDetails order={data as IProduct} />
    </ThemedView>
  );
};

export default OrderDetailsScreen;
