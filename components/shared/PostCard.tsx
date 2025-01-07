import { IPost } from "@/lib/interfaces";
import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { verticalScale } from "react-native-size-matters";
import tw from "twrnc";
import ThemedText from "./ThemedText";

interface IProps {
  post: IPost;
}

const PostCard: React.FC<IProps> = ({ post }) => {
  console.log(post.body);
  return (
    <TouchableOpacity
      style={tw`bg-white m-2 rounded-lg shadow p-4  overflow-hidden  h-[${verticalScale(
        90
      )}px] w-[${Dimensions.get("screen").width * 0.5}px]`}
    >
      {/* Title */}
      <ThemedText
        ellipsizeMode="tail"
        numberOfLines={1}
        fontFamily="OpenSansCondensedBold"
        style={tw` text-gray-600 mb-1`}
      >
        {post.title}
      </ThemedText>

      {/* Body */}
      <ThemedText
        ellipsizeMode="tail"
        style={tw`text-sm w-full  text-gray-600`}
        numberOfLines={2}
      >
        {post.body}
      </ThemedText>

      {/* tags */}
      <View style={tw` mt-1 flex-row gap-x-1 items-center justify-between`}>
        <ThemedText
          fontFamily="OpenSansMedium"
          style={tw`  text-sm text-gray-400`}
        >
          #Tags
        </ThemedText>
        <View
          style={tw` flex-row items-center flex-wrap gap-x-1 justify-between`}
        >
          {post.tags.map((tag, i) => {
            return (
              <View key={i}>
                <ThemedText style={tw` text-gray-400 text-sm`}>
                  {tag}
                </ThemedText>
              </View>
            );
          })}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(PostCard);
