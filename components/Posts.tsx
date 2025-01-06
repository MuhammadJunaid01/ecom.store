import { tw } from "@/constants/theme";
import { useGetAllPostsQuery } from "@/redux/apis/postsApiSlice";
import React from "react";
import { Text, View } from "react-native";

const Posts = () => {
  const { data, isLoading } = useGetAllPostsQuery("");
  return (
    <View style={tw` `}>
      <Text>Posts</Text>
    </View>
  );
};

export default Posts;
