import {
  Box,
  Button as NativeButton, Heading,
  HStack,
  PresenceTransition,
  Progress,
  ScrollView, Spinner,
  Stack,
  Text,
  useToast,
} from "native-base";
import {useState} from "react";
import {TouchableOpacity, View} from "react-native";
import {handleError} from "../../../utils/ErrorHandler";
import {Button, Layout} from "../../components"
import PrimaryInput from "../../components/PrimaryInput";
import {ToastStyles} from "../../constants";
import routes from "../../constants/routes";
import useAuthStyle from "../../hooks/useAuthStyle";
import {SignUp as SignUpService} from "../../services"
import {SignUpData} from "../../types/Auth";

const transitionInitial = {
  opacity: 0,
  translateX: 100,
}

const transitionAnimation = {
  translateX: 0,
  opacity: 1,
  transition: {
	duration: 400,
  },
}

const SignUp = ({navigation}) => {
  const styles = useAuthStyle();
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SignUpData>({
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
  })

  const increaseStep = () => {
	if (step < 3) {
	  setStep(step + 1);
	}
  }
  const decreaseStep = () => {
	if (step > 1) {
	  setStep(step - 1);
	}
  }

  const handleSignUp = async () => {
	setLoading(true);
	try {
	  await SignUpService(data, toast);
	  navigation.navigate(routes.SIGN_IN);
	}
	catch (e: any) {
	  console.log(e);
	  const msg = handleError(e);
	  toast.show({
		description: msg,
		...ToastStyles.ERROR,
	  })
	}
	finally {
	  setLoading(false);
	}
  }

  return (
	<Layout style={styles.container}>
	  <ScrollView showsVerticalScrollIndicator={false}>
		<Heading color="light.200" fontFamily="heading" fontSize="4xl" fontWeight="500">
		  Get Started
		</Heading>
		<Text color="muted.600" fontFamily="body" fontSize={14} mt={1}>
		  Let's get you started with an account 🫰
		</Text>
		<Stack space={6} mt={4}>
		  <Progress value={(step / 3) * 100} height={1} width="10%" color="primary.600" bgColor="primary.800" mx={2}
		  />
		  {step === 1 && <PresenceTransition
            visible={step === 1}
            initial={transitionInitial}
            animate={transitionAnimation}
          >
            <NameStep data={data} setData={setData}/>
          </PresenceTransition>}

		  {step === 2 && <PresenceTransition
            visible={step === 2}
            initial={transitionInitial}
            animate={transitionAnimation}
          >
            <EmailStep data={data} setData={setData}/>
          </PresenceTransition>}

		  {step === 3 && <PresenceTransition
            visible={step === 3}
            initial={transitionInitial}
            animate={transitionAnimation}
          >
            <PasswordStep data={data} setData={setData}/>
          </PresenceTransition>}
		</Stack>
		{loading && <Box py={8}>
          <Spinner size="sm"/>
        </Box>}
	  </ScrollView>
	  <View>
		{step < 3 && <HStack width="100%" space={2} justifyContent="space-between" alignItems="center">
          <NativeButton
            width="48%"
            onPress={decreaseStep}
            disabled={step < 2 || loading}
            variant="solid"
            backgroundColor="transparent"
            py={8}
            _disabled={{
			  backgroundColor: "red.700",
			}}
            _pressed={{
			  backgroundColor: "transparent",
			}}
          >
            <Text
              color="gray.400"
              fontSize="sm"
              fontWeight={400}
            >
              Go Back
            </Text>
          </NativeButton>
          <NativeButton
            width="48%"
            onPress={increaseStep}
            disabled={step === 3 || loading}
            variant="solid"
            backgroundColor="primary.500"
            py={6}
            rounded={15}
            isLoading={loading}
            _pressed={{
			  backgroundColor: "primary.700",
			}}
          >
            <Text color="gray.900" fontSize="sm" fontWeight={500}>
              Continue
            </Text>
          </NativeButton>
        </HStack>}
		{step === 3 &&
          <HStack width="100%" space={2} justifyContent="space-between" alignItems="center">
            <NativeButton width="48%" onPress={decreaseStep} variant="ghost" py={8}
                          _pressed={{backgroundColor: "transparent"}}>
              <Text color="gray.400" fontSize="sm" fontWeight={400}>
                Go Back
              </Text>
            </NativeButton>
            <View style={{width: "48%"}}>
              <Button onPress={handleSignUp}
                      disabled={(!(data.email && data.password && data.firstName && data.lastName && data.confirmPassword) || loading)}>
                Create Account
              </Button>
            </View>
          </HStack>
		}
		<TouchableOpacity onPress={() => navigation.navigate(routes.SIGN_IN)}>
		  <Text color="muted.100" fontFamily="body" fontWeight={600} fontSize={13} textAlign="center" my={8}>
			I already have an account
		  </Text>
		</TouchableOpacity>
	  </View>
	</Layout>
  );
};

const NameStep = ({data, setData}) => (
  <Stack space={6}>
	<PrimaryInput
	  onChange={(e) => setData({...data, firstName: e})}
	  placeholder="First Name"
	  maxLength={35}/>
	<PrimaryInput
	  onChange={(e) => setData({...data, lastName: e})}
	  type="text"
	  placeholder="Last Name"
	  maxLength={35}
	/>
  </Stack>
)

const EmailStep = ({data, setData}) => (
  <Stack space={6}>
	<PrimaryInput
	  onChange={(e) => setData({...data, email: e})}
	  placeholder="E-Mail Address"
	  maxLength={35}/>
  </Stack>
)

const PasswordStep = ({data, setData}) => (
  <Stack space={6}>
	<PrimaryInput
	  onChange={(e) => setData({...data, password: e})}
	  placeholder="Password"
	  type={"password"}
	  maxLength={35}/>
	<PrimaryInput
	  onChange={(e) => setData({...data, confirmPassword: e})}
	  type={"password"}
	  placeholder="Confirm Password"
	  maxLength={35}
	/>
  </Stack>
)

export default SignUp;