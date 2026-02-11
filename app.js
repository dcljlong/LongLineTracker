/**
 * Long Line Tracker - Construction Equipment Management System
 * Main Application JavaScript
 */

// Data Storage Keys
const STORAGE_KEYS = {
    EQUIPMENT: 'llt_equipment',
    MAINTENANCE: 'llt_maintenance',
    INSPECTIONS: 'llt_inspections',
    SITES: 'llt_sites',
    ACTIVITY: 'llt_activity',
    CHECKOUTS: 'llt_checkouts'
};

// QR Code Scanner instance
let qrScanner = null;
let currentQRCode = null;

// Sample Equipment Data
const SAMPLE_EQUIPMENT = [
    {
        id: 'eq-001',
        name: 'CAT 320 Excavator',
        assetId: 'EXC-001',
        type: 'heavy-plant',
        status: 'available',
        site: 'site-001',
        operator: 'John Smith',
        serviceInterval: 250,
        currentHours: 1245,
        lastService: '2024-01-15',
        nextServiceDue: 1495,
        description: '20-ton hydraulic excavator with bucket attachment',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-002',
        name: 'JCB 3CX Backhoe Loader',
        assetId: 'BHL-002',
        type: 'heavy-plant',
        status: 'in-use',
        site: 'site-002',
        operator: 'Mike Johnson',
        serviceInterval: 500,
        currentHours: 2890,
        lastService: '2024-01-20',
        nextServiceDue: 3390,
        description: '4WD backhoe loader with extendable dipper',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-003',
        name: '25-Ton Mobile Crane',
        assetId: 'CRN-001',
        type: 'heavy-plant',
        status: 'maintenance',
        site: 'site-001',
        operator: '',
        serviceInterval: 168,
        currentHours: 876,
        lastService: '2024-01-10',
        nextServiceDue: 1044,
        description: 'Liebherr mobile crane with 30m boom',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-004',
        name: 'Ford F-150 Truck',
        assetId: 'VEH-001',
        type: 'vehicle',
        status: 'available',
        site: 'site-001',
        operator: 'David Wilson',
        serviceInterval: 5000,
        currentHours: 45600,
        lastService: '2024-01-25',
        nextServiceDue: 50600,
        description: 'Crew cab pickup truck for site transport',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-005',
        name: 'Honda GX390 Generator',
        assetId: 'GEN-001',
        type: 'power-tool',
        status: 'in-use',
        site: 'site-002',
        operator: 'Site Crew',
        serviceInterval: 100,
        currentHours: 45,
        lastService: '2024-01-01',
        nextServiceDue: 145,
        description: '5.5kW portable generator',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-006',
        name: 'DeWalt Drill Set',
        assetId: 'TOL-001',
        type: 'small-tool',
        status: 'available',
        site: 'site-001',
        operator: '',
        serviceInterval: 0,
        currentHours: 0,
        lastService: '',
        nextServiceDue: 0,
        description: '18V cordless drill and impact driver set',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-007',
        name: 'CAT D6 Bulldozer',
        assetId: 'BLD-001',
        type: 'heavy-plant',
        status: 'out-of-service',
        site: 'site-001',
        operator: '',
        serviceInterval: 500,
        currentHours: 5670,
        lastService: '2024-01-05',
        nextServiceDue: 6170,
        description: 'Crawler dozer with ripper attachment',
        createdAt: '2024-01-01'
    },
    {
        id: 'eq-008',
        name: 'Atlas Copco Compressor',
        assetId: 'CMP-001',
        type: 'power-tool',
        status: 'available',
        site: 'site-001',
        operator: '',
        serviceInterval: 500,
        currentHours: 320,
        lastService: '2024-01-12',
        nextServiceDue: 820,
        description: 'Portable air compressor for pneumatic tools',
        createdAt: '2024-01-01'
    }
];

// Sample Sites Data
const SAMPLE_SITES = [
    {
        id: 'site-001',
        name: 'Downtown Office Complex',
        address: '123 Main Street, Downtown',
        manager: 'Robert Brown',
        phone: '555-0101'
    },
    {
        id: 'site-002',
        name: 'Riverside Residential',
        address: '456 River Road, Westside',
        manager: 'Sarah Davis',
        phone: '555-0102'
    },
    {
        id: 'site-003',
        name: 'Industrial Park Phase 2',
        address: '789 Factory Lane, Northside',
        manager: 'Tom Anderson',
        phone: '555-0103'
    }
];

// Sample Maintenance Data
const SAMPLE_MAINTENANCE = [
    {
        id: 'mnt-001',
        equipmentId: 'eq-001',
        type: 'routine',
        date: '2024-01-15',
        hoursReading: 1200,
        description: 'Oil change, filter replacement, hydraulic check',
        technician: 'Jim Wilson',
        cost: 450.00
    },
    {
        id: 'mnt-002',
        equipmentId: 'eq-002',
        type: 'repair',
        date: '2024-01-20',
        hoursReading: 2850,
        description: 'Replaced hydraulic hose, checked brake system',
        technician: 'Mike Brown',
        cost: 320.00
    },
    {
        id: 'mnt-003',
        equipmentId: 'eq-003',
        type: 'inspection',
        date: '2024-01-10',
        hoursReading: 850,
        description: 'Monthly safety inspection - wire ropes, brakes, hydraulics',
        technician: 'Safety Officer',
        cost: 0.00
    }
];

// Sample Inspections Data
const SAMPLE_INSPECTIONS = [
    {
        id: 'insp-001',
        equipmentId: 'eq-001',
        inspector: 'John Smith',
        date: '2024-02-01',
        result: 'pass',
        notes: 'All systems operational',
        checklist: {
            'Engine oil level': true,
            'Hydraulic fluid': true,
            'Coolant level': true,
            'Tracks condition': true,
            'Lights and signals': true,
            'Fire extinguisher': true
        }
    },
    {
        id: 'insp-002',
        equipmentId: 'eq-002',
        inspector: 'Mike Johnson',
        date: '2024-02-01',
        result: 'pass',
        notes: 'Minor oil leak noted - monitor',
        checklist: {
            'Engine oil level': true,
            'Hydraulic fluid': true,
            'Tire pressure': true,
            'Brake function': true,
            'Lights and signals': true,
            'Fire extinguisher': true
        }
    }
];

