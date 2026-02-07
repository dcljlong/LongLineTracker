# 🏗️ Long Line Tracker

A professional construction equipment and tool management system that runs entirely in your browser. Track heavy plant, vehicles, power tools, and small tools across multiple construction sites with zero backend costs.

![Long Line Tracker](screenshot.png)

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: See equipment counts by status at a glance
- **Smart Alerts**: Get notified about overdue maintenance and out-of-service equipment
- **Upcoming Maintenance**: Track service schedules and hours remaining
- **Activity Log**: Monitor all changes and updates

### 🚜 Equipment Management
- **Full Inventory**: Track all your construction assets in one place
- **Categories**: Heavy Plant, Vehicles, Power Tools, Small Tools
- **Status Tracking**: Available, In Use, Under Maintenance, Out of Service
- **Search & Filter**: Quickly find equipment by name, status, or type
- **Service Hours**: Monitor operating hours and service intervals

### 🔧 Maintenance Records
- **Service Logging**: Record routine services, repairs, inspections, and breakdowns
- **Cost Tracking**: Monitor maintenance expenses per equipment
- **Service History**: Complete maintenance timeline for each asset
- **Automatic Updates**: Service hours automatically update equipment records

### ✅ Inspection Checklists
- **Pre-start Inspections**: Built-in checklists for different equipment types
- **Pass/Fail Tracking**: Record inspection results with detailed notes
- **Compliance Ready**: Maintain safety inspection records

### 🏢 Site Management
- **Multiple Sites**: Track equipment across different construction locations
- **Site Details**: Store addresses, managers, and contact information
- **Equipment Assignment**: Know exactly where each asset is located

### 💾 Data Management
- **Local Storage**: All data stored in your browser (private & secure)
- **Export/Import**: Backup and restore your data as JSON files
- **No Internet Required**: Works offline after initial load
- **Sample Data**: Pre-loaded with example equipment to get started

## 🚀 Getting Started

### Option 1: Use Online (Recommended)
Visit the live demo: [https://long-line-tracker.demo](https://long-line-tracker.demo)

### Option 2: Run Locally
1. Download or clone this repository
2. Open `index.html` in any modern web browser
3. That's it! No server required

### Option 3: Deploy to GitHub Pages
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" and choose `main`
4. Your app will be live at `https://yourusername.github.io/long-line-tracker`

## 📱 Usage

### Adding Equipment
1. Click "Add Equipment" button
2. Fill in equipment details (name, asset ID, type, status)
3. Set service interval and current hours
4. Save to add to your inventory

### Logging Maintenance
1. Go to Maintenance page
2. Click "Log Maintenance"
3. Select equipment and maintenance type
4. Enter details and cost
5. Save to update records

### Performing Inspections
1. Go to Inspections page
2. Click "New Inspection"
3. Select equipment (checklist auto-generates)
4. Complete all checklist items
5. Save inspection result

### Managing Sites
1. Go to Sites page
2. Click "Add Site"
3. Enter site details
4. Assign equipment to sites

### Backing Up Data
1. Click "Export Data" in the sidebar
2. Save the JSON file to your computer
3. To restore, click "Import Data" and select your backup file

## 🛠️ Technical Details

### Built With
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks, pure JS
- **LocalStorage API** - Client-side data persistence

### Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Data Structure
All data is stored in your browser's LocalStorage:
- `llt_equipment` - Equipment inventory
- `llt_sites` - Construction sites
- `llt_maintenance` - Maintenance records
- `llt_inspections` - Inspection records
- `llt_activity` - Activity log

## 📋 Equipment Categories

### Heavy Plant
- Excavators
- Bulldozers
- Cranes
- Backhoe Loaders
- Dump Trucks

### Vehicles
- Trucks
- Vans
- Pickups
- Trailers

### Power Tools
- Generators
- Compressors
- Welders
- Concrete Mixers

### Small Tools
- Hand Tools
- Measuring Equipment
- Power Drills
- Safety Equipment

## 🔒 Privacy & Security

- **100% Client-Side**: No data sent to any server
- **Private**: Your equipment data stays on your device
- **Secure**: Uses browser's built-in LocalStorage
- **Portable**: Export/import your data anytime

## 🎯 Use Cases

- **Small Contractors**: Track 20-50 pieces of equipment
- **Equipment Rental Companies**: Monitor availability and maintenance
- **Site Managers**: Daily equipment checks and assignments
- **Maintenance Teams**: Service scheduling and history tracking
- **Construction Companies**: Multi-site equipment management

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 🙏 Credits

- Icons by [Font Awesome](https://fontawesome.com)
- Fonts by [Google Fonts](https://fonts.google.com)
- Built with ❤️ for the construction industry

---

**Made for construction professionals who need simple, effective equipment tracking without the enterprise price tag.**
