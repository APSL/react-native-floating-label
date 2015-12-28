import React, { Text, TextInput, View, Animated, PixelRatio } from 'react-native'
import t from 'tcomb-form-native'

const Component = t.form.Component

class FloatingLabel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fieldFocused: false,
      value: undefined,
      fadeAnim: new Animated.Value(0),
      placeholderString: '',
    }
  }

  getTemplate () {
    let self = this
    return function (locals) {
      const stylesheet = locals.stylesheet;
      let formGroupStyle = stylesheet.formGroup.normal;
      // TODO: var controlLabelStyle = stylesheet.controlLabel.normal;
      let textboxStyle = stylesheet.textbox.normal;
      let helpBlockStyle = stylesheet.helpBlock.normal;
      let errorBlockStyle = stylesheet.errorBlock;

      if (locals.hasError) {
        // TODO: control error
        // controlLabelStyle = stylesheet.controlLabel.error;
        formGroupStyle = stylesheet.formGroup.error;
        textboxStyle = stylesheet.textbox.error;
        helpBlockStyle = stylesheet.helpBlock.error;
      }

      if (locals.editable === false) {
        textboxStyle = stylesheet.textbox.notEditable;
      }

      const help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
      const error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null;
      const label =
        <Animated.Text style={{
          opacity: self.state.fadeAnim,
          transform: [{
            translateY: self.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0]
            }),
          }],}}>
          {locals.label}
        </Animated.Text>
      return (
        <View style={formGroupStyle}>
          {label}
          <TextInput
            ref='input'
            autoCapitalize={locals.autoCapitalize}
            autoCorrect={locals.autoCorrect}
            autoFocus={locals.autoFocus}
            bufferDelay={locals.bufferDelay}
            clearButtonMode={locals.clearButtonMode}
            editable={locals.editable}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardType={locals.keyboardType}
            multiline={locals.multiline}
            onBlur={self._onBlur.bind(self, locals)}
            onEndEditing={locals.onEndEditing}
            onFocus={self._onFocus.bind(self, locals)}
            onSubmitEditing={locals.onSubmitEditing}
            password={locals.password}
            placeholderTextColor={locals.placeholderTextColor}
            returnKeyType={locals.returnKeyType}
            selectTextOnFocus={locals.selectTextOnFocus}
            secureTextEntry={locals.secureTextEntry}
            selectionState={locals.selectionState}
            onChangeText={(value) => {
              self._onChangeText.bind(self, value, locals)
              locals.onChange(value)
            }}
            placeholder={self.placeholderString || locals.label}
            maxLength={locals.maxLength}
            numberOfLines={locals.numberOfLines}
            textAlign={locals.textAlign}
            textAlignVertical={locals.textAlignVertical}
            underlineColorAndroid={locals.underlineColorAndroid}
            style={[styles.textInput, textboxStyle]}
            value={locals.value}
          />
          {help}
          {error}
        </View>
      )
    }
  }

  _onChangeText (text, locals) {
    this.setState({value: text})
  }

  _onFocus (locals) {
    Animated.spring(
      this.state.fadeAnim,
      {toValue: 1, friction: 5},
    ).start()
    this.setState({
      fieldFocused: true,
      placeholderString: undefined,
    })
    if (locals.onFocus) {
      locals.onFocus()
    }
  }

  _onBlur (locals) {
    if (!this.state.value) {
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 0},
      ).start()
    }
    this.setState({
      fieldFocused: false,
      placeholderString: '',
    })
    if (locals.onBlur) {
      locals.onBlur()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }
}

const styles = React.StyleSheet.create({
  container: {
    paddingTop: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  textInput: {
    height: 40,
  }
})

export default FloatingLabel
