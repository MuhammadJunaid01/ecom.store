import { View, Text } from "react-native";
import React from "react";
import { tw } from "@/constants/theme";
import { FontAwesome } from "@expo/vector-icons";
import { Review } from "@/lib/interfaces";
interface IProps {
  reviews: Review[];
}
const Ratings: React.FC<IProps> = ({ reviews }) => {
  if (reviews?.length < 1) {
    return;
  }
  const totalRatings = reviews?.length;

  // Calculate average rating
  const averageRating = totalRatings
    ? reviews.reduce((acc, review) => acc + review?.rating, 0) / totalRatings
    : 0;

  // Count the number of reviews for each rating (1-5 stars)
  const ratingsData = Array.from({ length: 5 }, (_, i) => {
    const stars = 5 - i;
    const count = reviews?.filter((review) => review.rating === stars)?.length;
    return { stars, count };
  });
  return (
    <View style={tw`p-1 bg-white`}>
      <View style={tw`flex-row items-center mb-1`}>
        <Text style={tw`text-6xl font-bold`}>{averageRating.toFixed(1)}</Text>
        <View style={tw`ml-4`}>
          <View style={tw`flex-row items-center`}>
            {[...Array(5)].map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={20}
                color={i < Math.floor(averageRating) ? "#f5c518" : "#ddd"}
              />
            ))}
          </View>
          <Text style={tw`text-gray-500 text-lg`}>{totalRatings} ratings</Text>
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
  const percentage = totalRatings ? (count / totalRatings) * 100 : 0;
  return (
    <View
      style={tw`flex-row items-center my-0 gap-x-3 justify-between  w-full`}
    >
      <View style={tw`flex-row items-center w-auto`}>
        {Array.from({ length: stars }).map((_, i) => (
          <FontAwesome key={i} name="star" size={16} color="#f5c518" />
        ))}
      </View>
      <View
        style={tw`h-2 bg-gray-900/90 rounded-full overflow-hidden mx-2 flex-1 `}
      >
        <View
          style={[
            tw`h-full bg-yellow-400 rounded-full`,
            { width: `${percentage}%` },
          ]}
        />
      </View>
      <Text style={tw`text-gray-600 ml-2 text-lg`}>{count}</Text>
    </View>
  );
};
