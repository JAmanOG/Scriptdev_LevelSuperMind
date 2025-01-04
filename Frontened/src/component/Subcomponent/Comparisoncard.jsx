
import React from 'react';
import { Card } from "@/components/ui/card";

const ComparisonCard = ({ title, metrics }) => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-gray-600">{key}</span>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${(value/120) * 100}%` }}
                />
              </div>
              <span className="text-gray-900 font-medium">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
  
    export default ComparisonCard;