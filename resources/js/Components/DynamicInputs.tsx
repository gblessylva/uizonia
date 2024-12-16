import { useState } from 'react';

interface DynamicInputsProps {
    options: string[];
    onChange: (updatedInputs: string[]) => void;
}

export default function DynamicInputs({ options, onChange }: DynamicInputsProps) {
    const [inputs, setInputs] = useState<string[]>(options || ['']);

    const handleInputChange = (value: string, index: number) => {
        const updatedInputs = [...inputs];
        updatedInputs[index] = value;
        setInputs(updatedInputs);
        onChange(updatedInputs);
    };

    const addInput = () => {
        setInputs([...inputs, '']);
    };

    const removeInput = (index: number) => {
        const updatedInputs = inputs.filter((_, i) => i !== index);
        setInputs(updatedInputs);
        onChange(updatedInputs);
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">Options</label>
            {inputs.map((input, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => handleInputChange(e.target.value, index)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {inputs.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeInput(index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={addInput}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Add Option
            </button>
        </div>
    );
}
