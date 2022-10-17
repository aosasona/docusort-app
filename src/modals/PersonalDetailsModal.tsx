import {Divider, Heading, Spinner, Text, useToast, VStack} from "native-base";
import {useContext, useEffect, useState} from "react";
import {handleError} from "../../utils/ErrorHandler";
import Button from "../components/reusables/Button";
import Modal from "../components/reusables/Modal";
import ModalHeader from "../components/reusables/ModalHeader";
import PrimaryInput from "../components/reusables/PrimaryInput";
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
	  <VStack space={5} pb={10}>
		<ModalHeader>
		  Personal Details
		</ModalHeader>
		<Text color="muted.400" fontWeight={500} px={3}>
		  Update your profile details here. You can only change your first name and last name at the moment.
		</Text>
		<PrimaryInput
		  onChange={(e) => setData({...data, first_name: e})}
		  placeholder="First name"
		  value={data.first_name}
		  maxLength={30}
		/>
		<PrimaryInput
		  onChange={(e) => setData({...data, last_name: e})}
		  placeholder="Last name"
		  value={data.last_name}
		  maxLength={30}
		/>
		<PrimaryInput
		  value={state?.session?.user?.email}
		  disabled
		  placeholder={"E-mail address"}
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