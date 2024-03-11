"use client";
import React, {FC, useEffect, useState} from "react";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import FlightCard, {FlightCardProps} from "@/components/FlightCard";
import Pagination from "@/components/customComponent/paginationComponent";
import CustomSpinner from "@/components/customComponent/spinnerComponent";
import * as process from "process";

require('dotenv').config();

export interface SectionGridFilterCardProps {
    className?: string;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({className = ""}) => {
    const [originalFlightData, setOriginalFlightData] = useState<FlightCardProps["data"][]>([]);
    const [flightData, setFlightData] = useState<FlightCardProps["data"][]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load from env
    const flightsPerPage = parseInt(process.env.NEXT_PUBLIC_FLIGHT_NUMBER_PER_PAGE || "5");

    useEffect(() => {
        const handleFlightDataFetched = (event: any) => {
            if (event && event.detail) {
                setFlightData(event.detail);
                setOriginalFlightData(event.detail);
                setIsLoading(false);
            } else {
                console.error('Invalid flight data format');
            }
        };

        window.addEventListener('flightDataFetched', handleFlightDataFetched);

        return () => window.removeEventListener('flightDataFetched', handleFlightDataFetched);
    }, []);

    const applyFilters = (filters: any) => {
        console.log('filters', filters);
        console.log('originalFlightData', originalFlightData);

        const calculateFlightDurationInHours = (flight: any) => {
            const departingTime = new Date(flight.departureDepartingAt).getTime();
            const arrivingTime = new Date(flight.departureArrivingAt).getTime();
            const durationInMilliseconds = arrivingTime - departingTime;
            const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
            return hours;
        };

        const filteredData = originalFlightData.filter((flight) => {
            const flightPrice = parseFloat(flight.price.replace('$', ''));
            const airlineName = flight.airlines?.name;

            const isPriceInRange =
                flightPrice >= parseFloat(filters.rangePrices[0]) &&
                flightPrice <= parseFloat(filters.rangePrices[1]);

            const isTypeOfAirlineMatch =
                filters.airlinesStates.includes('All Airlines') ||
                filters.airlinesStates.length === 0 ||
                filters.airlinesStates.includes(airlineName);

            const flightDurationInHours = calculateFlightDurationInHours(flight);
            console.log('flightDurationInHours', flightDurationInHours);

            const isTripTimeLessThanFilter =
                flightDurationInHours <= filters.tripTimes;

            console.log('isTypeOfAirlineMatch', isTypeOfAirlineMatch);
            console.log('isPriceInRange', isPriceInRange);
            console.log('isTripTimeLessThanFilter', isTripTimeLessThanFilter);

            return isTypeOfAirlineMatch && isPriceInRange && isTripTimeLessThanFilter;
        });

        console.log('filteredData', filteredData);
        setFlightData(filteredData);
    };

    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flightData.slice(indexOfFirstFlight, indexOfLastFlight);
    const typeOfAirlinesData = Array.from(new Set(originalFlightData.map((flight) => flight.airlines.name)))
        .map(name => ({name}));
    const origingAirportsData = Array.from(new Set(originalFlightData.map((flight) => flight.departureAirportOriginName)))
        .map(name => ({name}));

    const destinationAirportsData = Array.from(new Set(originalFlightData.map((flight) => flight.departureAirportDestinationName)))
        .map(name => ({name}));

    const originCountry = Array.from(new Set(originalFlightData.map((flight) => flight.departureAirportOriginName)))
        .map(name => name || '');

// Get unique destination country names and create an array of strings
    const destinationCountry = Array.from(new Set(originalFlightData.map((flight) => flight.departureAirportDestinationName)))
        .map(name => name || '');

    const totalFlights = flightData.length;

    console.log('Origin Countries:', originCountry);
    console.log('Destination Countries:', destinationCountry);


    return (
        <div className={`nc-SectionGridFilterCard ${className}`} data-nc-id="SectionGridFilterCard">
            <Heading2
                heading={originCountry + " - " + destinationCountry}
                subHeading={
                    <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
            {totalFlights} flights<span className="mx-2">·</span>round trip<span className="mx-2">·</span>2 Guests
          </span>
                }
            />
            <div className="mb-8 lg:mb-11">
                <TabFilters onFiltersChange={(filters) => applyFilters(filters)} /* other props */
                            typeOfAirlines={typeOfAirlinesData} originAirports={origingAirportsData}
                            destinationAirports={destinationAirportsData}/>
            </div>
            <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6 rounded-3xl">
                {isLoading ? (
                    <CustomSpinner/> // Display spinner only when loading
                ) : (
                    <>
                        {currentFlights.map((item, index) => (
                            <FlightCard key={index} data={item}/>
                        ))}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(flightData.length / flightsPerPage)}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default SectionGridFilterCard;