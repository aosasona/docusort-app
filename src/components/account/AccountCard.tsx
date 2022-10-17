import {Pressable, Text, VStack} from "native-base";
import {Gravatar} from 'react-native-gravatar';

const AccountCard = ({session, profile, onPress}) => {

  const gravatarStyle = {
	width: 130,
	height: 130,
	borderWidth: 5,
	borderColor: "#DDDDDD",
	borderRadius: 100,
  }

  return (
	<VStack space={10}>
	  <VStack space={4} alignItems={"center"}>
		<Pressable onPress={onPress}>
		  <Gravatar
			options={{
			  email: session?.user?.email,
			  parameters: {"size": "200", "d": "retro"},
			  secure: true,
			}}
			style={{
			  ...gravatarStyle,
			}}
		  />
		</Pressable>
		<VStack space={1} alignItems="center">
		  <Text fontFamily="body" color="muted.200" fontSize={29} fontWeight={600}>
			{profile.first_name} {profile.last_name}
		  </Text>
		  <Text color="primary.100" fontSize={13} fontWeight={400}>
			{session.user.email}
		  </Text>
		</VStack>
	  </VStack>
	</VStack>
  )
}

export default AccountCard