import React, { Component } from 'react'
import Select from 'react-select'

export default class SearchFilter extends Component {

  handleChange = (selectedOption) => this.props.handleFilter(selectedOption.map(option => option.value), this.props.type);   

  render() {
    const { data, type, children } = this.props;  //type = makes, models, years, user
    
    // const sortedArr = [...(usernamesSet)].sort((a, b) => this.sort(a, b))
    // Select requires the following format:
    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    //   ];

    const options = []

    for (let item of data) options.push({ value: item, label: item});

    return (
        <Select 
            className={type + '-select'}
            blurInputOnSelect={false}
            closeMenuOnSelect={false}
            isMulti
            onChange={this.handleChange}
            options={options}
            placeholder={children}
        />
    )
  }
}
