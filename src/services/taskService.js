import { db } from '../constant/firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { query, where } from "firebase/firestore";
// 🔹 Create Task
export const createTask = async (task) => {
    try {
        const user = getAuth().currentUser;
        if (!user) throw new Error("No user logged in");

        const docRef = await addDoc(collection(db, "tasks"), {
            ...task,
            userId: user.uid, // 👈 Add user ID here
        });
        return docRef.id;
    } catch (error) {
        console.error("Error adding task: ", error);
    }
};


// 🔹 Get All Tasks
export const getTasks = async () => {
    try {
        const user = getAuth().currentUser;
        if (!user) throw new Error("No user logged in");

        const tasksRef = collection(db, "tasks");
        const q = query(tasksRef, where("userId", "==", user.uid)); // 👈 Filter

        const querySnapshot = await getDocs(q);
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
