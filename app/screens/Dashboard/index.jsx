import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from "react-native";

export default function DashboardScreen({ onLogout }) {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([
    { id: "1", text: "Complete React Native Assignment", completed: false },
    { id: "2", text: "Submit Portal Documents", completed: true },
  ]);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    setTaskList([...taskList, { id: Date.now().toString(), text: task, completed: false }]);
    setTask("");
    Keyboard.dismiss();
  };

  const toggleComplete = (id) => {
    setTaskList(taskList.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const handleDeleteTask = (id) => {
    setTaskList(taskList.filter((item) => item.id !== id));
  };

  const completedCount = taskList.filter((t) => t.completed).length;
  const pendingCount = taskList.length - completedCount;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Overview & Tasks</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.card, { backgroundColor: "#EEF2FF" }]}>
          <Text style={styles.cardNum}>{taskList.length}</Text>
          <Text style={styles.cardLabel}>Total</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#FEF3C7" }]}>
          <Text style={styles.cardNum}>{pendingCount}</Text>
          <Text style={styles.cardLabel}>Pending</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#D1FAE5" }]}>
          <Text style={styles.cardNum}>{completedCount}</Text>
          <Text style={styles.cardLabel}>Done</Text>
        </View>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#888"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <TouchableOpacity style={styles.taskTextWrapper} onPress={() => toggleComplete(item.id)}>
              <Text style={[styles.taskText, item.completed && styles.completedText]}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDeleteTask(item.id)}>
              <Text style={styles.deleteBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks available. Add one above!</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  logoutBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  logoutBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",
  },
  cardNum: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  cardLabel: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    color: "#333",
  },
  addBtn: {
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 8,
  },
  addBtnText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
  },
  listContainer: {
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  taskTextWrapper: {
    flex: 1,
  },
  taskText: {
    fontSize: 15,
    color: "#1F2937",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },
  deleteBtn: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
  deleteBtnText: {
    color: "#EF4444",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 30,
  },
});
