# react-native-floating-label
A floating label factory to use with [``tcomb-form-native``](https://github.com/gcanti/tcomb-form-native) library.

<p align="center">
<img src="https://raw.githubusercontent.com/wiki/alvaromb/react-native-floating-label/floating-form.gif" alt="Floating label" width="400">
</p>

## Usage
When configuring your ``tcomb-form-native`` ``Form``, use the ``factory`` option to set as ``FloatingLabel``:

```es6
import React, { View } from 'react-native'
import t from 'tcomb-form-native'
import FloatingLabel from 'react-native-floating-label'

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
      </View>
    )
  }
}
```

## API
You can pass all the `TextInput` props, and an additional prop called `errorPlaceholderTextColor` which accepts a color `string` to change the placeholder color when a validation error occurs.

## Author
Álvaro Medina Ballester. 2015.

amedina at apsl.net

## License

MIT.
