import * as Yup from "yup";

export const SignInSchema = Yup.object({
  email: Yup.string().email().required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});


export const CategorySchema = Yup.object({
  name: Yup.string().required("Category name is Required"),
});



export const vendorSchema = Yup.object({
  name : Yup.string().required("Name is Required"),
  address: Yup.string().required("Address is Required"),
  phno: Yup.string()
    .matches(/^\d{10,}$/, "Phone number must be at least 12 digits.")
    .required("Phone number is required."),
});


export const ItemSchema = Yup.object({
  name:  Yup.string().required("name is required"),
  unit:  Yup.string().required("unit type is required"), 
  head:  Yup.string().required("head is required"), 
  subhead:  Yup.string().required("subhead is required"), 
  vendor:  Yup.string().required("vendor is required"), 
  issue_rate:  Yup.number().positive().required("issue rate is required"),
  pur_rate:  Yup.number().positive().required("purchase rate is required"),
  price:  Yup.number().positive().required("price is required"),
  qtn:  Yup.number().positive().required("quantity is required"),
});

export const adjustItemSchema = Yup.object({
  itemId : Yup.string().required("Name is Required"),
  adjustType: Yup.string().required("Address is Required"),
  decrease: Yup.string().required("Address is Required"),
});

export const purchaseSchema = Yup.object({
  invoice : Yup.string().required("invoice no is required"),
  vendor: Yup.string().required("vendor is required"),
  remarks : Yup.string(),
  gst: Yup.number().required("gst is required"),
  discount: Yup.number().required("gst is required"),
  date: Yup.string().required("date is required"),
  paid: Yup.number().required("paid is required"),
});

export const receivedSchema = Yup.object({
  purchaseId : Yup.string().required("Purchase is Required"),
  receivedBy: Yup.string().required("Received by is Required"),
  receivedFrom: Yup.string().required("Received from is Required"),
  date: Yup.string().required("date is required"),
});

export const demandnoteSchema = Yup.object({
  department: Yup.string().required("Department is required"),
  remarks : Yup.string(),
  preparedBy: Yup.string().required("prepared by is required"),
  date: Yup.string().required("date is required"),
});

export const issuerequisitionSchema = Yup.object({
  remarks : Yup.string(),
  date: Yup.string().required("date is required"),
  demand : Yup.string().required("Demand is required"),
});

export const issuereturnSchema = Yup.object({
  remarks : Yup.string(),
  date: Yup.string().required("date is required"),
  department : Yup.string().required("Department is required"),
});

export const purchaseorderSchema = Yup.object({
  remarks : Yup.string(),
  date: Yup.string().required("date is required"),
  department : Yup.string().required("Department is required"),
  preparedBy: Yup.string().required("prepared by is required"),
});

