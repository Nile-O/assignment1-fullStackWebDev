import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const poiService = {
  poiUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.poiUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.poiUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.poiUrl}/api/users`);
    return res.data;
  },

  async createRoute(route) {
    const res = await axios.post(`${this.poiUrl}/api/routes`, route);
    return res.data;
  },

  async deleteAllRoutes() {
    const response = await axios.delete(`${this.poiUrl}/api/routes`);
    return response.data;
  },

  async deleteRoute(id) {
    const response = await axios.delete(`${this.poiUrl}/api/routes/${id}`);
    return response;
  },

  async getAllRoutes() {
    const res = await axios.get(`${this.poiUrl}/api/routes`);
    return res.data;
  },

  async getRoute(id) {
    const res = await axios.get(`${this.poiUrl}/api/routes/${id}`);
    return res.data;
  },

  async getAllStops() {
    const res = await axios.get(`${this.poiUrl}/api/stops`);
    return res.data;
  },

  async createStop(id, stop) {
    const res = await axios.post(`${this.poiUrl}/api/routes/${id}/stops`, stop);
    return res.data;
  },

  async deleteAllStops() {
    const res = await axios.delete(`${this.poiUrl}/api/stops`);
    return res.data;
  },

  async getStop(id) {
    const res = await axios.get(`${this.poiUrl}/api/stops/${id}`);
    return res.data;
  },

  async deleteStop(id) {
    const res = await axios.delete(`${this.poiUrl}/api/stops/${id}`);
    return res.data;
  },

 async authenticate(user) {
    const response = await axios.post(`${this.poiUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
    return response.data;
  },
    
  async clearAuth() {
    axios.defaults.headers.common.Authorization = "";
  }
    
};