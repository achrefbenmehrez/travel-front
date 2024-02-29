"use client";

import Image from "next/image";
import React, {FC, useState} from "react";
import {de} from "date-fns/locale";

export interface FlightCardProps {
    className?: string;
    data: {
        id: string;
        airlines: {
            logo: string;
            name: string;
        };
        price: string;
        departureOrigin: string;
        departureDestination: string;
        returnOrigin: string;
        returnDestination: string;
        departureAirportOriginName: string;
        departureAirportDestinationName: string;
        departureAircraft: string;
        departureOperatingIataCode: string;
        departureOperatingCarrierFlightNumber: string;
        departureClass: string;
        departureDepartingAt: string;
        departureArrivingAt: string;
        returnAirportOriginName: string;
        returnAirportDestinationName: string;
        returnAircraft: string;
        returnOperatingIataCode: string;
        returnOperatingCarrierFlightNumber: string;
        returnClass: string;
        returnDepartingAt: string;
        returnArrivingAt: string;


    };
}

const FlightCard: FC<FlightCardProps> = ({className = "", data}) => {
    const [isOpen, setIsOpen] = useState(false);
    const formatDepartureTime = (departingAt:any) => {
        const departureTime = new Date(departingAt);
        const departureHour = ("0" + departureTime.getHours()).slice(-2);
        const departureMinutes = ("0" + departureTime.getMinutes()).slice(-2);
        return `${departureHour}:${departureMinutes}`;
    };

    const departingTime = new Date(data.departureDepartingAt).getTime();
    const arrivingTime = new Date(data.departureArrivingAt).getTime();
    const durationInMilliseconds = arrivingTime - departingTime;
    const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const getFormattedDate = (dateString: string) => {
        const date = new Date(dateString);
        const options:any = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const getTimeWithoutSeconds = (timeString: string) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
    };


    const renderDetailTop = (airlineLogo: any, origin: any, destination: any, airportOriginName: any, aiportDestinationName: any, aircraft: any, operatingIata: any, flightNumber: any,flightClass:any,departingAt:any,arrivingAt:any) => {
        const departingTime = new Date(departingAt).getTime();
        const arrivingTime = new Date(arrivingAt).getTime();
        const durationInMilliseconds = arrivingTime - departingTime;
        const hours = Math.floor(durationInMilliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((durationInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
        const getFormattedDate = (dateString: string) => {
            const date = new Date(dateString);
            const options:any = { weekday: 'long', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        };

        const getTimeWithoutSeconds = (timeString: string) => {
            const time = new Date(timeString);
            return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
        };
        return (
            <div>
                <div className="flex flex-col md:flex-row ">
                    <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7">
                        <Image
                            src={airlineLogo}
                            className="w-10"
                            alt=""
                            sizes="40px"
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className="flex my-5 md:my-0">
                        <div className="flex-shrink-0 flex flex-col items-center py-2">
                            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
                            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
                            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
                        </div>
                        <div className="ml-4 space-y-10 text-sm">
                            <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                                {getFormattedDate(departingAt)} · {getTimeWithoutSeconds(departingAt)}
                </span>
                                <span className=" font-semibold">
                  {airportOriginName} ({origin})
                </span>
                            </div>
                            <div className="flex flex-col space-y-1">
                <span className=" text-neutral-500 dark:text-neutral-400">
                                {getFormattedDate(arrivingAt)} · {getTimeWithoutSeconds(arrivingAt)}
                </span>
                                <span className=" font-semibold">
                  {aiportDestinationName} ({destination})
                </span>
                            </div>
                        </div>
                    </div>
                    <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
                    <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1 md:space-y-2">
                        <li>Trip time: {hours} hours {minutes} minutes</li>
                        <li>ANA · {flightClass} class · {aircraft} · {operatingIata} {flightNumber}</li>
                    </ul>
                </div>
            </div>
        );
    };

    const renderDetail = () => {
        if (!isOpen) return null;
        return (
            <div className="p-4 md:p-8 border border-neutral-200 dark:border-neutral-700 rounded-2xl ">
                {renderDetailTop(data.airlines.logo, data.departureOrigin, data.departureDestination,
                    data.departureAirportOriginName, data.departureAirportDestinationName, data.departureAircraft,
                    data.departureOperatingIataCode, data.departureOperatingCarrierFlightNumber,data.departureClass,data.departureDepartingAt,data.departureArrivingAt)}
                <div className="my-7 md:my-10 space-y-5 md:pl-24">
                    <div className="border-t border-neutral-200 dark:border-neutral-700"/>
                    <div className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
                        Transit time: 15 hours 45 minutes - Bangkok (BKK)
                    </div>
                    <div className="border-t border-neutral-200 dark:border-neutral-700"/>
                </div>
                {renderDetailTop(data.airlines.logo, data.returnOrigin, data.returnDestination,
                    data.returnAirportOriginName, data.returnAirportDestinationName, data.returnAircraft,
                    data.returnOperatingIataCode, data.returnOperatingCarrierFlightNumber,data.returnClass,data.returnDepartingAt,data.returnArrivingAt)}
            </div>
        );
    };

    return (
        <div
            className={`nc-FlightCardgroup p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100
     dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow space-y-6 ${className}`}
        >
            <div className={` sm:pr-20 relative  ${className}`}>
                {/*  eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a href="##" className="absolute inset-0"/>

                <span
                    className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-10 h-10 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer ${
                        isOpen ? "transform -rotate-180" : ""
                    }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
          <i className="text-xl las la-angle-down"></i>
        </span>

                <div className="flex  flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
                    {/* LOGO IMG */}
                    <div className="w-24 lg:w-32 flex-shrink-0">
                        <Image
                            src={data.airlines.logo}
                            width={40}
                            height={40}
                            className="w-10"
                            alt="air-logo"
                            sizes="40px"
                        />
                    </div>

                    {/* FOR MOBILE RESPONSIVE */}
                    <div className="block lg:hidden space-y-1">
                        <div className="flex font-semibold">
                            <div>
                                <span>{formatDepartureTime(data.departureDepartingAt)}</span>
                                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
    {data.departureOrigin}

                </span>
                            </div>
                            <span className="w-12 flex justify-center">
                <i className=" text-2xl las la-long-arrow-alt-right"></i>
              </span>
                            <div>
                                <span>{formatDepartureTime(data.returnArrivingAt)}</span>
                                <span className="flex items-center text-sm text-neutral-500 font-normal mt-0.5">
    {data.departureDestination}

                </span>
                            </div>
                        </div>

                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            <span className="VG3hNb">Nonstop</span>
                            <span className="mx-2">·</span>
                            <span>7h 45m</span>
                            <span className="mx-2">·</span>
                            <span>HAN</span>
                        </div>
                    </div>

                    {/* TIME - NAME */}
                    <div className="hidden lg:block  min-w-[150px] flex-[4] ">
                        <div className="font-medium text-lg">{formatDepartureTime(data.departureArrivingAt)} - {formatDepartureTime(data.returnArrivingAt)}</div>
                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            {data.airlines.name}
                        </div>
                    </div>

                    {/* TIMME */}
                    <div className="hidden lg:block flex-[4] whitespace-nowrap">
                        <div className="font-medium text-lg">     {data.departureOrigin}
                            - {data.departureDestination}
                        </div>
                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            {hours} hours {minutes} minutes
                        </div>
                    </div>

                    {/* TYPE */}
                    <div className="hidden lg:block flex-[4] whitespace-nowrap">
                        <div className="font-medium text-lg">1 stop</div>
                        <div className="text-sm text-neutral-500 font-normal mt-0.5">
                            2 hours 15 minutes BKK
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className="flex-[4] whitespace-nowrap sm:text-right">
                        <div>
              <span className="text-xl font-semibold text-secondary-6000">
                {data.price}
              </span>
                        </div>
                        <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
                            round-trip
                        </div>
                    </div>
                </div>
            </div>

            {/* DETAIL */}
            {renderDetail()}
        </div>
    );
};

export default FlightCard;
