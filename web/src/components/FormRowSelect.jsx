import PropTypes from "prop-types";

const FormRowSelect = ({ name, labelText, list, defaultValue = "" }) => {
  return (
    <div>
      <div className="m-0 ">
        <label
          htmlFor={name}
          className="block mb-2.5 capitalize leading-6 tracking-[1px] font-600"
        >
          {labelText || name}
        </label>
        <select
          defaultValue={defaultValue}
          id={name}
          name={name}
          className="w-full py-1.5 px-3 rounded bg-grey-50 text-grey-900 border-gray-300 border  capitalize"
        >
          {list.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

FormRowSelect.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string,
};

export default FormRowSelect;
