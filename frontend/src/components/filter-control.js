import './filter-control.css'

const FilterControl = ({ label, id, value, handleChange, options }) => {
    return (
        <div className="control">
        <label htmlFor={id}>{label}</label>
        <select id={id} data-testid={id} value={value} onChange={(e) => handleChange(e.target.value)}>
            {options.map(({ label, value }) => <option
                key={label}
                value={value}
            >{label}</option>)}
        </select>
      </div>

    )
}

export default FilterControl