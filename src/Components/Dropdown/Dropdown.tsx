import { useEffect, useRef, useState,  } from "react";
import { GoChevronDown } from "react-icons/go";
import useOutsideClick from "./hooks/useOutsideClick";
import React from "react";
import {InputSizes} from "../utils/InputSizes";
import {useTranslation} from "react-i18next";

interface DropdownItem {
    id: string;
    name: string;
    imageUrl?: string;
}

interface DropdownProps {
    id: string;
    data: DropdownItem[];
    size?: InputSizes;
    selectedId?: string;
    label: string;
    translate?: boolean;
    required?: boolean;
    error?: string;
    labelColor?: string;
    disabled?: boolean;
    onSelect?: (id: string) => void;
}

const Dropdown = ({
    id,
    data,
    size = InputSizes.DEFAULT,
    selectedId,
    label,
    translate = true,
    required = false,
    error,
    labelColor,
    disabled = false,
    onSelect,
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        selectedId ? data?.find((item) => item.id === selectedId) : undefined
    );

    const { t } = useTranslation();

    const handleChange = (item: DropdownItem) => {
        setSelectedItem(item);
        onSelect && onSelect(item.id);
        setIsOpen(false);
    };

    useEffect(() => {
        if (selectedId && data) {
            const newSelectedItem = data.find((item) => item.id === selectedId);
            newSelectedItem && setSelectedItem(newSelectedItem);
        } else {
            setSelectedItem(undefined);
        }
    }, [selectedId, data]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: dropdownRef,
        handler: () => setIsOpen(false),
    });

    const sizeChosen = (size: InputSizes) => {
        switch (size) {
            case InputSizes.FULL:
                return "w-full";
            case InputSizes.XLARGE:
                return "lg:w-96 w-full";
            case InputSizes.LARGE:
                return "lg: w-80 w-full";
            case InputSizes.DEFAULT:
                return "lg:w-60 w-full";
            case InputSizes.SMALL:
                return "lg:w-44 w-full";
        }
    };

    // @ts-ignore
    return (
        <div ref={dropdownRef} className={`relative ${sizeChosen(size)}`}>
            <label className={`font-robot font-medium ${labelColor? labelColor : 'text-gray-600'}`}>{label} {required && "*"}</label>
            <button
                id={id}
                aria-label='Toggle dropdown'
                aria-haspopup='true'
                aria-expanded={isOpen}
                type='button'
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className="mt-1 flex justify-between items-center gap-5 rounded-lg w-full h-10 px-4 border border-gray-300 bg-gray-200"
            >
                <span>{(translate? t(selectedItem?.name ?? "") :  selectedItem?.name)|| t("select")}</span>
                { !disabled &&
                    <GoChevronDown
                        size={20}
                    />
                }
            </button>
            {/* Open */}
            {isOpen && (
                <div
                    aria-label='Dropdown menu'
                    className="absolute w-full max-h-52 overflow-y-auto mt-1 bg-gray-200 rounded-lg shadow-md z-10"
                >
                    <ul
                        role='menu'
                        aria-labelledby={id}
                        aria-orientation='vertical'
                        className='leading-10 '
                    >
                        {data?.map((item) => (
                            <li
                                key={item.id}
                                onClick={() => handleChange(item)}
                                className="flex items-center cursor-pointer bg-gray-300 hover:bg-primary hover:text-white px-3 border-b border-gray-400 border-opacity-50"
                            >
                                <span>{translate? t(item.name) : item.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {error && <label className="font-robot text-red-500 font-medium ">{t(error)}</label>}
        </div>
    );
};

export default Dropdown;