// Inspection Checklist Templates
const INSPECTION_TEMPLATES = {
    'heavy-plant': [
        'Engine oil level',
        'Hydraulic fluid level',
        'Coolant level',
        'Fuel level',
        'Tracks/tires condition',
        'Lights and signals',
        'Brake function',
        'Horn function',
        'Fire extinguisher present',
        'First aid kit present',
        'Seat belt functional',
        'No visible leaks',
        'Attachment secure'
    ],
    'vehicle': [
        'Engine oil level',
        'Coolant level',
        'Brake fluid level',
        'Tire pressure and condition',
        'Lights and signals',
        'Windshield wipers',
        'Horn function',
        'Seat belts functional',
        'Fire extinguisher present',
        'Registration current',
        'No warning lights',
        'Spare tire present'
    ],
    'power-tool': [
        'Power cord condition',
        'Guards in place',
        'No visible damage',
        'Proper lubrication',
        'Air filter clean',
        'Fuel level',
        'Oil level',
        'Safety switches functional'
    ],
    'small-tool': [
        'No visible damage',
        'Proper working condition',
        'Battery charged (if applicable)',
        'All accessories present',
        'Safety guards intact'
    ]
};

// Activity Log
let activityLog = [];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupNavigation();
    setupEventListeners();
    loadDashboard();
    updateSiteSelects();
});

// Initialize Data from LocalStorage or Sample Data
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.EQUIPMENT)) {
        localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(SAMPLE_EQUIPMENT));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SITES)) {
        localStorage.setItem(STORAGE_KEYS.SITES, JSON.stringify(SAMPLE_SITES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MAINTENANCE)) {
        localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(SAMPLE_MAINTENANCE));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INSPECTIONS)) {
        localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(SAMPLE_INSPECTIONS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ACTIVITY)) {
        localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHECKOUTS)) {
        localStorage.setItem(STORAGE_KEYS.CHECKOUTS, JSON.stringify([]));
    }
}

// Get Data from LocalStorage
function getEquipment() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EQUIPMENT)) || [];
}

function getSites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SITES)) || [];
}

function getMaintenance() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MAINTENANCE)) || [];
}

function getInspections() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INSPECTIONS)) || [];
}

function getActivity() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY)) || [];
}

// Save Data to LocalStorage
function saveEquipment(equipment) {
    localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(equipment));
}

function saveSites(sites) {
    localStorage.setItem(STORAGE_KEYS.SITES, JSON.stringify(sites));
}

function saveMaintenance(maintenance) {
    localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(maintenance));
}

function saveInspections(inspections) {
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
}

function addActivity(action, details) {
    const activity = getActivity();
    activity.unshift({
        id: 'act-' + Date.now(),
        action,
        details,
        timestamp: new Date().toISOString()
    });
    // Keep only last 50 activities
    if (activity.length > 50) activity.pop();
    localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activity));
}

// Navigation Setup
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.dataset.page;
            switchPage(page);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    document.getElementById(page + '-page').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'equipment': 'Equipment Inventory',
        'maintenance': 'Maintenance Records',
        'inspections': 'Inspections',
        'sites': 'Construction Sites'
    };
    document.getElementById('page-title').textContent = titles[page];
    
    // Load page content
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'equipment':
            loadEquipment();
            break;
        case 'maintenance':
            loadMaintenance();
            break;
        case 'inspections':
            loadInspections();
            break;
        case 'sites':
            loadSites();
            break;
    }
}

function setupEventListeners() {
    // Set default date in forms
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.value = today;
    });
}

// Dashboard Functions
function loadDashboard() {
    const equipment = getEquipment();
    const maintenance = getMaintenance();
    const activity = getActivity();
    
    // Update stats
    const stats = {
        available: equipment.filter(e => e.status === 'available').length,
        inUse: equipment.filter(e => e.status === 'in-use').length,
        maintenance: equipment.filter(e => e.status === 'maintenance').length,
        outOfService: equipment.filter(e => e.status === 'out-of-service').length
    };
    
    document.getElementById('stat-available').textContent = stats.available;
    document.getElementById('stat-in-use').textContent = stats.inUse;
    document.getElementById('stat-maintenance').textContent = stats.maintenance;
    document.getElementById('stat-out').textContent = stats.outOfService;
    
    // Load alerts
    loadAlerts(equipment, maintenance);
    
    // Load upcoming maintenance
    loadUpcomingMaintenance(equipment, maintenance);
    
    // Load recent activity
    loadRecentActivity(activity);
}

