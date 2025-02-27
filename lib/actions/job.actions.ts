'use server'

import { JobFilterParams } from "./shared.types"

export const fetchCountries = async() => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const getUserLocation = async() => {
    try {
        const response = await fetch('http://ip-api.com/json')
        const result = await response.json()
        return result.country
    } catch (error) {
        console.log(error)
    }
}

export const fetchJobs = async (filters: JobFilterParams) => {
    const { query, page } = filters;
  
    const headers = {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY ?? "",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    };
  
    const response = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}`,
      {
        headers,
      }
    );
  
    const result = await response.json();
    console.log(result)
  
    return result.data;
  };