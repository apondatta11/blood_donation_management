import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Pre-seeded initial mock data for instant prototype demo
const INITIAL_DONORS = [
  {
    id: 'd-101',
    name: 'Dr. Tanvir Rahman',
    email: 'tanvir.ruet@gmail.com',
    phone: '+880 1711-234567',
    bloodGroup: 'O+',
    district: 'Rajshahi',
    address: 'Kazla, RUET Gate',
    availability: 'Available',
    lastDonated: '2026-04-12',
    totalDonations: 8,
    role: 'Donor'
  },
  {
    id: 'd-102',
    name: 'Sabrina Islam',
    email: 'sabrina.is@yahoo.com',
    phone: '+880 1819-876543',
    bloodGroup: 'A+',
    district: 'Dhaka',
    address: 'Dhanmondi 32',
    availability: 'Available',
    lastDonated: '2026-02-18',
    totalDonations: 4,
    role: 'Donor'
  },
  {
    id: 'd-103',
    name: 'Mahfuz Anam',
    email: 'mahfuz.anam@outlook.com',
    phone: '+880 1912-345678',
    bloodGroup: 'B-',
    district: 'Rajshahi',
    address: 'Talaimari, Rajshahi',
    availability: 'Available',
    lastDonated: '2025-11-05',
    totalDonations: 12,
    role: 'Donor'
  },
  {
    id: 'd-104',
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@gmail.com',
    phone: '+880 1680-112233',
    bloodGroup: 'AB+',
    district: 'Chittagong',
    address: 'GEC Circle',
    availability: 'Unavailable',
    lastDonated: '2026-07-01',
    totalDonations: 3,
    role: 'Donor'
  },
  {
    id: 'd-105',
    name: 'Ahmad Hossain',
    email: 'ahmad.hossain@gmail.com',
    phone: '+880 1552-998877',
    bloodGroup: 'O-',
    district: 'Sylhet',
    address: 'Zindabazar',
    availability: 'Available',
    lastDonated: '2026-01-20',
    totalDonations: 6,
    role: 'Donor'
  },
  {
    id: 'd-106',
    name: 'Fariha Yasmin',
    email: 'fariha.ruet@gmail.com',
    phone: '+880 1733-445566',
    bloodGroup: 'A-',
    district: 'Rajshahi',
    address: 'Moniswor, Rajshahi',
    availability: 'Available',
    lastDonated: '2026-03-30',
    totalDonations: 5,
    role: 'Donor'
  }
];

const INITIAL_REQUESTS = [
  {
    id: 'req-501',
    patientName: 'Khandakar Rahim',
    requesterName: 'Ayesha Rahim',
    requesterPhone: '+880 1715-990011',
    requesterEmail: 'tanvir.ruet@gmail.com',
    requesterId: 'd-101',
    bloodGroup: 'O+',
    units: 2,
    hospital: 'Rajshahi Medical College Hospital (RMCH)',
    district: 'Rajshahi',
    urgency: 'Critical',
    reason: 'Emergency surgery following highway accident',
    status: 'Pending',
    date: '2026-08-15'
  },
  {
    id: 'req-502',
    patientName: 'Mrs. Salma Begum',
    requesterName: 'Tariq Begum',
    requesterPhone: '+880 1812-334455',
    requesterEmail: 'tariq@gmail.com',
    requesterId: 'd-102',
    bloodGroup: 'B-',
    units: 1,
    hospital: 'Square Hospital, Dhaka',
    district: 'Dhaka',
    urgency: 'Urgent',
    reason: 'Thalassemia monthly transfusion',
    status: 'Approved',
    date: '2026-08-14'
  },
  {
    id: 'req-503',
    patientName: 'Baby Aarav',
    requesterName: 'Sumon Kumar',
    requesterPhone: '+880 1988-776655',
    requesterEmail: 'guest@lifeflow.org',
    requesterId: null,
    bloodGroup: 'A-',
    units: 1,
    hospital: 'Popular Diagnostic, Rajshahi',
    district: 'Rajshahi',
    urgency: 'Normal',
    reason: 'Dengue platelet support',
    status: 'Fulfilled',
    date: '2026-08-10'
  }
];

const INITIAL_INVENTORY = [
  { bloodGroup: 'A+', units: 14, status: 'Sufficient' },
  { bloodGroup: 'A-', units: 3, status: 'Low Stock' },
  { bloodGroup: 'B+', units: 18, status: 'Sufficient' },
  { bloodGroup: 'B-', units: 2, status: 'Critical' },
  { bloodGroup: 'O+', units: 22, status: 'Sufficient' },
  { bloodGroup: 'O-', units: 4, status: 'Low Stock' },
  { bloodGroup: 'AB+', units: 9, status: 'Sufficient' },
  { bloodGroup: 'AB-', units: 1, status: 'Critical' }
];

