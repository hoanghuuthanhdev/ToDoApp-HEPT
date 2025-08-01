import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


//Type-safe component
const Header: React.FC = () => {

    //Dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>('all'); // Mặc định là "Tất cả"
    const [items, setItems] = useState([
        { label: 'Tất cả', value: 'all' },
        { label: 'Hết hạn', value: 'expired' },
        { label: 'Hoàn thành', value: 'done' },
    ]);
    //Dots
    const [showThemeMenu, setShowThemeMenu] = useState(false);

    const themeMenuItems = [
        { label: 'Chế độ sáng', icon: 'sun-o', action: () => console.log('Light theme') },
        { label: 'Chế độ tối', icon: 'moon-o', action: () => console.log('Dark theme') },
        { label: 'Cài đặt', icon: 'cog', action: () => console.log('Settings') },
        { label: 'Thông tin', icon: 'info-circle', action: () => console.log('About') },
    ];

    //Handel click without dropdown
    const handleOutsidePress = () => {
        if (open) setOpen(false);
        if (showThemeMenu) setShowThemeMenu(false);
    };
    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                {/** Icon Section */}
                <View style={styles.iconSection}>
                    <FontAwesome name="check-square-o" size={34} color="white" />
                </View>

                {/** Todo Section */}
                <View style={styles.todoSection}>
                    {/** Title row toggles dropdown */}
                    <TouchableOpacity
                        style={styles.titleRow}
                        onPress={() => {
                            setOpen(!open)
                            setShowThemeMenu(false)
                        }
                        }
                    >
                        <Text style={styles.title}>Danh sách công việc</Text>
                        <FontAwesome
                            name={open ? "chevron-up" : "chevron-down"}
                            size={16}
                            color="white"
                            style={styles.dropdownIcon}
                        />
                    </TouchableOpacity>
                    {/* Filter dropdown */}
                    {open && (
                        <View style={styles.dropdownWrapper}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                style={[styles.dropdown, styles.inputRow]} // Ẩn input row
                                dropDownContainerStyle={styles.dropdownContainer}
                                zIndex={1000}
                                placeholder="Tất cả" // Hiển thị mặc định
                                showArrowIcon={false}
                                showTickIcon={true}
                                textStyle={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}
                                tickIconStyle={{
                                    width: 20,
                                    height: 20,
                                    tintColor: '#FFD700',
                                } as any}
                            />
                        </View>
                    )}
                </View>

                {/** Theme Section */}
                <View style={styles.themeSection}>
                    <TouchableOpacity onPress={() => {
                        setShowThemeMenu(!showThemeMenu)
                        setOpen(false)
                    }}>
                        <Entypo name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>
                    {/* Dropdown theme menu */}
                    {showThemeMenu && (
                        <View style={styles.themeMenuWrapper}>
                            <View style={styles.themeMenu}>
                                {themeMenuItems.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.themeMenuItem}
                                        onPress={() => {
                                            item.action();
                                            setShowThemeMenu(false);
                                        }}
                                    >
                                        <FontAwesome
                                            name={item.icon as any}
                                            size={16}
                                            color="white"
                                            style={styles.themeMenuIcon}
                                        />
                                        <Text style={styles.themeMenuText}>{item.label}</Text>
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
        flexDirection: "row",
        backgroundColor: '#456882',
        padding: 15,
        alignItems: 'center',
        position: 'relative',
        height: 80,

    },
    iconSection: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    todoSection: {
        flex: 1,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    themeSection: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    dropdownIcon: {
        marginLeft: 10,
    },
    dropdownWrapper: {
        position: 'absolute',
        top: 35,
        left: 0,
        right: 0,
        zIndex: 3000,
    },
    dropdown: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,

    },
    dropdownContainer: {
        backgroundColor: '#456882',
        borderColor: '#ddd',
        borderWidth: 0,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#D2C1B6',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    inputRow: {
        height: 0,
        minHeight: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderWidth: 0,
        opacity: 0,
        marginBottom: 0,

    },
    //Theme
    themeMenuWrapper: {
        position: 'absolute',
        top: 35,
        right: 0,
        zIndex: 5000,
    },
    themeMenu: {
        backgroundColor: '#456882',
        borderRadius: 8,
        paddingVertical: 8,
        minWidth: 150,
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
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
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default Header;