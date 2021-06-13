
export const hasAuthenticated = async() => {
  if (await localStorage.getItem("_token")) {
    return true;
  } else {
    return false;
  }
};

export const getUsername = async() => {
  if (await localStorage.getItem("_user")) {
    return localStorage.getItem("_user");
  } else {
    return null;
  }
};

export const getAuthToken = async () => {
    let token = localStorage.getItem('_token');
    if(token)
    {
        return token;
    }
    else{
        localStorage.removeItem('_user');
        return null;
    }
};

export const removeUser = async () => {
  localStorage.removeItem('_user');
  localStorage.removeItem('_token');
};