function loadAlerts(equipment, maintenance) {
    const alertsList = document.getElementById('alerts-list');
alertsList.innerHTML = '';

    const alerts = [];
    
    // Check for overdue maintenance
    equipment.forEach(eq => {
        if (eq.serviceInterval > 0 && eq.currentHours >= eq.nextServiceDue) {
            alerts.push({
                type: 'danger',
                icon: 'fa-exclamation-circle',
                title: 'Maintenance Overdue',
                text: `${eq.name} (${eq.assetId}) is ${eq.currentHours - eq.nextServiceDue} hours overdue for service`,
                time: 'Now'
            });
        } else if (eq.serviceInterval > 0 && eq.currentHours >= eq.nextServiceDue - 50) {
            alerts.push({
                type: 'warning',
                icon: 'fa-clock',
                title: 'Maintenance Due Soon',
                text: `${eq.name} (${eq.assetId}) service due in ${eq.nextServiceDue - eq.currentHours} hours`,
                time: 'Soon'
            });
        }
    });
    
    // Check for out of service equipment
    equipment.filter(e => e.status === 'out-of-service').forEach(eq => {
        alerts.push({
            type: 'danger',
            icon: 'fa-times-circle',
            title: 'Out of Service',
            text: `${eq.name} (${eq.assetId}) is currently out of service`,
            time: 'Now'
        });
    });
    
    // Check for equipment under maintenance
    equipment.filter(e => e.status === 'maintenance').forEach(eq => {
        alerts.push({
            type: 'warning',
            icon: 'fa-tools',
            title: 'Under Maintenance',
            text: `${eq.name} (${eq.assetId}) is currently under maintenance`,
            time: 'Now'
        });
    });
    
    if (alerts.length === 0) {
        alertsList.innerHTML = `
            <div class="empty-state" style="padding: 30px;">
                <i class="fas fa-check-circle" style="color: var(--success);"></i>
                <p>No alerts at this time</p>
            </div>
        `;
    } else {
        alertsList.innerHTML = alerts.map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="alert-icon">
                    <i class="fas ${alert.icon}"></i>
                </div>
                <div class="alert-content">
                    <div class="alert-title">${alert.title}</div>
                    <div class="alert-text">${alert.text}</div>
                    <div class="alert-time">${alert.time}</div>
                </div>
            </div>
        `).join('');
    }
}

function loadUpcomingMaintenance(equipment, maintenance) {
    const container = document.getElementById('upcoming-maintenance');
    const upcoming = [];
    
    equipment.forEach(eq => {
        if (eq.serviceInterval > 0 && eq.currentHours < eq.nextServiceDue) {
            const hoursRemaining = eq.nextServiceDue - eq.currentHours;
            upcoming.push({
                equipment: eq,
                hoursRemaining,
                dueDate: new Date(Date.now() + (hoursRemaining * 3600000)).toLocaleDateString()
            });
        }
    });
    
    // Sort by hours remaining
    upcoming.sort((a, b) => a.hoursRemaining - b.hoursRemaining);
    
    if (upcoming.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px;">
                <i class="fas fa-wrench"></i>
                <p>No upcoming maintenance scheduled</p>
            </div>
        `;
    } else {
        container.innerHTML = upcoming.slice(0, 5).map(item => {
            const status = item.hoursRemaining <= 50 ? 'overdue' : item.hoursRemaining <= 100 ? 'upcoming' : 'scheduled';
            const statusText = item.hoursRemaining <= 50 ? 'Due Now' : item.hoursRemaining <= 100 ? 'Soon' : 'Scheduled';
            
            return `
                <div class="maintenance-item">
                    <div class="maintenance-info">
                        <h4>${item.equipment.name}</h4>
                        <p>${item.equipment.assetId} - ${item.hoursRemaining} hours remaining</p>
                    </div>
                    <span class="maintenance-status ${status}">${statusText}</span>
                </div>
            `;
        }).join('');
    }
}

function loadRecentActivity(activity) {
    const container = document.getElementById('recent-activity');
    
    if (activity.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 30px;">
                <i class="fas fa-history"></i>
                <p>No recent activity</p>
            </div>
        `;
    } else {
        container.innerHTML = activity.slice(0, 10).map(item => {
            const time = new Date(item.timestamp).toLocaleString();
            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-circle-info"></i>
                    </div>
                    <div class="activity-content">
                        <p><strong>${item.action}</strong> - ${item.details}</p>
                    </div>
                    <span class="activity-time">${time}</span>
                </div>
            `;
        }).join('');
    }
}

