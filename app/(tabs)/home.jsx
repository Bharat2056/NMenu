import { BlurView } from 'expo-blur';
import { Image, ImageBackground, Platform, ScrollView, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import restaurants from '../../store/restaurants.js';
import banner from '../../assets/images/homeBanner.png';
import logo from '../../assets/images/logo.png';
import { useEffect } from 'react';
import uploadData from '../../config/bulkupload.js';

const Home = () => {
  useEffect(()=>{
        uploadData();
  },[])
  uploadData();
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push(`/restaurants/${item.name}`)}
      className="bg-[#5f5f5f] max-h-64 max-w-xs flex justify-center rounded-lg p-4 mx-4 shadow-md"
    >
      <Image
        resizeMode="cover"
        source={{ uri: item.image }}
        className="h-28 mt-2 mb-1 rounded-lg"
      />
      <Text className="text-white text-lg font-bold mb-2">{item.name}</Text>
      <Text className="text-white text-base mb-2">{item.address}</Text>
      <Text className="text-white text-base mb-2">
        Open: {item.opening} - Close: {item.closing}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={[
        { backgroundColor: '#2b2b2b' },
        Platform.OS === 'android' ? { paddingBottom: 55 } : { paddingBottom: 20 },
      ]}
    >
      <View className="flex items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center flex flex-row p-2 ">
          <View className="flex flex-row">
            <Text className={`text-base h-10 ${Platform.OS === 'ios' ? 'pt-[8px]' : 'pt-1'} align-middle text-white`}>
              Welcome to
            </Text>
            <Image resizeMode="cover" className="w-20 h-12" source={logo} />
          </View>
        </View>
      </View>

      <ScrollView stickyHeaderIndices={[0]}>
        <ImageBackground
          resizeMode="cover"
          className="mb-4 w-full bg-[#2b2b2b] h-52 items-center justify-center"
          source={banner}
        >
          <BlurView
            intensity={Platform.OS === 'android' ? 100 : 25}
            tint="dark"
            className="w-full p-4 shadow-lg"
          >
            <Text className="text-center text-3xl font-bold text-white">
              Dine with your loved ones
            </Text>
          </BlurView>
        </ImageBackground>

        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-white mr-2 font-semibold">Special Discount %</Text>
        </View>

        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator animating color="#fb9b33" />
        )}

        <View className="p-4 bg-[#2b2b2b] flex-row items-center">
          <Text className="text-3xl text-[#fb9b33] mr-2 font-semibold">Our Restaurants</Text>
        </View>

        {Array.isArray(restaurants) && restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
            horizontal
            contentContainerStyle={{ padding: 16 }}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <ActivityIndicator animating color="#fb9b33" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
