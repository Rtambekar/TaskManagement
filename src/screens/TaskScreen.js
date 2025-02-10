import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createTask, getTasks, deleteTask, updateTask } from '../services/taskService';

export default function TaskScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    // Fetch Tasks from Firestore
    const fetchTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
    };

    // Handle Task Creation
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

    // Handle Task Deletion
    const handleDeleteTask = async (taskId) => {
        await deleteTask(taskId);
        fetchTasks();
    };

    // Handle Task Completion Toggle
    const toggleTaskCompletion = async (taskId, currentStatus) => {
        await updateTask(taskId, { isCompleted: !currentStatus });
        fetchTasks();
    };

    return (
        <View style={{ padding: 20, flex: 1, backgroundColor: '#121212' }}>
            <Text style={{ color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Task Management</Text>

            <TextInput
                style={{ borderWidth: 1, borderColor: '#ffffff', padding: 10, color: '#ffffff', marginBottom: 10 }}
                placeholder="Task Title"
                placeholderTextColor="#888"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={{ borderWidth: 1, borderColor: '#ffffff', padding: 10, color: '#ffffff', marginBottom: 10 }}
                placeholder="Task Description"
                placeholderTextColor="#888"
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity style={{ backgroundColor: 'blue', padding: 15, alignItems: 'center', borderRadius: 8 }} onPress={handleAddTask}>
                <Text style={{ color: '#fff', fontSize: 16 }}>Add Task</Text>
            </TouchableOpacity>

            {/* Task List */}
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 10, padding: 15, backgroundColor: '#1e1e1e', borderRadius: 8 }}>
                        <Text style={{ color: '#ffffff', fontSize: 18 }}>{item.title}</Text>
                        <Text style={{ color: '#bbb', fontSize: 14 }}>{item.description}</Text>
                        <Text style={{ color: item.isCompleted ? 'green' : 'red', marginTop: 5 }}>
                            {item.isCompleted ? "Completed" : "Incomplete"}
                        </Text>

                        <TouchableOpacity onPress={() => toggleTaskCompletion(item.id, item.isCompleted)}>
                            <Text style={{ color: 'blue', marginTop: 5 }}>
                                {item.isCompleted ? "Mark Incomplete" : "Mark Completed"}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
                            <Text style={{ color: 'red', marginTop: 5 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