// Equipment Functions
function loadEquipment() {
    const equipment = getEquipment();
    const sites = getSites();
    const grid = document.getElementById('equipment-grid');
    
    if (equipment.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-truck-monster"></i>
                <h3>No Equipment Found</h3>
                <p>Add your first piece of equipment to get started</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = equipment.map(eq => {
        const site = sites.find(s => s.id === eq.site);
        const typeLabels = {
            'heavy-plant': 'Heavy Plant',
            'vehicle': 'Vehicle',
            'power-tool': 'Power Tool',
            'small-tool': 'Small Tool'
        };
        const typeIcons = {
            'heavy-plant': 'fa-truck-monster',
            'vehicle': 'fa-truck',
            'power-tool': 'fa-plug',
            'small-tool': 'fa-toolbox'
        };
        
        return `
            <div class="equipment-card" onclick="showEquipmentDetail('${eq.id}')">
                <div class="equipment-header">
                    <div class="equipment-title">
                        <h3>${eq.name}</h3>
                        <span class="asset-id">${eq.assetId}</span>
                    </div>
                    <span class="status-badge ${eq.status}">${eq.status.replace('-', ' ')}</span>
                </div>
                <div class="equipment-body">
                    <div class="equipment-info">
                        <div class="info-item">
                            <span class="info-label">Location</span>
                            <span class="info-value">${site ? site.name : 'Not assigned'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Operator</span>
                            <span class="info-value">${eq.operator || 'Unassigned'}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Hours</span>
                            <span class="info-value">${eq.currentHours.toLocaleString()}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">Next Service</span>
                            <span class="info-value">${eq.nextServiceDue ? eq.nextServiceDue.toLocaleString() : 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <div class="equipment-footer">
                    <span class="equipment-type">
                        <i class="fas ${typeIcons[eq.type]}"></i>
                        ${typeLabels[eq.type]}
                    </span>
                    <div class="equipment-actions" onclick="event.stopPropagation()">
                        <button onclick="showQRCode('${eq.id}')" title="QR Code">
                            <i class="fas fa-qrcode"></i>
                        </button>
                        <button onclick="editEquipment('${eq.id}')" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteEquipment('${eq.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterEquipment() {
    const search = document.getElementById('equipment-search').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const typeFilter = document.getElementById('type-filter').value;
    
    const cards = document.querySelectorAll('.equipment-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const assetId = card.querySelector('.asset-id').textContent.toLowerCase();
        const status = card.querySelector('.status-badge').textContent.toLowerCase().replace(' ', '-');
        const type = card.querySelector('.equipment-type').textContent.toLowerCase().replace(' ', '-');
        
        const matchesSearch = name.includes(search) || assetId.includes(search);
        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesType = !typeFilter || type.includes(typeFilter.replace('-', ' '));
        
        card.style.display = matchesSearch && matchesStatus && matchesType ? 'block' : 'none';
    });
}

function showAddEquipmentModal() {
    document.getElementById('equipment-form').reset();
    document.getElementById('equipment-form').dataset.editId = '';
    openModal('equipment-modal');
}

function saveEquipment(event) {
    event.preventDefault();
    
    const form = event.target;
    const editId = form.dataset.editId;
    
    const equipment = getEquipment();
    
    const newEquipment = {
        id: editId || 'eq-' + Date.now(),
        name: form.name.value,
        assetId: form.assetId.value,
        type: form.type.value,
        status: form.status.value,
        site: form.site.value,
        operator: form.operator.value,
        serviceInterval: parseInt(form.serviceInterval.value) || 0,
        currentHours: parseInt(form.currentHours.value) || 0,
        lastService: '',
        nextServiceDue: parseInt(form.currentHours.value || 0) + (parseInt(form.serviceInterval.value) || 0),
        description: form.description.value,
        createdAt: editId ? equipment.find(e => e.id === editId)?.createdAt : new Date().toISOString()
    };
    
    if (editId) {
        const index = equipment.findIndex(e => e.id === editId);
        equipment[index] = newEquipment;
        addActivity('Equipment Updated', `Updated ${newEquipment.name} (${newEquipment.assetId})`);
    } else {
        equipment.push(newEquipment);
        addActivity('Equipment Added', `Added ${newEquipment.name} (${newEquipment.assetId})`);
    }
    
    saveEquipment(equipment);
    closeModal('equipment-modal');
    loadEquipment();
    
    // Refresh dashboard if visible
    if (document.getElementById('dashboard-page').classList.contains('active')) {
        loadDashboard();
    }
}

function editEquipment(id) {
    const equipment = getEquipment();
    const eq = equipment.find(e => e.id === id);
    
    if (!eq) return;
    
    const form = document.getElementById('equipment-form');
    form.name.value = eq.name;
    form.assetId.value = eq.assetId;
    form.type.value = eq.type;
    form.status.value = eq.status;
    form.site.value = eq.site;
    form.operator.value = eq.operator;
    form.serviceInterval.value = eq.serviceInterval;
    form.currentHours.value = eq.currentHours;
    form.description.value = eq.description;
    form.dataset.editId = id;
    
    openModal('equipment-modal');
}

function deleteEquipment(id) {
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    
    let equipment = getEquipment();
    const eq = equipment.find(e => e.id === id);
    equipment = equipment.filter(e => e.id !== id);
    saveEquipment(equipment);
    
    // Also delete related maintenance and inspections
    let maintenance = getMaintenance();
    maintenance = maintenance.filter(m => m.equipmentId !== id);
    saveMaintenance(maintenance);
    
    let inspections = getInspections();
    inspections = inspections.filter(i => i.equipmentId !== id);
    saveInspections(inspections);
    
    addActivity('Equipment Deleted', `Deleted ${eq.name} (${eq.assetId})`);
    loadEquipment();
}

function showEquipmentDetail(id) {
    const equipment = getEquipment();
    const sites = getSites();
    const maintenance = getMaintenance();
    const inspections = getInspections();
    
    const eq = equipment.find(e => e.id === id);
    if (!eq) return;
    
    const site = sites.find(s => s.id === eq.site);
    const eqMaintenance = maintenance.filter(m => m.equipmentId === id).slice(0, 5);
    const eqInspections = inspections.filter(i => i.equipmentId === id).slice(0, 5);
    
    const typeLabels = {
        'heavy-plant': 'Heavy Plant',
        'vehicle': 'Vehicle',
        'power-tool': 'Power Tool',
        'small-tool': 'Small Tool'
    };
    
    document.getElementById('detail-name').textContent = eq.name;
    
    const content = document.getElementById('equipment-detail-content');
    content.innerHTML = `
        <div class="equipment-detail-section">
            <h4 class="detail-section-title">Equipment Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Asset ID</span>
                    <span class="detail-value">${eq.assetId}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Type</span>
                    <span class="detail-value">${typeLabels[eq.type]}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Status</span>
                    <span class="detail-value" style="text-transform: capitalize;">${eq.status.replace('-', ' ')}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location</span>
                    <span class="detail-value">${site ? site.name : 'Not assigned'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Operator</span>
                    <span class="detail-value">${eq.operator || 'Unassigned'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Current Hours</span>
                    <span class="detail-value">${eq.currentHours.toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        <div class="equipment-detail-section">
            <h4 class="detail-section-title">Service Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Service Interval</span>
                    <span class="detail-value">${eq.serviceInterval > 0 ? eq.serviceInterval + ' hours' : 'N/A'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Next Service Due</span>
                    <span class="detail-value">${eq.nextServiceDue > 0 ? eq.nextServiceDue.toLocaleString() + ' hours' : 'N/A'}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Last Service</span>
                    <span class="detail-value">${eq.lastService || 'Never'}</span>
                </div>
            </div>
        </div>
        
        ${eq.description ? `
        <div class="equipment-detail-section">
            <h4 class="detail-section-title">Description</h4>
            <p style="color: var(--gray-600); font-size: 0.875rem;">${eq.description}</p>
        </div>
        ` : ''}
        
        <div class="modal-footer" style="padding: 20px 24px;">
            <button type="button" class="btn btn-secondary" onclick="closeModal('equipment-detail-modal')">Close</button>
            <button type="button" class="btn btn-primary" onclick="closeModal('equipment-detail-modal'); editEquipment('${eq.id}')">
                <i class="fas fa-edit"></i> Edit Equipment
            </button>
        </div>
    `;
    
    openModal('equipment-detail-modal');
}

// Maintenance Functions
function loadMaintenance() {
    const maintenance = getMaintenance();
    const equipment = getEquipment();
    const container = document.getElementById('maintenance-list');
    
    if (maintenance.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-wrench"></i>
                <h3>No Maintenance Records</h3>
                <p>Log your first maintenance activity</p>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    const sorted = [...maintenance].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = sorted.map(m => {
        const eq = equipment.find(e => e.id === m.equipmentId);
        const typeLabels = {
            'routine': 'Routine Service',
            'repair': 'Repair',
            'inspection': 'Inspection',
            'breakdown': 'Breakdown'
        };
        
        return `
            <div class="maintenance-record">
                <div class="record-type ${m.type}">
                    <i class="fas ${m.type === 'routine' ? 'fa-oil-can' : m.type === 'repair' ? 'fa-wrench' : m.type === 'inspection' ? 'fa-clipboard-check' : 'fa-exclamation-triangle'}"></i>
                </div>
                <div class="record-info">
                    <h4>${eq ? eq.name : 'Unknown Equipment'}</h4>
                    <p>${typeLabels[m.type]} - ${m.description.substring(0, 60)}${m.description.length > 60 ? '...' : ''}</p>
                </div>
                <div class="record-meta">
                    <div class="record-date">${new Date(m.date).toLocaleDateString()}</div>
                    <div class="record-cost">$${m.cost.toFixed(2)}</div>
                </div>
            </div>
        `;
    }).join('');
}

function showAddMaintenanceModal() {
    const equipment = getEquipment();
    const select = document.getElementById('maintenance-equipment');
    
    select.innerHTML = '<option value="">Select Equipment</option>' + 
        equipment.map(eq => `<option value="${eq.id}">${eq.name} (${eq.assetId})</option>`).join('');
    
    document.getElementById('maintenance-form').reset();
    document.getElementById('maintenance-form').querySelector('input[type="date"]').value = new Date().toISOString().split('T')[0];
    
    openModal('maintenance-modal');
}

function saveMaintenance(event) {
    event.preventDefault();
    
    const form = event.target;
    const maintenance = getMaintenance();
    
    const newMaintenance = {
        id: 'mnt-' + Date.now(),
        equipmentId: form.equipmentId.value,
        type: form.type.value,
        date: form.date.value,
        hoursReading: parseInt(form.hoursReading.value) || 0,
        description: form.description.value,
        technician: form.technician.value,
        cost: parseFloat(form.cost.value) || 0
    };
    
    maintenance.push(newMaintenance);
    saveMaintenance(maintenance);
    
    // Update equipment hours and last service if applicable
    const equipment = getEquipment();
    const eqIndex = equipment.findIndex(e => e.id === form.equipmentId.value);
    
    if (eqIndex !== -1) {
        equipment[eqIndex].currentHours = parseInt(form.hoursReading.value) || equipment[eqIndex].currentHours;
        
        if (form.type.value === 'routine') {
            equipment[eqIndex].lastService = form.date.value;
            equipment[eqIndex].nextServiceDue = equipment[eqIndex].currentHours + equipment[eqIndex].serviceInterval;
        }
        
        saveEquipment(equipment);
    }
    
    const eq = equipment.find(e => e.id === form.equipmentId.value);
    addActivity('Maintenance Logged', `Logged ${form.type.value} for ${eq ? eq.name : 'equipment'}`);
    
    closeModal('maintenance-modal');
    loadMaintenance();
    
    if (document.getElementById('dashboard-page').classList.contains('active')) {
        loadDashboard();
    }
}

// Inspections Functions
function loadInspections() {
    const inspections = getInspections();
    const equipment = getEquipment();
    const container = document.getElementById('inspections-list');
    
    if (inspections.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-check"></i>
                <h3>No Inspections</h3>
                <p>Complete your first pre-start inspection</p>
            </div>
        `;
        return;
    }
    
    // Sort by date (newest first)
    const sorted = [...inspections].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = sorted.map(i => {
        const eq = equipment.find(e => e.id === i.equipmentId);
        
        return `
            <div class="inspection-card">
                <div class="inspection-header">
                    <div class="inspection-equipment">
                        <h4>${eq ? eq.name : 'Unknown Equipment'}</h4>
                        <p>${eq ? eq.assetId : ''}</p>
                    </div>
                    <span class="inspection-result ${i.result}">${i.result.toUpperCase()}</span>
                </div>
                <div class="inspection-details">
                    <div class="inspection-detail">
                        <i class="fas fa-user"></i>
                        <span>${i.inspector}</span>
                    </div>
                    <div class="inspection-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(i.date).toLocaleDateString()}</span>
                    </div>
                    <div class="inspection-detail">
                        <i class="fas fa-check-circle"></i>
                        <span>${Object.values(i.checklist).filter(v => v).length}/${Object.keys(i.checklist).length} checks passed</span>
                    </div>
                </div>
                ${i.notes ? `<p style="margin-top: 12px; font-size: 0.8125rem; color: var(--gray-600);"><strong>Notes:</strong> ${i.notes}</p>` : ''}
            </div>
        `;
    }).join('');
}

function showNewInspectionModal() {
    const equipment = getEquipment();
    const select = document.getElementById('inspection-equipment');
    
    select.innerHTML = '<option value="">Select Equipment</option>' + 
        equipment.map(eq => `<option value="${eq.id}" data-type="${eq.type}">${eq.name} (${eq.assetId})</option>`).join('');
    
    select.onchange = function() {
        const selected = this.options[this.selectedIndex];
        const type = selected.dataset.type;
        generateInspectionChecklist(type);
    };
    
    document.getElementById('inspection-form').reset();
    document.getElementById('inspection-form').querySelector('input[type="date"]').value = new Date().toISOString().split('T')[0];
    document.getElementById('inspection-checklist').innerHTML = '<p style="color: var(--gray-500); font-size: 0.875rem;">Select equipment to view checklist</p>';
    
    openModal('inspection-modal');
}

function generateInspectionChecklist(type) {
    const checklist = INSPECTION_TEMPLATES[type] || INSPECTION_TEMPLATES['small-tool'];
    const container = document.getElementById('inspection-checklist');
    
    container.innerHTML = checklist.map((item, index) => `
        <div class="checklist-item">
            <input type="checkbox" id="check-${index}" name="checklist" value="${item}" checked>
            <label for="check-${index}">${item}</label>
        </div>
    `).join('');
}

function saveInspection(event) {
    event.preventDefault();
    
    const form = event.target;
    const checklistItems = form.querySelectorAll('input[name="checklist"]');
    const checklist = {};
    
    checklistItems.forEach(item => {
        checklist[item.value] = item.checked;
    });
    
    const allPassed = Object.values(checklist).every(v => v);
    
    const inspections = getInspections();
    
    const newInspection = {
        id: 'insp-' + Date.now(),
        equipmentId: form.equipmentId.value,
        inspector: form.inspector.value,
        date: form.date.value,
        result: allPassed ? 'pass' : 'fail',
        notes: form.notes.value,
        checklist
    };
    
    inspections.push(newInspection);
    saveInspections(inspections);
    
    const equipment = getEquipment();
    const eq = equipment.find(e => e.id === form.equipmentId.value);
    addActivity('Inspection Completed', `Completed ${allPassed ? 'passed' : 'failed'} inspection for ${eq ? eq.name : 'equipment'}`);
    
    closeModal('inspection-modal');
    loadInspections();
}

// Sites Functions
function loadSites() {
    const sites = getSites();
    const equipment = getEquipment();
    const container = document.getElementById('sites-list');
    
    if (sites.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-map-marker-alt"></i>
                <h3>No Sites</h3>
                <p>Add your first construction site</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sites.map(site => {
        const siteEquipment = equipment.filter(e => e.site === site.id);
        
        return `
            <div class="site-card">
                <h4>${site.name}</h4>
                <div class="site-info">
                    <div class="site-info-item">
                        <i class="fas fa-map-pin"></i>
                        <span>${site.address}</span>
                    </div>
                    <div class="site-info-item">
                        <i class="fas fa-user-tie"></i>
                        <span>${site.manager || 'No manager assigned'}</span>
                    </div>
                    ${site.phone ? `
                    <div class="site-info-item">
                        <i class="fas fa-phone"></i>
                        <span>${site.phone}</span>
                    </div>
                    ` : ''}
                </div>
                <div class="site-stats">
                    <div class="site-stat">
                        <i class="fas fa-truck-monster"></i>
                        <span>${siteEquipment.length} equipment</span>
                    </div>
                    <div class="site-stat">
                        <i class="fas fa-check-circle"></i>
                        <span>${siteEquipment.filter(e => e.status === 'available').length} available</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showAddSiteModal() {
    document.getElementById('site-form').reset();
    openModal('site-modal');
}

function saveSite(event) {
    event.preventDefault();
    
    const form = event.target;
    const sites = getSites();
    
    const newSite = {
        id: 'site-' + Date.now(),
        name: form.name.value,
        address: form.address.value,
        manager: form.manager.value,
        phone: form.phone.value
    };
    
    sites.push(newSite);
    saveSites(sites);
    
    addActivity('Site Added', `Added new site: ${newSite.name}`);
    
    closeModal('site-modal');
    loadSites();
    updateSiteSelects();
}

function updateSiteSelects() {
    const sites = getSites();
    const selects = document.querySelectorAll('select[name="site"]');
    
    selects.forEach(select => {
        const currentValue = select.value;
        select.innerHTML = '<option value="">Select Site</option>' + 
            sites.map(site => `<option value="${site.id}">${site.name}</option>`).join('');
        select.value = currentValue;
    });
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
}

// Export/Import Functions
function exportData() {
    const data = {
        equipment: getEquipment(),
        sites: getSites(),
        maintenance: getMaintenance(),
        inspections: getInspections(),
        activity: getActivity(),
        checkouts: getCheckouts(),
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `long-line-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addActivity('Data Exported', 'Exported all data to JSON file');
}

function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.equipment) localStorage.setItem(STORAGE_KEYS.EQUIPMENT, JSON.stringify(data.equipment));
            if (data.sites) localStorage.setItem(STORAGE_KEYS.SITES, JSON.stringify(data.sites));
            if (data.maintenance) localStorage.setItem(STORAGE_KEYS.MAINTENANCE, JSON.stringify(data.maintenance));
            if (data.inspections) localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(data.inspections));
            if (data.activity) localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(data.activity));
            if (data.checkouts) localStorage.setItem(STORAGE_KEYS.CHECKOUTS, JSON.stringify(data.checkouts));
            
            addActivity('Data Imported', 'Imported data from backup file');
            alert('Data imported successfully!');
            
            // Refresh current page
            const activePage = document.querySelector('.page.active').id.replace('-page', '');
            switchPage(activePage);
            updateSiteSelects();
        } catch (error) {
            alert('Error importing data: Invalid file format');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

// ==================== QR CODE & CHECKOUT FUNCTIONS ====================

// Get Checkouts from LocalStorage
function getCheckouts() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKOUTS)) || [];
}

function saveCheckouts(checkouts) {
    localStorage.setItem(STORAGE_KEYS.CHECKOUTS, JSON.stringify(checkouts));
}

// Generate QR Code Data
function generateQRData(equipmentId) {
    const equipment = getEquipment();
    const eq = equipment.find(e => e.id === equipmentId);
    if (!eq) return null;
    
    return {
        id: eq.id,
        assetId: eq.assetId,
        name: eq.name,
        type: eq.type
    };
}

// Show QR Code Modal
function showQRCode(equipmentId) {
    const data = generateQRData(equipmentId);
    if (!data) return;
    
    currentQRCode = data;
    
    const container = document.getElementById('qr-code-container');
    container.innerHTML = '';
    
    // Generate QR Code
    const qrData = JSON.stringify({
        app: 'long-line-tracker',
        version: '1.0',
        equipmentId: data.id,
        assetId: data.assetId
    });
    
    new QRCode(container, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: '#1e293b',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.M
    });
    
    document.getElementById('qr-equipment-name').textContent = data.name;
    document.getElementById('qr-asset-id').textContent = data.assetId;
    
    openModal('qr-modal');
}

// Print Current QR Code
function printCurrentQR() {
    if (!currentQRCode) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>QR Label - ${currentQRCode.assetId}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    margin: 0;
                    background: #f5f5f5;
                }
                .label {
                    background: white;
                    border: 2px solid #333;
                    border-radius: 8px;
                    padding: 20px;
                    text-align: center;
                    width: 250px;
                }
                .label h3 {
                    margin: 0 0 10px 0;
                    font-size: 16px;
                    color: #333;
                }
                .label p {
                    margin: 0 0 15px 0;
                    font-size: 14px;
                    color: #666;
                    font-family: monospace;
                }
                #qrcode img {
                    margin: 0 auto;
                }
                @media print {
                    body { background: white; }
                    .label { border: 1px solid #000; }
                }
            </style>
        </head>
        <body>
            <div class="label">
                <h3>${currentQRCode.name}</h3>
                <p>${currentQRCode.assetId}</p>
                <div id="qrcode"></div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script>
                new QRCode(document.getElementById('qrcode'), {
                    text: '${JSON.stringify({app: 'long-line-tracker', version: '1.0', equipmentId: currentQRCode.id, assetId: currentQRCode.assetId})}',
                    width: 180,
                    height: 180
                });
                setTimeout(() => window.print(), 500);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// QR Scanner Functions
function startQRScanner() {
    const reader = document.getElementById('qr-reader');
    
    if (qrScanner) {
        qrScanner.stop().catch(() => {});
    }
    
    qrScanner = new Html5Qrcode('qr-reader');
    
    qrScanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.error('QR Scanner error:', err);
        alert('Could not start camera. Please ensure you have given camera permissions.');
    });
}

