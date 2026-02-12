import Axios from "./caller.services";
import { reactive } from "vue";

const getAllUsers = () => {
    return Axios.get("/users");
};

const getUser = (uuid) => {
    return Axios.get("/users/" + uuid);
};

let getUserr = (user) => {
    return Axios.get("/users/" + user.uuid, user);
};

const addUser = (user) => {
    return Axios.post("/users", user);
};

const updateUser = (user) => {
    return Axios.put("/users/" + user.uuid, user);
};

const deleteUser = (userId) => {
    return Axios.delete(`/users/${userId}`);
};

const login = (credentials) => {
    // IMPORTANT: Ne jamais envoyer hospital_id depuis le frontend
    // Le backend le définit automatiquement depuis le tenant détecté (domaine ou utilisateur)
    // S'assurer que hospital_id n'est pas dans les credentials
    const { hospital_id, ...safeCredentials } = credentials;
    // Utiliser un timeout plus long pour la connexion (30 secondes)
    return Axios.post("/login", safeCredentials, {
        timeout: 60000
    });
};
const saveToken = (access_token) => {
    localStorage.setItem("access_token", access_token);
};

// const login = (credentials) => {
//   return Axios.post("/login", credentials)
//     .then((response) => {
//       const access_token = response.data.data.access_token;
//       saveToken(access_token);
//       // Autres actions si nécessaire
//       return response;
//     })
//     .catch((error) => {
//       // Gérer les erreurs
//       throw error;
//     });
// };

// const saveToken = (token) => {
//   localStorage.setItem("token", token);
// };


const usercurrent = () => {
    return Axios.get("/auth/user_current");
};

let getUserRoleUUID = (uuid) => {
    return Axios.get(`/user/${uuid}/role`);
}

const getDoctors = () => {
    return Axios.get("/users/doctors");
}

const getToken = () => {
    return localStorage.getItem("access_token");
};

const resetPassword = (credentials) => {
    // IMPORTANT: Ne jamais envoyer hospital_id depuis le frontend
    // Le backend le définit automatiquement depuis le tenant détecté
    // S'assurer que hospital_id n'est pas dans les credentials
    const { hospital_id, ...safeCredentials } = credentials;
    return Axios.post("/reset-password", safeCredentials);
};

const updateProfilPas = (data) => {
    // IMPORTANT: Ne jamais envoyer hospital_id depuis le frontend
    const { hospital_id, ...safeData } = data;
    return Axios.post("/users/changepassword", safeData);
};
const updateProfil = (data) => {
    // IMPORTANT: Ne jamais envoyer hospital_id depuis le frontend
    const { hospital_id, ...safeData } = data;
    return Axios.post("/users/changeprofile", safeData);
};

const requestPassword = (credentials) => {
    // IMPORTANT: Ne jamais envoyer hospital_id depuis le frontend
    // Le backend le définit automatiquement depuis le tenant détecté
    // S'assurer que hospital_id n'est pas dans les credentials
    const { hospital_id, ...safeCredentials } = credentials;
    return Axios.post("/request-password", safeCredentials);
};

// const getAllCaissiers = () => {
//   return Axios.get("/caissiers");
// };



const state = reactive({
    isLoggedIn: false,
});

export function isLogged() {
    return state.isLoggedIn;
}

export function setLoggedIn(value) {
    state.isLoggedIn = value;
}


// const logout = () => {
//     var reponse = null;
//     Axios.post("/logout")
//       .then((res) => {
//         console.log(res);
//         localStorage.clear();
//         window.location.replace("/auth-pages/login");
//       })
//       .catch((err) => alert("Vous ne pouvez pas vous déconnecter maintenant"));
//   };
// const logout = () => {
//     Axios.post("/logout")
//       .then((res) => {
//         console.log(res);
//         localStorage.clear();
//         window.location.replace("/auth-pages/login");
//       })
//       .catch((err) => alert("Vous ne pouvez pas vous déconnecter maintenant"));
// };

const logout = () => {
    return Axios.post("/logout");
}



export const LoginService = {
    getUserRoleUUID,
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getUserr,
    login,
    usercurrent,
    getToken,
    saveToken,
    isLogged,
    logout,
    setLoggedIn,
    resetPassword,
    requestPassword,
    updateProfilPas,
    updateProfil,
    //   getAllCaissiers,
};

export const userService = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getDoctors,
};