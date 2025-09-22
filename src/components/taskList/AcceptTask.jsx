import React from "react";

const AcceptTask = ({data,onFail,onComplete}) => {
  return (
    <div>
      <div className="w-[300px] flex-shrink-0 h-full bg-yellow-300 shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300">
        <div className="flex justify-between items-center mb-3">
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">{data.category}</span>
           <span className="text-sm text-gray-600 font-medium">{data.taskDate}</span>
        </div>
         <h2 className="text-xl font-bold text-gray-800 mb-2">{data.taskTitle}</h2>

      <p className="text-sm text-gray-700 mb-4">{data.taskDescription}</p>


        <div className="flex justify-between mt-4">
          <button onClick={()=>onComplete(data)} className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-lg transition cursor-pointer">
            ✅ Completed
          </button>
          <button onClick={()=>onFail(data)} className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition cursor-pointer">
            ❌ Failed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcceptTask;
