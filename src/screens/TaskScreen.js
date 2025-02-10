import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createTask, getTasks, deleteTask, updateTask } from '../services/taskService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function TaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
    };

    const handleAddTask = async () => {
        if (!title || !description) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }
        const newTask = { title, description, dueDate: new Date().toISOString(), priority: "Medium", isCompleted: false };
        await createTask(newTask);
        setTitle('');
        setDescription('');
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    const toggleTaskCompletion = async (taskId, currentStatus) => {
        await updateTask(taskId, { isCompleted: !currentStatus });
        fetchTasks();
    };

    return (
        <View style={styles.container}>
            {/* Header */}

            <View style={styles.header}>
                <View style={styles.headerrow}>
                    <TouchableOpacity style={styles.menuButton}>
                        <Ionicons name="menu" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={styles.searchContainer}>

                        <TextInput
                            style={styles.searchInput}
                            placeholder="  Search..."
                            placeholderTextColor="#ffffff"
                            value={searchText}

                            onChangeText={(text) => setSearchText(text)}
                        />
                    </View>
                    <Ionicons name="search" size={28} color="white" style={styles.searchIcon} />
                </View>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.day}>{moment().format("dddd, MMM D")}</Text>
                    <Text style={styles.headerTitle}>My Tasks</Text>
                </View>
            </View>
            {/* Input Section */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Task Title"
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Task Description"
                    placeholderTextColor="#888"
                    value={description}
                    multiline
                    numberOfLines={3}
                    onChangeText={setDescription}
                />
            </View>

            {/* Task List */}
            <FlatList
                style={styles.taskList}
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <View style={styles.taskHeader}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                                <Icon name="delete-outline" size={20} color="#ff4444" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.taskDescription}>{item.description}</Text>
                        <View style={styles.taskFooter}>
                            <Text style={[
                                styles.taskStatus,
                                { color: item.isCompleted ? '#4CAF50' : '#FF9800' }
                            ]}>
                                {item.isCompleted ? "Completed" : "In Progress"}
                            </Text>
                            <TouchableOpacity
                                style={styles.statusButton}
                                onPress={() => toggleTaskCompletion(item.id, item.isCompleted)}>
                                <Icon
                                    name={item.isCompleted ? "check-circle" : "radio-button-unchecked"}
                                    size={24}
                                    color={item.isCompleted ? '#4CAF50' : '#FF9800'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavButton}>
                    <Icon name="format-list-bulleted" size={24} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.bottomNavButton, styles.addButton]} onPress={handleAddTask}>
                    <Icon name="add" size={28} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.bottomNavButton}
                    onPress={() => navigation.navigate('DateTimeScreen')}>
                    <Icon name="event" size={24} color="#ffffff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
    
    },
    headerrow:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2a2a2a',
        
    },
    headerTextContainer: {
        flexDirection: 'coloumn',
        marginLeft: 20,
        color: "#ffffff"
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    day: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    searchInput: {
        borderRadius: 20,
        borderWidth: 1,
        borderRightColor: "#ffffff",
    },
    searchContainer: {
        width: 250,

    },
    inputContainer: {
        padding: 16,
    },
    input: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        padding: 12,
        color: '#ffffff',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    taskList: {
        flex: 1,
        padding: 16,
    },
    taskItem: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#333',
    },
    taskHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
        flex: 1,
    },
    taskDescription: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    taskFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    taskStatus: {
        fontSize: 14,
        fontWeight: '500',
    },
    statusButton: {
        padding: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#2a2a2a',
    },
    bottomNavButton: {
        padding: 12,
    },
    addButton: {
        backgroundColor: '#2196F3',
        borderRadius: 30,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});