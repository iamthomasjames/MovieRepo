export const SetAuth = (isLogged) => {
  return (
    {
        type: "setLogged",
        payload: isLogged,
      }
  );
};