function onScanSuccess(decodedText) {
    try {
        const data = JSON.parse(decodedText);
        
        if (data.app === 'long-line-tracker' && data.equipmentId) {
            // Stop scanner
            if (qrScanner) {
                qrScanner.stop().catch(() => {});
            }
            
            // Show equipment details
            showScannedEquipment(data.equipmentId);
        }
    } catch (e) {
        console.log('Invalid QR code scanned');
    }
}

function onScanFailure(error) {
    // Scan failure, ignore
}

function showScannedEquipment(equipmentId) {
    const equipment = getEquipment();
    const eq = equipment.find(e => e.id === equipmentId);
    
    if (!eq) {
        alert('Equipment not found');
        return;
    }
    
    const checkouts = getCheckouts();
    const activeCheckout = checkouts.find(c => c.equipmentId === equipmentId && !c.returnedAt);
    
    const container = document.getElementById('scan-result');
    container.style.display = 'block';
    
    container.innerHTML = `
        <div class="scan-result-header">
            <div class="scan-result-info">
                <h4>${eq.name}</h4>
                <p>${eq.assetId} - ${eq.type.replace('-', ' ')}</p>
                ${activeCheckout ? `
                    <p style="color: var(--info); margin-top: 8px;">
                        <i class="fas fa-user"></i> Checked out by ${activeCheckout.personName}
                        <br><small>Since ${new Date(activeCheckout.checkedOutAt).toLocaleDateString()}</small>
                    </p>
                ` : `
                    <p style="color: var(--success); margin-top: 8px;">
                        <i class="fas fa-check-circle"></i> Available
                    </p>
                `}
            </div>
            <span class="status-badge ${eq.status}">${eq.status.replace('-', ' ')}</span>
        </div>
        <div class="scan-result-actions">
            ${activeCheckout ? `
                <button class="btn btn-success" onclick="showCheckoutModal('${eq.id}', 'checkin')">
                    <i class="fas fa-sign-in-alt"></i> Check In
                </button>
            ` : `
                <button class="btn btn-primary" onclick="showCheckoutModal('${eq.id}', 'checkout')">
                    <i class="fas fa-sign-out-alt"></i> Check Out
                </button>
            `}
            <button class="btn btn-secondary" onclick="showEquipmentDetail('${eq.id}')">
                <i class="fas fa-info-circle"></i> View Details
            </button>
        </div>
    `;
}

