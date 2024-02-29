// src/components/CustomSpinner.jsx
import React from "react";
import { Spinner } from "@nextui-org/react";

const CustomSpinner = () => {
    return (
        <div className="flex justify-center items-center">
            <Spinner size="lg" color="primary" />
        </div>
    );
};

export default CustomSpinner;