const INITIAL_LOGS = [
  { id: 'log-1', text: 'Dr. Tanvir Rahman updated status to Available', time: '10 mins ago', type: 'info' },
  { id: 'log-2', text: 'Emergency O+ blood request created for RMCH Hospital', time: '25 mins ago', type: 'alert' },
  { id: 'log-3', text: 'Admin approved 1 unit B- allocation for Square Hospital', time: '2 hours ago', type: 'success' },
  { id: 'log-4', text: 'New donor Fariha Yasmin registered (A- Rajshahi)', time: '5 hours ago', type: 'info' }
];

export const AppProvider = ({ children }) => {
  // Load state from localStorage or initialize with seed data
  const [donors, setDonors] = useState(() => {
    const saved = localStorage.getItem('lifeflow_donors');
    return saved ? JSON.parse(saved) : INITIAL_DONORS;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem('lifeflow_requests');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('lifeflow_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [logs, setLogs] = useState(() => {
    const saved = localStorage.getItem('lifeflow_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lifeflow_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [toast, setToast] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('lifeflow_donors', JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem('lifeflow_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('lifeflow_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('lifeflow_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lifeflow_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lifeflow_current_user');
    }
  }, [currentUser]);

  // Toast Notification Helper
  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Auth Handlers (Member 1 - Scrum Manager)
  const loginUser = (email, password) => {
    // Demo admin check
    if (email === 'admin@lifeflow.org' && password === 'admin123') {
      const adminUser = {
        id: 'admin-01',
        name: 'System Administrator',
        email: 'admin@lifeflow.org',
        role: 'Admin',
        bloodGroup: 'AB+',
        district: 'Rajshahi'
      };
      setCurrentUser(adminUser);
      showToast('Welcome back, System Admin!', 'success');
      return { success: true };
    }

    const found = donors.find(d => d.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
      return { success: true };
    } else {
      showToast('User not found. Try registering or use admin@lifeflow.org', 'error');
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const registerUser = (userData) => {
    const newId = `d-${Date.now().toString().slice(-4)}`;
    const newDonor = {
      id: newId,
      ...userData,
      totalDonations: 0,
      lastDonated: 'Never'
    };

    setDonors(prev => [newDonor, ...prev]);
    setCurrentUser(newDonor);
    
    // Add log
    addLog(`New user ${newDonor.name} registered (${newDonor.bloodGroup} - ${newDonor.district})`, 'info');
    showToast(`Account created successfully! Welcome, ${newDonor.name}`, 'success');
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const toggleDonorAvailability = () => {
    if (!currentUser) return;
    const newStatus = currentUser.availability === 'Available' ? 'Unavailable' : 'Available';
    
    // Update current user
    const updatedUser = { ...currentUser, availability: newStatus };
    setCurrentUser(updatedUser);

    // Update donors list
    setDonors(prev => prev.map(d => d.id === currentUser.id ? updatedUser : d));
    
    addLog(`${currentUser.name} toggled availability to ${newStatus}`, 'info');
    showToast(`Your status is now set to ${newStatus}`, 'success');
  };

  // Emergency Request Handlers (Member 2)
  const addBloodRequest = (reqData) => {
    const newReq = {
      id: `req-${Date.now().toString().slice(-4)}`,
      ...reqData,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    setRequests(prev => [newReq, ...prev]);
    addLog(`Emergency ${reqData.bloodGroup} request created by ${reqData.requesterName}`, 'alert');
    showToast('Emergency Blood Request submitted successfully!', 'success');
  };

  const updateRequestStatus = (reqId, newStatus) => {
    setRequests(prev => prev.map(r => {
      if (r.id === reqId) {
        // If approving, deduct inventory if available
        if (newStatus === 'Approved') {
          updateInventoryCount(r.bloodGroup, -r.units);
        }
        return { ...r, status: newStatus };
      }
      return r;
    }));

    addLog(`Request ${reqId} status updated to ${newStatus}`, 'info');
    showToast(`Request ${reqId} marked as ${newStatus}`, 'info');
  };

  // Inventory Handlers (Member 3)
  const updateInventoryCount = (bloodGroup, delta) => {
    setInventory(prev => prev.map(item => {
      if (item.bloodGroup === bloodGroup) {
        const newUnits = Math.max(0, item.units + delta);
        let newStatus = 'Sufficient';
        if (newUnits < 3) newStatus = 'Critical';
        else if (newUnits < 6) newStatus = 'Low Stock';
        return { ...item, units: newUnits, status: newStatus };
      }
      return item;
    }));
  };

  const addLog = (text, type = 'info') => {
    const newLog = {
      id: `log-${Date.now()}`,
      text,
      time: 'Just now',
      type
    };
    setLogs(prev => [newLog, ...prev.slice(0, 15)]);
  };

  return (
    <AppContext.Provider value={{
      donors,
      requests,
      inventory,
      logs,
      currentUser,
      toast,
      showToast,
      loginUser,
      registerUser,
      logoutUser,
      toggleDonorAvailability,
      addBloodRequest,
      updateRequestStatus,
      updateInventoryCount,
      addLog
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
