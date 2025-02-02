import StateModel from "../models/state";
import { fetchStatesData } from "../utils/fetchStatesData";

const initializeData = async () => {
  try {
    const count = await StateModel.countDocuments();

    if (count > 0) {
      console.log("Data already exists in the database. No need to fetch data");
      return;
    }
  } catch (error) {
    return;
  }

  try {
    fetchStatesData();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return;
  }
};

export default initializeData;
