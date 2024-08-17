import { UserApi } from "@/api/UserApi";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import images from "@/constants/images";
import { SecureStore } from "@/helpers/SecureStore";
import { validationErrorHandler } from "@/helpers/validationErrorHandler";
import { FormTypeWithError } from "@/typescript/utils/FormType";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<FormTypeWithError<{ username: string; password: string }>>({
    username: {
      value: "",
    },
    password: {
      value: "",
    },
  });

  const submit = async () => {
    try {
      const data = await UserApi.signIn(form);

      await SecureStore.set("token", data.token);

      router.push("/(tabs)/chats");
    } catch (error: any) {
      if (error.response?.data?.statusCode === 422) return validationErrorHandler([form, setForm], error.response.data.details);

      if (error.response.status === 503) {
        Alert.alert("Erro!", "O serviço está indisponível.");

        return;
      }

      Alert.alert("Erro!", error.response?.data?.message || "Erro desconhecido");
    }
  };

  return (
    <SafeAreaView className="bg-mirage-950 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center  min-h-[85vh] px-4 ">
          <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain" />

          <Text className="font-pmedium text-2xl text-gray-50">Sign In to Aora</Text>

          <FormField
            title="Username"
            value={form.username.value}
            handleChange={(v: string) => setForm({ ...form, username: { value: v } })}
            otherStyles="mt-10"
          />

          <FormField
            title="Password"
            value={form.password.value}
            handleChange={(v: string) => setForm({ ...form, password: { value: v } })}
            otherStyles="mt-7"
            isSecure
          />

          <CustomButton title="Sign In" handlePress={submit} containerStyles="mt-7" isLoading={isSubmitting} />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-50 font-pregular">Don't have an account?</Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
