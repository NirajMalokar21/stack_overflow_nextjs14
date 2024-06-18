import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"  

interface CustomFilterTypes {
    filters: {
        name: string,
        value: string
    }[];
    otherClasses?: string;
    containerClasses?: string;
}

const Filter = ( {filters, otherClasses, containerClasses}: CustomFilterTypes ) => {
  return (
    <div>
        <div className="sm-w-[170px] min-h-[56px]">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a filter" />
                </SelectTrigger>
                <SelectContent>
                    {filters.map((filter) => {
                        return(
                            <SelectItem 
                                key={filter.name}
                                value={filter.value}>{filter.name}</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
        Hello
    </div>
  )
}

export default Filter