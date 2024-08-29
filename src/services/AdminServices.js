import requests from "./httpService";

const AdminServices = {
  registerAdmin: async (body) => {
    return requests.post("/api/signup", body);
  },

  loginAdmin: async (body) => {
    return requests.post(`/api/login`, body);
  },
  UpdateProfiles: async (body) => {
    return requests.post(`api/update-profile`, body);
  },
  updateUserRole: async (body) => {
    return requests.post(`api/change-role`, body);
  },

  GetProfile: async () => {
    return requests.get(`api/profile`);
  },

  forgetPassword: async (body) => {
    return requests.post("/api/forgot-password", body);
  },

  resetPassword: async (body) => {
    return requests.put("/admin/reset-password", body);
  },
  getAllStaff: async () => {
    return requests.get("/api/allusers");
  },
  addGames: async (body) => {
    return requests.post(`/games/uploadgames`, body);
  },
  EditGames: async (trimmedGameName, body) => {
    return requests.put(`/games/editgame/${trimmedGameName}`, body);
  },
  getAllGames: async () => {
    return requests.get("/games/allgames");
  },
  deleteGame: async (id) => {
    return requests.delete(`/games/delete/${id}`);
  },

  signUpWithProvider: async (body) => {
    return requests.post("/admin/signup", body);
  },

  // getAllStaff: async (body) => {
  //   return requests.get("/admin", body);
  // },

  getStaffById: async (id, body) => {
    return requests.post(`/admin/${id}`, body);
  },

  deleteStaff: async (id) => {
    return requests.delete(`/admin/${id}`);
  },
};

export default AdminServices;
