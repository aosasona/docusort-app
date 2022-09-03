import {FC} from "react";
import {StyleSheet} from "react-native";
import {Incubator} from "react-native-ui-lib";
import {colors} from "../constants";
import {PrimaryButtonProps} from "../types/Props";

const PrimaryInput: FC<PrimaryButtonProps> = ({onChange, maxLength, placeholder}) => {
  return (
    <Incubator.TextField placeholder={placeholder} floatingPlaceholder floatOnFocus
                         onChangeText={onChange}
                         maxLength={maxLength || 100}
                         color={colors.PRIMARY}
                         containerStyle={styles.textFieldContainer}
                         fieldStyle={styles.textField}
                         floatingPlaceholderStyle={styles.floatingPlaceholder}
    />
  )
}


const styles = StyleSheet.create({

  textFieldContainer: {
    backgroundColor: colors.INPUT_BG,
    borderRadius: 50,
    paddingVertical: 10,
  },
  textField: {
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  floatingPlaceholder: {
    backgroundColor: "transparent",
    color: colors.FADED,
    paddingBottom: 10,
  },
})

export default PrimaryInput;