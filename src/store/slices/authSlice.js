import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    user: {},
    status: "idle",// "idle" | "loading" | "succeeded" | "failed"
    isLoggedIn: false,
    error: null
}


export const signup = createAsyncThunk(
    "auth/signup",
    async ({ name, email, password }, { rejectWithValue }) => {

        try {
            const res = await fetch(
                `${import.meta.env.VITE_PUBLIC_HOST}/api/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, password })
                }
            );
            if (res.status != 200) {
                const responseData = await res.json();
                throw new Error(responseData["data"]);
            }
            const resData = await res.json();
            return { "name":resData["data"].name, "token": resData["data"].token }

        }
        catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_HOST}/api/login`, 
                        { 
                            method: "POST" ,
                            headers:{
                                "Content-Type": "application/json",
                            },
                            body:JSON.stringify({email,password})
                            
                        }
                    );
            if(res.status!=200){
                const resData = await res.json(); 
                throw new Error(resData["data"]);
            }
            const resData = await res.json();
            return {name:resData["data"].name,"token":resData["data"].token}
        }
        catch (e) {
            return rejectWithValue(e.message);
        }

    }
);



const AuthSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            logout:(state,action)=>{
                state.error = null;
                state.isLoggedIn = false;
                state.user = {};
            }
        },
        extraReducers: (builder) => {
            builder.addCase(signup.pending, (state, action) => {
                state.status = "loading"
                state.isLoggedIn = false;
            })
                .addCase(signup.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.isLoggedIn = true;
                    state.user = { ...action.payload }
                    console.log(action.payload);
                })
                .addCase(signup.rejected, (state, action) => {
                    state.status = "failed";
                    state.isLoggedIn = false;
                    state.error = action.payload;
                })
                .addCase(login.pending,(state,action)=>{
                    state.status = "loading";
                    state.isLoggedIn = false;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.isLoggedIn = true;
                    state.user = { ...action.payload }
                    console.log(action.payload);
                })
                .addCase(login.rejected, (state, action) => {
                    state.status = "failed";
                    state.isLoggedIn = false;
                    state.error = action.payload;
                })
        }

    }
)


export const authProcessStatus = (state) => state.auth?.status;
export const loggedInStatus = (state) => state.auth?.isLoggedIn;
export const user = (state) => state.auth?.user;
export const errorMessage = (state) => state.auth?.error;

export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;