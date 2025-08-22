'use client'
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import FormHelperText from '@mui/material/FormHelperText';
// import { useCountry } from "@/CountruContext";

const ValidatedSearchableSelectField = ({ name, control, rules, label, options, errors, setGlobalFilter, isLoading, onChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    // const { mode } = useCountry();
    const mode = 'dark'; // Placeholder for mode, replace with actual context or prop if needed
    const handleSearchChange = (newValue) => {
        setSearchQuery(newValue);
        setGlobalFilter(newValue);
    };

    // ✅ Ensure selected value remains in options
    const mergedOptions = React.useMemo(() => {
        if (selectedOption && !options.some(option => option.value === selectedOption.value)) {
            return [...options, selectedOption]; // Add selected option to the list
        }
        return options;
    }, [options, selectedOption]);

    console.log(errors, "errors")

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => {
                // console.log(field, "field")
                return (
                    <>
                        <Select
                            {...field}
                            label="Select an option"
                            inputValue={searchQuery}
                            onInputChange={handleSearchChange}
                            // options={options?.map(option => ({
                            //     label: option.label,
                            //     value: option.value,
                            // }))}
                            options={mergedOptions}
                            value={mergedOptions.find(option => option.value === field.value) || null}
                            onChange={(selected) => {
                                setSelectedOption(selected); // ✅ Persist selection
                                field.onChange(selected ? selected.value : null);
                            }}

                            // onChange={(selectedOption) => {
                            //     const selectedValue = selectedOption ? { label: selectedOption.label, value: selectedOption.value } : null;
                            //     field.onChange(selectedValue);
                            //     if (onChange) {
                            //         onChange(selectedValue);
                            //     }
                            // }}
                            // onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}

                            placeholder={label}
                            isLoading={isLoading}
                            isClearable
                            noOptionsMessage={() => 'No options'}
                            menuPortalTarget={document.body}
                            menuPlacement="auto"
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999, // ✅ Ensures dropdown stays on top
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    zIndex: 9999,
                                    backgroundColor: mode != 'light' ? '#333333' : '#fff',
                                    color: mode != 'light' ? '#fff' : '',
                                    borderColor: mode != 'light' ? '#56596f' : '',
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    zIndex: 1, // Control z-index to avoid overlapping issues
                                    backgroundColor: mode != 'light' ? 'transparent' : '#fff',
                                    borderColor: mode != 'light' ? '#56596f' : '',
                                    color: mode != 'light' ? '#fff' : '',
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: mode !== 'light' ? '#fff' : '',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isFocused ? 'black' : '', // Black background on hover
                                    color: state.isFocused ? '#fff' : '', // White text color when hovered
                                    cursor: 'pointer',
                                    zIndex: 9999,
                                }),
                            }}
                        />
                        {errors[name] && (
                            <FormHelperText error>
                                {errors[name]?.message}
                            </FormHelperText>
                        )}
                    </>
                )
            }
            }
        />
    );
};

export default ValidatedSearchableSelectField;


// value={options.find(option => option.value === field.value) || null}
// onChange={(selectedOption) =>
//     onChange // Check if onChange is passed
//         ? (field.onChange(selectedOption ? selectedOption.value : null), onChange(selectedOption)) // If onChange is passed, call both field.onChange and onChange
//         : field.onChange(selectedOption ? selectedOption.value : null) // If onChange is not passed, only call field.onChange
// }
// onChange={(selectedOption) => field.onChange(selectedOption ? selectedOption.value : null)}

// onChange={(selectedOption) => {
//     field.onChange(selectedOption ? selectedOption.value : null);
//     if (onChange) {
//         onChange(selectedOption);
//     }
// }} 
