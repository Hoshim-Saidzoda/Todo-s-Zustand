import React from "react";
import useSyncStore from "../store/zustan";
import { useNavigate } from "react-router-dom";

const SyncPage = () => {
  const {
    data,
    inpTitle,
    editId,
    searchQuery,
    filter,
    setInpTitle,
    addUser,
    deleteUser,
    startEdit,
    saveEdit,
    toStatus,
    setSearchQuery,
    setFilter,
    setCurrentUser
  } = useSyncStore();

  const navigate = useNavigate();

  const filteredData = data
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((item) => {
      if (filter === "active") return !item.status;
      if (filter === "completed") return item.status;
      return true;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
     <div className="text-center mb-6 sm:mb-8">
  <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Sync Todo</h1>
  <p className="text-sm sm:text-base text-slate-600 px-4">Real-time состояние с Zustand Store</p>
</div>
         <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
  <div className="flex gap-2 sm:gap-3 flex-1">
    <input
      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-sm sm:text-base"
      value={inpTitle}
      onChange={(e) => setInpTitle(e.target.value)}
      placeholder="Enter task title..."
      onKeyPress={(e) => e.key === 'Enter' && (editId ? saveEdit() : addUser())}
    />
    <button
      onClick={editId ? saveEdit : addUser}
      className={`px-4 sm:px-6 py-2 sm:py-3 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-1 sm:gap-2 text-sm sm:text-base ${
        editId 
          ? "bg-amber-500 hover:bg-amber-600" 
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      {editId ? (
        <>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="hidden sm:inline">Save</span>
        </>
      ) : (
        <>
          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add</span>
        </>
      )}
    </button>
  </div>

  <div className="flex gap-2 sm:gap-3">
    <div className="flex-1 relative">
      <svg className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm text-sm sm:text-base"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
    <select
      className="px-3 sm:px-4 py-2 sm:py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 shadow-sm appearance-none cursor-pointer text-sm sm:text-base min-w-[100px]"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Inactive</option>
    </select>
  </div>
</div>
          </div>

           <div className="p-6">
            {filteredData.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-slate-500 text-lg">No tasks found</p>
                <p className="text-slate-400 text-sm mt-1">
                  {searchQuery || filter !== "all" 
                    ? "Try adjusting your search or filter" 
                    : "Add your first task to get started"}
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredData.map((item) => (
                  <li
                    key={item.id}
                    className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <button
                        onClick={() => toStatus(item.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          item.status 
                            ? "bg-green-500 border-green-500 text-white" 
                            : "border-slate-300 hover:border-green-500 group-hover:border-green-500"
                        }`}
                      >
                        {item.status && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <span
                        onClick={() => toStatus(item.id)}
                        className={`flex-1 cursor-pointer transition-all duration-200 ${
                          item.status 
                            ? "line-through text-slate-400" 
                            : "text-slate-700 hover:text-slate-900"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => startEdit(item.id, item.title)}
                        className="p-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors duration-200 shadow-sm"
                        title="Edit task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteUser(item.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 shadow-sm"
                        title="Delete task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button
                        onClick={() => navigate(`/sync/${item.id}`)}
                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 shadow-sm"
                        title="View details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

             {filteredData.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>
                    Showing {filteredData.length} of {data.length} tasks
                  </span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Active: {data.filter(item => !item.status).length}
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Inactiv: {data.filter(item => item.status).length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncPage;