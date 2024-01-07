import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const IncreaseDecreaseInput: React.FC<{
  initialSecond: number;
  onChange?: (data: number) => void;
}> = ({initialSecond, onChange}) => {
  useEffect(() => {
    const initialHours = Math.floor(initialSecond / 3600);
    const initialMinutes = Math.floor((initialSecond % 3600) / 60);
    const initialSeconds = initialSecond % 60;

    setHrs(initialHours);
    setMint(initialMinutes);
    setSecond(initialSeconds);
  }, [initialSecond]);

  const [hrs, setHrs] = useState(0);
  const [mint, setMint] = useState(0);
  const [second, setSecond] = useState(0);

  const setTime = (nHrs: number, nMin: number, nSec: number) => {
    setHrs(nHrs);
    setMint(nMin);
    setSecond(nSec);
  };

  const handleIncrease = () => {
    const newSecond = second + 1 >= 60 ? 0 : second + 1;
    const newMinute = newSecond === 0 ? (mint + 1 >= 60 ? 0 : mint + 1) : mint;
    const newHour = newMinute === 0 && newSecond === 0 ? hrs + 1 : hrs;
    setTime(newHour, newMinute, newSecond);
    onChange && onChange(hrs * 3600 + mint * 60 + second + 1);
  };

  const handleDecrease = () => {
    const newSecond = second - 1 < 0 ? 59 : second - 1;
    const newMinute = newSecond === 59 ? (mint - 1 < 0 ? 59 : mint - 1) : mint;
    const newHour =
      newMinute === 59 && newSecond === 59 ? (hrs - 1 < 0 ? 0 : hrs - 1) : hrs;
    setTime(newHour, newMinute, newSecond);
    onChange && onChange(hrs * 3600 + mint * 60 + second - 1);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleDecrease}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={hrs.toString()}
          placeholder="HH"
          onChangeText={text => {
            setHrs(parseInt(text) || 0);
            onChange &&
              onChange((parseInt(text) || 0) * 3600 + mint * 60 + second);
          }}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={mint.toString()}
          placeholder="MM"
          onChangeText={text => {
            setMint(parseInt(text) ? (+text >= 60 ? mint : +text) : 0);
            onChange &&
              onChange(
                hrs * 3600 +
                  (parseInt(text) ? (+text >= 60 ? mint : +text) : 0) * 60 +
                  second,
              );
          }}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={second.toString()}
          placeholder="SS"
          onChangeText={text => {
            setSecond(parseInt(text) ? (+text >= 60 ? second : +text) : 0);
            onChange &&
              onChange(
                hrs * 3600 +
                  mint * 60 +
                  (parseInt(text) ? (+text >= 60 ? second : +text) : 0),
              );
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleIncrease}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 50,
    width: '50%',
  },
  button: {
    padding: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    // padding: 10,
    flex: 1,
    // marginLeft: 10,
    textAlign: 'center',
  },
});

export default IncreaseDecreaseInput;
