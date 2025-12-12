import React, { useState, useEffect } from 'react';
import { Plus, Minus, CheckCircle, Search, Save, MapPin, LogOut } from 'lucide-react';

const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000") + "/api";

export default function WorkerDashboard({ username, authToken, onLogout, clusters, stationsData, initialItems }) {
  const [currentCluster, setCurrentCluster] = useState("");
  const [currentStation, setCurrentStation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(initialItems);
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [filteredClusters, setFilteredClusters] = useState([]);
  const [stationsList, setStationsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workStatus, setWorkStatus] = useState('pending');

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredClusters(clusters.filter(cl => cl.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredClusters([]);
    }
  }, [searchQuery, clusters]);

  const selectCluster = (clusterName) => {
    setCurrentCluster(clusterName);
    setSearchQuery("");
    setFilteredClusters([]);
    setCurrentStation("");
    const filtered = stationsData.filter(st => st.cluster.toUpperCase() === clusterName.toUpperCase());
    setStationsList(filtered);
  };

  const selectStation = async (stationName) => {
    setCurrentStation(stationName);
    await loadStationData(currentCluster, stationName);
  };

  const loadStationData = async (cluster, station) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/data/load/${cluster}/${station}`);
      
      if (response.ok) {
        const data = await response.json();
        const mergedItems = initialItems.map(initItem => {
          const savedItem = data.items.find(item => item.id === initItem.id);
          return savedItem || { ...initItem, used: 0 };
        });
        setItems(mergedItems);
        setSelectedFolder(data.selectedFolder || "All");
        setWorkStatus(data.status || 'pending');
      } else {
        setItems(initialItems.map(item => ({ ...item, used: 0 })));
        setSelectedFolder("All");
        setWorkStatus('pending');
      }
    } catch (error) {
      setItems(initialItems.map(item => ({ ...item, used: 0 })));
      setSelectedFolder("All");
      setWorkStatus('pending');
    }
    setLoading(false);
  };

  const saveStationData = async () => {
    if (!currentCluster || !currentStation) {
      alert("Please select cluster and station first!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/data/save`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          cluster: currentCluster,
          station: currentStation,
          items: items,
          selectedFolder: selectedFolder,
          updatedBy: username,
          status: workStatus
        })
      });

      if (response.ok) {
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
      } else {
        alert('Error saving data!');
      }
    } catch (error) {
      alert('Network error! Check if backend is running.');
    }
    setLoading(false);
  };

  const updateUsed = (id, increment) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newUsed = increment ? item.used + 1 : Math.max(0, item.used - 1);
        return { ...item, used: Math.min(newUsed, item.total) };
      }
      return item;
    }));
  };

  const getRemainingColor = (remaining, total) => {
    if (total === 0) return 'bg-gray-100 text-gray-400';
    if (remaining === 0) return 'bg-red-50 text-red-700 border-red-300';
    if (remaining <= total * 0.2) return 'bg-orange-50 text-orange-700 border-orange-300';
    return 'bg-green-50 text-green-700 border-green-300';
  };

  const folders = ["All", "Active", "Passive - A", "Passive - B", "Trenching", "HDD"];
  const filteredItems = selectedFolder === "All" ? items : items.filter(item => item.work === selectedFolder);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📋 Material Usage Tracker</h1>
              <p className="text-gray-600">Worker Dashboard - {username}</p>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              <LogOut size={20} />
              Logout
            </button>
          </div>

          {/* Cluster Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cluster name खोजें... (RGDA, CHE, VZM, etc.)"
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            
            {filteredClusters.length > 0 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {filteredClusters.map((cluster) => (
                  <button
                    key={cluster}
                    onClick={() => selectCluster(cluster)}
                    className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center gap-2 border-b"
                  >
                    <MapPin size={16} className="text-blue-600" />
                    <span className="font-medium">{cluster}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {currentCluster && (
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4">
              <p className="text-sm opacity-90">Current Cluster</p>
              <p className="text-2xl font-bold">{currentCluster}</p>
            </div>
          )}
        </div>

        {/* Stations List */}
        {stationsList.length > 0 && !currentStation && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">📍 Select Station from {currentCluster}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {stationsList.map((st, index) => (
                <button
                  key={index}
                  onClick={() => selectStation(st.name)}
                  className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 p-3 rounded-lg transition-colors"
                >
                  <MapPin size={18} className="text-blue-600" />
                  <span className="font-medium text-gray-800">{st.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Material Tracker */}
        {currentStation && (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-600">Current Station</p>
                  <p className="text-xl font-bold text-gray-800">{currentStation}</p>
                </div>
                <button 
                  onClick={saveStationData} 
                  disabled={loading}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"

                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Data'}
                </button>
              </div>

              {/* Work Status Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Status</label>
                <div className="flex gap-2">
                  {['pending', 'in-progress', 'completed', 'cancelled'].map(status => (
                    <button
                      key={status}
                      onClick={() => setWorkStatus(status)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize ${
                        workStatus === status
                          ? status === 'completed' ? 'bg-green-600 text-white' :
                            status === 'in-progress' ? 'bg-blue-600 text-white' :
                            status === 'cancelled' ? 'bg-red-600 text-white' :
                            'bg-yellow-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {status === 'in-progress' ? 'In Progress' : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {showSaveMessage && (
              <div className="mb-4 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                <CheckCircle size={20} />
                <span>✅ Data saved successfully to database!</span>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex gap-2 flex-wrap">
                {folders.map(folder => (
                  <button
                    key={folder}
                    onClick={() => setSelectedFolder(folder)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      selectedFolder === folder ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {folder}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredItems.map((item) => {
                const remaining = item.total - (item.used || 0);
                const isHDDItem = item.work === "HDD";
                
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                    {isHDDItem ? (
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-8">
                          <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mt-1 inline-block">{item.unit}</span>
                        </div>

                        <div className="col-span-12 md:col-span-4">
                          <label className="text-xs text-gray-600 block mb-1">Enter Quantity / मात्रा दर्ज करें</label>
                          <input
                            type="number"
                            value={item.total || ''}
                            onChange={(e) => {
                              const newTotal = parseInt(e.target.value) || 0;
                              setItems(items.map(i => i.id === item.id ? { ...i, total: newTotal, used: 0 } : i));
                            }}
                            className="w-full px-3 py-2 border-2 border-purple-300 rounded-md font-bold text-center focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter quantity"
                            min="0"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-5">
                          <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.unit}</span>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                          <label className="text-xs text-gray-600">Total</label>
                          <div className="px-3 py-2 bg-gray-50 border rounded-md font-bold text-center">{item.total}</div>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                          <label className="text-xs text-gray-600">Used</label>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateUsed(item.id, false)} disabled={(item.used || 0) === 0} className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 disabled:opacity-30">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg">{item.used || 0}</span>
                            <button onClick={() => updateUsed(item.id, true)} disabled={remaining === 0} className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 disabled:opacity-30">
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="col-span-4 md:col-span-3">
                          <label className="text-xs text-gray-600">Remaining</label>
                          <div className={`px-4 py-2 rounded-lg border-2 font-bold text-center ${getRemainingColor(remaining, item.total)}`}>
                            {remaining} {item.unit}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}