function lookupByAssetId() {
    const assetId = document.getElementById('manual-asset-id').value.trim().toUpperCase();
    if (!assetId) return;
    
    const equipment = getEquipment();
    const eq = equipment.find(e => e.assetId.toUpperCase() === assetId);
    
    if (eq) {
        showScannedEquipment(eq.id);
    } else {
        alert('Equipment not found with Asset ID: ' + assetId);
    }
}

// Checkout/Check-in Functions
function showCheckoutModal(equipmentId, action) {
    const equipment = getEquipment();
    const eq = equipment.find(e => e.id === equipmentId);
    if (!eq) return;
    
    document.getElementById('checkout-equipment-id').value = equipmentId;
    document.getElementById('checkout-action').value = action;
    document.getElementById('checkout-equipment-name').value = eq.name;
    document.getElementById('checkout-title').textContent = action === 'checkout' ? 'Check Out Tool' : 'Check In Tool';
    document.getElementById('checkout-submit-btn').textContent = action === 'checkout' ? 'Check Out' : 'Check In';
    
    // Update site select
    const sites = getSites();
    const siteSelect = document.getElementById('checkout-site');
    siteSelect.innerHTML = '<option value="">Select Site</option>' + 
        sites.map(site => `<option value="${site.id}" ${site.id === eq.site ? 'selected' : ''}>${site.name}</option>`).join('');
    
    openModal('checkout-modal');
}

