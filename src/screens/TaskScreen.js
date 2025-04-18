import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} from '../services/taskService';
import Menuicon from '../assets/menuicon';
import Searchicon from '../assets/svg/Searchicon';
import LineH from '../assets/svg/LineH';
import Listicon from '../assets/svg/Listicon';
import Addicon from '../assets/svg/Addicon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Calendericon from '../assets/svg/Calendericon';
import Checkbox from '../assets/svg/Checkbox';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Swipeable} from 'react-native-gesture-handler';
import Deleteicon from '../assets/svg/Deleteicon';
import {DrawerActions} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';

export default function TaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [olddata, setolddata] = useState('');
  const swipeableRefs = useRef([]); // Array of Swipeable refs to track the open cards
  const [openIndex, setOpenIndex] = useState(null); // //  T
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    setTasks(fetchedTasks);
    setolddata(fetchedTasks); // Update the state to reflect fetched tasks
  };
  //..................................................................................................// handles fetching  data
  const onSearch = text => {
    let tempList = olddata.filter(item =>
      item.title.toLowerCase().includes(text.toLowerCase()),
    );
    setTasks(tempList);
  };

  const handleDeleteTask = async taskId => {
    await deleteTask(taskId);
    fetchTasks();
  };

  const toggleTaskCompletion = async (taskId, currentStatus) => {
    await updateTask(taskId, {isCompleted: !currentStatus});
    fetchTasks();
  };

  const renderSectionHeader = title => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  // Render delete button when swiping
  const renderRightActions = (taskId, index) => {
    return (
      <View style={styles.swipeActionContainer}>
        <TouchableOpacity
          onPress={() => handleDeleteTask(taskId)}
          activeOpacity={0.6}
          style={styles.deleteBox}>
          <Deleteicon />
        </TouchableOpacity>
      </View>
    );
  };

  const handleSwipeOpen = index => {
    if (openIndex !== null && openIndex !== index) {
      swipeableRefs.current[openIndex]?.close(); // Close the previous open card
    }
    setOpenIndex(index); // Set the current open card index
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Menuicon />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search tasks..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchText}
              onChangeText={txt => {
                onSearch(txt);
                setSearchText(txt);
              }}
            />
            <Searchicon />
          </View>
          <TouchableOpacity>
            <LineH />
          </TouchableOpacity>
        </View>
        <View style={styles.headerBottom}>
          <Text style={styles.dateText}>Today, {moment().format('D MMM')}</Text>
          <Text style={styles.headerTitle}>My tasks</Text>
        </View>
      </View>

      {/* Task List */}

      <View style={styles.content}>
        <FlatList
          style={styles.taskList}
          data={tasks}
          keyExtractor={item => item.id.toString()} // Ensure key is a string
          renderItem={({item, index}) => (
            <Swipeable
              ref={ref => (swipeableRefs.current[index] = ref)} // Attach ref to each Swipeable
              renderRightActions={() => renderRightActions(item.id, index)}
              onSwipeableWillOpen={() => handleSwipeOpen(index)} // Track when a card is swiped open
            >
              <TouchableOpacity
                style={styles.taskItem}
                onPress={() => navigation.navigate('TaskDetails', {task: item})}
                activeOpacity={0.9}>
                <View style={styles.taskItemContent}>
                  <TouchableOpacity
                    style={styles.taskCheckbox}
                    onPress={() =>
                      toggleTaskCompletion(item.id, item.isCompleted)
                    }>
                    <View
                      style={[
                        styles.checkbox,
                        item.isCompleted && styles.checkboxChecked,
                      ]}>
                      {item.isCompleted && <Checkbox />}
                    </View>
                  </TouchableOpacity>

                  <View style={styles.taskContent}>
                    <View style={styles.taskHeader}>
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      <Text
                        style={[
                          styles.priorityText,
                          {
                            color:
                              item.priority.toLowerCase() === 'high'
                                ? 'red'
                                : item.priority.toLowerCase() === 'medium'
                                ? 'orange'
                                : 'green',
                          },
                        ]}>
                        {item.priority}
                      </Text>
                    </View>

                    <View style={styles.tagContainer}>
                      <Text style={styles.tagDate}>
                        {moment(item.dueDate).format('D MMM')}
                      </Text>
                      {item.tags?.length > 0 && (
                        <View style={styles.tagsContainer}>
                          {item.tags.map((tag, index) => (
                            <View key={index} style={styles.tag}>
                              <Text style={styles.tagText}>{tag}</Text>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.bottomNavButton}>
          <Listicon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TaskDetails')}>
          <Addicon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomNavButton}
          onPress={() => navigation.navigate('DateTimeScreen')}>
          <Calendericon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
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
  taskItemContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginLeft: 10,
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
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
  },
  swipeActionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80, // Controls how much space is revealed after swipe
    backgroundColor: 'red',
    borderRadius: 12,
    marginVertical: 5,
  },
  deleteBox: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
