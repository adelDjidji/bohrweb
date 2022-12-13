export const hello = () => ({
  type: 1,
  payload: {
    data: "hello world",
  },
});

export function closeMessage() {
  return {
    type: "CLOSE",
  };
}
export function errMessage(message: string) {
  return {
    type: "MESSAGE",
    payload: {
      message,
      severity: "error",
    },
  };
}

export function successMessage(message: string) {
  return {
    type: "MESSAGE",
    payload: {
      message,
      severity: "success",
    },
  };
}
