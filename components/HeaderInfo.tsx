import { useTheme } from '@contexts/context';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

interface InfoHeaderProps {
  title?: string;
  icon?: keyof typeof FontAwesome.glyphMap;
}

const InfoHeader: React.FC<InfoHeaderProps> = ({
  title = 'Thông tin ứng dụng',
  icon = 'info-circle',
}) => {
  const { colors, theme, setTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const themeMenuItems = [
    { key: 'light', label: 'Chế độ sáng', icon: 'sun-o' },
    { key: 'dark', label: 'Chế độ tối', icon: 'moon-o' },
    { key: 'back', label: 'Quay lại', icon: 'arrow-left' },
  ];

  const handleMenuAction = (key: string) => {
    switch (key) {
      case 'light':
        setTheme('light');
        break;
      case 'dark':
        setTheme('dark');
        break;
      case 'back':
        router.back();
        break;
    }
    setShowThemeMenu(false);
  };

  const handleOutsidePress = () => {
    if (showThemeMenu) setShowThemeMenu(false);
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <FontAwesome name={icon} size={22} color="white" />
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Theme Menu */}
        <View style={styles.themeSection}>
          <TouchableOpacity onPress={() => setShowThemeMenu(!showThemeMenu)}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>

          {showThemeMenu && (
            <View style={styles.themeMenuWrapper}>
              <View
                style={[
                  styles.themeMenu,
                  { backgroundColor: colors.background },
                ]}
              >
                {themeMenuItems.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.themeMenuItem,
                      { backgroundColor: colors.background },
                    ]}
                    onPress={() => handleMenuAction(item.key)}
                  >
                    <FontAwesome
                      name={item.icon as any}
                      size={16}
                      color={colors.text}
                      style={styles.themeMenuIcon}
                    />
                    <Text
                      style={[styles.themeMenuText, { color: colors.text }]}
                    >
                      {item.label}
                    </Text>
                    {((item.key === 'light' && theme === 'light') ||
                      (item.key === 'dark' && theme === 'dark')) && (
                      <FontAwesome
                        name="check"
                        size={14}
                        color={colors.primary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#456882',
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    zIndex: 1000,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  titleSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  themeSection: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeMenuWrapper: {
    position: 'absolute',
    top: 45,
    right: 0,
    zIndex: 5000,
  },
  themeMenu: {
    borderRadius: 8,
    paddingVertical: 8,
    minWidth: 150,
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  themeMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  themeMenuIcon: {
    marginRight: 10,
  },
  themeMenuText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
});

export default InfoHeader;
