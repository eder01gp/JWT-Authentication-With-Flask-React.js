const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: "",
      loggedIn: false,
      url: "https://3001-4geeksacade-reactflaskh-hpzn7l3phrp.ws-eu45.gitpod.io/api",
    },
    actions: {
      verify: async () => {
        try {
          const resp = await fetch(getStore().url + "/protected", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization:
                "Bearer " + JSON.parse(localStorage.getItem("token")),
            },
          });
          const data = await resp.json();
          setStore({ loggedIn: data.logged_in || false });
        } catch (e) {
          setStore({ loggedIn: false });
        }
      },
      logout: () => {
        localStorage.clear();
        setStore({ loggedIn: false });
      },
    },
  };
};

export default getState;
