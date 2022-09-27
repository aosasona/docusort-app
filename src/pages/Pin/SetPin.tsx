import {Box, Heading, Spinner, Text, useToast} from "native-base";
import {useContext, useEffect, useState} from "react";
import {Dimensions} from "react-native";
import {handleError} from "../../../utils/ErrorHandler";
import AppLayout from "../../components/AppLayout";
import Back from "../../components/Back";
import Keypad from "../../components/Keypad";
import PinInput from "../../components/PinInput";
import {ToastStyles} from "../../constants";
import {reducerActions} from "../../constants/actions";
import routes from "../../constants/routes";
import {GlobalContext} from "../../contexts/GlobalContext";
import {setDevicePin} from "../../services/AuthService";

const {height} = Dimensions.get("window");

const pageHeight = height * 0.88;

const SetPin = ({navigation}) => {

  const {dispatch} = useContext(GlobalContext);

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
	  setTimeout(() => {
		setStep(2)
	  }, 100)
	} else {
	  setTimeout(() => {
		handleSubmit().then();
	  }, 100)
	}
  }

  const handleSubmit = async () => {
	try {
	  await setDevicePin({
		pin: +pin,
		confirmPin: +confirmPin,
	  })
	  dispatch({type: reducerActions.CONFIRM_PIN_SET, payload: true});
	  navigation.navigate(routes.HOME);
	}
	catch (e: unknown) {
	  const msg = handleError(e as any);
	  toast.show({
		description: msg,
		...ToastStyles.ERROR,
	  })
	  setPin("");
	  setConfirmPin("");
	  setStep(1);
	  return;
	}
  }

  return (
	<AppLayout>
	  {step === 1 && <StepOne pin={pin} setPin={setPin} onComplete={handleComplete}/>}
	  {step === 2 && <StepTwo pin={confirmPin} setPin={setConfirmPin} onComplete={handleComplete}/>}
	</AppLayout>
  )
}

const StepOne = ({pin, setPin, onComplete}) => {

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
		<Keypad max={4} value={pin} setValue={setPin} onCompleted={() => onComplete({step: 1})}/>
	  </Box>
	</Box>
  )
}

const StepTwo = ({pin, setPin, onComplete}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
	if (pin.length === 4) {
	  setLoading(true);
	}
  }, [pin])
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
	  {loading && <Spinner/>}
	  <Keypad max={4} value={pin} setValue={setPin} onCompleted={() => onComplete({step: 2})}/>
	</Box>
  )
}

export default SetPin