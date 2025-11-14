import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTodoStore from "../store/async";

const API = "https://to-dos-api.softclub.tj";

const Async = () => {
  const {
    data,
    isModalOpen,
    modalMode,
    name,
    desc,
    files,
    openAddModal,
    openEditModal,
    closeModal,
    handleFilesChange,
    saveTodo,
    deleteTodo,
    toggleComplete,
    addImage,
    deleteImage,
    getTodos,
    setName,
    setDesc,
  } = useTodoStore();

  const navigate = useNavigate();
  const goToInfo = (todo) => navigate(`/async/${todo.id}`);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-8xl mx-auto">
       <div className="text-center mb-6 sm:mb-8">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2 sm:mb-3">Async Todo</h1>
  <p className="text-sm sm:text-base text-slate-600 px-4">Управление задачами с API синхронизацией + Zustand</p>
</div>

<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
  <button
    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-teal-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
    onClick={openAddModal}
  >
    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
    Добавить задачу
  </button>
  
  <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600 w-full sm:w-auto justify-center">
    <span className="bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
      Всего: {data?.length || 0}
    </span>
    <span className="bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
      Активные: {data?.filter(todo => !todo.isCompleted).length || 0}
    </span>
    <span className="bg-white px-2 sm:px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
      Завершённые: {data?.filter(todo => todo.isCompleted).length || 0}
    </span>
  </div>
</div>

         <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.map((todo) => (
            <div
              key={todo.id}
              className={`bg-white rounded-2xl shadow-lg border-l-4 ${
                todo.isCompleted 
                  ? 'border-l-green-500' 
                  : 'border-l-blue-500'
              } hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
               <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between mb-3">
                  <h2 className={`text-xl font-bold ${
                    todo.isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'
                  }`}>
                    {todo.name}
                  </h2>
                  <button
                    onClick={() => toggleComplete(todo)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      todo.isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : 'border-slate-300 hover:border-green-500'
                    }`}
                  >
                    {todo.isCompleted && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </div>
                
                <p className="text-slate-600 leading-relaxed">
                  {todo.description}
                </p>

                 <div className="flex items-center justify-between mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    todo.isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {todo.isCompleted ? 'Завершено' : 'В процессе'}
                  </span>
                  <span className="text-xs text-slate-400">
                    ID: {todo.id}
                  </span>
                </div>
              </div>

               <div className="p-4 bg-slate-50 rounded-b-2xl">
                <div className="flex flex-wrap gap-2">
                   <label className="flex items-center gap-1 px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 cursor-pointer shadow-sm border border-slate-200 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Добавить фото
                    <input
                      type="file"
                      multiple
                      hidden
                      onChange={(e) => addImage(todo.id, e.target.files)}
                    />
                  </label>

                   <button
                    className="flex items-center gap-1 px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-green-50 hover:text-green-600 transition-colors duration-200 shadow-sm border border-slate-200 text-sm"
                    onClick={() => goToInfo(todo)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Info
                  </button>

                   <button
                    className="flex items-center gap-1 px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 shadow-sm border border-slate-200 text-sm"
                    onClick={() => openEditModal(todo)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Редактировать
                  </button>

                   <button
                    className="flex items-center gap-1 px-3 py-2 bg-white text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 shadow-sm border border-slate-200 text-sm"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Удалить
                  </button>
                </div>

                 {todo.images?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-slate-700 mb-2">Изображения:</h4>
                    <div className="flex flex-wrap gap-2">
                      {todo.images.map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={`${API}/images/${img.imageName}`}
                            alt={todo.name}
                            className="w-16 h-16 object-cover rounded-lg shadow-sm border border-slate-200 group-hover:opacity-75 transition-opacity duration-200"
                          />
                          <button
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs shadow-md"
                            onClick={() => deleteImage(img.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

         {(!data || data.length === 0) && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Нет задач</h3>
            <p className="text-slate-500 mb-6">Добавьте первую задачу чтобы начать работу</p>
            <button
              className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors duration-200 shadow-lg"
              onClick={openAddModal}
            >
              Создать задачу
            </button>
          </div>
        )}

         {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">
                  {modalMode === "edit" ? "Редактировать задачу" : "Новая задача"}
                </h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Название задачи
                  </label>
                  <input
                    type="text"
                    placeholder="Введите название..."
                    value={name}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Описание
                  </label>
                  <textarea
                    placeholder="Введите описание..."
                    value={desc}
                    rows="3"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>

                {modalMode === "add" && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Добавить изображения
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFilesChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
                <button
                  className="px-6 py-3 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors duration-200"
                  onClick={closeModal}
                >
                  Отмена
                </button>
                <button
                  className="px-6 py-3 bg-teal-500 text-white font-medium rounded-xl hover:bg-teal-600 transition-colors duration-200 shadow-lg"
                  onClick={saveTodo}
                >
                  {modalMode === "edit" ? "Сохранить" : "Добавить"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Async;