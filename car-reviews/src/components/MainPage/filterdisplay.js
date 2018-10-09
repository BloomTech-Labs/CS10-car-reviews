import React from 'react'
import Select from 'react-select'

export default () => {
  const uniqueItems = Array.From(new Set(list));
  return (
    <Select
        isMulti
        closeMenuOnSelect={false}
        name="colors"
        options={uniqueItems}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder
    />
  )
}
