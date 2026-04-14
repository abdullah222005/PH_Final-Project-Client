// API Service Layer for Delivery Dashboard
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3333';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method for fetch with error handling
  async fetchWithAuth(endpoint, options = {}) {
    try {
      const token = localStorage.getItem('firebaseToken');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // User APIs
  async createUser(userData) {
    return this.fetchWithAuth('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getAllUsers() {
    return this.fetchWithAuth('/users');
  }

  async getUserByEmail(email) {
    const users = await this.getAllUsers();
    return users.find(user => user.email === email);
  }

  // Parcel APIs
  async getAllParcels(email = null) {
    const endpoint = email ? `/parcels?email=${email}` : '/parcels';
    return this.fetchWithAuth(endpoint);
  }

  async getParcelById(id) {
    return this.fetchWithAuth(`/parcels/${id}`);
  }

  async createParcel(parcelData) {
    return this.fetchWithAuth('/parcels', {
      method: 'POST',
      body: JSON.stringify(parcelData),
    });
  }

  async deleteParcel(id) {
    return this.fetchWithAuth(`/parcels/${id}`, {
      method: 'DELETE',
    });
  }

  async updateParcelStatus(id, status) {
    return this.fetchWithAuth(`/parcels/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ deliveryStatus: status }),
    });
  }

  // Payment APIs
  async createCheckoutSession(paymentInfo) {
    return this.fetchWithAuth('/zapshift-checkout-session', {
      method: 'POST',
      body: JSON.stringify(paymentInfo),
    });
  }

  async verifyPayment(sessionId) {
    return this.fetchWithAuth(`/verify-payment-success?session_id=${sessionId}`, {
      method: 'PATCH',
    });
  }

  async getPaymentHistory(email = null) {
    const endpoint = email ? `/payments?email=${email}` : '/payments';
    return this.fetchWithAuth(endpoint);
  }

  // Rider APIs
  async createRider(riderData) {
    return this.fetchWithAuth('/riders', {
      method: 'POST',
      body: JSON.stringify(riderData),
    });
  }

  async getAllRiders() {
    return this.fetchWithAuth('/riders');
  }

  async updateRiderStatus(id, status) {
    return this.fetchWithAuth(`/riders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ applicationStatus: status }),
    });
  }

  async getApprovedRiders() {
    const riders = await this.getAllRiders();
    return riders.filter(rider => rider.applicationStatus === 'Approved');
  }

  // Dashboard Statistics
  async getDashboardStats(userEmail = null, role = 'admin') {
    try {
      const [parcels, payments, riders] = await Promise.all([
        this.getAllParcels(role === 'customer' ? userEmail : null),
        this.getPaymentHistory(role === 'customer' ? userEmail : null),
        role === 'admin' ? this.getAllRiders() : Promise.resolve([]),
      ]);

      const activeRiders = riders.filter(r => r.applicationStatus === 'Approved').length;
      const pendingParcels = parcels.filter(p => p.deliveryStatus?.toLowerCase() === 'pending-pickup').length;
      const inTransitParcels = parcels.filter(p => 
        p.deliveryStatus?.toLowerCase().includes('transit') || 
        p.deliveryStatus?.toLowerCase().includes('picked')
      ).length;
      const deliveredParcels = parcels.filter(p => p.deliveryStatus?.toLowerCase() === 'delivered').length;
      
      const totalRevenue = payments.reduce((sum, payment) => sum + (payment.amount || 0), 0);

      // Calculate average delivery time (mock for now, you can enhance this)
      const avgDeliveryTime = '28 min'; // You'll need to calculate this based on actual delivery times

      return {
        totalOrders: parcels.length,
        pendingOrders: pendingParcels,
        inTransitOrders: inTransitParcels,
        deliveredOrders: deliveredParcels,
        activeRiders,
        totalRevenue: totalRevenue.toFixed(2),
        avgDeliveryTime,
        parcels,
        payments,
        riders,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
}

export default new ApiService();
