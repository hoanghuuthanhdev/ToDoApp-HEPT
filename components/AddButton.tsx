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
}

const AddButton: React.FC<AddButtonProps> = ({ onPress }) => {
    // Animations - SEPARATE VALUES cho native và JS animations
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const sparkleAnim = useRef(new Animated.Value(0)).current;
    
    // Particle type
    interface Particle {
        id: number;
        x: number;
        y: number;
        size: number;
        opacity: number;
        animValue: Animated.Value;
    }

    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        // Animation de pulsation continue - NATIVE DRIVER
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true, // ✅ Native
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    easing: Easing.inOut(Easing.quad),
                    useNativeDriver: true, // ✅ Native
                })
            ])
        ).start();

        // Animation de glow - NATIVE DRIVER (changed from false to true)
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true, // ✅ Changed to native
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true, // ✅ Changed to native
                })
            ])
        ).start();

        // Animation des particules sparkle - NATIVE DRIVER
        Animated.loop(
            Animated.timing(sparkleAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true, // ✅ Native
            })
        ).start();

        generateParticles();
    }, []);

    const generateParticles = () => {
        const newParticles = [];
        for (let i = 0; i < 6; i++) {
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

        // Animer chaque particule - NATIVE DRIVER
        newParticles.forEach((particle, index) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(particle.animValue, {
                        toValue: 1,
                        duration: 2000 + index * 500,
                        useNativeDriver: true, //  Native
                    }),
                    Animated.timing(particle.animValue, {
                        toValue: 0,
                        duration: 2000 + index * 500,
                        useNativeDriver: true, //  Native
                    })
                ])
            ).start();
        });
    };

    const handlePressIn = () => {
        // Animation press - NATIVE DRIVER
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true, // ✅ Native
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true, // ✅ Native
            })
        ]).start();
    };

    const handlePressOut = () => {
        // Animation release - NATIVE DRIVER
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 300,
                friction: 4,
                useNativeDriver: true, // ✅ Native
            }),
            Animated.timing(rotateAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true, // ✅ Native
            })
        ]).start();

        createCelebrationEffect();
    };

    const createCelebrationEffect = () => {
        const celebrateAnim = new Animated.Value(0);
        Animated.timing(celebrateAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true, // ✅ Native
        }).start();
    };

    // Interpolations
    const glowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.8]
    });

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const sparkleTranslateY = sparkleAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20]
    });

    const sparkleOpacity = sparkleAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 1, 0]
    });

    return (
        <View style={styles.container}>
            {/* Effet de glow extérieur */}
            <Animated.View 
                style={[
                    styles.glowRing,
                    {
                        opacity: glowOpacity,
                        transform: [{ scale: pulseAnim }]
                    }
                ]}
            />

            {/* Particules flottantes */}
            {particles.map((particle) => {
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
                                left: 32 + particle.x,
                                top: 32 + particle.y,
                                width: particle.size,
                                height: particle.size,
                                opacity,
                                transform: [{ translateY }]
                            }
                        ]}
                    />
                );
            })}

            {/* Sparkles décoratifs */}
            <Animated.View 
                style={[
                    styles.sparkle,
                    styles.sparkle1,
                    {
                        opacity: sparkleOpacity,
                        transform: [{ translateY: sparkleTranslateY }]
                    }
                ]}
            />
            <Animated.View 
                style={[
                    styles.sparkle,
                    styles.sparkle2,
                    {
                        opacity: sparkleOpacity,
                        transform: [{ translateY: sparkleTranslateY }]
                    }
                ]}
            />
            <Animated.View 
                style={[
                    styles.sparkle,
                    styles.sparkle3,
                    {
                        opacity: sparkleOpacity,
                        transform: [{ translateY: sparkleTranslateY }]
                    }
                ]}
            />

            {/* Bouton principal */}
            <TouchableOpacity
                style={styles.button}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                activeOpacity={0.8}
            >
                <Animated.View 
                    style={[
                        styles.buttonInner,
                        {
                            transform: [
                                { scale: scaleAnim },
                                { rotate: rotateInterpolate }
                            ]
                        }
                    ]}
                >
                    {/* Gradient effect simulation */}
                    <View style={styles.gradientOverlay} />
                    
                    {/* Plus icon */}
                    <Text style={styles.plusIcon}>+</Text>
                    
                    {/* Shine effect */}
                    <View style={styles.shineEffect} />
                </Animated.View>
            </TouchableOpacity>

            {/* Ring pulsant */}
            <Animated.View 
                style={[
                    styles.pulseRing,
                    {
                        transform: [{ scale: pulseAnim }]
                    }
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },

    button: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    
    buttonInner: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#f3e5e5ff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FF6B6B',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 8,
        overflow: 'hidden',
    },

    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 32,
        backgroundColor: 'rgba(255, 142, 142, 0.3)',
    },

    plusIcon: {
        fontSize: 28,
        color: 'black',
        fontWeight: '300',
        textAlign: 'center',
        zIndex: 2,
    },

    shineEffect: {
        position: 'absolute',
        top: 8,
        left: 8,
        right: 8,
        height: 16,
        borderRadius: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },

    glowRing: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 107, 107, 0.2)',
        zIndex: 1,
    },

    pulseRing: {
        position: 'absolute',
        width: 72,
        height: 72,
        borderRadius: 36,
        borderWidth: 2,
        borderColor: 'rgba(252, 249, 249, 0.3)',
        zIndex: 2,
    },

    particle: {
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        zIndex: 5,
    },

    sparkle: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 2,
        zIndex: 6,
    },

    sparkle1: {
        width: 4,
        height: 4,
        top: 15,
        left: 20,
    },

    sparkle2: {
        width: 3,
        height: 3,
        top: 45,
        right: 18,
    },

    sparkle3: {
        width: 5,
        height: 5,
        bottom: 20,
        left: 25,
    },
});

export default AddButton;