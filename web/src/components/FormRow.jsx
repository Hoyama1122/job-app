import PropTypes from "prop-types";

const FormRow = ({ type, name, labelText, defaultValue, onChange }) => {
  return (
    <div className="mb-4">
      <label
        className="block mb-[0.75rem] capitalize leading-6 tracking-[1px] text-sm font-600 "
        htmlFor={name}
      >
        {labelText || name}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={name}
        name={name}
        className="w-full py-1.5 px-3 rounded bg-grey-50 text-grey-900 border-gray-300 border "
        defaultValue={defaultValue || ""}
        required
      />
    </div>
  );
};
FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  defaultValue: PropTypes.string,
};

FormRow.defaultProps = {
  labelText: "",
  defaultValue: "",
};
export default FormRow;