function saveCheckout(event) {
    event.preventDefault();
    
    const form = event.target;
    const equipmentId = form.equipmentId.value;
    const action = form.action.value;
    const personName = form.personName.value;
    const site = form.checkoutSite.value;
    const notes = form.checkoutNotes.value;
    
    const equipment = getEquipment();
    const checkouts = getCheckouts();
    
    if (action === 'checkout') {
        // Create new checkout
        const newCheckout = {
            id: 'chk-' + Date.now(),
            equipmentId: equipmentId,
            personName: personName,
            site: site,
            notes: notes,
            checkedOutAt: new Date().toISOString(),
            returnedAt: null
        };
        
        checkouts.push(newCheckout);
        
        // Update equipment status
        const eqIndex = equipment.findIndex(e => e.id === equipmentId);
        if (eqIndex !== -1) {
            equipment[eqIndex].status = 'in-use';
            equipment[eqIndex].operator = personName;
            if (site) equipment[eqIndex].site = site;
            saveEquipment(equipment);
        }
        
        addActivity('Tool Checked Out', `${equipment.find(e => e.id === equipmentId)?.name} checked out by ${personName}`);
        
    } else {
        // Find active checkout and mark as returned
        const activeCheckout = checkouts.find(c => c.equipmentId === equipmentId && !c.returnedAt);
        if (activeCheckout) {
            activeCheckout.returnedAt = new Date().toISOString();
            activeCheckout.returnNotes = notes;
        }
        
        // Update equipment status
        const eqIndex = equipment.findIndex(e => e.id === equipmentId);
        if (eqIndex !== -1) {
            equipment[eqIndex].status = 'available';
            equipment[eqIndex].operator = '';
            if (site) equipment[eqIndex].site = site;
            saveEquipment(equipment);
        }
        
        addActivity('Tool Checked In', `${equipment.find(e => e.id === equipmentId)?.name} checked in by ${personName}`);
    }
    
    saveCheckouts(checkouts);
    closeModal('checkout-modal');
    
    // Refresh scan result
    showScannedEquipment(equipmentId);
    
    // Refresh dashboard if visible
    if (document.getElementById('dashboard-page').classList.contains('active')) {
        loadDashboard();
    }
}

