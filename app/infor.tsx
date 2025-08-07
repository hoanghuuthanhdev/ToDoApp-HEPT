import InfoHeader from "@components/HeaderInfo";
import { ThemeProvider, useTheme } from "@contexts/context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const InfoScreen = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const appInfo = {
    name: "ToDoApp - HEPT",
    version: "1.0.0",
    developer: "Thanh.sd",
    description:
      "Dự án ứng dụng công nghệ React Native & Expo thực hành các kiến thức căn bản vào đời sống, quản lý công việc đơn giản và hiệu quả",
    features: [
      "Tạo và quản lý nhiệm vụ",
      "Lọc nhiệm vụ theo trạng thái",
      "Chế độ sáng/tối",
      "Thông báo",
    ],
    contact: {
      email: "thanhhuuhoang.sd@gmail.com",
      website: "https://hephaestus-tech.org/",
      github: "https://github.com/hoanghuuthanhdev/ToDoApp-HEPT",
    },
  };

  const handleContactPress = async (type: string, value: string) => {
    let url = "";

    switch (type) {
      case "email":
        url = `mailto:${value}`;
        break;
      case "website":
        url = value;
        break;
      case "github":
        url = value;
        break;
    }
    try {
      // Với email → kiểm tra được
      if (url.startsWith("mailto:")) {
        const supported = await Linking.canOpenURL(url);
        if (!supported) {
          alert("Thiết bị không hỗ trợ mở email.");
          return;
        }
      }

      // Với URL web → không kiểm tra, mở luôn
      await Linking.openURL(url);
    } catch (error) {
      alert("Đã xảy ra lỗi khi mở liên kết.");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: colors.background,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
            },
          ]}
        >
          {/* Header */}
          <InfoHeader />

          {/* Content */}
          <ScrollView
            style={[styles.content, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* App Logo & Name */}
            <View style={styles.logoSection}>
              <View
                style={[
                  styles.logoContainer,
                  { backgroundColor: colors.primary },
                ]}
              >
                <FontAwesome name="check-square-o" size={60} color="white" />
              </View>
              <Text style={[styles.appName, { color: colors.text }]}>
                {appInfo.name}
              </Text>
              <Text style={[styles.version, { color: colors.textSecondary }]}>
                Phiên bản {appInfo.version}
              </Text>
            </View>

            {/* Description */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Mô tả
              </Text>
              <Text
                style={[styles.description, { color: colors.textSecondary }]}
              >
                {appInfo.description}
              </Text>
            </View>

            {/* Features */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Tính năng chính
              </Text>
              {appInfo.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <FontAwesome
                    name="check-circle"
                    size={16}
                    color={colors.primary}
                    style={styles.featureIcon}
                  />
                  <Text
                    style={[
                      styles.featureText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* Developer Info */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Nhà phát triển
              </Text>
              <Text style={[styles.developerName, { color: colors.primary }]}>
                {appInfo.developer}
              </Text>
            </View>

            {/* Contact */}
            <View style={[styles.section, { backgroundColor: colors.surface }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Liên hệ
              </Text>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() =>
                  handleContactPress("email", appInfo.contact.email)
                }
              >
                <FontAwesome name="envelope" size={20} color={colors.primary} />
                <Text
                  style={[styles.contactText, { color: colors.textSecondary }]}
                >
                  {appInfo.contact.email}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() =>
                  handleContactPress("website", appInfo.contact.website)
                }
              >
                <FontAwesome name="globe" size={20} color={colors.primary} />
                <Text
                  style={[styles.contactText, { color: colors.textSecondary }]}
                >
                  {appInfo.contact.website}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.contactItem}
                onPress={() =>
                  handleContactPress("github", appInfo.contact.github)
                }
              >
                <FontAwesome name="github" size={20} color={colors.primary} />
                <Text
                  style={[styles.contactText, { color: colors.textSecondary }]}
                >
                  GitHub Repository
                </Text>
              </TouchableOpacity>
            </View>

            {/* Copyright */}
            <View style={styles.footer}>
              <Text style={[styles.copyright, { color: colors.textSecondary }]}>
                Thank you❤️ "No perfection, only better".
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

const InfoApp = () => {
  return (
    <ThemeProvider>
      <InfoScreen />
    </ThemeProvider>
  );
};
export default InfoApp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  version: {
    fontSize: 16,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    flex: 1,
  },
  developerName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  footer: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  copyright: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 5,
  },
});
