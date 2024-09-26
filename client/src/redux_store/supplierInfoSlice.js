import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  companyName: "",
  id: "",
  role: "",
};

export const supplierInfoSlice = createSlice({
  name: "supplierInfo",
  initialState,
  reducers: {
    setSupplierInfo: (state, action) => {
      const { contactPerson, email, companyName, _id, role } =
        action.payload || {};
      state.firstname = contactPerson.firstname || state.firstname;
      state.lastname = contactPerson.lastname || state.lastname;
      state.email = email || state.email;
      state.companyName = companyName || state.companyName;
      state.id = _id || state.id;
      state.role = role;
    },
  },
});

export const { setSupplierInfo } = supplierInfoSlice.actions;
export default supplierInfoSlice.reducer;
