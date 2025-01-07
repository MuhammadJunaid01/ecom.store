import { scale, tw, verticalScale } from "@/constants/theme";
import { useGetAllPostsQuery } from "@/redux/apis/postsApiSlice";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ThemedText, ThemedView } from "./shared";
import PostCard from "./shared/PostCard";

const Posts = () => {
  const { data, isLoading } = useGetAllPostsQuery("");
  return (
    <View style={tw` h-[${verticalScale(140)}px] w-full`}>
      <ThemedView style={tw` flex-row items-center mt-2 justify-between`}>
        <ThemedText
          accessibilityRole="header"
          accessible
          accessibilityLabel="Top Products"
          fontFamily="OpenSansBold"
          style={tw` text-[${scale(16)}px]  `}
        >
          Our Blog
        </ThemedText>
        <TouchableOpacity
          onPress={() => {
            router.push("/(drawer)/(tabs)/blogs" as any);
          }}
          style={tw` h-11 w-16 items-center justify-center`}
        >
          <ThemedText
            accessibilityRole="header"
            accessible
            accessibilityLabel="Top Products"
            fontFamily="OpenSansMedium"
            style={tw` text-[${scale(13)}px] `}
          >
            See All
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={tw` flex-row`}>
          {data?.posts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Posts;
