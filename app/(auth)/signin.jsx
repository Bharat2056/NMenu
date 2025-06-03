import { useRouter } from "expo-router";
import { Formik } from "formik";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";
import validationSchema from "../../utils/authSchema";
const entryImg = require("../../assets/images/Frame.png");

const Signin = () => {
  const router=useRouter();
  const handleSignin = () => {};
  return (
    <SafeAreaView className="bg-[#2b2b2b]">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="m-2 flex justify-center items-center">
          <Image source={logo} style={{ width: 200, height: 100 }} />
          <Text className="text-lg text-center text-white font-bold mb-10">
            Let's get you started
          </Text>

          <View className="w-5/6">
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema} 
              onSubmit={handleSignin}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View className="w-full">
                  <Text className="text-[#f49b33] mt-4 mb-2">Email</Text>
                  <TextInput
                    className="h-10 border-white border text-white rounded px-2"
                    keyboardType="email-address"
                    onChangeText={handleChange("email")}
                    value={values.email}
                    onBlur={handleBlur("email")}
                  />
                  {touched.email && errors.email && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.email}
                    </Text>
                  )}

                  <Text className="text-[#f49b33] mt-4 mb-2">Password</Text>
                  <TextInput
                    className="h-10 border-white border text-white rounded px-2"
                    secureTextEntry={true}
                    onChangeText={handleChange("password")}
                    value={values.password}
                    onBlur={handleBlur("password")}
                  />
                  {touched.password && errors.password && (
                    <Text className="text-red-500 text-xs mb-2">
                      {errors.password}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="p-2 my-4 bg-[#f49b33] mt-10 text-black rounded-lg"
                  >
                    <Text className="text-lg font-semibold text-center ">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View>
              <TouchableOpacity
              className="flex-row items-center justify-center my-5 p-2 items-center"
              onPress={() => router.push("/signup")}
              accessibilityRole="button"
              accessibilityLabel="Sign in if you already have an account"
            >
              <Text className="text-white font-semibold mr-1">
                New user?
              </Text>
              <Text className="text-base font-semibold underline text-[#f49b33]">
                Sign up
              </Text>
            </TouchableOpacity>
            </View>
          </View>

          <View className="flex-1">
            <Image
              source={entryImg}
              className="w-full h-full"
              resizeMode="contain"
            ></Image>
          </View>
        </View>
        <StatusBar barStyle="light-content" backgroundColor="#2b2b2b" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;


