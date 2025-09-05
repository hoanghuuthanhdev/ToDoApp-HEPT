import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/chill.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Chào mừng bạn đến với ToDoApp!</Text>
      <Text style={styles.desc}>
        - Tạo, cập nhật, hoàn thành và ẩn nhiệm vụ dễ dàng. {'\n'}
        - Vuốt hoặc nhấn giữ để thao tác nhanh với task. {'\n'}
        - Chuyển nhiệm vụ vào thùng rác, khôi phục hoặc xóa vĩnh viễn. {'\n'}
        - Đổi giao diện sáng/tối, cá nhân hóa trải nghiệm.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onFinish}>
        <Text style={styles.buttonText}>Bắt đầu sử dụng</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#456882',
    marginBottom: 16,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#333',
    marginBottom: 32,
    textAlign: 'left',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#456882',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
