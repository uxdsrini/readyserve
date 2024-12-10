import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';

interface DeliveryTimeSelectorProps {
  onSelect: (date: string, time: string) => void;
}

export default function DeliveryTimeSelector({ onSelect }: DeliveryTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Generate available time slots from 7 AM to 10:30 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 22; hour++) {
      const formattedHour = hour.toString().padStart(2, '0');
      slots.push(`${formattedHour}:00`);
      slots.push(`${formattedHour}:30`);
    }
    // Add 22:30 (10:30 PM) separately
    slots.push('22:30');
    return slots;
  };

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // Format time for display (12-hour format)
  const formatTimeForDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Select Delivery Time</h4>
      
      {/* Date Selection */}
      <div className="grid grid-cols-7 gap-2">
        {generateDates().map((date) => (
          <button
            key={date.toISOString()}
            onClick={() => {
              const formattedDate = date.toISOString().split('T')[0];
              setSelectedDate(formattedDate);
              onSelect(formattedDate, selectedTime);
            }}
            className={`p-2 text-center rounded-lg border ${
              selectedDate === date.toISOString().split('T')[0]
                ? 'border-orange-500 bg-orange-50'
                : 'border-gray-200 hover:border-orange-500'
            }`}
          >
            <span className="text-xs text-gray-500">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <div className="font-medium">
              {date.getDate()}
            </div>
          </button>
        ))}
      </div>

      {/* Time Selection Dropdown */}
      <div className="relative">
        <label htmlFor="time-select" className="block text-sm font-medium text-gray-700 mb-1">
          Select Time
        </label>
        <select
          id="time-select"
          value={selectedTime}
          onChange={(e) => {
            setSelectedTime(e.target.value);
            onSelect(selectedDate, e.target.value);
          }}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md"
        >
          <option value="">Select a time slot</option>
          {generateTimeSlots().map((time) => (
            <option key={time} value={time}>
              {formatTimeForDisplay(time)}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Date and Time Display */}
      {selectedDate && selectedTime && (
        <div className="text-sm text-gray-600 bg-orange-50 p-3 rounded-md">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(selectedDate).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="w-4 h-4" />
            <span>{formatTimeForDisplay(selectedTime)}</span>
          </div>
        </div>
      )}
    </div>
  );
}