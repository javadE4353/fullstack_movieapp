import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
import { axiospublic } from "../../axios/configApi";

//type
import { Userinfo ,Users} from "../../typeing";

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
    try {
      const response = await axiospublic.post(`/auth/login`, login);
      return response.data;
    } catch (error: any) {
      return error?.response?.message;
    }
  }
);

interface RegisterType {
  username: string;
  mobile: string;
  email: string;
  password: string;
}

//fatchRegister
export const fatchRegister = createAsyncThunk(
  "auth/fatchRegister",
  async (data: RegisterType) => {
    try {
      const response = await axiospublic.post(`/auth/regeister`, data);
      console.log(response)
      return response.data;
    } catch (error: any) {
        console.log(error)
      return error?.response?.data?.message;
    }
  }
);

//initialstate
type Initialstate = {
  accessToken: string;
  userInfo: Userinfo | null;
  isLoading: boolean;
  message:string
  errorMessage:string;
};

const initialState: Initialstate = {
  accessToken: "",
  userInfo: null,
  isLoading: false,
  message:"",
  errorMessage: "",
};

//Slice
const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //login
      .addCase(fatchLogin.pending, (state) => {
        state.isLoading = true;
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
          state.message=action.payload.data.userInfo.username+"خوش آمدید"

        }
      )
      .addCase(fatchLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage =
          action?.error?.message || "لطفا بعدا دوباره امتحان کنید";
      })

      //Register
      .addCase(fatchRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fatchRegister.fulfilled,
        (
          state,
          action: PayloadAction<{data:Users}>
        ) => {
          state.isLoading = false;
          state.message=action.payload?.data?.data?.username+"ثبت نام با موفقیت انجام شد"
        }
      )
      .addCase(fatchRegister.rejected, (state,action) => {
        state.isLoading = false;
        state.errorMessage= "لطفا بعدا دوباره امتحان کنید";
      });
  },
});

export default loginSlice.reducer;
