import axios, { Axios } from "axios";
import { Formik, useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";

const mySchema = Yup.object({
  name: Yup.string()
    .required("Name must be req.")
    .min(3, "at lest 3 chracter")
    .max(8),
  email: Yup.string().email(),
  password: Yup.string().min(6).max(12),
});

export default function Login() {
  const Navigate = useNavigate();
  async function submit(Value) {
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        Value
      );
      if (res.data.message == "success") {
        localStorage.setItem("kay",res.data.token)
        setToken(res.data.token)
        setIsSuccess(true);
        setTimeout(function () {
          setIsSuccess(false);
          Navigate("/Products");
        }, 2000);
      }
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
    email: "",
    password: "",
  };

 const {setToken} =  useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, seterrMessage] = useState(undefined);
  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: submit,

    validate: function (values) {
      console.log(values);
      const errors = {};

      if (
        values.email.includes("@") !== true ||
        values.email.includes(".") !== true
      ) {
        errors.email = "Email must be in format";
      }

      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "passward length must be from 6 to 12 ";
      }

      return errors;
    },
    // validationSchema:mySchema
  });

  return (
    <>
      <div className=" w-75 m-auto   p-5">
        {isSuccess ? (
          <div className=" alert alert-success text-center ">Welcome Back</div>
        ) : (
          ""
        )}
        {errMessage ? (
          <div className=" alert alert-danger text-center ">{errMessage}</div>
        ) : (
          ""
        )}

        <h2>Login Now: </h2>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">name:</label>

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
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
