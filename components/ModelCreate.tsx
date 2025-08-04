import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
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
    setModalVisible: (visible: boolean) => void;
    addNew: (task: any) => void;
}

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const CreateModel = (props: IProp) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const { modalVisible, setModalVisible, addNew } = props;

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

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert(
                'Lỗi của bạn!',
                'Vui lòng nhập nhiệm vụ?',
                [
                    { text: 'Hủy', style: 'cancel' },
                    { text: 'Ok', onPress: () => console.log('Đã xóa') },
                ],
                { cancelable: true }
            );
            return;
        }

        const newTask = {
            id: randomIntFromInterval(1, 10000).toString(),
            title: title.trim(),
            description: description.trim(),
            dueDate: date,
            completed: false,
            createdAt: new Date()
        };

        setTimeout(() => {
            addNew(newTask);
            resetForm();
            setModalVisible(false);
        }, 1000);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCancel}
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <AntDesign name="pluscircle" size={24} color="white" />
                    <Text style={styles.title}>Tạo nhiệm vụ mới</Text>
                    <TouchableOpacity onPress={handleCancel}>
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Body */}
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
                                📅 {date.toLocaleDateString('vi-VN', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </TouchableOpacity>

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

                {/* Footer */}
                <View style={styles.containerFooter}>
                    <AddButton
                        onPress={handleSubmit}
                        icon='check'
                        iconLibrary='AntDesign'
                        text=''
                        backgroundColor='#4CAF50'
                        size='medium'
                        animated={true}
                        variant='primary'
                    />
                </View>
            </View>
        </Modal>
    );
};

export default CreateModel;