import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import { createTask, getTasks } from '../services/taskService';
import { updateTask } from '../services/taskService';
import TaskScreen from './TaskScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Righticon from '../assets/svg/Righticon';


export default function TaskDetails() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);  // Store selected tags
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(new Date());
  const [isCompleted, setIsCompleted] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const navigation = useNavigation();
  const tagOptions = ["Study", "Work", "Personal", "App", "React-native",];
  const priorityOptions = ["Low", "Medium", "High"];


  const route = useRoute();
  const task = route.params?.task || {}; // Get task data (if passed)

  const [prevTask, setPrevTask] = useState(null);

  useEffect(() => {
    if (task && task.id !== prevTask?.id) {
      setPrevTask(task); // Keep track of the previous task
      setTitle(task.title || "");
      setDescription(task.description || "");
      setTags(task.tags || []);
      setPriority(task.priority || "Medium");
      setDueDate(task.dueDate ? new Date(task.dueDate) : new Date());
      setIsCompleted(task.isCompleted || false);
    }
  }, [task]); // Dependency on task only



  // Handle Tag Selection
  const toggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddOrUpdateTask = async () => {
    if (task?.id) {
      // Ensure `tags` is an array
      const updatedTags = Array.isArray(tags) ? tags : [];

      const updatedTask = {
        title,
        description,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(), // ensure date is in ISO format
        isCompleted,
        tags: updatedTags
      };

      try {
        // Pass task.id as the first argument and updatedTask as the second
        await updateTask(task.id, updatedTask);
        Alert.alert("Success", "Task updated successfully!");
        navigation.navigate("TaskDrawer");

        
      } catch (error) {
        console.error("Error updating task:", error);
        Alert.alert("Error", "Failed to update task.");
      }

    } else {
      // Creating new task
      if (!title || !description) {
        Alert.alert("Error", "Please fill in all fields!");
        return;
      }

      const newTask = {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
        priority,
        isCompleted,
        tags: Array.isArray(tags) ? tags : []  // Ensure it's an array here too
      };

      try {
        const taskId = await createTask(newTask);
        Alert.alert("Success", "Task added successfully!");
      navigation.navigate("TaskDrawer");
      } catch (error) {
        console.error("Error creating task:", error);
        Alert.alert("Error", "Failed to add task.");
      }

      // Reset form fields after adding a new task
      setTitle('');
      setDescription('');
      setTags([]);
      setPriority("Medium");
      setIsCompleted(false);
      setDueDate(new Date());
    }
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
        <TouchableOpacity onPress={handleAddOrUpdateTask}>

          <Righticon style={styles.submit} />

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
    borderWidth: 1,
    borderRadius: 30
  },
  submit: {
    marginTop: 100,
    padding: 10,
    backgroundColor: '#F9DDA4',
    borderRadius: 30,
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
