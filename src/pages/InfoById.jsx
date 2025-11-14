import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useTodoStore from "../store/async";

const API = "https://to-dos-api.softclub.tj";

const AboutById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchUserById, currentUser } = useTodoStore();

  useEffect(() => {
    if (id) {
      fetchUserById(id);
    }
  }, [id, fetchUserById]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Загрузка...</h1>
            <p className="text-slate-600 mb-6">Получаем информацию о задаче</p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
         <div className="text-center mb-8">
          <button
            onClick={() => navigate("/async")}
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-all duration-200 mb-6 shadow-sm border border-slate-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Назад к списку
          </button>
           <p className="text-slate-600 text-lg">Полная информация о выбранной задаче</p>
        </div>

         <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
           <div className="p-8 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-12 rounded-full ${
                  currentUser.isCompleted ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">{currentUser.name}</h2>
                  <p className="text-slate-500 mt-1">ID: {currentUser.id}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  currentUser.isCompleted 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                }`}>
                  {currentUser.isCompleted ? '✅ Завершена' : '🔄 В процессе'}
                </span>
                <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold border border-slate-200">
                  📝 Задача
                </span>
              </div>
            </div>
          </div>

           <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                 <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Описание задачи
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <p className="text-slate-700 leading-relaxed text-lg">
                      {currentUser.description || "Описание отсутствует"}
                    </p>
                  </div>
                </div>

                 {currentUser.images && currentUser.images.length > 0 && (
  <div>
    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      Прикрепленные изображения ({currentUser.images.length})
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {currentUser.images.map((image) => (
        <div key={image.id} className="group">
          <img
            src={`${API}/images/${image.imageName}`}
            alt={currentUser.name}
            className="w-full h-32 object-cover rounded-xl shadow-md border border-slate-200 group-hover:shadow-lg group-hover:scale-105 transition-all duration-300"
          />
        </div>
      ))}
    </div>
  </div>
)}
              </div>

               <div className="space-y-6">
                 <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Информация о задаче</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">Статус</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        currentUser.isCompleted 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {currentUser.isCompleted ? 'Завершена' : 'Активна'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-600">ID задачи</span>
                      <span className="font-mono text-slate-800 bg-white px-2 py-1 rounded border">
                        {currentUser.id}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-600">Изображений</span>
                      <span className="font-semibold text-slate-800">
                        {currentUser.images?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>

                 <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Действия</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => navigate("/async")}
                      className="w-full px-4 py-3 bg-white text-slate-700 rounded-lg hover:bg-slate-100 transition-colors duration-200 border border-slate-300 font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      К списку задач
                    </button>
                    <button
                      onClick={() => window.location.reload()}
                      className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Обновить данные
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Быстрый доступ
            </h4>
            <p className="text-slate-600 text-sm">
              Используйте кнопку "Назад к списку" для возврата к полному перечню задач
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Статус данных
            </h4>
            <p className="text-slate-600 text-sm">
              Информация загружена в реальном времени с сервера API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutById;