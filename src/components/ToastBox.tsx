import {Box} from "native-base";

const ToastBox = ({children}) => {
  return (
	<Box color="primary.500" backgroundColor="primary.800" px={5} py={3} rounded={30}>
	  {children}
	</Box>
  )
}

export default ToastBox;