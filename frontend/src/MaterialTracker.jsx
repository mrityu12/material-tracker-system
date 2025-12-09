import './material-tracker.css';
import React, { useState, useEffect } from 'react';
import { Plus, Minus, CheckCircle, AlertCircle, FolderOpen, Search, Save, MapPin, LogOut, User, Calendar, Database } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL + "/api";
export default function MaterialTracker() {
  // ---------------------- CLUSTERS ----------------------
  const clusters = [
    "ARK","RGDA", "CHE", "VZM", "VBL", "LKMR", "DWZ", "KRDL", "JDB", 
    "KRPU", "MPM", "PURI", "BAM", "PSA", "KUR", "BBS", "CTC-1", 
    "CTC-2", "JJKR-1", "JJKR-2", "BHC", "KDJR-1", "KDJR-2", "TLHR", "DNKL"
  ];

  // ---------------------- STATIONS DATA ----------------------
  const stationsData = [
    // ARK
    { name: "BODDAVARA", cluster: "ARK" },
    { name: "CHIMIDIPALLI", cluster: "ARK" },
    { name: "GORAPUR", cluster: "ARK" },
    { name: "KARAKAVALASA", cluster: "ARK" },
    { name: "MALLIVEDU", cluster: "ARK" },
    { name: "SIMILIGUDA", cluster: "ARK" },
    { name: "SRUNGAVARAPUKOTA", cluster: "ARK" },
    { name: "TYADA", cluster: "ARK" },
    { name: "LAKKAVARAPUKOTA", cluster: "ARK" },

    // RGDA
    { name: "PARVATHIPURAM TOWN", cluster: "RGDA" },
    { name: "SINGAPUR ROAD", cluster: "RGDA" },
    { name: "GUMMADA", cluster: "RGDA" },
    { name: "JIMIDIPETA", cluster: "RGDA" },
    { name: "KUNERU", cluster: "RGDA" },
    { name: "LADDA", cluster: "RGDA" },
    { name: "KEUTGUDA", cluster: "RGDA" },

    // CHE
    { name: "KOTABOMMALI", cluster: "CHE" },
    { name: "NOUPADA", cluster: "CHE" },
    { name: "PONDURU", cluster: "CHE" },
    { name: "TILARU", cluster: "CHE" },
    { name: "DUSI", cluster: "CHE" },
    { name: "PUNDI", cluster: "CHE" },
    { name: "URLAM", cluster: "CHE" },

    // VZM
    { name: "CHIPURUPALLI", cluster: "VZM" },
    { name: "SIGADAM", cluster: "VZM" },
    { name: "ALAMANDA", cluster: "VZM" },
    { name: "KANTAKAPALLI", cluster: "VZM" },
    { name: "KORUKONDA", cluster: "VZM" },
    { name: "NELLIMARLA", cluster: "VZM" },

    // VBL
    { name: "GARIVIDI", cluster: "VBL" },
    { name: "PARVATHIPURAM", cluster: "VBL" },
    { name: "DONKINAVALASA", cluster: "VBL" },
    { name: "GAJAPATINAGARAM", cluster: "VBL" },
    { name: "GARUDABILLI", cluster: "VBL" },
    { name: "GOTLAM", cluster: "VBL" },
    { name: "SEETHANAGARAM", cluster: "VBL" },
    { name: "KOMATAPALLI", cluster: "VBL" },

    // LKMR
    { name: "LAXMIPUR ROAD", cluster: "LKMR" },
    { name: "TIKKIRI", cluster: "LKMR" },
    { name: "BAIGUDA", cluster: "LKMR" },
    { name: "BALUMASKA", cluster: "LKMR" },
    { name: "LELIGUMA", cluster: "LKMR" },
    { name: "SIKARPAI", cluster: "LKMR" },
    { name: "KAKRIGUMA", cluster: "LKMR" },

    // DWZ
    { name: "DAPAL", cluster: "DWZ" },
    { name: "DANTEWARA", cluster: "DWZ" },
    { name: "KAKULUR", cluster: "DWZ" },
    { name: "KAWARGAON", cluster: "DWZ" },
    { name: "KUMAR SODARA", cluster: "DWZ" },
    { name: "GIDDAM", cluster: "DWZ" },

    // KRDL
    { name: "BACHELI", cluster: "KRDL" },
    { name: "BHANSI", cluster: "KRDL" },
    { name: "KIRANDUL", cluster: "KRDL" },
    { name: "KAMLUR", cluster: "KRDL" },

    // JDB
    { name: "BHEJA", cluster: "JDB" },
    { name: "DILMILLI", cluster: "JDB" },
    { name: "KUMAR MARANGA", cluster: "JDB" },
    { name: "NAKTISEMRA", cluster: "JDB" },
    { name: "TOKAPAL", cluster: "JDB" },
    { name: "SILAKJHORI", cluster: "JDB" },
    { name: "AMBAGURA", cluster: "JDB" },

    // KRPU
    { name: "BHEJA", cluster: "KRPU" },
    { name: "CHARAMULAKUSUMI", cluster: "KRPU" },
    { name: "CHATHARIPUT", cluster: "KRPU" },
    { name: "DARLIPUT", cluster: "KRPU" },
    { name: "DHANAPUR", cluster: "KRPU" },
    { name: "MACHKHAND ROAD", cluster: "KRPU" },
    { name: "MALIGURA", cluster: "KRPU" },
    { name: "MANABAR", cluster: "KRPU" },
    { name: "PADUA", cluster: "KRPU" },
    { name: "PALIBA", cluster: "KRPU" },
    { name: "SUKU", cluster: "KRPU" },
    { name: "KOTPAD ROAD", cluster: "KRPU" },
    { name: "KADAPA", cluster: "KRPU" },
    { name: "AMBAGOAN", cluster: "KRPU" },
    { name: "JARATI", cluster: "KRPU" },
    { name: "DUMIRIPUT", cluster: "KRPU" },
    { name: "JEYPORE", cluster: "KRPU" },

    // PURI
    { name: "DELANG", cluster: "PURI" },
    { name: "BIRPURUSOTTAMPUR", cluster: "PURI" },
    { name: "KANAS ROAD", cluster: "PURI" },
    { name: "MALATIPATPUR", cluster: "PURI" },

    // BAM
    { name: "RAMBHA", cluster: "BAM" },
    { name: "HUMMA", cluster: "BAM" },
    { name: "GANJAM", cluster: "BAM" },
    { name: "JAGANNATHPUR", cluster: "BAM" },
    { name: "GOLANTHRA", cluster: "BAM" },
    { name: "SURLA ROAD", cluster: "BAM" },

    // PSA
    { name: "JHADUPUDI", cluster: "PSA" },
    { name: "BARUVA", cluster: "PSA" },
    { name: "MANDASA", cluster: "PSA" },
    { name: "SUMMADEVI", cluster: "PSA" },

    // KUR
    { name: "GANGADHARPUR", cluster: "KUR" },
    { name: "KUHURI", cluster: "KUR" },
    { name: "SOLARI", cluster: "KUR" },
    { name: "MOTARI HALT", cluster: "KUR" },
    { name: "RETANG", cluster: "KUR" },
    { name: "KAIPADHAR ROAD", cluster: "KUR" },
    { name: "TAPANG", cluster: "KUR" },

    // BBS
    { name: "BARANG", cluster: "BBS" },
    { name: "MACHESWAR", cluster: "BBS" },
    { name: "NARAJ MARTHAPUR", cluster: "BBS" },
    { name: "RADHAKISHOREPUR", cluster: "BBS" },

    // CTC-1
    { name: "GHANTIKHAL NIDHIPUR", cluster: "CTC-1" },
    { name: "BARITHENGARH", cluster: "CTC-1" },
    { name: "BYREE", cluster: "CTC-1" },
    { name: "CHARBATIA", cluster: "CTC-1" },
    { name: "GOPALPUR BALKDA", cluster: "CTC-1" },
    { name: "KAPILAS ROAD", cluster: "CTC-1" },
    { name: "KENDRAPARA ROAD", cluster: "CTC-1" },
    { name: "NERGUNDI", cluster: "CTC-1" },

    // CTC-2
    { name: "GURUDIJHATIA", cluster: "CTC-2" },
    { name: "KANDARPUR", cluster: "CTC-2" },
    { name: "RAGHUNATHPUR", cluster: "CTC-2" },
    { name: "SALAGAON", cluster: "CTC-2" },
    { name: "BADABANDHA", cluster: "CTC-2" },
    { name: "RAHAMA", cluster: "CTC-2" },

    // JJKR-1
    { name: "HARIDASPUR", cluster: "JJKR-1" },
    { name: "JAKHAPURA", cluster: "JJKR-1" },
    { name: "JENAPUR", cluster: "JJKR-1" },
    { name: "NEW GARHMANDHUPUR", cluster: "JJKR-1" },
    { name: "SUKINDA ROAD", cluster: "JJKR-1" },

    // JJKR-2
    { name: "SAGADAPATA", cluster: "JJKR-2" },
    { name: "BAGHUAPAL", cluster: "JJKR-2" },
    { name: "TANGIRIAPAL", cluster: "JJKR-2" },
    { name: "TOMKA", cluster: "JJKR-2" },

    // BHC
    { name: "BAITARANI ROAD", cluster: "BHC" },
    { name: "BAUDPUR", cluster: "BHC" },
    { name: "KENDUAPADA", cluster: "BHC" },
    { name: "KORAI", cluster: "BHC" },
    { name: "MANJURI ROAD", cluster: "BHC" },

    // KDJR-1
    { name: "BASANTAPUR", cluster: "KDJR-1" },
    { name: "CHILIKINDARA", cluster: "KDJR-1" },
    { name: "GOALDIH", cluster: "KDJR-1" },
    { name: "NARANPUR", cluster: "KDJR-1" },

    // KDJR-2
    { name: "NAYAGARH", cluster: "KDJR-2" },
    { name: "NILAKANTHESWAR", cluster: "KDJR-2" },
    { name: "PORJANPUR", cluster: "KDJR-2" },
    { name: "SITABINJ", cluster: "KDJR-2" },

    // TLHR
    { name: "TALCHER ROAD", cluster: "TLHR" },
    { name: "BURHAPANKA", cluster: "TLHR" },
    { name: "MERMANDOLI", cluster: "TLHR" },

    // DNKL
    { name: "HINDOL ROAD", cluster: "DNKL" },
    { name: "JORANDA ROAD", cluster: "DNKL" },
    { name: "RAJATHGARH", cluster: "DNKL" },
    { name: "SADASHIBAPUR", cluster: "DNKL" },
  ];

    const initialItems = [
    { id: 1, name: "Full HD Bullet type IP colour camera", unit: "No.", total: 1, work: "Active", qty: 1 },
    { id: 2, name: "Full HD P/T/Z type IP colour camera", unit: "No.", total: 1, work: "Active", qty: 1 },
    { id: 3, name: "Type-I Switch", unit: "No.", total: 2, work: "Active", qty: 2 },
    { id: 4, name: "Type-II Switch", unit: "No.", total: 1, work: "Active", qty: 1 },
    { id: 5, name: "UPS - 1KVA along with accessories and Battery Cage", unit: "No.", total: 2, work: "Active", qty: 2 },
    { id: 6, name: "AC Panic Switch", unit: "No.", total: 3, work: "Active", qty: 3 },
    { id: 7, name: "24 Fibre FMS (SC-APC Type) along with all installation accessories", unit: "No.", total: 1, work: "Passive - A", qty: 1 },
    { id: 8, name: "12 Fibre FMS (SC-APC Type) along with all installation accessories", unit: "No.", total: 2, work: "Passive - A", qty: 2 },
    { id: 9, name: "19\" 9U racks along with all accessories like power strip, MCB, Fantray, Patch Panel", unit: "No.", total: 2, work: "Passive - A", qty: 2 },
    { id: 10, name: "Installation MFCE Earth with multiple pits complete with all accessories (less than 1 Ohm)", unit: "No.", total: 1, work: "Passive - A", qty: 1 },
    { id: 11, name: "Installation ACDB for AC distribution Box with Lock and key arrangements and 35 mark MCBs", unit: "No.", total: 1, work: "Passive - A", qty: 1 },
    { id: 12, name: "Laying of STP CAT-6 Cable", unit: "Mtrs", total: 460, work: "Passive - A", qty: 460 },
    { id: 13, name: "Laying of 12 Core metal strengthened outdoor unarmored Optic Fiber", unit: "Mtrs", total: 550, work: "Passive - A", qty: 550 },
    { id: 14, name: "Laying of PVC Insulated 3 core 4 Sq. Mm, 12 AGW (1.1 KV grade) outdoor strengthened Copper Cable", unit: "Mtrs", total: 260, work: "Passive - A", qty: 260 },
    { id: 15, name: "Laying of 32mm PVC Flexible pipe", unit: "Mtrs", total: 15, work: "Passive - A", qty: 15 },
    { id: 16, name: "Laying of 32mm PVC conduit pipe (ISI mark)", unit: "Mtrs", total: 260, work: "Passive - A", qty: 260 },
    { id: 17, name: "Laying of 40mm dia. HDPE pipe as defined in Chapter-8", unit: "Mtrs", total: 100, work: "Passive - A", qty: 100 },
    { id: 18, name: "Laying of GI pipe (50 mm Dia – 3.65 mm thick) as per IS-1239, Pt-1, medium grade", unit: "Mtrs", total: 16, work: "Passive - A", qty: 16 },
    { id: 19, name: "Laying of RCC of PVC trough 50X50 mm", unit: "Mtrs", total: 0, work: "Passive - A", qty: 0 },
    { id: 20, name: "Installation of RCC Route Marker", unit: "No.", total: 5, work: "Passive - A", qty: 5 },
    { id: 21, name: "Splicing/Termination of two nos of 12F splicing will be consider as 1 nos of 24F", unit: "No.", total: 2, work: "Passive - A", qty: 2 },
    { id: 22, name: "Breaking of pucca road/CC, PF Cutting, Laying of OFC in Trenches and through all types of protections viz HDPE/GI/RCC Pipes & resurfacing as per the specifications", unit: "Mtrs", total: 225, work: "Trenching", qty: 225 },
    { id: 23, name: "Trenching and Laying of HDPE Duct in normal soil and blowing of OFC Cable", unit: "Mtrs", total: 30, work: "Trenching", qty: 30 },
    { id: 24, name: "Erection of G I pipe post (100 mm dia 4.5mm thickness) ISI 239 part I grade J with base arrangement to a height of 4.3 metres including the foundation as per the specifications", unit: "No.", total: 3, work: "Passive - B", qty: 3 },
    { id: 25, name: "I&C of GI earth pipe & wire along", unit: "No.", total: 3, work: "Passive - B", qty: 3 },
    { id: 26, name: "I&C of IP 66 Outdoor 19\" 6U Rack", unit: "No.", total: 1, work: "Passive - B", qty: 1 },
  { id: 27, name: "Track/road crossing through HDD method (with 2 and more duct, laying of fiber and Power as per the specifications)", unit: "Mtrs", total: 0, work: "HDD" },
    { id: 28, name: "Supply and installation of splice/loop chamber as per the specifications", unit: "No.", total: 0, work: "HDD" }
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [currentCluster, setCurrentCluster] = useState("");
  const [currentStation, setCurrentStation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(initialItems);
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [filteredClusters, setFilteredClusters] = useState([]);
  const [stationsList, setStationsList] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Login Function with API
  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        setAuthToken(data.token);
        setUserRole(data.role);
        setIsLoggedIn(true);
        if (data.role === 'admin') {
          loadAllData(data.token);
        }
      } else {
        alert(data.message || 'Invalid credentials!');
      }
    } catch (error) {
      alert('Login error! Make sure backend is running.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUsername("");
    setPassword("");
    setAuthToken("");
    setCurrentCluster("");
    setCurrentStation("");
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredClusters(clusters.filter(cl => cl.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredClusters([]);
    }
  }, [searchQuery]);

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

  // Load data from backend
  const loadStationData = async (cluster, station) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/data/load/${cluster}/${station}`);
      
      if (response.ok) {
        const data = await response.json();
        // Merge saved data with initialItems to ensure all items are present
        const mergedItems = initialItems.map(initItem => {
          const savedItem = data.items.find(item => item.id === initItem.id);
          return savedItem || { ...initItem, used: 0 };
        });
        setItems(mergedItems);
        setSelectedFolder(data.selectedFolder || "All");
      } else {
        setItems(initialItems.map(item => ({ ...item, used: 0 })));
        setSelectedFolder("All");
      }
    } catch (error) {
      setItems(initialItems.map(item => ({ ...item, used: 0 })));
      setSelectedFolder("All");
    }
    setLoading(false);
  };

  // Save data to backend
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
          updatedBy: username
        })
      });

      if (response.ok) {
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
        if (userRole === 'admin') {
          loadAllData(authToken);
        }
      } else {
        alert('Error saving data!');
      }
    } catch (error) {
      alert('Network error! Check if backend is running.');
    }
    setLoading(false);
  };

  // Load all data for admin
  const loadAllData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/data/all`, {
        headers: { 'Authorization': `Bearer ${token || authToken}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAllData(data);
      }
    } catch (error) {
      console.error('Error loading admin data');
    }
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <User size={64} className="mx-auto text-blue-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">Material Tracker</h1>
            <p className="text-gray-600 mt-2">Login to continue</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">Admin: admin / admin123</p>
            <p className="text-xs text-gray-600">Worker: worker / worker123</p>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  if (userRole === "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome, {username}</p>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-6 rounded-lg shadow">
              <Database className="text-blue-600 mb-2" size={32} />
              <p className="text-blue-600 font-bold">Total Clusters</p>
              <p className="text-3xl font-bold text-blue-800">{clusters.length}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow">
              <MapPin className="text-green-600 mb-2" size={32} />
              <p className="text-green-600 font-bold">Total Stations</p>
              <p className="text-3xl font-bold text-green-800">{stationsData.length}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg shadow">
              <Save className="text-purple-600 mb-2" size={32} />
              <p className="text-purple-600 font-bold">Saved Records</p>
              <p className="text-3xl font-bold text-purple-800">{allData.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database size={24} />
              All Saved Data Records
            </h2>
            
            {allData.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Database size={64} className="mx-auto mb-4 opacity-30" />
                <p>No data saved yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allData.map((record, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          <MapPin className="inline mr-2" size={18} />
                          {record.cluster} - {record.station}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Updated by: <span className="font-semibold">{record.updatedBy}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          {formatDate(record.lastUpdated)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {record.items.slice(0, 4).map((item) => (
                        <div key={item.id} className="bg-gray-50 p-2 rounded text-xs">
                          <p className="font-semibold truncate">{item.name}</p>
                          <p className="text-gray-600">Used: {item.used}/{item.total}</p>
                        </div>
                      ))}
                    </div>
                    {record.items.length > 4 && (
                      <p className="text-xs text-gray-500 mt-2">+ {record.items.length - 4} more items</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // WORKER DASHBOARD
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📋 Material Usage Tracker</h1>
              <p className="text-gray-600">Worker Dashboard - {username}</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              <LogOut size={20} />
              Logout
            </button>
          </div>

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

        {currentStation && (
          <>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Current Station</p>
                  <p className="text-xl font-bold text-gray-800">{currentStation}</p>
                </div>
                <button 
                  onClick={saveStationData} 
                  disabled={loading}
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Data'}
                </button>
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
                const remaining = item.total - item.used;
                const isHDDItem = item.work === "HDD";
                
                return (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                    {isHDDItem ? (
                      // HDD Items - Only Quantity Input
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
                      // Regular Items - Full Tracking
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-12 md:col-span-5">
                          <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{item.unit}</span>
                        </div>

                        <div className="col-span-4 md:col-span-2">
                          <label className="text-xs text-gray-600">Total</label>
                          {item.total === 0 ? (
                            <input
                              type="number"
                              value={item.total || ''}
                              onChange={(e) => {
                                const newTotal = parseInt(e.target.value) || 0;
                                setItems(items.map(i => i.id === item.id ? { ...i, total: newTotal } : i));
                              }}
                              className="w-full px-3 py-2 border-2 border-blue-300 rounded-md font-bold text-center focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter qty"
                              min="0"
                            />
                          ) : (
                            <div className="px-3 py-2 bg-gray-50 border rounded-md font-bold text-center">{item.total}</div>
                          )}
                        </div>

                        <div className="col-span-4 md:col-span-2">
                          <label className="text-xs text-gray-600">Used</label>
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateUsed(item.id, false)} disabled={item.used === 0} className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 disabled:opacity-30">
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-lg">{item.used}</span>
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