import React from 'react';
import Image from 'next/image';

export default function FilterActivitiesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Filter Activities</h1>
      </div>
      
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="space-y-4">
          <div>
            <label htmlFor="activity-type" className="block text-sm font-medium text-gray-700">
              Activity Type
            </label>
            <select
              id="activity-type"
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">All Types</option>
              <option value="outdoors">Outdoors</option>
              <option value="social">Social</option>
              <option value="food">Food & Drink</option>
              <option value="sports">Sports</option>
              <option value="arts">Arts & Culture</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              className="mt-1 block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <input
                type="date"
                className="block w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <button
            type="button"
            className="mt-4 w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
} 