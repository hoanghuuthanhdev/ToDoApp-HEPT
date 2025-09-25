import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const steps = [
  {
    image: require('../assets/images/playstore-icon.png'),
    title: 'Chào mừng đến với ToDoApp Win-Win!',
    desc: 'Quản lý công việc dễ dàng, hiện đại và cá nhân hóa.'
  },
  {
    image: require('../assets/images/createtask.png'),
    title: 'Tạo nhiệm vụ mới',
    desc: 'Nhấn nút + để thêm nhiệm vụ. Bạn có thể đặt tiêu đề, mô tả, thời gian hoàn thành.'
  },
  {
    image: require('../assets/images/check.png'),
    title: 'Hoàn thành & Ẩn nhiệm vụ',
    desc: 'Check vào ô để hoàn thành. Vuốt hoặc nhấn giữ để ẩn nhiệm vụ vào thùng rác.'
  },
  {
    image: require('../assets/images/delete.png'),
    title: 'Thùng rác',
    desc: 'Khôi phục hoặc xóa vĩnh viễn các nhiệm vụ đã ẩn. Không lo mất dữ liệu!' 
  },
  {
    image: require('../assets/images/theme.png'),
    title: 'Đổi giao diện',
    desc: 'Chuyển đổi giữa chế độ sáng/tối để phù hợp với sở thích.'
  },
];

interface OnboardingStepsProps {
  onFinish: () => void;
}

const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ onFinish }) => {
  const [step, setStep] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const isLast = step === steps.length - 1;

  const handleFinish = useCallback(async () => {
    if (isFinishing) return;
    
    setIsFinishing(true);
    try {
      await onFinish();
    } catch (error) {
      console.error('Error finishing onboarding:', error);
      setIsFinishing(false);
    }
  }, [onFinish, isFinishing]);

  const handleNextStep = useCallback(() => {
    if (isLast) {
      handleFinish();
    } else {
      setStep(prev => prev + 1);
    }
  }, [isLast, handleFinish]);

  const handlePreviousStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={steps[step].image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{steps[step].title}</Text>
      <Text style={styles.desc}>{steps[step].desc}</Text>
      <View style={styles.progressRow}>
        {steps.map((_, idx) => (
          <View key={idx} style={[styles.dot, step === idx && styles.activeDot]} />
        ))}
      </View>
      <View style={styles.buttonRow}>
        {step > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.backButton]}
            onPress={handlePreviousStep}
            disabled={isFinishing}
          >
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.button,
            isFinishing && styles.disabledButton
          ]}
          onPress={handleNextStep}
          disabled={isFinishing}
        >
          <Text style={styles.buttonText}>
            {isFinishing 
              ? 'Đang khởi tạo...' 
              : isLast 
                ? 'Bắt đầu sử dụng' 
                : 'Tiếp tục'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#ccc',
  },
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
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#456882',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  progressRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#456882',
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
  disabledButton: {
    backgroundColor: '#999',
    opacity: 0.6,
  },
});

export default OnboardingSteps;
