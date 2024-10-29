import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

interface MultisectionItem {
    id: string;
    name: string;
    imageUrl?: string;
}

interface MultisectionProps {
    id: string;
    title: string;
    data: MultisectionItem[],
    selected?: string[],
    translate?: boolean,
    onChange: (ids: string[]) => void
}

export function MultiSelection({
    id,
    title,
    data,
    selected = [],
    translate = true,
    onChange
}: MultisectionProps) {

    const [selectedItems, setSelectedItems] = useState<string[]>(selected);
    const { t } = useTranslation();

    useEffect(() => {
        onChange(selectedItems);
    }, [selectedItems]);

    const handleChange = (item: string) => {
        setSelectedItems(prev => {
            if (prev.find(existent => existent === item)) {
                return [...prev.filter(existent => existent !== item)];
            } else {
                return [...prev, item];
            }
        });
    };

    return (
        <div className="w-full flex flex-col">
            <label className=" font-robot text-gray-600 font-medium mb-1">{title}</label>
            {
                data.map(item =>
                    <div
                        key={item.id}
                        className={
                            `rounded-lg h-11 mb-2 flex items-center cursor-pointer bg-gray-300 hover:bg-primary hover:text-white px-3 border-b border-gray-400 border-opacity-50 ${selectedItems.find(selected => selected === item.id)? "bg-primary text-white": ""}`
                        }
                        onClick={() => handleChange(item.id)}
                    >
                        {translate? t(item.name) : item.name}
                    </div>
                )
            }
        </div>
    );
}
