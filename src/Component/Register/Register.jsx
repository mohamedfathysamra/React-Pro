import axios, { Axios } from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const mySchema = Yup.object({
  name: Yup.string()
    .required("Name must be req.")
    .min(3, "at lest 3 chracter")
    .max(8),
  email: Yup.string().email(),
  password: Yup.string().min(6).max(12),
  rePassword: Yup.string().oneOf([Yup.ref("password")],"rePassword must be the same of password"),
  phone: Yup.string()
    .required()
    .matches(/^01[0125][0-9]{8}$/),
});

export default function Register() {
  const Navigate = useNavigate();
  async function submit(Value) {
    console.log("Registered....");
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        Value
      );
      console.log(res.data);
      setIsSuccess(true);
      setTimeout(function () {
        setIsSuccess(false);
        Navigate("/Login");
      }, 2000);
    } catch (e) {
      console.log("error", e);
      seterrMessage(e.response.data.message);

      setTimeout(function () {
        seterrMessage(false);
      }, 2000);
    }
    setIsLoading(false);
  }

  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, seterrMessage] = useState(undefined);
  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: submit,

    // validate: function (values) {
    //   console.log(values);
    //   const errors = {};

    //   const nameRegex = /^[A-Z][a-z]{3,7}$/;
    //   const phoneRegex = /^01[0125][0-9]{8}$/;
    //   if (nameRegex.test(values.name) === false) {
    //     errors.name =
    //       "name must start with capital letter and from 4 to 7 caracter";
    //   }
    //   if (
    //     values.email.includes("@") !== true ||
    //     values.email.includes(".") !== true
    //   ) {
    //     errors.email = "Email must be in format";
    //   }
    //   if (phoneRegex.test(values.phone) === false) {
    //     errors.phone = "phone must be an egyption number";
    //   }
    //   if (values.password.length < 6 || values.password.length > 12) {
    //     errors.password = "passward length must be from 6 to 12 ";
    //   }
    //   if (values.rePassword != values.password) {
    //     errors.repassword = "repassward  must be the same of passward ";
    //   }

    //   console.log(errors);

    //   return errors;
    // },
    validationSchema:mySchema
  });

  return (
    <>
      <div className=" w-75 m-auto   p-5">
        {isSuccess ? (
          <div className=" alert alert-success text-center  ">
            conglatulation Your Acount Has Been Created.{" "}
          </div>
        ) : (
          ""
        )}
        {errMessage ? (
          <div className=" alert alert-danger text-center ">{errMessage}</div>
        ) : (
          ""
        )}

        <h2>Register Now: </h2>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">name:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.name}
            id="name"
            type="text"
            className="form-control mb-2"
            placeholder="Name"
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-danger">{myFormik.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">email:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            id="email"
            type="email"
            className="form-control mb-2"
            placeholder="email"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">password:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            id="password"
            type="password"
            className="form-control mb-2"
            placeholder="password"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.rePassword}
            id="rePassword"
            type="password"
            className="form-control mb-2"
            placeholder="rePassword"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {myFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="name">phone:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            id="phone"
            type="string"
            className="form-control mb-2"
            placeholder="phone"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="bg-main  p-2 text-white rounded-3 btn "
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
