import React from 'react'

const CompleteTask = ({data}) => {
  return (
    <div>
      <div className="w-[300px] flex-shrink-0 h-full bg-green-500 shadow-lg rounded-xl p-5 hover:shadow-xl transition duration-300">
        <div className="flex justify-between items-center">
          <h3 className="bg-red-600 px-3 py-1 rounded text-sm">{data.category}</h3>
          <h4>{data.taskDate} </h4>
        </div>
        <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
        <p className="text-sm mt-2">
          {data.taskDescription}
        </p>
        <div className="mt-2">
            <button className="bg-red-500 py-1 px-2 text-sm rounded-lg">Completed</button>
        </div>
      </div>
    </div>
  )
}

export default CompleteTask
