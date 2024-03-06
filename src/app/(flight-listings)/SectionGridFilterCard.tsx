"use client"
import React, { FC, useEffect, useState } from "react";
import TabFilters from "./TabFilters";
import Heading2 from "@/shared/Heading2";
import FlightCard, { FlightCardProps } from "@/components/FlightCard";
import Pagination from "@/components/customComponent/paginationComponent";
import CustomSpinner from "@/components/customComponent/spinnerComponent"; // Import your custom spinner
import * as process from "process";
require('dotenv').config()

export interface SectionGridFilterCardProps {
    className?: string;
}

const SectionGridFilterCard: FC<SectionGridFilterCardProps> = ({ className = "" }) => {
    const [flightData, setFlightData] = useState<FlightCardProps["data"][]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
    // load from env
    const flightsPerPage = parseInt(process.env.NEXT_PUBLIC_FLIGHT_NUMBER_PER_PAGE || "5"); // Default to 5 if environment variable is not set
    useEffect(() => {
        const handleFlightDataFetched = (event: any) => {
            setFlightData(event.detail);
            setIsLoading(false);
        };

        window.addEventListener('flightDataFetched', handleFlightDataFetched);

        return () => window.removeEventListener('flightDataFetched', handleFlightDataFetched);
    }, []);

    //
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flightData.slice(indexOfFirstFlight, indexOfLastFlight);

    return (
        <div className={`nc-SectionGridFilterCard ${className}`} data-nc-id="SectionGridFilterCard">
            <Heading2
                heading="Singapore - Tokyo"
                subHeading={
                    <span className="block text-neutral-500 dark:text-neutral-400 mt-3">
                        22 flights<span className="mx-2">·</span>round trip<span className="mx-2">·</span>2 Guests
                    </span>
                }
            />
            <div className="mb-8 lg:mb-11">
                <TabFilters />
            </div>
            <div className="lg:p-10 lg:bg-neutral-50 lg:dark:bg-black/20 grid grid-cols-1 gap-6 rounded-3xl">
                {isLoading ? (
                    <CustomSpinner /> // Display spinner only when loading
                ) : (
                    <>
                        {currentFlights.map((item, index) => (
                            <FlightCard key={index} data={item} />
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
