import PropTypes from "prop-types";
import { useEffect } from "react";

const DropdownButton = ({
  name,
  options,
  onSort,
  selectedOption,
  setSelectedOption,
}) => {
  // Reset selected option when the prop changes
  useEffect(() => {
    setSelectedOption(""); // Reset selected option when a genre is changed
  }, [setSelectedOption]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    onSort(event.target.value); // Trigger the sorting function when an option is selected
  };

  return (
    <div className="mt-6">
      <select
        className="select select-primary w-full max-w-xs"
        value={selectedOption} // Control the selected option via state
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          {name}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

// Adding PropTypes validation
DropdownButton.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default DropdownButton;
