import {
  Box,
  Button as NativeButton,
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
import {Button, Layout} from "../../components"
import PrimaryInput from "../../components/PrimaryInput";
import {ToastStyles} from "../../constants";
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
	}
	catch (e) {
	  toast.show({
		description: e.message,
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
		<Text color="primary.500" fontSize="5xl" fontWeight={500}>
		  Welcome
		</Text>
		<Text color="primary.700" fontSize="sm" px={1}>
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
            disabled={step === 1}
            variant="ghost"
            py={8}
          >
            <Text
              color="gray.400"
              fontSize="sm"
              fontWeight={400}
            >
              Previous
            </Text>
          </NativeButton>
          <NativeButton
            width="48%"
            onPress={increaseStep}
            disabled={step === 3}
            variant="solid"
            bgColor="primary.500"
            py={6}
            rounded={40}
          >
            <Text color="gray.900" fontSize="sm" fontWeight={500}>
              Continue
            </Text>
          </NativeButton>
        </HStack>}
		{step === 3 &&
          <HStack width="100%" space={2} justifyContent="space-between" alignItems="center">
            <NativeButton width="48%" onPress={decreaseStep} variant="ghost" py={8}>
              <Text color="gray.400" fontSize="sm" fontWeight={400}>
                Previous
              </Text>
            </NativeButton>
            <View style={{width: "48%"}}>
              <Button onPress={handleSignUp}
                      disabled={(!(data.email && data.password && data.firstName && data.lastName && data.confirmPassword))}>
                Create Account
              </Button>
            </View>
          </HStack>
		}
		<TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
		  <Text style={styles.newAccountText}>
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