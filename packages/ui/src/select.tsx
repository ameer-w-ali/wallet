type PropTypes = {
  label:string,
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
};
export default function Select({ options, onSelect,label }: PropTypes) {
  return (
    <div>
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {options.map((option) => (
          <option value={option.key}>{option.value}</option>
        ))}
      </select>
    </div>
  );
}
