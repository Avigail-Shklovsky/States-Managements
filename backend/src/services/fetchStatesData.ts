import StateModel from "../models/state";
import { fetchStatesData } from "../utils/fetchStatesData";

const initializeData = async () => {
  try {
    // Check if the StateModel collection is empty
    const count = await StateModel.countDocuments();

    // If the collection is not empty, exit early
    if (count > 0) {
      console.log("Data already exists in the database. No need to fetch data");
      return;
    }
  } catch (error) {
    return;
  }

  // Fetch data from external API
  try {
    fetchStatesData();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return;
  }
};

export default initializeData;
