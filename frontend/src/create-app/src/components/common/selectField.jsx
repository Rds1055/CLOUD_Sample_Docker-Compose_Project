export const SelectField = ({ label, value, setValue, options, optionValueKey, optionLabelKey, hideBlankOption}) => {
    return <div className="form-group mb-3">
    <label htmlFor="value">{label}</label>
    <select id="value"
        name="value"
        className="form-select"
        value={value}
        onChange={event => setValue(event.target.value)}>
            { !hideBlankOption && <option></option> }
            {
                options && options.map((option, index) =>
                    <option key={index} value={optionValueKey ? option[optionValueKey] : option.value}>
                        {optionLabelKey ? option[optionLabelKey]  : optionValueKey ? option[optionValueKey] : option.label }
                    </option>)
            }
    </select>
</div>
}
