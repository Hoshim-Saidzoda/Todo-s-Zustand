import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSyncStore from "../store/zustan";

const SyncById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, toStatus } = useSyncStore();

   const task = data.find((item) => item.id == id);

  if (!task) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Задача не найдена</h1>
            <p className="text-slate-600 mb-6">Задача с ID {id} не существует или была удалена</p>
            <button
              onClick={() => navigate("/sync")}
              className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Вернуться к списку задач
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        

         <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
           <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toStatus(task.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    task.status 
                      ? "bg-green-500 border-green-500 text-white" 
                      : "border-slate-400 hover:border-green-500"
                  }`}
                >
                  {task.status && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Задача #{task.id}</h2>
                  <p className="text-slate-500 text-sm">ID: {task.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {task.status ? "Выполнена" : "Активна"}
              </span>
            </div>
          </div>

           <div className="p-6">
            <div className="space-y-6">
               <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Название задачи</label>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-lg text-slate-800 leading-relaxed">{task.title}</p>
                </div>
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Статус</label>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    task.status ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      task.status ? "bg-green-500" : "bg-blue-500"
                    }`}></div>
                    {task.status ? "Завершена" : "В процессе"}
                  </div>
                  <button
                    onClick={() => toStatus(task.id)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors duration-200"
                  >
                    {task.status ? "Отметить активной" : "Отметить выполненной"}
                  </button>
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Тип задачи</p>
                  <p className="font-medium text-slate-800">Обычная задача</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-500 mb-1">Приоритет</p>
                  <p className="font-medium text-slate-800">Стандартный</p>
                </div>
              </div>

               <div className="pt-4 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Быстрые действия</h3>
                <div className="flex gap-3">
                   
                  <button
                    onClick={() => {
                      toStatus(task.id);
                    }}
                    className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
                  >
                    {task.status ? "Возобновить" : "Завершить"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 text-center">
            <p className="text-2xl font-bold text-blue-600">{data.length}</p>
            <p className="text-sm text-slate-600">Всего задач</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 text-center">
            <p className="text-2xl font-bold text-green-600">{data.filter(item => item.status).length}</p>
            <p className="text-sm text-slate-600">Выполнено</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 text-center">
            <p className="text-2xl font-bold text-amber-600">{data.filter(item => !item.status).length}</p>
            <p className="text-sm text-slate-600">Активных</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncById;