"use client";

import React, {FC, useState} from "react";
import LocationInput from "../LocationInput";
import {Popover, Transition} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import {Fragment} from "react";
import NcInputNumber from "@/components/NcInputNumber";
import FlightDateRangeInput from "./FlightDateRangeInput";
import {GuestsObject} from "../../type";
import FlightLocationInput from "@/app/(client-components)/(HeroSearchFormSmall)/FlightLocationInput";
import {customFormatDate} from "@/services/utils";
import {fetchFlightData} from "@/services/flightService";

export interface FlightSearchFormProps {
}

const flightClass = [
    {
        name: "Economy",
        href: "##",
    },
    {
        name: "Business",
        href: "##",
    },
    {
        name: "Multiple",
        href: "##",
    },
];

export type TypeDropOffLocationType = "roundTrip" | "oneWay" | "";

const FlightSearchForm: FC<FlightSearchFormProps> = ({}) => {
    const [dropOffLocationType, setDropOffLocationType] =
        useState<TypeDropOffLocationType>("roundTrip");
    const [flightClassState, setFlightClassState] = useState("Economy");

    const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);
    const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1);
    const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1);

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

// ... add more filter states as needed


    // Callback functions to update origin and destination
    const handleOriginChange = (value: any) => {
        setOrigin(value);
    };

    const handleDestinationChange = (value: any) => {
        setDestination(value);
    };

    const handleChangeData = (value: number, type: keyof GuestsObject) => {
        if (type === "guestAdults") {
            setGuestAdultsInputValue(value);
            console.log("guestAdultsInputValue", value);
        }
        if (type === "guestChildren") {
            setGuestChildrenInputValue(value);
            console.log("guestChildrenInputValue", value);
        }
        if (type === "guestInfants") {
            setGuestInfantsInputValue(value);
            console.log("guestInfantsInputValue", value);
        }
    };

    const totalGuests =
        guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

    const handleFlightSearch = async (startDate: Date | null, endDate: Date | null) => {
        if (!startDate || !endDate) {
            alert("Please select both start and end dates.");
            return;
        }

        // Define start and end dates
        const startDateFormatted = customFormatDate(startDate);
        const endDateFormatted = customFormatDate(endDate);

        try {
            // Perform your API call here with the required data

            const result = await fetchFlightData(startDateFormatted,
                endDateFormatted,
                origin,
                destination,
                flightClassState,
                dropOffLocationType);

            // Dispatch a custom browser event with the fetched data
            const event = new CustomEvent('flightDataFetched', {detail: result});
            window.dispatchEvent(event);

            // For now, let's log the data
            console.log("API Result:", result);
        } catch (error) {
            console.error("Error fetching flight data:", error);
        }
    };

    const renderGuest = () => {
        return (
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            as="button"
                            className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
                        >
                            <span>{`${totalGuests || ""} Guests`}</span>
                            <ChevronDownIcon
                                className={`${
                                    open ? "" : "text-opacity-70"
                                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 left-1/2 -translate-x-1/2  py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                                <NcInputNumber
                                    className="w-full"
                                    defaultValue={guestAdultsInputValue}
                                    onChange={(value) => handleChangeData(value, "guestAdults")}
                                    max={10}
                                    min={1}
                                    label="Adults"
                                    desc="Ages 13 or above"
                                />
                                <NcInputNumber
                                    className="w-full mt-6"
                                    defaultValue={guestChildrenInputValue}
                                    onChange={(value) => handleChangeData(value, "guestChildren")}
                                    max={4}
                                    label="Children"
                                    desc="Ages 2–12"
                                />

                                <NcInputNumber
                                    className="w-full mt-6"
                                    defaultValue={guestInfantsInputValue}
                                    onChange={(value) => handleChangeData(value, "guestInfants")}
                                    max={4}
                                    label="Infants"
                                    desc="Ages 0–2"
                                />
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderSelectClass = () => {
        return (
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <Popover.Button
                            className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-cen<ter font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
                        >
                            <span>{`${flightClassState}`}</span>
                            <ChevronDownIcon
                                className={`${
                                    open ? "" : "text-opacity-70"
                                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-20 w-screen max-w-[200px] sm:max-w-[220px] px-4 top-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0  ">
                                <div
                                    className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                                    <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                                        {flightClass.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFlightClassState(item.name);
                                                    close();
                                                }}
                                                className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                            >
                                                <p className="text-sm font-medium ">{item.name}</p>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        );
    };

    const renderRadioBtn = () => {
        return (
            <div
                className=" py-5 [ nc-hero-field-padding ] flex flex-row flex-wrap border-b border-neutral-100 dark:border-neutral-700">
                <div
                    className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
                        dropOffLocationType === "roundTrip"
                            ? "bg-black shadow-black/10 shadow-lg text-white"
                            : "border border-neutral-300 dark:border-neutral-700"
                    }`}
                    onClick={(e) => setDropOffLocationType("roundTrip")}
                >
                    Round-trip
                </div>
                <div
                    className={`py-1.5 px-4 flex items-center rounded-full font-medium text-xs cursor-pointer mr-2 my-1 sm:mr-3 ${
                        dropOffLocationType === "oneWay"
                            ? "bg-black text-white shadow-black/10 shadow-lg"
                            : "border border-neutral-300 dark:border-neutral-700"
                    }`}
                    onClick={(e) => setDropOffLocationType("oneWay")}
                >
                    One-way
                </div>

                <div
                    className="self-center border-r border-slate-200 dark:border-slate-700 h-8 mr-2 my-1 sm:mr-3"></div>

                <div className="mr-2 my-1 sm:mr-3 border border-neutral-300 dark:border-neutral-700 rounded-full">
                    {renderSelectClass()}
                </div>
                <div className="my-1 border border-neutral-300 dark:border-neutral-700 rounded-full">
                    {renderGuest()}
                </div>
            </div>
        );
    };

    const renderForm = () => {
        return (
            <form
                className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
                {renderRadioBtn()}
                <div className="flex flex-1 rounded-full">
                    <FlightLocationInput
                        placeHolder="Flying from"
                        desc="Where do you want to fly from?"
                        className="flex-1"
                        onChange={handleOriginChange}
                    />
                    <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                    <FlightLocationInput
                        placeHolder="Flying to"
                        desc="Where you want to fly to?"
                        className="flex-1"
                        divHideVerticalLineClass=" -inset-x-0.5"
                        onChange={handleDestinationChange}
                    />
                    <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                    <FlightDateRangeInput
                        selectsRange={dropOffLocationType !== "oneWay"}
                        className="flex-1"
                        filterInformation={{origin, destination}}
                        onSearch={handleFlightSearch}
                    />
                </div>
            </form>
        );
    };

    return renderForm();
};

export default FlightSearchForm;
