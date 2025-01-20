import axios from "axios";
import StateModel from "../models/state";

const fetchStatesData = async () => {
  console.log("in fetch");

  try {
    // Check if the StateModel collection is empty
    const count = await StateModel.countDocuments();

    // If the collection is not empty, exit early
    if (count > 0) {
      console.log("Data already exists in the database.");
      return;
    }
  } catch {
    try {
      // Replace the URL with the actual API you are fetching from
      const response = await axios.get("https://restcountries.com/v3.1/all");

      if (response.status === 200) {
        // Extract data from the API response
        console.log("response is ok");

        const states = response.data;

        const extractedStates = states.map((state: any) => ({
          name: state.name.common,
          flag: state.flags.png,
          population: state.population,
          region: state.region,
        }));
        console.log("states", extractedStates);

        // Insert data into MongoDB
        await StateModel.insertMany(extractedStates);
        console.log("Data successfully saved to MongoDB");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
};

export default fetchStatesData;
