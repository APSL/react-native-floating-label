import React, { View } from 'react-native'
import t from 'tcomb-form-native'
import FloatingLabel from 'react-native-floating-label'
import Button from 'apsl-react-native-button'

const Form = t.form.Form
const Login = t.struct({
  email: t.String,
  password: t.String,
})

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: {},
      options: {
        fields: {
          email: {
            factory: FloatingLabel,
          },
          password: {
            factory: FloatingLabel,
          },
        },
      },
    }
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Form ref='form'
          type={Login}
          value={this.state.value}
          options={this.state.options}
        />
      <Button style={{marginTop: 20,}} onPress={() => {
          console.log(this.refs.form.getValue());
        }}>
          Login
        </Button>
      </View>
    )
  }
}

module.exports = App
