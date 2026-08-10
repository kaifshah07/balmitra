import api from "./api";

export const getDashboard = async () => {
  try {
    const { data } = await api.get("/admin/dashboard");
    return data;
  } catch (error) {
    console.error("Dashboard API Error:", error);

    return {
      success: false,
      statistics: {
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        completedOrders: 0,
      },
      recentProducts: [],
      lowStockProducts: [],
    };
  }
};