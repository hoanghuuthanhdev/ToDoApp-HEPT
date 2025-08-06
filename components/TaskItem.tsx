import AntDesign from '@expo/vector-icons/AntDesign';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

interface TaskItemProps {
    id: string;
    title: string;
    completed?: boolean;
    onToggle?: (id: string) => void;
    onPress?: (id: string) => void;
    onDelete?: (id: string) => void;
    onHide?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    id,
    title,
    completed = false,
    onToggle,
    onPress,
    onDelete,
    onHide,
}) => {

    const [isChecked, setIsChecked] = useState(completed);
    const [showDelete, setShowDelete] = useState(false);


    //animation values
    const shake = useSharedValue(0);
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);
    const height = useSharedValue(80);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: shake.value },
            { scale: scale.value }
        ],
        opacity: opacity.value,
        height: height.value,
        overflow: 'hidden',
    }));


    // Function to show delete button
    const showDeleteButton = () => {
        setShowDelete(true);
    };

    //function to hide task item with animation
      const hideTaskItem = () => {
        opacity.value = withTiming(0, { duration: 300 });
        scale.value = withTiming(0.8, { duration: 300 });
        height.value = withTiming(0, { duration: 300 }, () => {
            if (onHide) {
                runOnJS(onHide)(id);
            }
        });
    };


    // Long press gesture
    const longPressGesture = Gesture.LongPress()
        .minDuration(800) // Tăng thời gian để dễ test
        .onStart(() => {
            // Shake animation
            shake.value = withSequence(
                withTiming(-10, { duration: 50 }),
                withTiming(10, { duration: 50 }),
                withTiming(-10, { duration: 50 }),
                withTiming(10, { duration: 50 }),
                withTiming(-5, { duration: 50 }),
                withTiming(5, { duration: 50 }),
                withTiming(0, { duration: 50 })
            );
            // Show delete button
            runOnJS(showDeleteButton)();
        });

    const handleToggle = () => {
        setIsChecked(!isChecked);
        onToggle?.(id);
    };

    const handlePress = () => {
        if (!showDelete) {
            onPress?.(id);
        }
    };

    const handleDelete = () => {
        onDelete?.(id);
        setShowDelete(false);
    };

    const handelHideTaskItem = () => {
        setShowDelete(false);
        hideTaskItem();
    };

    return (
        <GestureDetector gesture={longPressGesture}>
            <Animated.View style={[styles.container, animatedStyle]}>
                <View style={styles.content}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        onValueChange={handleToggle}
                        color={isChecked ? '#4CAF50' : undefined}
                    />

                    <TouchableOpacity style={styles.textContainer} onPress={handlePress}>
                        <Text style={[
                            styles.title,
                            isChecked && styles.completedTitle
                        ]}>
                            {title}
                        </Text>
                    </TouchableOpacity>

                    {/* Minus icon khi task completed */}
                    {isChecked && !showDelete && (
                        <TouchableOpacity onPress={handelHideTaskItem}>
                            <AntDesign
                                style={styles.minusIcon}
                                name="minus"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    )}

                    {/* Delete button khi long press */}
                    {showDelete && (
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={handleDelete}
                        >
                            <AntDesign name="delete" size={16} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        justifyContent: 'center'
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 12,
        width: 25,
        height: 25,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    completedTitle: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    minusIcon: {
     backgroundColor: '#FFE5E5',
        borderWidth: 1,
        borderColor: '#FF6B6B',
        borderRadius: 6,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 36,
        minHeight: 36,
    },
    deleteButton: {
        backgroundColor: '#FF4444',
        padding: 10,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 40,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default TaskItem;