type PropTypes = {
  label: string;
  type?: "text" | "email" | "tel" | "number";
  id: string;
  placeholder?: string;
  pattern?:string
  max?:string
  onChange: (value: string) => void;
};

export default function Input({
  label,
  type = "text",
  id,
  placeholder,
  onChange,
}: PropTypes) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        placeholder={placeholder}
        required
        onChange={(e)=>onChange(e.target.value)}
      />
    </div>
  );
}
