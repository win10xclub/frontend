import React from 'react';

interface ICustomCheckBoxProps {
    label: string;
    value: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckBox: React.FC<ICustomCheckBoxProps> = (props) => {
    const { label, value, onChange } = props;
    return (
        <div className="flex items-center justify-center">
            <input
                id="default-checkbox"
                type="checkbox"
                checked={true}
                onChange={onChange}
                className="w-4 h-4 text-accColor bg-textColor border-primColor rounded focus:ring-1 focus:ring-accColor "
            />
            <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {label}
            </label>
        </div>
    );
};

export default CustomCheckBox;
