import React from 'react';

function Chart() {
  const data = [
    { month: 'Jan', revenue: 300000 },
    { month: 'Feb', revenue: 350000 },
    { month: 'Mar', revenue: 280000 },
    { month: 'Apr', revenue: 420000 },
    { month: 'May', revenue: 450000 },
    { month: 'Jun', revenue: 520000 },
  ];

  const maxRevenue = Math.max(...data.map(d => d.revenue));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-48 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full bg-gray-200 rounded-t-lg relative overflow-hidden">
              <div
                className="bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                style={{
                  height: `${(item.revenue / maxRevenue) * 180}px`,
                  minHeight: '8px'
                }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 mt-2">{item.month}</span>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>KES 0</span>
        <span>KES {(maxRevenue / 1000).toFixed(0)}K</span>
      </div>
    </div>
  );
}

export default Chart;