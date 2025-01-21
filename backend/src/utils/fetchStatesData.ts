import axios from "axios";
import StateModel from "../models/state";

export const fetchStatesData = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        if (response) {
          const states = response.data;
          // Map and transform data if needed
          const extractedStates = states.map((state: any) => ({
            name: state.name.common,
            flag: state.flags.png,
            population: state.population,
            region: state.region,
          }));
    
          // Insert data into MongoDB
          await StateModel.insertMany(extractedStates);
    
          console.log("Data successfully saved to MongoDB.");
        }
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
}
