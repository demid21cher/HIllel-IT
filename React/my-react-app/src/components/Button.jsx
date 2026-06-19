export function Button({ label, onClick }) {
  const handleClick = () => {
    if (onClick) {
      console.log('Button clicked!');
    }
  };
  return (
    <button type="button" className="counter" onClick={handleClick}>
      {label}
    </button>
  );
}
