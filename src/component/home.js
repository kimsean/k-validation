import React from 'react'
import validate from '../helper'

export default class Home extends React.Component {
  constructor () {
    super()
    this.state = {
      form: {
        val_1: '',
        val_2: '',
        val_3: ''
      },
      rules: {
        FnameRule: {
          length: 10,
          required: true
        },
        MnameRule: {
          length: 5,
          required: false
        },
        LnameRule: {
          length: 5,
          required: true
        },
        EmailRule: {
          required: true,
          email: true
        }
      }
    }
  }
  render() {
    return (
      <div>
        <div>
          <input type="text" rule="FnameRule" error-style="error1" formref="form1" k-validate="true" onChange={(event) => { this.setState({form: {...this.state.form, val_1: event.target.value}})  }}/> <br/>
          <input type="text" rule="MnameRule" error-style="error2" formref="form1" k-validate="true" onChange={(event) => { this.setState({form: {...this.state.form, val_2: event.target.value}})  }}/> <br/>
          <input type="text" rule="LnameRule" error-style="error3" formref="form1" k-validate="true" onChange={(event) => { this.setState({form: {...this.state.form, val_3: event.target.value}}) }}/> <br/>
          <input type="email" rule="EmailRule" error-style="error3" formref="form1" k-validate="true" onChange={(event) => { this.setState({form: {...this.state.form, val_3: event.target.value}}) }}/> <br/>
          {/* <select formref="form1" rule="LnameRule" error-style="error3" k-validate="true" >
            <option value="1">1</option>
            <option value="2">2</option>
          </select> */}
          <button
          onClick={(event) => {
            validate("form1",this.state.rules)
          }}>Submit</button>
        </div>
      </div>
    )
  }
}