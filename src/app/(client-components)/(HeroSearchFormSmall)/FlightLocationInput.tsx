"use client";

import React, { useState } from "react";
import { FC } from "react";
import { useEffect } from "react";
import ClearDataButton from "./ClearDataButton";
import { useRef } from "react";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useDebounce } from 'use-debounce';
import {fetchCitiesFromApi} from "@/services/flightService"; // Import debounce
import {Skeleton} from "@nextui-org/react";

export interface FlightLocationInputProps {
    onInputDone?: (value: string) => void;
    placeHolder?: string;
    desc?: string;
    className?: string;
    divHideVerticalLineClass?: string;
    autoFocus?: boolean;
    onChange?: (value: any) => void; // Add this line

}

const FlightLocationInput: FC<FlightLocationInputProps> = ({
                                                   autoFocus = false,
                                                   onInputDone,
                                                   placeHolder = "Location",
                                                   desc = "Where are you going?",
                                                   className = "nc-flex-1.5",
                                                   divHideVerticalLineClass = "left-10 -right-0.5",
                                                               onChange, // Destructure onChange prop

                                                           }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState("");
    const [showPopover, setShowPopover] = useState(autoFocus);

    const [searchResults, setSearchResults] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [debouncedValue] = useDebounce(value, 300);

    useEffect(() => {
        const fetchCities = async () => {
            if (debouncedValue) {
                setLoading(true);
                try {
                    const data = await fetchCitiesFromApi(debouncedValue);
                    setSearchResults(data.length > 0 ? data : getDefaultCity());
                } catch (error) {
                    setSearchResults(getDefaultCity());
                } finally {
                    setLoading(false);
                }
            }
        };

        const getDefaultCity = () => ([{
            "name": "No data found",
            "iata": "No data found"
        }]);

        fetchCities();
    }, [debouncedValue]);




    useEffect(() => {
        setShowPopover(autoFocus);
        if (autoFocus && !!inputRef.current) {
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
            }, 200);
        }
    }, [autoFocus]);

    useOutsideAlerter(containerRef, () => {
        setShowPopover(false);
    });

    useEffect(() => {
        if (showPopover && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showPopover]);

    const handleSelectLocation = (item: string) => {
        setValue(item);
        onInputDone && onInputDone(item);
        setShowPopover(false);
        onChange && onChange(item);

    };



    const renderRecentSearches = () => {
        return (
            <>
                <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base text-neutral-800 dark:text-neutral-100">
                    Recent searches
                </h3>
                <div className="mt-2">
                    {[
                        "Hamptons, Suffolk County, NY",
                        "Las Vegas, NV, United States",
                        "Ueno, Taito, Tokyo",
                        "Ikebukuro, Toshima, Tokyo",
                    ].map((item) => (
                        <span
                            onClick={() => handleSelectLocation(item)}
                            key={item}
                            className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                        >
              <span className="block text-neutral-400">
                <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              </span>
              <span className=" block text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
                    ))}
                </div>
            </>
        );
    };

    const renderSearchValue = () => {
        return (
            <>
                {loading ? ( // Display NexUI Skeleton while loading
                    <div className="flex px-4 sm:px-6 items-center space-x-3 py-4">
                        <Skeleton
                            className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                            style={{ borderRadius: '8px' }}  // Adjust the border-radius as needed
                        />
                        <Skeleton
                            className="block text-neutral-400"
                            style={{ borderRadius: '8px' }}  // Adjust the border-radius as needed
                        />
                        <Skeleton
                            className="block text-neutral-700 dark:text-neutral-200"
                            style={{ width: '100%', height: '2em', borderRadius: '8px' }}  // Adjust the border-radius as needed
                        />
                    </div>
                ) : (
                    searchResults.map((item: any) => (
                        <span
                            onClick={() => handleSelectLocation(item.iata)}
                            key={item.name}
                            className="flex px-4 sm:px-6 items-center space-x-3 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
                        >
              <span className="block text-neutral-400">
                <MapPinIcon className="h-4 w-4 sm:h-6 sm:w-6" />
              </span>
              <span className="block text-neutral-700 dark:text-neutral-200">
                {item.name}
              </span>
            </span>
                    ))
                )}
            </>
        );
    };

    return (
        <div className={`relative flex ${className}`} ref={containerRef}>

            <div

                onChange={() => setShowPopover(true)}
                className={`flex flex-1 relative z-10 [ nc-hero-field-padding--small ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
                    showPopover ? "nc-hero-field-focused--2" : ""
                }`}
            >
                <div className="flex-1">

                    <input
                        className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-400 xl:text-base font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
                        placeholder={placeHolder}
                        value={value}
                        autoFocus={showPopover}
                        onChange={(e) => {
                            const inputValue = e.currentTarget.value;
                            setValue(inputValue);
                            // Note: You may handle debouncing here if needed

                            // For example, if you want to update the state and trigger onChange when a user selects a location
                            // (this is just a placeholder, adapt it according to your requirements)
                            handleSelectLocation(inputValue);
                        }}

                        ref={inputRef}
                    />
                    <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
            <span className="line-clamp-1">{!!value ? placeHolder : desc}</span>
          </span>
                    {value && showPopover && (
                        <ClearDataButton onClick={() => setValue("")} />
                    )}
                </div>
            </div>

            {showPopover && (
                <div
                    className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
                ></div>
            )}

            {showPopover && (

                <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[400px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-5 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
                    {value ? renderSearchValue() : renderRecentSearches()}
                </div>
            )}
        </div>
    );
};

export default FlightLocationInput;