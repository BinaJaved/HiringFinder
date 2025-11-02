import axios from "axios";
import { Company } from "../types";

const BACKEND_URL = "http://localhost:3000"; 

export async function fetchCompanies(query: string): Promise<Company[]> {
  try {
    const response = await axios.post(`${BACKEND_URL}/search`, { query });
    if (response.data.ok) {
      return response.data.companies as Company[];
    } else {
      console.warn("Raw model output:", response.data.raw);
      return [];
    }
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch companies from backend");
  }
}
