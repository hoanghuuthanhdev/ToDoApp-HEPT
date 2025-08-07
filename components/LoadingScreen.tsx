import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SimpleLoadingScreenProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const SimpleLoadingScreen: React.FC<SimpleLoadingScreenProps> = ({ 
  onLoadingComplete, 
  duration = 2500 
}) => {
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <View style={styles.container}>
       <FontAwesome name="check-square-o" size={60} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#456882', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.6,
    height: height * 0.4,
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default SimpleLoadingScreen;