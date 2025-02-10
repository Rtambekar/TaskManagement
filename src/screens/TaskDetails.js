import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createTask, getTasks } from '../services/taskService';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function TaskDetails() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);  // Store selected tags
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState(new Date());
    const [isCompleted, setIsCompleted] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const tagOptions = ["Study", "Work", "Personal", "App","React-native",];
    const priorityOptions = ["Low", "Medium", "High"];

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
    };

    // Handle Tag Selection
    const toggleTag = (tag) => {
        if (tags.includes(tag)) {
            setTags(tags.filter(t => t !== tag));
        } else {
            setTags([...tags, tag]);
        }
    };

    const handleAddTask = async () => {
        if (!title || !description) {
            Alert.alert("Error", "Please fill in all fields!");
            return;
        }
        const newTask = { 
            title, 
            description, 
            dueDate: dueDate.toISOString(), 
            priority, 
            isCompleted, 
            tags 
        };
        await createTask(newTask);
        setTitle('');
        setDescription('');
        setTags([]);
        setPriority("Medium");
        setIsCompleted(false);
        setDueDate(new Date());
        fetchTasks();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TextInput
                    style={styles.input}
                    placeholder='Task title..'
                    placeholderTextColor="#ffffff"
                    value={title}
                    onChangeText={setTitle}
                />
                <TouchableOpacity onPress={handleAddTask}>
                    <Text style={styles.submit}>Add</Text>
                </TouchableOpacity>
            </View>

            {/* Description */}
            <TextInput
                style={styles.Descinput}
                placeholder="Task Description"
                placeholderTextColor="#888"
                value={description}
                multiline
                numberOfLines={5}
                onChangeText={setDescription}
            />

            {/* Tag Selection */}
            <Text style={styles.sectionTitle}>Tags:</Text>
            <View style={styles.tagContainer}>
                {tagOptions.map((tag, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.tag, tags.includes(tag) && styles.tagSelected]} 
                        onPress={() => toggleTag(tag)}
                    >
                        <Text style={{ color: tags.includes(tag) ? 'white' : 'black' }}>{tag}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Priority Selection */}
            <Text style={styles.sectionTitle}>Priority:</Text>
            <View style={styles.priorityContainer}>
                {priorityOptions.map((level, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={[styles.priority, priority === level && styles.prioritySelected]} 
                        onPress={() => setPriority(level)}
                    >
                        <Text style={{ color: priority === level ? 'white' : 'black' }}>{level}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Is Completed */}
            <TouchableOpacity 
                style={styles.checkboxContainer} 
                onPress={() => setIsCompleted(!isCompleted)}
            >
                <Ionicons name={isCompleted ? "checkbox" : "square-outline"} size={24} color="black" />
                <Text style={styles.checkboxText}>Task Completed</Text>
            </TouchableOpacity>

            {/* Due Date Picker */}
            <Text style={styles.sectionTitle}>Due Date:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
                <Text>{moment(dueDate).format("DD/MM/YYYY")}</Text>
            </TouchableOpacity>
            
            {showDatePicker && (
                <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setDueDate(selectedDate);
                        }
                    }}
                />
            )}
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        backgroundColor: '#6C5CE7',
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    input: {
        fontSize: 23,
        color: 'white',
        flex: 1,

    },
    Descinput: {
        fontSize: 16,
        padding: 15,
        marginTop: 10,
        backgroundColor: "#EAF0F1",
        borderWidth:1,
        borderRadius: 30
    },
    submit: {
      marginTop:100,
        padding: 10,
        backgroundColor: '#6A89CC',
        borderRadius: 20,
        color: 'white',
        fontSize: 16
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10
    },
    tag: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
        marginBottom: 10
    },
    tagSelected: {
        backgroundColor: "#6C5CE7",
        borderColor: "#6C5CE7",
        color: "white"
    },
    priorityContainer: {
        flexDirection: "row",
        marginBottom: 10
    },
    priority: {
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10
    },
    prioritySelected: {
        backgroundColor: "#FF6B6B",
        borderColor: "#FF6B6B"
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingTop: 5
    },
    checkboxText: {
        marginLeft: 10
    },
    datePicker: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center"
    }
});
