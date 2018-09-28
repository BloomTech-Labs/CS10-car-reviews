import React, { Component } from 'react';
import axios from 'axios';

function EditableContent(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editing: false,
        year: '',
        make: '',
        model: '',
        edition: '',
        carImage: '',
        title: '',
        content: '',
        score: ''
      };
    }
    // componentWillReceiveProps = nextProps => {
    //   this.setState({
    //     year: nextProps.year,
    //     make: nextProps.make,
    //     model: nextProps.model,
    //     edition: nextProps.edition,
    //     carImage: nextProps.carImage,
    //     title: nextProps.title,
    //     content: nextProps.content,
    //     score: nextProps.score
    //   });
    // };

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };

    toggleEdit = e => {
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel();
      } else {
        this.edit();
      }
    };

    edit = () => {
      this.setState(
        {
          editing: true
        },
        () => {
          this.domElm.focus();
        }
      );
    };

    save = () => {
      this.setState(
        {
          editing: false
        },
        () => {
          if (this.isValueChanged()) {
            console.log('Value changed to', this.domElm.textContent);

            // this.setState({
              // model: this.domElm.textContent
            // });
            const editedContent = this.domElm.textContent;
            const config = {
              headers: {
                JWT: localStorage.getItem('jwt')
              }
            };

            axios
              .put(`http://localhost:3001/api/reviews/${this.props.id}`, editedContent, config)
              .then(response => {
                console.log('editNote:', response);
              })
              .catch(err => {
                console.log('Error: ', err);
              });
          }
        }
      );
    };

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.state.changedText !== this.domElm.textContent;
    };

    handleKeyDown = e => {
      const { key } = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save();
          break;
      }
    };

    render() {
      // console.log('PROPS', this.props);
      // let editOnClick = true;
      const editing = this.state.editing;
      // if (this.props.editOnClick !== undefined) {
      //   editOnClick = this.props.editOnClick;
      // }
      return (
        <WrappedComponent
          className={editing ? 'editing' : ''}
          onClick={!editing ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={domNode => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          suppressContentEditableWarning={true}
          onChange={this.handleChange}
          {...this.props}
        >
          {this.props.value}
        </WrappedComponent>
      );
    }
  };
}

export default EditableContent;
