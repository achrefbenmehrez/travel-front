require('dotenv').config()
const duffleApiUrl : any = process.env.NEXT_PUBLIC_DUFFLE_API_URL;

export const fetchFlightData = async (startDate:any,endDate:any,defaultAirport:any,defaultDestinationAiport:any) => {
    try {
        console.log('duffleApiUrl',duffleApiUrl);
        const response = await fetch(`${duffleApiUrl}/duffle/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                    startDate: startDate,
                    endDate: endDate,
                departureOrigin: defaultAirport,
                departureDestination: defaultDestinationAiport,
                returnOrigin: defaultDestinationAiport,
                returnDestination: defaultAirport,
                cabinClass: "economy",
                passengerType: "adult",
            }),
        });

        if (!response.ok) {
            console.log("Failed to fetch data");
            throw new Error("Failed to fetch data");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Handle error appropriately in your component
    }
};



export const fetchCitiesFromApi = async (inputValue: any) => {
    const response = await fetch(`${duffleApiUrl}/amadeus/geolocation?keyword=${inputValue}`);
    const data = await response.json();
    return data;
};
