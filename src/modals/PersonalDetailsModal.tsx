import {Box, Divider, Heading, Spinner, Text, useToast, VStack} from "native-base";
import {useContext, useEffect, useState} from "react";
import {handleError} from "../../utils/ErrorHandler";
import Button from "../components/Button";
import Modal from "../components/Modal";
import PrimaryInput from "../components/PrimaryInput";
import {ToastStyles} from "../constants";
import {reducerActions} from "../constants/actions";
import {GlobalContext} from "../contexts/GlobalContext";
import {updateUserProfile} from "../services/ProfileService";
import {ContextInterface} from "../types/Context";

const PersonalDetailsModal = ({visible, onClose}) => {
  const toast = useToast();
  const {state, dispatch} = useContext<ContextInterface>(GlobalContext);
  const {profile} = state;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
	first_name: profile?.first_name || '',
	last_name: profile?.last_name || '',
  })

  useEffect(() => {
	setData({
	  first_name: profile?.first_name || '',
	  last_name: profile?.last_name || '',
	})
  }, [profile, visible])

  const saveDetails = async () => {
	try {
	  setLoading(true);
	  await updateUserProfile(state?.session?.user?.id, data)
	  toast.show({
		description: 'Details saved successfully',
		...ToastStyles.SUCCESS,
	  })
	  dispatch({type: reducerActions.RELOAD_PROFILE})
	}
	catch (e) {
	  const msg = handleError(e)
	  toast.show({
		description: msg,
		...ToastStyles.ERROR,
	  })
	}
	finally {
	  setLoading(false)
	}
  }

  return (
	<Modal visible={visible} toggleVisibility={onClose}>
	  <VStack space={5} pt={3} pb={10}>
		<Heading color="muted.200" fontWeight={600} fontSize={18} textAlign="center">
		  Personal <Text color="primary.500">details</Text>
		</Heading>
		<Divider orientation="horizontal" bg="muted.700"/>
		<Text color="muted.200" fontWeight={500} px={3}>
		  Update your profile information here.
		</Text>
		<PrimaryInput
		  onChange={(e) => setData({...data, first_name: e})}
		  placeholder="First name"
		  extraProps={{value: data.first_name}}
		  maxLength={30}
		/>
		<PrimaryInput
		  onChange={(e) => setData({...data, last_name: e})}
		  placeholder="Last name"
		  extraProps={{value: data.last_name}}
		  maxLength={30}
		/>
		{loading ? <Spinner color="primary.500"/> :
		  <Button onPress={saveDetails} disabled={loading}>
			Save details
		  </Button>}
	  </VStack>
	</Modal>
  )
}

export default PersonalDetailsModal