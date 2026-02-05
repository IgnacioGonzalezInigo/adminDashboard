# Admin Dashboard

A modern, responsive Admin Dashboard built with React for managing users, products, and analytics. Features a clean UI, data tables with pagination and sorting, interactive charts, CRUD operations, and role-based access control.

## ✨ Features

### Core Functionality
- **📊 Dashboard Overview** - KPI cards showing total users, active users, revenue, and system status with animated counters
- **👥 User Management** - Complete CRUD operations for managing users with roles and statuses
- **📦 Product Management** - Inventory management with stock tracking and status indicators
- **📈 Analytics** - Interactive bar and line charts with data export functionality
- **⚙️ Settings** - Role switcher, theme preferences, and data management

### User Experience
- **🌓 Dark/Light Mode** - Smooth theme switching with localStorage persistence
- **🔐 Role-Based Access** - Switch between Admin (full access) and Viewer (read-only) roles
- **🔍 Search & Filter** - Debounced search across all data tables
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **💾 Data Persistence** - All changes saved to browser localStorage
- **🎨 Modern Design** - Premium UI with glassmorphism, gradients, and smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd C:\Users\nacho\.gemini\antigravity\scratch\admin-dashboard
   ```

2. **Install dependencies** (already done during setup):
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
admin-dashboard/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Sidebar.jsx      # Navigation sidebar
│   │   ├── KPICard.jsx      # Metric display cards
│   │   ├── DataTable.jsx    # Table with pagination/sorting/search
│   │   ├── Chart.jsx        # Bar and line chart renderer
│   │   ├── Modal.jsx        # Reusable modal dialog
│   │   └── ThemeToggle.jsx  # Dark/light mode toggle
│   │
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard with KPIs and charts
│   │   ├── Users.jsx        # User management page
│   │   ├── Products.jsx     # Product management page
│   │   ├── Analytics.jsx    # Analytics and reporting page
│   │   └── Settings.jsx     # Settings and preferences
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.js  # localStorage state management
│   │   ├── useDebounce.js      # Debounce hook for search
│   │   └── useTheme.js         # Theme management hook
│   │
│   ├── context/             # React context for global state
│   │   └── AppContext.jsx   # App-wide state and CRUD operations
│   │
│   ├── utils/               # Utility functions
│   │   └── mockData.js      # Mock data generators
│   │
│   ├── App.jsx              # Main app component with routing
│   └── App.css              # Global styles and design system
```

## 🎨 Design System

### Color Palette
- **Primary:** HSL(250, 75%, 55%) - Purple/Blue for main actions
- **Success:** HSL(142, 76%, 45%) - Green for positive states
- **Warning:** HSL(45, 93%, 55%) - Yellow for caution
- **Danger:** HSL(0, 84%, 60%) - Red for destructive actions

### Typography
- **Font Family:** Inter (Google Fonts)
- **Font Sizes:** 0.75rem to 2.25rem (responsive scale)
- **Font Weights:** 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Design Principles
- **Modern & Clean** - Minimalist interface with focus on content
- **Consistent Spacing** - 8px base unit system
- **Smooth Animations** - 150-350ms cubic-bezier transitions
- **Glassmorphism** - Subtle backdrop blur and transparency
- **Accessibility** - High contrast ratios and clear visual hierarchy

## 🔧 Component Documentation

### DataTable Component
Reusable table with advanced features:
- **Pagination** - Configurable items per page
- **Sorting** - Click column headers (ascending/descending)
- **Search** - Debounced filtering across all columns
- **Actions** - Edit and delete buttons (role-dependent)
- **Responsive** - Switches to card view on mobile

### Chart Component
Canvas-based chart renderer:
- **Types:** Bar chart and line chart
- **Features:** Auto-scaling, gradient fills, grid lines
- **Theme-aware:** Colors adapt to light/dark mode
- **Responsive:** Adjusts to container width

### Modal Component
Flexible dialog component:
- **Sizes:** Small, medium, large
- **Accessibility:** Keyboard and click-outside to close
- **Animation:** Smooth slide-up entrance

## 💡 Usage Guide

### Adding a New User
1. Navigate to **Users** page
2. Ensure you're in **Admin** role (check Settings)
3. Click **➕ Add User** button
4. Fill in the form (name, email, role, status)
5. Click **Create User**

### Managing Products
1. Go to **Products** page
2. Use search bar to filter products
3. Click column headers to sort
4. Click **✏️** to edit or **🗑️** to delete (admin only)

### Switching Themes
- Click the theme toggle (🌙/☀️) in the top navigation
- Theme preference is saved automatically

### Changing Roles
1. Go to **Settings** page
2. Select **Admin** or **Viewer** under User Role
3. Navigate to Users or Products to see permission changes

### Exporting Data
1. Go to **Analytics** page
2. Click **📥 Export Data**
3. JSON file downloads with all analytics data

## 🗄️ Data Persistence

All data is stored in browser **localStorage**:
- `admin-dashboard-users` - User records
- `admin-dashboard-products` - Product records
- `admin-dashboard-role` - Current user role
- `admin-dashboard-theme` - Theme preference

### Resetting Data
1. Go to **Settings** page
2. Click **🔄 Reset to Default Data** to restore mock data
3. Click **🗑️ Clear All Data** to delete everything

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and above (4-column grid, full sidebar)
- **Tablet:** 768px - 1199px (2-column grid, collapsible sidebar)
- **Mobile:** Below 768px (1-column grid, card-view tables, hidden sidebar)

## 🛠️ Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **HTML5 Canvas** - Chart rendering
- **CSS3** - Styling with custom properties
- **LocalStorage API** - Data persistence

## 🎯 Key Design Decisions

### No External Libraries
All features built from scratch using vanilla React and CSS:
- **Charts:** HTML5 Canvas instead of chart libraries
- **Tables:** Custom implementation with React state
- **Routing:** Simple state-based navigation (no React Router)
- **Forms:** Native HTML5 validation

### Why No React Router?
For this dashboard, simple state-based navigation is sufficient and keeps the bundle size minimal. All pages are loaded simultaneously, enabling instant navigation.

### Why Canvas Charts?
Canvas provides maximum control over appearance and performance. Charts are theme-aware and responsive without external dependencies.

### LocalStorage vs Backend
LocalStorage provides a realistic demo experience without requiring server setup. Perfect for prototyping and client-side applications.

## 🐛 Known Limitations

- No real authentication (role switching is simulated)
- Data is local to browser (not shared across devices)
- Limited to ~5MB storage (browser localStorage limit)
- No real-time updates or multi-user support

## 🚀 Future Enhancements

- [ ] Export to CSV/Excel
- [ ] Bulk operations (delete multiple items)
- [ ] Advanced filtering (date ranges, multiple criteria)
- [ ] Drag-and-drop table reordering
- [ ] User profile pages
- [ ] Dashboard customization
- [ ] Email notifications (simulated)

## 📄 License

This is a demo project for educational and portfolio purposes.

## 🤝 Contributing

This is a standalone demo project. Feel free to fork and customize for your own use!

---

**Built with ❤️ using React + Vite**
