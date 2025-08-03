import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

interface AddButtonProps {
    onPress: () => void;
    icon?: 'plus' | 'save' | 'edit' | 'delete' | 'check' | 'cancel';
    iconLibrary?: 'FontAwesome' | 'Entypo' | 'AntDesign';
    text?: string; // Optional text
    backgroundColor?: string; // Custom background color
    size?: 'small' | 'medium' | 'large'; // Size variants
    animated?: boolean; // Enable/disable animations
    variant?: 'primary' | 'secondary' | 'danger' | 'success'; // Style variants
}

const AddButton: React.FC<AddButtonProps> = ({ 
    onPress,
    icon = 'plus',
    iconLibrary = 'AntDesign',
    text,
    backgroundColor,
    size = 'medium',
    animated = true,
    variant = 'primary'
}) => {
    // Animations
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const sparkleAnim = useRef(new Animated.Value(0)).current;
    
    interface Particle {
        id: number;
        x: number;
        y: number;
        size: number;
        opacity: number;
        animValue: Animated.Value;
    }

    const [particles, setParticles] = useState<Particle[]>([]);

    // Size configurations
    const sizeConfig = {
        small: { 
            buttonSize: 40, 
            iconSize: 16, 
            fontSize: 12,
            padding: 8
        },
        medium: { 
            buttonSize: 60, 
            iconSize: 24, 
            fontSize: 14,
            padding: 12
        },
        large: { 
            buttonSize: 80, 
            iconSize: 32, 
            fontSize: 16,
            padding: 16
        }
    };

    // Variant configurations
    const variantConfig = {
        primary: { backgroundColor: '#4CAF50', glowColor: '#4CAF50' },
        secondary: { backgroundColor: '#2196F3', glowColor: '#2196F3' },
        danger: { backgroundColor: '#f44336', glowColor: '#f44336' },
        success: { backgroundColor: '#8BC34A', glowColor: '#8BC34A' }
    };

    const currentSize = sizeConfig[size];
    const currentVariant = variantConfig[variant];

    useEffect(() => {
        if (!animated) return;

        // Pulse animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true,
                })
            ])
        ).start();

        // Glow animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start();

        // Sparkle animation
        Animated.loop(
            Animated.timing(sparkleAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();

        generateParticles();
    }, [animated]);

    const generateParticles = () => {
        if (!animated) return;
        
        const particleCount = size === 'large' ? 8 : size === 'medium' ? 6 : 4;
        const newParticles = [];
        
        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 60 - 30,
                y: Math.random() * 60 - 30,
                size: Math.random() * 4 + 2,
                opacity: Math.random() * 0.6 + 0.2,
                animValue: new Animated.Value(0)
            });
        }
        setParticles(newParticles);

        newParticles.forEach((particle, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(particle.animValue, {
                        toValue: 1,
                        duration: 2000 + index * 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(particle.animValue, {
                        toValue: 0,
                        duration: 2000 + index * 500,
                        useNativeDriver: true,
                    })
                ])
            ).start();
        });
    };

    const handlePressIn = () => {
        if (!animated) return;
        
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handlePressOut = () => {
        if (!animated) return;
        
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 300,
                friction: 4,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    // Icon renderer with proper name mapping
    type IconLibrary = 'FontAwesome' | 'Entypo' | 'AntDesign';
    type IconName = 'plus' | 'save' | 'edit' | 'delete' | 'check' | 'cancel';

    const getIconName = (iconName: IconName, library: IconLibrary) => {
        const iconMappings: Record<IconLibrary, Record<IconName, string>> = {
            FontAwesome: {
                plus: 'plus',
                save: 'save',
                edit: 'edit',
                delete: 'trash',
                check: 'check',
                cancel: 'times'
            },
            Entypo: {
                plus: 'plus',
                save: 'save',
                edit: 'edit',
                delete: 'trash',
                check: 'check',
                cancel: 'cross'
            },
            AntDesign: {
                plus: 'plus',
                save: 'save',
                edit: 'edit',
                delete: 'delete',
                check: 'check',
                cancel: 'close'
            }
        };
        
        return iconMappings[library]?.[iconName] || iconName;
    };

    const renderIcon = () => {
        const mappedIconName = getIconName(icon, iconLibrary);

        switch (iconLibrary) {
            case 'FontAwesome':
                return (
                    <FontAwesome
                        name={mappedIconName as React.ComponentProps<typeof FontAwesome>['name']}
                        size={currentSize.iconSize}
                        color="white"
                    />
                );
            case 'Entypo':
                return (
                    <Entypo
                        name={mappedIconName as React.ComponentProps<typeof Entypo>['name']}
                        size={currentSize.iconSize}
                        color="white"
                    />
                );
            default:
                return (
                    <AntDesign
                        name={mappedIconName as React.ComponentProps<typeof AntDesign>['name']}
                        size={currentSize.iconSize}
                        color="white"
                    />
                );
        }
    };

    // Interpolations
    const glowOpacity = animated ? glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.8]
    }) : 0.3;

    const rotateInterpolate = animated ? rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    }) : '0deg';

    const sparkleTranslateY = animated ? sparkleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20]
    }) : 0;

    const sparkleOpacity = animated ? sparkleAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
    }) : 0;

    const finalBackgroundColor = backgroundColor || currentVariant.backgroundColor;

    return (
        <View style={[styles.container, { width: currentSize.buttonSize + 40, height: currentSize.buttonSize + 40 }]}>
            {/* Glow effect */}
            {animated && (
                <Animated.View 
                    style={[
                        styles.glowRing,
                        {
                            width: currentSize.buttonSize + 20,
                            height: currentSize.buttonSize + 20,
                            borderRadius: (currentSize.buttonSize + 20) / 2,
                            backgroundColor: currentVariant.glowColor,
                            opacity: glowOpacity,
                            transform: [{ scale: pulseAnim }]
                        }
                    ]}
                />
            )}

            {/* Particles */}
            {animated && particles.map((particle) => {
                const translateY = particle.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [particle.y, particle.y - 30]
                });
                
                const opacity = particle.animValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, particle.opacity, 0]
                });

                return (
                    <Animated.View
                        key={particle.id}
                        style={[
                            styles.particle,
                            {
                                left: (currentSize.buttonSize / 2) + particle.x,
                                top: (currentSize.buttonSize / 2) + particle.y,
                                width: particle.size,
                                height: particle.size,
                                opacity,
                                transform: [{ translateY }]
                            }
                        ]}
                    />
                );
            })}

            {/* Main button */}
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        width: currentSize.buttonSize,
                        height: currentSize.buttonSize,
                        borderRadius: currentSize.buttonSize / 2,
                        backgroundColor: finalBackgroundColor,
                        padding: currentSize.padding
                    }
                ]}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Animated.View 
                    style={[
                        styles.buttonInner,
                        {
                            transform: animated ? [
                                { scale: scaleAnim },
                                { rotate: rotateInterpolate }
                            ] : []
                        }
                    ]}
                >
                    {renderIcon()}
                    {text && (
                        <Text style={[styles.text, { fontSize: currentSize.fontSize }]}>
                            {text}
                        </Text>
                    )}
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    glowRing: {
        position: 'absolute',
        opacity: 0.3,
    },
    particle: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 50,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    buttonInner: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        marginTop: 4,
        textAlign: 'center',
    },
});

export default AddButton;