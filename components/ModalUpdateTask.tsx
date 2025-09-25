import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AddButton from './AddButton';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#456882',
        padding: 10,
        position: 'relative',
        height: 60,
        borderRadius: 15
    },
    groupInput: {
        marginBottom: 15,
    },
    text: {
        fontSize: 20,
        fontWeight: "400",
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        padding: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        minHeight: 40,
        justifyContent: 'center',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginVertical: 10,
        padding: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        minHeight: 40,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    //footer
    containerFooter: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 15,
        margin: 20
    }

});

interface IProp {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void; // Fix type
    updateTask: (task: any) => void;
    TaskData: {
        id: string;
        title: string;
        description?: string;
        dueDate?: Date;
    }
}


const UpdateModal = ({ modalVisible, setModalVisible, updateTask, TaskData }: IProp) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const prevTaskId = useRef<string | null>(null);


    useEffect(() => {
        if (modalVisible && TaskData && TaskData.id !== prevTaskId.current) {
            prevTaskId.current = TaskData.id;
            setTitle(TaskData.title || "");
            setDescription(TaskData.description || "");
            setDate(TaskData.dueDate ? new Date(TaskData.dueDate) : new Date());
        }
    }, [modalVisible, TaskData]);

    useEffect(() => {
        if (!modalVisible) {
            prevTaskId.current = null;
        }
    }, [modalVisible]);

    // Date change handler
    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên nhiệm vụ!');
            return;
        }

        const updatedTask = {
            id: TaskData?.id,
            title: title.trim(),
            description: description.trim(),
            dueDate: date,
            updatedAt: new Date()
        };

        updateTask(updatedTask);
        resetForm();
        setModalVisible(false);
    };


    const resetForm = () => {
        setTitle("");
        setDescription("");
        setDate(new Date());
        setShow(false);
    };

    const handleCancel = () => {
        resetForm();
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCancel}
        >
            <View style={styles.container}>
                {/** Header */}
                <View style={styles.header}>
                    <Feather name="chevrons-up" size={34} color="white" />
                    <Text style={styles.title}>Cập nhật nhiệm vụ</Text>
                    <TouchableOpacity onPress={handleCancel}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/** Body */}
                <View>
                    {/* Task Title */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Bạn làm gì?</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            style={styles.input}
                            placeholder="Nhập tên nhiệm vụ..."
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Task Description */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Thêm thông tin</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            style={[styles.input, { height: 80 }]}
                            placeholder="Ghi chú thêm mô tả..."
                            placeholderTextColor="#999"
                            multiline={true}
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Due Date */}
                    <View style={styles.groupInput}>
                        <Text style={styles.text}>Thời gian hoàn thành</Text>

                        <TouchableOpacity
                            onPress={() => setShow(true)}
                            style={styles.dateInput}
                        >
                            <Text style={styles.dateText}>
                                {date.toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </TouchableOpacity>

                        {/* Date Picker */}
                        {show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onChange}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>
                </View>

                {/** Footer */}
                <View style={styles.containerFooter}>
                    <AddButton
                        onPress={handleSubmit}
                        icon='check'
                        iconLibrary='FontAwesome'
                        text=''
                        backgroundColor='#7A85C1'
                        size='small'
                        animated={true}
                        variant='secondary'
                    />
                </View>
            </View>
        </Modal>
    );
};

export default UpdateModal;