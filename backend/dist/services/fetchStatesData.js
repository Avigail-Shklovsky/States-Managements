var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import StateModel from "../models/state.js";
const fetchStatesData = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in fetch");
    try {
        // Check if the StateModel collection is empty
        const count = yield StateModel.countDocuments();
        // If the collection is not empty, exit early
        if (count > 0) {
            console.log("Data already exists in the database.");
            return;
        }
    }
    catch (_a) {
        try {
            // Replace the URL with the actual API you are fetching from
            const response = yield axios.get("https://restcountries.com/v3.1/all");
            if (response.status === 200) {
                // Extract data from the API response
                console.log("response is ok");
                const states = response.data;
                const extractedStates = states.map((state) => ({
                    name: state.name.common,
                    flag: state.flags.png,
                    population: state.population,
                    region: state.region,
                }));
                console.log("states", extractedStates);
                // Insert data into MongoDB
                yield StateModel.insertMany(extractedStates);
                console.log("Data successfully saved to MongoDB");
            }
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }
});
export default fetchStatesData;
