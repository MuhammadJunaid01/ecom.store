import { View, Text } from "react-native";
import React from "react";
import { tw } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";

const Ratings = () => {
  const totalRatings = 23; // Example data
  const averageRating = 4.3;

  const ratingsData = [
    { stars: 5, count: 12 },
    { stars: 4, count: 5 },
    { stars: 3, count: 4 },
    { stars: 2, count: 2 },
    { stars: 1, count: 0 },
  ];
  return (
    <View style={tw`p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-2`}>Rating & Reviews</Text>
      <View style={tw`flex-row items-center mb-4`}>
        <Text style={tw`text-5xl font-bold`}>{averageRating}</Text>
        <View style={tw`ml-4`}>
          <View style={tw`flex-row`}>
            {[...Array(5)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={20}
                color={i < Math.floor(averageRating) ? "#f5c518" : "#ddd"}
              />
            ))}
          </View>
          <Text style={tw`text-gray-600`}>{totalRatings} ratings</Text>
        </View>
      </View>

      {/* Rating Bars */}
      {ratingsData.map((rating, index) => (
        <RatingBar
          key={index}
          stars={rating.stars}
          count={rating.count}
          totalRatings={totalRatings}
        />
      ))}
    </View>
  );
};

export default Ratings;

interface RatingBarProps {
  stars: number;
  count: number;
  totalRatings: number;
}

const RatingBar = ({ stars, count, totalRatings }: RatingBarProps) => {
  const percentage = (count / totalRatings) * 100;

  return (
    <View style={tw`flex-row items-center my-1`}>
      <View style={tw`flex-row items-center w-12`}>
        {[...Array(stars)].map((_, i) => (
          <FontAwesome key={i} name="star" size={14} color="#f5c518" />
        ))}
      </View>
      <View
        style={tw`h-2 bg-gray-200 rounded-full overflow-hidden mx-2 flex-1`}
      >
        <View style={[tw`h-full bg-red-500`, { width: `${percentage}%` }]} />
      </View>
      <Text style={tw`text-gray-600 ml-2`}>{count}</Text>
    </View>
  );
};
