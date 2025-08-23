'use client';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import FormHelperText from '@mui/material/FormHelperText';
// import { useCountry } from "@/CountruContext";

const ValidatedSearchMultiSelect = ({ name, control, rules, label, options, errors, setGlobalFilter, isLoading }) => {
    const [searchQuery, setSearchQuery] = useState('');
    // const { mode } = useCountry();
    const mode = 'light'; // Placeholder for mode, replace with actual context or prop if needed    

    const handleSearchChange = (newValue) => {
        setSearchQuery(newValue);
        setGlobalFilter(newValue);
    };

    const isError = !!errors[name];

    // Add "Select All" option to the options list
    const enhancedOptions = [
        { label: 'Select All', value: 'select-all' }, // Custom "Select All" option
        ...options.map(option => ({
            label: option.label,
            value: option.value,
        })),
    ];

    const handleChange = (selectedOptions, field) => {
        // Ensure selectedOptions is an array
        const selectedValues = Array.isArray(selectedOptions)
            ? selectedOptions.map(option => option.value)
            : selectedOptions ? [selectedOptions.value] : [];

        // Check if "Select All" is selected
        if (selectedValues.includes('select-all')) {
            // Select all options except the "Select All" option
            const allValues = options.map(option => option.value);
            field.onChange(allValues);
            return;
        }

        field.onChange(selectedValues); // Update field value with selected options
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
                <>
                    <Select
                        {...field}
                        label="Select options"
                        inputValue={searchQuery}
                        onInputChange={handleSearchChange}
                        options={enhancedOptions} // Use enhanced options with "Select All"
                        value={enhancedOptions.filter(option => field.value?.includes(option.value))}
                        onChange={(selectedOptions) => handleChange(selectedOptions, field)}
                        placeholder={label}
                        isLoading={isLoading}
                        isClearable
                        noOptionsMessage={() => 'No options'}
                        isMulti // Enable multiple select
                        menuPortalTarget={document.body}
                        styles={{
                            menu: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                                backgroundColor: mode !== 'light' ? '#000' : '#fff',
                                borderColor: mode !== 'light' ? '#56596f' : '#fff',
                            }),
                            control: (provided) => ({
                                ...provided,
                                zIndex: 1,
                                backgroundColor: mode !== 'light' ? '#000' : '',
                                borderColor: isError ? 'red' : (mode !== 'light' ? '#56596f' : ''),
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected
                                    ? (mode !== 'light' ? '#000' : '#d9d9d9')
                                    : (state.isFocused
                                        ? (mode !== 'light' ? '#000' : '#e5e5e5')
                                        : 'transparent'),
                                color: mode !== 'light' ? '#fff' : '#000',
                                cursor: 'pointer',
                                padding: '10px',
                            }),
                        }}
                    />
                    {errors[name] && (
                        <FormHelperText error>
                            {errors[name].message}
                        </FormHelperText>
                    )}
                </>
            )}
        />
    );
};

export default ValidatedSearchMultiSelect;
