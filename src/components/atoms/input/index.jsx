import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const Input = ({ label, password, error, onFocused, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hide, setHide] = useState(password)

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor: error ? 'red' : isFocused ? '#2952a8' : '#999', borderWidth: error ? 1.5 : isFocused ? 2 : 1 }]}>
        <TextInput {...props} style={styles.textInput}
          onFocus={() => {
            onFocused()
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
          secureTextEntry={hide}
        />
        {password && (
          <TouchableOpacity style={styles.showHide} onPress={() => {
            setHide(!hide)
          }}>
            {hide ? (
              <Text style={styles.textShowHide}>Show</Text>
            ) : (
              <Text style={styles.textShowHide}>Hide</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (<Text style={{ fontSize: 10, color: 'red' }}>{error}</Text>)}

    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#3C3737'
  },
  inputContainer: {
    borderRadius: 15,
    height: 50,
    backgroundColor: 'white',
    borderColor: '#2952a8',
    borderWidth: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    marginLeft: 10,
    color: '#2952a8',
    flex: 1
  },
  showHide: {
    marginRight: 10
  },
  textShowHide: {
    fontSize: 12,
    color: '#3C3737',
    fontWeight: '600'
  }
})