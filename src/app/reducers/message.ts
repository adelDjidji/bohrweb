const initState = { message: "", isOpen: false, type: "" };

const MessageReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "MESSAGE":
      return {
        message: action.payload.message,
        isOpen: true,
        severity: action.payload.severity,
      };
    case "CLOSE":
      return initState;

    default:
      return state;
  }
};

export default MessageReducer;
