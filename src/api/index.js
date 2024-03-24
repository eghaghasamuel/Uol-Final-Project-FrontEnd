import axios from "axios";

export const getPlacesData = async (type,bounds) => {
    
    try {
        console.log(process.env)
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: bounds.sw.lat,
              tr_latitude: bounds.ne.lat,
              bl_longitude: bounds.sw.lng,
              tr_longitude: bounds.ne.lng
              
            },
            headers: {
              'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data;
    }catch (error) {
        console.log(error)
    }
}