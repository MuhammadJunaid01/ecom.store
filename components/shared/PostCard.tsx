import { IPost } from "@/lib/interfaces";
import React from "react";
import { FlatList, Text, View } from "react-native";
import tw from "twrnc";

interface IProps {
  post: IPost;
}

const PostCard: React.FC<IProps> = ({ post }) => {
  return (
    <View style={tw`bg-white rounded-lg shadow-md p-4 mb-4`}>
      {/* Title */}
      <Text style={tw`text-lg font-bold text-gray-800 mb-2`}>{post.title}</Text>

      {/* Body */}
      <Text style={tw`text-sm text-gray-600 mb-4`} numberOfLines={3}>
        {post.body}
      </Text>

      {/* Tags */}
      <FlatList
        data={post.tags}
        keyExtractor={(tag, index) => `${tag}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={tw`bg-blue-100 px-3 py-1 rounded-full mr-2`}>
            <Text style={tw`text-xs text-blue-600 font-medium`}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default React.memo(PostCard);
