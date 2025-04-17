import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { getTasks } from '../services/taskService'; // Adjust path if needed
import moment from 'moment';

export default function DateTimeScreen() {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFormatTasks = async () => {
      setLoading(true);
      try {
        const tasks = await getTasks();
        const groupedTasks = {};

        tasks.forEach((task) => {
          const dateKey = moment(task.dueDate).format('YYYY-MM-DD');
          if (!groupedTasks[dateKey]) groupedTasks[dateKey] = [];
          groupedTasks[dateKey].push(task);
        });

        setItems(groupedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFormatTasks();
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return '#FF5252';
      case 'medium':
        return '#FFC107';
      case 'low':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const renderItem = (item) => {
    const priorityColor = getPriorityColor(item.priority);
    
    return (
      <View style={styles.item}>
        <View style={[styles.priorityIndicator, { backgroundColor: priorityColor }]} />
        <View style={styles.itemContent}>
          <Text style={styles.taskName}>{item.title}</Text>
          <View style={styles.taskDetails}>
            <Text style={styles.priority}>
              Priority: <Text style={{ color: priorityColor, fontWeight: '600' }}>{item.priority}</Text>
            </Text>
            {item.time && (
              <Text style={styles.time}>
                {moment(item.time).format('h:mm A')}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text style={styles.emptyDateText}>No tasks scheduled</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        selected={moment().format('YYYY-MM-DD')}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        showClosingKnob={true}
        pastScrollRange={3}
        futureScrollRange={3}
        theme={{
          selectedDayBackgroundColor: '#4CAF50',
          dotColor: '#4CAF50',
          todayTextColor: '#4CAF50',
          agendaKnobColor: '#4CAF50',
          calendarBackground: '#F5F5F5',
          agendaDayTextColor: '#2196F3',
          agendaDayNumColor: '#2196F3',
          agendaTodayColor: '#4CAF50',
          monthTextColor: '#000',
          textSectionTitleColor: '#666',
        }}
        loadingIndicator={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 0,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 17,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  priorityIndicator: {
    width: 6,
    height: '100%',
  },
  itemContent: {
    flex: 1,
    padding: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priority: {
    fontSize: 14,
    color: '#757575',
  },
  time: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderRadius: 10,
    margin: 15,
  },
  emptyDateText: {
    color: '#999',
    fontSize: 14,
    fontStyle: 'italic',
  },
});