/**
 * File: RideHistory.jsx
 * Purpose: This file displays the user's ride history and past trips.
 * 
 * Features:
 * - Shows past ride details
 * - Displays ride statistics
 * - Provides ride history filtering
 * - Shows ride status and details
 * - Implements pagination
 * - Handles ride history data
 * 
 * Usage:
 * - Displays user's ride history
 * - Shows past trip details
 * - Allows filtering of ride history
 * - Provides ride statistics
 * - Manages ride history data
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RideHistory = () => {
  // State management for ride history and favorites
  const [rideHistory, setRideHistory] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  // Fetch ride history on component mount
  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const token = localStorage.getItem("userToken");
        // Fetch ride history from backend
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/ride-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setRideHistory(response.data.ride_history);
      } catch (error) {
        console.log("Error fetching ride history:", error);
      }
    };

    fetchRideHistory();
  }, []);

  // Handle fetching and toggling favorite locations
  const handleFavoritesClick = async () => {
    setShowFavorites(!showFavorites);
    if (!showFavorites) {
      try {
        const token = localStorage.getItem("userToken");
        // Fetch favorite locations from backend
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rides/favoriteRoute`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setFavoriteLocations(response.data.favorite_locations);
      } catch (error) {
        console.log("Error fetching favorite locations:", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Your Ride History
      </h2>

      {/* Toggle button for favorite locations */}
      <button
        className="bg-black mb-4 px-6 py-2 text-white hover:bg-black-600 rounded-lg"
        onClick={handleFavoritesClick}
      >
        {showFavorites ? "Hide Favorite Locations" : "View Favorite Locations"}
      </button>

      {/* Ride History Table */}
      <div className="overflow-x-auto shadow-lg border-b border-gray-200 rounded-lg">
        <div className="max-h-[328px] overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="w-full bg-grey text-black text-sm">
                <th className="py-3 px-6 text-left">Pickup Location</th>
                <th className="py-3 px-6 text-left">Destination</th>
                <th className="py-3 px-6 text-left">Fare</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Display ride history rows */}
              {rideHistory.length > 0 ? (
                rideHistory.map((ride, index) => (
                  <tr key={ride.id || index} className="border-b hover:bg-gray-100">
                    <td className="py-4 px-6">{ride.pickup}</td>
                    <td className="py-4 px-6">{ride.destination}</td>
                    <td className="py-4 px-6">{ride.fare}</td>
                    <td className="py-4 px-6">{ride.status}</td>
                    <td className="py-4 px-6">
                      {new Date(ride.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No rides found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Favorite Locations Section */}
      {showFavorites && favoriteLocations.length > 0 && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Favorite Locations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display favorite locations */}
            {favoriteLocations.map((favorite, index) => (
              <div
                key={favorite.id || index}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100"
              >
                <h4 className="font-medium text-xl text-gray-700">
                  {favorite.pickup}
                </h4>
                <p className="text-gray-500">
                  Destination: {favorite.destination}
                </p>
                <p className="text-gray-400">Used {favorite.count} times</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RideHistory;
