import { create } from "zustand";

const useSyncStore = create((set, get) => ({
  data: [
    { id: 1, title: "maksim", status: false },
    { id: 2, title: "umed", status: true },
    { id: 3, title: "keys", status: false },
    { id: 4, title: "interface", status: true }
  ],

  inpTitle: "",
  editId: null,
  searchQuery: "",
  filter: "all",

  currentUser: null,  

  deleteUser: (id) =>
    set((state) => ({ data: state.data.filter((item) => item.id !== id) })),

  setInpTitle: (value) => set({ inpTitle: value }),

  addUser: () =>
    set((state) => {
      const newUser = { id: Date.now(), title: state.inpTitle, status: false };
      return { data: [...state.data, newUser], inpTitle: "" };
    }),

  startEdit: (id, title) => set({ editId: id, inpTitle: title }),

  saveEdit: () =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id === state.editId ? { ...item, title: state.inpTitle } : item
      ),
      editId: null,
      inpTitle: "",
    })),

  toStatus: (id) =>
    set((state) => ({
      data: state.data.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      ),
    })),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilter: (filter) => set({ filter }),

   setCurrentUser: (user) => set({ currentUser: user }),
  clearCurrentUser: () => set({ currentUser: null }),
}));

export default useSyncStore;
