import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import tw from "twrnc";

const Filters = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Separate min and max prices
  const [minPrice, setMinPrice] = useState(34);
  const [maxPrice, setMaxPrice] = useState(100);

  const brands = [
    "New Balance",
    "Supreme",
    "Gap",
    "Balenciaga",
    "Off White",
    "Vans",
    "Carhartt",
    "Asics",
    "Burberry",
  ];

  const colors = [
    { name: "Blue", color: "bg-blue-500" },
    { name: "Red", color: "bg-red-500" },
    { name: "Green", color: "bg-green-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Brown", color: "bg-[#8B4513]" }, // custom brown
    { name: "Pink", color: "bg-pink-500" },
    { name: "Purple", color: "bg-purple-500" },
    { name: "Black", color: "bg-black" },
    { name: "White", color: "bg-white border border-gray-300" },
    { name: "Gray", color: "bg-gray-400" },
  ];

  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "36",
    "38",
    "40",
    "42",
    "44",
    "46",
  ];

  const handleReset = () => {
    setSelectedBrand(null);
    setSelectedColor(null);
    setSelectedSize(null);
    setMinPrice(34);
    setMaxPrice(100);
  };

  return (
    <ScrollView style={tw`p-4`}>
      {/* Brand Filter */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Filters</Text>
        <View style={tw`flex flex-wrap flex-row`}>
          {brands.map((brand) => (
            <TouchableOpacity
              key={brand}
              onPress={() => setSelectedBrand(brand)}
              style={[
                tw`border px-4 py-2 mr-2 mb-2 rounded-full`,
                selectedBrand === brand
                  ? tw`border-orange-500`
                  : tw`border-gray-300`,
              ]}
            >
              <Text>{brand}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Color Filter */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Color</Text>
        <View style={tw`flex flex-wrap flex-row`}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color.name}
              onPress={() => setSelectedColor(color.name)}
              style={[
                tw`h-10 w-10 rounded-full mr-2 mb-2`,
                tw`${color.color}`,
                selectedColor === color.name && tw`border-2 border-blue-500`,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Size Filter */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Size</Text>
        <View style={tw`flex flex-wrap flex-row`}>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              style={[
                tw`border px-4 py-2 mr-2 mb-2 rounded-full`,
                selectedSize === size
                  ? tw`border-orange-500`
                  : tw`border-gray-300`,
              ]}
            >
              <Text>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Price Range Filter */}
      <View style={tw`mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Price Range</Text>

        <View style={tw`mb-2`}>
          <Text>Min Price: ${minPrice}</Text>
          <Slider
            minimumValue={34}
            maximumValue={100}
            value={minPrice}
            onValueChange={setMinPrice}
            step={1}
            style={tw`w-full`}
          />
        </View>

        <View>
          <Text>Max Price: ${maxPrice}</Text>
          <Slider
            minimumValue={34}
            maximumValue={100}
            value={maxPrice}
            onValueChange={setMaxPrice}
            step={1}
            style={tw`w-full`}
          />
        </View>
      </View>

      {/* Show Results and Reset Button */}
      <View style={tw`flex-row justify-between mt-4`}>
        <TouchableOpacity style={tw`bg-orange-500 py-3 px-6 rounded-full`}>
          <Text style={tw`text-white`}>Show Results</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReset}
          style={tw`bg-gray-300 py-3 px-6 rounded-full`}
        >
          <Text style={tw`text-gray-700`}>Reset</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Filters;
