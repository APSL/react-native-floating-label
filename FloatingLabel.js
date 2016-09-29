import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native'
import t from 'tcomb-form-native'

const Textbox = t.form.Textbox

class FloatingLabel extends Textbox {
  constructor (props) {
    super(props);
    this.state = {
      fieldFocused: (props.value) ? true : false,
      value: (props.value) ? String(props.value) : undefined,
      fadeAnim: (props.value) ? new Animated.Value(1) : new Animated.Value(0),
      placeholderString: undefined,
    };
  }

  getTemplate () {
    let self = this
    return function (locals) {
      const stylesheet = locals.stylesheet;
      let formGroupStyle = stylesheet.formGroup.normal;
      let controlLabelStyle = stylesheet.controlLabel.normal;
      let textboxStyle = stylesheet.textbox.normal;
      let helpBlockStyle = stylesheet.helpBlock.normal;
      let errorBlockStyle = stylesheet.errorBlock;

      if (locals.hasError) {
        controlLabelStyle = stylesheet.controlLabel.error;
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
        <Animated.Text style={[controlLabelStyle, {
          opacity: self.state.fadeAnim,
          transform: [{
            translateY: self.state.fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 0]
            }),
          }]}]}>
          {locals.label}
        </Animated.Text>

      const placeholderString = (self.state.fieldFocused) ? '' : (locals.placeholder) ? locals.placeholder : self.state.placeholderString || locals.label;

      return (
        <TouchableWithoutFeedback onPress={() => {
            if (locals.editable === false) {
              return
            }
            self.refs.input.focus()
          }}>
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
              placeholderTextColor={(locals.hasError) ? locals.errorPlaceholderTextColor || 'red' : locals.placeholderTextColor || 'grey'}
              returnKeyType={locals.returnKeyType}
              selectTextOnFocus={locals.selectTextOnFocus}
              secureTextEntry={locals.secureTextEntry}
              selectionState={locals.selectionState}
              onChangeText={(value) => {
                locals.onChange(value)
                self._onChangeText.bind(self, value, locals)
              }}
              onChange={locals.onChangeNative}
              placeholder={placeholderString}
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
        </TouchableWithoutFeedback>
      )
    }
  }

  _onChangeText (text, locals) {
    this.setState({value: text});
  }

  _onFocus (locals) {
    Animated.spring(
      this.state.fadeAnim,
      {toValue: 1, friction: 5},
    ).start();
    this.setState({
      fieldFocused: true,
      placeholderString: '',
    });
    if (locals.onFocus) {
      locals.onFocus();
    }
  }

  _onBlur (locals) {
    if (!this.state.value) {
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 0},
      ).start();
    }
    this.setState({
      fieldFocused: false,
      placeholderString: locals.label
    });
    if (locals.onBlur) {
      locals.onBlur();
    }
  }

  getLocals () {
    let locals = super.getLocals();
    [
      'errorPlaceholderTextColor'
    ].forEach((name) => locals[name] = this.props.options[name]);
    return locals;
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true;
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
  }
});

export default FloatingLabel
