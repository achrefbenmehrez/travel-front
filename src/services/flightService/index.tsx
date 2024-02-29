require('dotenv').config()
export const fetchFlightData = async (startDate:any,endDate:any,defaultAirport:any,defaultDestinationAiport:any) => {
    try {
        const duffleApiUrl : any = process.env.NEXT_PUBLIC_DUFFLE_API_URL;
        const response = await fetch(`${duffleApiUrl}/duffle`, {
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
