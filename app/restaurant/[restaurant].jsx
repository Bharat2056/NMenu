import {
  View,
  Text,
  Platform,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
  Linking,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import DatePickerComponent from "../components/restaurant/DatePickerComponent";
import GuestPickerComponent from "../components/restaurant/GuestPickerComponent";
import FindSlots from "../components/restaurant/FindSlots";

// Import your local data arrays
import {
  restaurants as allRestaurants, // Renamed to avoid conflict with `restaurant` param
  carouselImages as allCarouselImages,
  slots as allSlots,
} from "../../store/restaurants"; // Assuming you'll create this file

export default function Restaurant() {
  const { restaurant: restaurantName } = useLocalSearchParams(); // Renamed for clarity
  const flatListRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [restaurantData, setRestaurantData] = useState({});
  const [carouselData, setCarouselData] = useState({});
  const [slotsData, setSlotsData] = useState([]); // Initialize as array

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(2);
  const [date, setDate] = useState(new Date());

  const handleNextImage = () => {
    const carouselLength = carouselData.images?.length;
    if (carouselLength > 0) { // Add check for carouselLength
      if (currentIndex < carouselLength - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      } else {
        // Loop back to the first image
        setCurrentIndex(0);
        flatListRef.current.scrollToIndex({ index: 0, animated: true });
      }
    }
  };

  const handlePrevImage = () => {
    const carouselLength = carouselData.images?.length;
    if (carouselLength > 0) { // Add check for carouselLength
      if (currentIndex > 0) {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        flatListRef.current.scrollToIndex({ index: prevIndex, animated: true });
      } else {
        // Loop back to the last image
        setCurrentIndex(carouselLength - 1);
        flatListRef.current.scrollToIndex({ index: carouselLength - 1, animated: true });
      }
    }
  };

  const carouselItem = ({ item }) => {
    return (
      <View style={{ width: windowWidth - 2 }} className="h-64 relative">
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            right: "6%",
          }}
        >
          <Ionicons
            onPress={handleNextImage}
            name="arrow-forward"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: "50%",
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 50,
            padding: 5,
            zIndex: 10,
            left: "2%",
          }}
        >
          <Ionicons
            onPress={handlePrevImage}
            name="arrow-back"
            size={24}
            color="white"
          />
        </View>
        <View
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            left: "50%",
            transform: [{ translateX: -50 }],
            zIndex: 10,
            bottom: 15,
          }}
        >
          {carouselData.images?.map((_, i) => ( // Access images directly from carouselData
            <View
              key={i}
              className={`bg-white h-2 w-2 ${
                i == currentIndex ? "h-3 w-3" : "" // Use ternary for cleaner class assignment
              } p-1 mx-1 rounded-full`}
            />
          ))}
        </View>
        <Image
          source={{ uri: item }}
          style={{
            opacity: 0.5,
            backgroundColor: "black",
            marginRight: 20,
            marginLeft: 5,
            borderRadius: 25,
          }}
          className="h-64"
        />
      </View>
    );
  };

  const getLocalRestaurantData = () => {
    try {
      // Find the matching restaurant data
      const foundRestaurant = allRestaurants.find(
        (res) => res.name === restaurantName
      );

      if (!foundRestaurant) {
        console.log("No matching restaurant found locally for:", restaurantName);
        setRestaurantData({}); // Clear data if not found
        setCarouselData({});
        setSlotsData([]);
        return;
      }

      setRestaurantData(foundRestaurant);

      // Construct a pseudo-ref_id for matching
      const pseudoRefId = `/restaurants/${foundRestaurant.name.replace(/\s+/g, '_').toLowerCase()}`; // Example: "sea_grill_of_merrick_park"

      // Find matching carousel images
      const foundCarousel = allCarouselImages.find(
        (item) => item.res_id.includes(foundRestaurant.name.replace(/\s+/g, '_').toLowerCase()) || item.res_id.includes(pseudoRefId)
      );

      if (foundCarousel) {
        setCarouselData(foundCarousel);
      } else {
        console.log("No matching carousel images found locally for:", restaurantName);
        setCarouselData({});
      }

      // Find matching slots data
      const foundSlots = allSlots.find(
        (item) => item.ref_id.includes(foundRestaurant.name.replace(/\s+/g, '_').toLowerCase()) || item.ref_id.includes(pseudoRefId)
      );

      if (foundSlots) {
        setSlotsData(foundSlots.slot);
      } else {
        console.log("No matching slots found locally for:", restaurantName);
        setSlotsData([]);
      }

    } catch (error) {
      console.log("Error fetching local data", error);
    }
  };

  const handleLocation = async () => {
    // You might want to use the actual restaurant address here if available
    const address = restaurantData?.address || "Unknown Location";
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${encodeURIComponent(address)}`,
      android: `geo:0,0?q=${encodeURIComponent(address)}`,
    });

    if (url) {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open URL", url);
        alert(`Cannot open map for: ${address}`);
      }
    }
  };

  useEffect(() => {
    getLocalRestaurantData();
  }, [restaurantName]); // Rerun effect if restaurantName changes

  return (
    <SafeAreaView
      style={[
        { backgroundColor: "#2b2b2b" },
        Platform.OS == "android" && { paddingBottom: 55 },
        Platform.OS == "ios" && { paddingBottom: 20 },
      ]}
    >
      <ScrollView className="h-full">
        <View className="flex-1 my-2 p-2">
          <Text className="text-xl text-[#f49b33] mr-2 font-semibold">
            {restaurantName}
          </Text>
          <View className="border-b border-[#f49b33]" />
        </View>
        <View className="h-64 max-w-[98%] mx-2 rounded-[25px]">
          {carouselData.images?.length > 0 ? ( // Only render if images exist
            <FlatList
              ref={flatListRef}
              data={carouselData.images}
              renderItem={carouselItem}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={{ borderRadius: 25 }}
            />
          ) : (
            <View className="flex-1 items-center justify-center bg-[#474747] rounded-[25px]">
              <Text className="text-white text-lg">No images available</Text>
            </View>
          )}
        </View>
        <View className="flex-1 flex-row mt-2 p-2">
          <Ionicons name="location-sharp" size={24} color="#f49b33" />
          <Text className="max-w-[75%] text-white">
            {restaurantData?.address} |{"  "}
            <Text
              onPress={handleLocation}
              className="underline flex items-center mt-1 text-[#f49b33] italic font-semibold"
            >
              Get Direction
            </Text>
          </Text>
        </View>
        <View className="flex-1 flex-row p-2">
          <Ionicons name="time" size={20} color="#f49b33" />
          <Text className="max-w-[75%] mx-2 font-semibold text-white">
            {restaurantData?.opening} - {restaurantData?.closing}
          </Text>
        </View>
        <View className="flex-1 border m-2 p-2 border-[#f49b33] rounded-lg">
          <View className="flex-1 flex-row m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="calendar" size={20} color="#f49b33" />
              <Text className="text-white mx-2 text-base">
                Select booking date
              </Text>
            </View>
            <DatePickerComponent date={date} setDate={setDate} />
          </View>
          <View className="flex-1 flex-row bg-[#474747] rounded-lg  m-2 p-2 justify-end items-center">
            <View className="flex-1 flex-row">
              <Ionicons name="people" size={20} color="#f49b33" />
              <Text className="text-white mx-2 text-base">
                Select number of guests
              </Text>
            </View>
            <GuestPickerComponent
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
            />
          </View>
        </View>
        <View className="flex-1">
          <FindSlots
            restaurant={restaurantName} // Pass the correct prop name
            date={date}
            selectedNumber={selectedNumber}
            slots={slotsData}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
