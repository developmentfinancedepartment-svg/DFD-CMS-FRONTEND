import instance from "@/axiosInstance";

export const getAllStaffUnits = async () => {
  try {
    const response = await instance.get("/api/public/staff/units");
    return response.data;
  } catch (error) {
    console.error("error getting all staff units", error);
    throw error;
  }
};

export const getAllStaffDetails = async () => {
  try {
    const response = await instance.get("/api/admin/staff/details");
    return response.data;
  } catch (error) {
    console.error("error getting all staff details", error);
    throw error;
  }
};