// Labels Page Functions
function loadLabels() {
    const equipment = getEquipment();
    const grid = document.getElementById('labels-grid');
    
    if (equipment.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-qrcode"></i>
                <h3>No Equipment Found</h3>
                <p>Add equipment to generate QR code labels</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = equipment.map(eq => {
        const qrData = JSON.stringify({
            app: 'long-line-tracker',
            version: '1.0',
            equipmentId: eq.id,
            assetId: eq.assetId
        });
        
        // Generate a data URL for the QR code
        const qrId = 'qr-' + eq.id;
        
        return `
            <div class="label-card" data-id="${eq.id}" data-type="${eq.type}">
                <div class="label-qr">
                    <div id="${qrId}" style="width: 100px; height: 100px;"></div>
                </div>
                <div class="label-info">
                    <h4>${eq.name}</h4>
                    <p>${eq.assetId}</p>
                    <span class="label-type">${eq.type.replace('-', ' ')}</span>
                </div>
                <div class="label-select">
                    <input type="checkbox" class="label-checkbox" value="${eq.id}" checked>
                </div>
            </div>
        `;
    }).join('');
    
    // Generate QR codes after rendering
    setTimeout(() => {
        equipment.forEach(eq => {
            const qrData = JSON.stringify({
                app: 'long-line-tracker',
                version: '1.0',
                equipmentId: eq.id,
                assetId: eq.assetId
            });
            
            const container = document.getElementById('qr-' + eq.id);
            if (container) {
                new QRCode(container, {
                    text: qrData,
                    width: 100,
                    height: 100,
                    colorDark: '#1e293b',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.M
                });
            }
        });
    }, 100);
}

function filterLabels() {
    const search = document.getElementById('labels-search').value.toLowerCase();
    const typeFilter = document.getElementById('labels-type-filter').value;
    
    const cards = document.querySelectorAll('.label-card');
    
    cards.forEach(card => {
        const name = card.querySelector('h4').textContent.toLowerCase();
        const assetId = card.querySelector('p').textContent.toLowerCase();
        const type = card.dataset.type;
        
        const matchesSearch = name.includes(search) || assetId.includes(search);
        const matchesType = !typeFilter || type === typeFilter;
        
        card.style.display = matchesSearch && matchesType ? 'flex' : 'none';
    });
}

function printAllLabels() {
    const checkboxes = document.querySelectorAll('.label-checkbox:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one label to print');
        return;
    }
    
    const equipment = getEquipment();
    const selectedIds = Array.from(checkboxes).map(cb => cb.value);
    const selectedEquipment = equipment.filter(eq => selectedIds.includes(eq.id));
    
    const printWindow = window.open('', '_blank');
    
    let labelsHtml = selectedEquipment.map(eq => `
        <div class="print-label">
            <h4>${eq.name}</h4>
            <p>${eq.assetId}</p>
            <div id="print-qr-${eq.id}"></div>
        </div>
    `).join('');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>QR Labels</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: white;
                }
                .print-label {
                    display: inline-block;
                    width: 200px;
                    border: 2px solid #333;
                    border-radius: 8px;
                    padding: 15px;
                    margin: 10px;
                    text-align: center;
                    page-break-inside: avoid;
                }
                .print-label h4 {
                    margin: 0 0 5px 0;
                    font-size: 14px;
                    color: #333;
                }
                .print-label p {
                    margin: 0 0 10px 0;
                    font-size: 12px;
                    color: #666;
                    font-family: monospace;
                }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            ${labelsHtml}
            <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
            <script>
                const equipment = ${JSON.stringify(selectedEquipment)};
                equipment.forEach(eq => {
                    const qrData = JSON.stringify({
                        app: 'long-line-tracker',
                        version: '1.0',
                        equipmentId: eq.id,
                        assetId: eq.assetId
                    });
                    new QRCode(document.getElementById('print-qr-' + eq.id), {
                        text: qrData,
                        width: 150,
                        height: 150
                    });
                });
                setTimeout(() => window.print(), 1000);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Update switchPage to handle new pages
const originalSwitchPage = switchPage;
switchPage = function(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    document.getElementById(page + '-page').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'equipment': 'Equipment Inventory',
        'maintenance': 'Maintenance Records',
        'inspections': 'Inspections',
        'sites': 'Construction Sites',
        'scan': 'Scan Tool QR Code',
        'labels': 'Print QR Labels'
    };
    document.getElementById('page-title').textContent = titles[page];
    
    // Load page content
    switch(page) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'equipment':
            loadEquipment();
            break;
        case 'maintenance':
            loadMaintenance();
            break;
        case 'inspections':
            loadInspections();
            break;
        case 'sites':
            loadSites();
            break;
        case 'scan':
            // Scan page loads automatically
            break;
        case 'labels':
            loadLabels();
            break;
    }
};
