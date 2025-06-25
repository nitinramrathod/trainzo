
interface Option {
    value?: string | number;
    label?: string;
}

interface SelectProps {
    options?: Option[];
    name?:string; 
    value?: string | number;
    label?: string;
    placeholder?: string;
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    noLabel?: boolean;
}

const Select: React.FC<SelectProps> = ({ options, placeholder ="Select", noLabel = false, label, value, name, onChange }) => {
    return (
        <div className={`max-w-sm min-w-[100px] w-full ${noLabel ?'':'mb-5'}`}>
            {!noLabel && <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label || 'Select an option'}</label>}
            <select
            name={name}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                onChange={onChange}
                defaultValue={0}
            >
                <option disabled value="0">{placeholder}</option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;