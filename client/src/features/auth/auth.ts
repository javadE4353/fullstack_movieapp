import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//
import { axiospublic } from "../../axios/configApi";

//type
import { Userinfo, Users } from "../../typeing";

interface LoginType {
  username: string;
  password: string;
}

const login = {
  username: "",
  password: "",
};

///fatchautuntication
//fatchLogin
export const fatchLogin = createAsyncThunk(
  "auth/fatchlogin",
  async (login: LoginType) => {
    const response = await axiospublic.post(`/auth/login`, login);
    return response.data;
  }
);

//fatchRegister

interface RegisterType {
  username: string;
  mobile: string;
  email: string;
  password: string;
}

export const fatchRegister = createAsyncThunk(
  "auth/fatchRegister",
  async (data: RegisterType) => {
    const response = await axiospublic.post(`/auth/regeister`, data);
    return response.data;
  }
);

//refreshToken
export const fatchRefreshToken = createAsyncThunk(
  "auth/fatchRefreshToken",
  async () => {
    const response = await axiospublic.get(`/auth/refreshtoken`);
    console.log(response?.data)
    return response.data;
  }
);

//initialstate
type Initialstate = {
  accessToken: string;
  userInfo: Userinfo | null;
  isLoading: boolean;
  message: string;
  errorMessage: string;
};

const initialState: Initialstate = {
  accessToken: "",
  userInfo: null,
  isLoading: false,
  message: "",
  errorMessage: "",
};

//Slice
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeMessage: (state)=> {
      state.message = "";
    },
    logout: (state) => {
      state.message = "";
      state.accessToken= "";
      state.userInfo= null;
      state.isLoading= false;
      state.message= "";
      state.errorMessage= "";
    },
    newAccessToken: (
      state,
      action: PayloadAction<{accessToken: string; userInfo: Userinfo}>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.userInfo;
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(fatchLogin.pending, (state) => {
        state.isLoading = true;
        state.accessToken = "";
        state.message = "";
        state.userInfo = null;
        state.errorMessage = "";
      })
      .addCase(
        fatchLogin.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: { accessToken: string; userInfo: Userinfo };
          }>
        ) => {
          state.isLoading = false;
          state.accessToken = action.payload.data.accessToken;
          state.userInfo = action.payload.data.userInfo;
          state.message = action.payload.data.userInfo.username + "خوش آمدید";
          toast( action.payload.data.userInfo.username + "خوش آمدید", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        }
      )
      .addCase(fatchLogin.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message?.endsWith("401")) {
          state.errorMessage = "نام کاربری یا رمز ورود اشتباه است";
        } else if (action.error.message?.endsWith("400")) {
          state.errorMessage = "اطلاعات وارد شده درست نمی باشد";
        } else {
          state.errorMessage = "لطفا بعدا دوباره امتحان کنید";
        }
      })

      //Register
      .addCase(fatchRegister.pending, (state) => {
        state.isLoading = true;
        state.accessToken = "";
        state.message = "";
        state.userInfo = null;
        state.errorMessage = "";
      })
      .addCase(
        fatchRegister.fulfilled,
        (state, action: PayloadAction<{ message: string; data: Users }>) => {
          state.isLoading = false;
          state.errorMessage = "";
          state.message =
            action.payload?.message + "ثبت نام با موفقیت انجام شد";
            toast( action.payload?.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
        }
        
      )
      .addCase(fatchRegister.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message?.endsWith("409")) {
          state.errorMessage = "کاربری با این مشخصات از قبل وجود دارد";
        } else if (action.error.message?.endsWith("401")) {
          state.errorMessage = "اطلاعات وارد شده درست نمی باشد";
        } else {
          state.errorMessage = "لطفا بعدا دوباره امتحان کنید";
        }
      })
      //RefreshToken

      .addCase(fatchRefreshToken.pending, (state) => {
        state.isLoading = true;
        state.accessToken = "";
        state.message = "";
        state.userInfo = null;
        state.errorMessage = "";
      })
      .addCase(
        fatchRefreshToken.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: { accessToken: string; userInfo: Userinfo };
          }>
        ) => {
          state.isLoading = false;
          state.errorMessage = "";
          state.accessToken = action.payload.data.accessToken;
          state.userInfo = action.payload.data.userInfo;
        }
      )
      .addCase(fatchRefreshToken.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error.message?.endsWith("401")) {
          state.errorMessage = "";
        } else if (action.error.message?.endsWith("403")) {
          state.errorMessage = "";
        } else if (action.error.message?.endsWith("400")) {
          state.errorMessage = "";
        } else {
          state.errorMessage = "";
        }
      });
  },
});
export const { removeMessage, newAccessToken ,logout} = loginSlice.actions;
export default loginSlice.reducer;
