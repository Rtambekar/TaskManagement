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
        setTasks(fetchedTasks);  // Update the state to reflect fetched tasks
    };
//..................................................................................................// handles fetching  data
    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    const toggleTaskCompletion = async (taskId, currentStatus) => {
        await updateTask(taskId, { isCompleted: !currentStatus });
        fetchTasks();
    };

    const renderSectionHeader = (title) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity>
                        <Ionicons name="grid" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search tasks..."
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                        <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
                    </View>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.headerBottom}>
                    <Text style={styles.dateText}>Today, {moment().format("D MMM")}</Text>
                    <Text style={styles.headerTitle}>My tasks</Text>
                </View>
            </View>

            {/* Task List */}
            <View style={styles.content}>
                <FlatList
                    style={styles.taskList}
                    data={tasks}
                    ListHeaderComponent={() => renderSectionHeader("Today")}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TaskDetails', { task: item })}
                                style={styles.taskItem}
                            >
                                <TouchableOpacity
                                    style={styles.taskCheckbox}
                                    onPress={() => toggleTaskCompletion(item.id, item.isCompleted)}>
                                    <View style={[styles.checkbox, item.isCompleted && styles.checkboxChecked]}>
                                        {item.isCompleted && <Ionicons name="checkmark" size={16} color="#fff" />}
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.taskContent}>
                                    <Text style={styles.taskTitle}>{item.title}</Text>
                                    <View style={styles.tagContainer}>
                                        <Text style={styles.tagContainer}>{moment(item.dueDate).format("D MMM")}</Text>
                                        {/* tag items props condition */}
                                        {item.tags && item.tags.length > 0 ? ( // Check if item.tags exists in array and is not empty
                                            <View style={styles.tagsContainer}>
                                                {item.tags.map((tag, index) => (
                                                    <View key={index} style={styles.tag}>
                                                        <Text style={styles.tagText}>{tag}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        ) : null}
                                    </View>

                                    {/* handles priority..................... */}
                                    <Text style={{
                                        color: item.priority.toLowerCase() === "high" ? "red" :
                                            item.priority.toLowerCase() === "medium" ? "orange" :
                                                "green",
                                        fontWeight: "bold",
                                        fontSize: 14
                                    }}>
                                        {item.priority}
                                    </Text>
                                </View>

                                <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                                    <Ionicons name="trash-outline" size={30} color="#FF6B6B" />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>

                    )}

                />
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.bottomNavButton}>
                    <Ionicons name="list" size={24} color="#6C5CE7" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('TaskDetails')}>
                    <Ionicons name="add" size={32} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomNavButton} onPress={() => navigation.navigate('DateTimeScreen')}>
                    <Ionicons name="calendar" size={24} color="#6C5CE7" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    header: {
        backgroundColor: '#6C5CE7',
        paddingTop: 48,
        paddingBottom: 24,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerBottom: {
        paddingHorizontal: 20,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        marginHorizontal: 15,
        paddingHorizontal: 15,
    },
    searchInput: {
        flex: 1,
        color: '#fff',
        fontSize: 16,
        paddingVertical: 8,
    },
    searchIcon: {
        marginLeft: 10,
    },
    dateText: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 5,
    },
    content: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginVertical: 15,
        paddingHorizontal: 20,
    },
    taskList: {
        flex: 1,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginBottom: 12,
        padding: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    taskCheckbox: {
        marginRight: 15,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#6C5CE7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#6C5CE7',
    },
    taskContent: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2D3436',
        marginBottom: 8,

    },
    tagContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    tag: {
        fontSize: 12,
        color: '#6C5CE7',
        backgroundColor: '#F3F1FE',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    bottomNavButton: {
        padding: 10,
    },
    addButton: {
        backgroundColor: '#6C5CE7',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6C5CE7',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
});