// Mock data for the Admin Dashboard

// Generate sample users
export const generateMockUsers = () => {
    const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'David', 'Sarah', 'Robert', 'Lisa', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Thomas', 'Linda', 'Charles', 'Barbara', 'Daniel', 'Elizabeth'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const roles = ['Admin', 'Editor', 'Viewer', 'Manager'];
    const statuses = ['Active', 'Inactive', 'Pending'];

    const users = [];

    for (let i = 1; i <= 20; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`;
        const role = roles[Math.floor(Math.random() * roles.length)];
        const status = i === 1 ? 'Active' : statuses[Math.floor(Math.random() * statuses.length)];
        const registrationDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);

        users.push({
            id: i,
            name: `${firstName} ${lastName}`,
            email,
            role,
            status,
            registrationDate: registrationDate.toISOString().split('T')[0]
        });
    }

    return users;
};

// Generate sample products
export const generateMockProducts = () => {
    const productNames = [
        'Wireless Headphones', 'Smart Watch', 'Laptop Stand', 'USB-C Cable', 'Portable Charger',
        'Bluetooth Speaker', 'Webcam HD', 'Mechanical Keyboard', 'Gaming Mouse', 'Monitor 27"',
        'Desk Lamp LED', 'Phone Case', 'Screen Protector', 'Tablet', 'Earbuds Pro',
        'Charging Dock', 'HDMI Cable', 'External SSD', 'Mouse Pad', 'Laptop Sleeve',
        'Wireless Charger', 'Power Bank', 'USB Hub', 'Stylus Pen', 'Cable Organizer'
    ];

    const categories = ['Electronics', 'Accessories', 'Audio', 'Computing', 'Mobile', 'Office'];
    const statuses = ['In Stock', 'Out of Stock', 'Low Stock'];

    const products = [];

    for (let i = 1; i <= 25; i++) {
        const name = productNames[i - 1] || `Product ${i}`;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const price = (Math.random() * 500 + 10).toFixed(2);
        const stock = Math.floor(Math.random() * 200);
        let status;

        if (stock === 0) status = 'Out of Stock';
        else if (stock < 20) status = 'Low Stock';
        else status = 'In Stock';

        products.push({
            id: i,
            name,
            category,
            price: parseFloat(price),
            stock,
            status
        });
    }

    return products;
};

// Generate analytics data
export const generateAnalyticsData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    // Last 6 months of data
    const revenueData = [];
    const userGrowthData = [];

    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const revenue = Math.floor(Math.random() * 50000 + 30000);
        const users = Math.floor(Math.random() * 500 + 200);

        revenueData.push({
            month: months[monthIndex],
            value: revenue
        });

        userGrowthData.push({
            month: months[monthIndex],
            value: users
        });
    }

    return {
        revenue: revenueData,
        userGrowth: userGrowthData
    };
};

// Category distribution for products
export const getCategoryDistribution = (products) => {
    const distribution = {};

    products.forEach(product => {
        distribution[product.category] = (distribution[product.category] || 0) + 1;
    });

    return Object.entries(distribution).map(([category, count]) => ({
        category,
        count
    }));
};

// KPI calculations
export const calculateKPIs = (users, products) => {
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const totalRevenue = products.reduce((sum, p) => sum + (p.price * Math.min(p.stock, 10)), 0);
    const systemStatus = 'Operational';

    return {
        totalUsers,
        activeUsers,
        totalRevenue: Math.floor(totalRevenue),
        systemStatus
    };
};
