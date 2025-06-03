import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo.png";
const entryImg= require("../assets/images/Frame.png");

export default function Index() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView className="bg-[#2b2b2b]">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="m-3 flex justify-center items-center">
            <Image source={logo} style={{ width: 300, height: 300 }} />
             <View className="w-3/4">
              <TouchableOpacity
                onPress={() => router.push("/signup")}
                className="p-2 my-2 bg-[#f49b33] rounded-lg"
                accessibilityRole="button"
                accessibilityLabel="Sign up"
              >
                <Text className="text-lg font-semibold text-center text-black">
                  Signup
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/home")}
                className="p-2 my-2 border border-[#f49b33] rounded-lg"
                accessibilityRole="button"
                accessibilityLabel="Continue as guest"
              >
                <Text className="text-base font-semibold text-center text-white">
                  Guestuser
                </Text>
              </TouchableOpacity>
            </View>

            {/* Separator */}
            <View className="flex-row items-center justify-center my-4">
              <View className="border-b-2 border-[#f49b33] w-24 mx-2" />
              <Text className="text-white font-semibold">or</Text>
              <View className="border-b-2 border-[#f49b33] w-24 mx-2" />
            </View>

            {/* Sign in option */}
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => router.push("/signin")}
              accessibilityRole="button"
              accessibilityLabel="Sign in if you already have an account"
            >
              <Text className="text-white font-semibold mr-1">
                Already a user?
              </Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-1">
            <Image source={entryImg} className="w-full h-full" resizeMode="contain"></Image>
          </View>
          <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
