export function Input({ value, onChange, type, placeholder }) {
  return (
    <input
      type={type}
      className="input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
