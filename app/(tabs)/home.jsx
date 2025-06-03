import { View, Text, Platform, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import logo from "../../assets/images/logo.png";
import logo from "../../assets/images/logo.png";

const Home = () => {
  return (
    <SafeAreaView style={{backgroundColor:"#2b2b2b"}}>
      <View className="flex items-center">
        <View className="bg-[#5f5f5f] w-11/12 rounded-lg shadow-lg justify-between items-center">
          <View className="flex flex-row">
            <Text className={`text-base h-10 pt-[${
              Platform.OS== "ios" ? 8: 6.5
              }]
            align-middle text-white`}>
              Welcome to
            </Text>
            <Image resizeMode="cover" className={"w-20 h-12"} source={logo}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home