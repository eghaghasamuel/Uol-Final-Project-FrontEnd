import axios from "axios";

export const getPlacesData = async (type,bounds) => {
    
    try {
        console.log(bounds,)
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: bounds.sw.lat,
              tr_latitude: bounds.ne.lat,
              bl_longitude: bounds.sw.lng,
              tr_longitude: bounds.ne.lng

                // bl_latitude: '11.847676',
                // tr_latitude: '12.838442',
                // bl_longitude: '109.095887',
                // tr_longitude: '109.149359',
              
            },
            headers: {
              'X-RapidAPI-Key': '17f7e47ec4mshd39b13821f09958p14b660jsn79c178fff0fa',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          });

        return data;
    }catch (error) {
        console.log(error)
    }
}