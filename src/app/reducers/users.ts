const usersReducer = (state = {}, action: any) => {
  switch (action.type) {
    case 1:
      return action.payload.data;

    default:
      return state;
  }
};

export default usersReducer;
