import React, {useEffect, useState} from "react"
import {useTranslation} from "react-i18next";
import {Input} from "../../Components/Input/Input";
import {User} from "../../Models/User";
import {InputSizes} from "../../Components/utils/InputSizes";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {FirebaseError} from "firebase/app"
import * as yup from "yup";
import {ValidationError} from "yup";
import {useUser} from "../../Providers/UserProvider";
import {useNavigate} from "react-router-dom";
import {ROUTER_APP_PATHS} from "../../Constants/Routes";

export function Login() {

  const { t } = useTranslation()
  const auth = getAuth()
  const loggedInUser = useUser()
  const navigate = useNavigate()

  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      setErrors({})
    }
  }, [user, errors]);

  useEffect(() => {
    if (loggedInUser.userId) {
      navigate(ROUTER_APP_PATHS.CONFIGURATION)
    }
  }, [loggedInUser, navigate]);

  const inputValidationSchema = yup.object().shape({
    email: yup.string().email("emailType").required("required"),
    password: yup.string().required("required")
  })

  const loginUser = async () => {
    setErrors({})
    try {
      await inputValidationSchema.validate(user, {abortEarly: false})
      await signInWithEmailAndPassword(auth, user.email, user.password)
    } catch (e: any) {
      const newErrors: { [key: string]: string } = {};
      if (e instanceof ValidationError) {
        e.inner.forEach((error) => {
          newErrors[error.path as string] = error.message;
        });
      }
      if (e instanceof FirebaseError) {
        newErrors.login = "loginFailed"
      }
      setErrors(newErrors)
    }
  }

  return (
    <div className="w-full h-full bg-primary flex justify-center items-center">
      <div className="lg:w-128 w-96 h-96 bg-white rounded-lg shadow-2xl">
        <div className="w-full flex justify-center py-8">
          <h1 className="text-3xl font-extrabold text-primary">{t("login")}</h1>
        </div>
        <div className={`w-full px-8 flex flex-col ${(!errors.email || !errors.password) && "gap-y-6"}`}>
          <Input
            value={user.email}
            label={t("email")}
            size={InputSizes.FULL}
            onChange={(value) => setUser(prev => ({...prev, email: value}))}
            error={errors.email}
          />
          <Input
            value={user.password}
            type={"password"}
            label={t("password")}
            size={InputSizes.FULL}
            onChange={(value) => setUser(prev => ({...prev, password: value}))}
            error={errors.password}
          />
          {errors?.login && <label className="font-robot text-red-500 font-medium text-center">{t(errors.login)}</label>}
          <button
            className={`bg-primary w-full py-2  rounded-lg drop-shadow-lg text-white hover:text-primary font-bold hover:bg-gray-300 hover:drop-shadow-none ${errors.login? "-mt-6": "mt-6"}`}
            onClick={loginUser}
          >
            {t("login")}
          </button>
        </div>
      </div>
    </div>
  )
}
