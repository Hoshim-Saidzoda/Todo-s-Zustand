import { create } from "zustand";

const API = "https://to-dos-api.softclub.tj";

const useTodoStore = create((set, get) => ({
   data: [],
  loading: false,
  error: null,

  currentUser: null,
  loadingUser: false,
  errorUser: null,

  isModalOpen: false,
  modalMode: null,
  currentTodo: null,
  name: "",
  desc: "",
  files: [],

   getTodos: async () => {
    try {
      set({ loading: true });
      const res = await fetch(`${API}/api/to-dos`);
      const result = await res.json();
      set({ data: result.data, loading: false });
    } catch (err) {
      console.log(err);
      set({ loading: false, error: err.message });
    }
  },

  fetchUserById: async (id) => {
    try {
      set({ loadingUser: true });
      const res = await fetch(`${API}/api/to-dos/${id}`);
      const result = await res.json();
      set({ currentUser: result.data, loadingUser: false });
    } catch (err) {
      console.log(err);
      set({ loadingUser: false, errorUser: err.message });
    }
  },

   openAddModal: () =>
    set({
      currentTodo: null,
      name: "",
      desc: "",
      files: [],
      modalMode: "add",
      isModalOpen: true,
    }),

  openEditModal: (todo) =>
    set({
      currentTodo: todo,
      name: todo.name,
      desc: todo.description,
      files: [],
      modalMode: "edit",
      isModalOpen: true,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      currentTodo: null,
      name: "",
      desc: "",
      files: [],
      modalMode: null,
    }),

   handleFilesChange: (e) => {
    set({ files: e.target.files }); 
  },

  setName: (name) => set({ name }),
  setDesc: (desc) => set({ desc }),

  // --- CRUD ---
  saveTodo: async () => {
    const { name, desc, files, modalMode, currentTodo, getTodos, closeModal } =
      get();

    if (modalMode === "add") {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("Description", desc);

      // Добавляем файлы напрямую через индекс
      for (let i = 0; i < files.length; i++) {
        formData.append("Images", files[i]);
      }

      await fetch(`${API}/api/to-dos`, { method: "POST", body: formData });
    } else if (modalMode === "edit") {
      // PUT для редактирования без файлов
      const payload = { id: currentTodo.id, Name: name, Description: desc };
      await fetch(`${API}/api/to-dos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    closeModal();
    getTodos();
  },

  deleteTodo: async (id) => {
    try {
      await fetch(`${API}/api/to-dos/?id=${id}`, { method: "DELETE" });
      get().getTodos();
    } catch (err) {
      console.log(err);
    }
  },

  toggleComplete: async (todo) => {
    const updated = { ...todo, isCompleted: !todo.isCompleted };
    try {
      await fetch(`${API}/completed?id=${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      get().getTodos();
    } catch (err) {
      console.log(err);
    }
  },

  addImage: async (todoId, filesList) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < filesList.length; i++) {
        formData.append("Images", filesList[i]);
      }

      await fetch(`${API}/api/to-dos/${todoId}/images`, {
        method: "POST",
        body: formData,
      });

      get().getTodos();
    } catch (err) {
      console.log(err);
    }
  },

  deleteImage: async (imageId) => {
    try {
      await fetch(`${API}/api/to-dos/images/${imageId}`, { method: "DELETE" });
      get().getTodos();
    } catch (err) {
      console.log(err);
    }
  },
}));

export default useTodoStore;
