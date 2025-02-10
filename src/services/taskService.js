import { db } from '../constant/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

// 🔹 Create Task
export const createTask = async (task) => {
    try {
        const docRef = await addDoc(collection(db, "tasks"), task);
        return docRef.id;
    } catch (error) {
        console.error("Error adding task: ", error);
    }
};

// 🔹 Get All Tasks
export const getTasks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching tasks: ", error);
    }
};

// 🔹 Update Task (Mark as Completed or Edit)
export const updateTask = async (taskId, updatedTask) => {
    try {
        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, updatedTask);
    } catch (error) {
        console.error("Error updating task: ", error);
    }
};

// 🔹 Delete Task
export const deleteTask = async (taskId) => {
    try {
        await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
        console.error("Error deleting task: ", error);
    }
};
