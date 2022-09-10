import {Box, Heading, Text, useToast} from "native-base";
import {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import AppLayout from "../../components/AppLayout";
import Back from "../../components/Back";
import Keypad from "../../components/Keypad";
import PinInput from "../../components/PinInput";
import {ToastStyles} from "../../constants";

const {height} = Dimensions.get("window");

const pageHeight = height * 0.88;

const SetPin = ({navigation}) => {

  const toast = useToast();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState(1);

  useEffect(() => {
	if (confirmPin?.length === 0) {
	  const pinLastThree = pin.slice(-3);
	  setPin(pinLastThree)
	  setStep(1);
	}
  }, [confirmPin]);

  const handleComplete = ({step}) => {
	if (step === 1) {
	  setStep(2)
	} else {
	  handleSubmit();
	}
  }

  const handleSubmit = () => {
	if (!(pin === confirmPin)) {
	  toast.show({
		description: "Pins do not match!",
		...ToastStyles.ERROR,
	  })
	  setPin("");
	  setConfirmPin("");
	  setStep(1);
	  return;
	}
	toast.show({
	  description: "Yup, works!",
	  ...ToastStyles.SUCCESS,
	})
	// navigation.navigate("Home");
  }

  return (
	<AppLayout>
	  {step === 1 && <StepOne pin={pin} setPin={setPin} onCompleted={handleComplete}/>}
	  {step === 2 && <StepTwo pin={confirmPin} setPin={setConfirmPin} onCompleted={handleComplete}/>}
	</AppLayout>
  )
}

const StepOne = ({pin, setPin, onCompleted}) => {

  return (
	<Box justifyContent="space-between" style={{flex: 1}}>
	  <Box px={6} py={2}>
		<Back my={6}/>
		<Heading color="light.200" fontFamily="heading" fontSize="4xl" fontWeight="500">
		  Set Pin
		</Heading>
		<Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
		  Enter a 4-digit pin to secure your account
		</Text>
	  </Box>
	  <PinInput length={4} value={pin}/>
	  <Box mb={12}>
		<Keypad max={4} value={pin} setValue={setPin} onCompleted={() => onCompleted({step: 1})}/>
	  </Box>
	</Box>
  )
}

const StepTwo = ({pin, setPin, onCompleted}) => {
  return (
	<Box height={pageHeight} justifyContent="space-between">
	  <Box px={6} py={2}>
		<Back my={6}/>
		<Heading color="light.200" fontFamily="heading" fontSize="4xl" fontWeight="500">
		  Confirm Pin
		</Heading>
		<Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
		  Enter your pin again to confirm
		</Text>
	  </Box>
	  <PinInput length={4} value={pin}/>
	  <Keypad max={4} value={pin} setValue={setPin} onCompleted={() => onCompleted({step: 2})}/>
	</Box>
  )
}

export default SetPin