import React from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import { IoCloseOutline } from "react-icons/io5"
import { FieldValues, SubmitHandler } from "react-hook-form/dist/types"

interface LoginFormProps {
  email: string
  passwd: string
}
const Login = () => {
  const { register, handleSubmit } = useForm<LoginFormProps>()
  const [openRegister, setOpenRegister] = React.useState<boolean>(false)
  return (
    <Container className="flex flex-alc flex-jcc">
      {openRegister ? <Register handleClose={setOpenRegister} /> : <></>}
      <Wrapper className="flex">
        <Desc>
          <h1>Easy</h1>
          <p>Easy社交，简单生活,让你的生活动起来</p>
        </Desc>
        <LoginForm>
          <form
            onSubmit={handleSubmit(data => console.log(data))}
            className="flex-c flex-alc"
          >
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="邮箱"
            />
            <input
              {...register("passwd", { required: true })}
              type="password"
              placeholder="密码"
            />
            <SubmitButton type="submit">登录</SubmitButton>
            <Division />
            <SubmitButton type="button" onClick={() => setOpenRegister(true)}>
              新建账户
            </SubmitButton>
          </form>
        </LoginForm>
      </Wrapper>
    </Container>
  )
}

export default Login

const Container = styled.div`
  height: 100vh;
  position: relative;
  background-color: ${props => props.theme.colors.bgcolor};
`
const Wrapper = styled.div`
  height: max-content;
  gap: 70px;
`

const Desc = styled.div`
  & h1 {
    font-size: 50px;
    margin-top: 30px;
    color: ${props => props.theme.colors.primary};
  }
  & p {
    font-size: 22px;
  }
`

const LoginForm = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 10px;
  & form {
    gap: 10px;
  }

  & input {
    border: 1px solid #ccc;
    outline: none;
    padding: 10px;
    width: 320px;
    border-radius: 6px;
    font-size: 18px;

    &:focus {
      border-color: #2374e1;
    }
  }

  button[type="button"] {
    background-color: #42b72a;
    width: 40%;

    &:hover {
      background-color: #36a420;
    }
  }
`
const SubmitButton = styled.button`
  outline: none;
  border: none;
  background-color: #1877f2;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
  margin: 10px 0;

  &:hover {
    background-color: #166fe5;
  }
`
const Division = styled.div`
  height: 1px;
  width: 100%;
  background-color: #ccc;
  margin: 10px 0;
`

interface RegisterProps {
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}

interface RegisterFormProps extends LoginFormProps {
  nickName: string
}
const Register = (props: RegisterProps) => {
  const { register, handleSubmit } = useForm<RegisterFormProps>()
  const { handleClose } = props

  const handleRegisterSubmit: SubmitHandler<RegisterFormProps> = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <RegisterWrapper className="flex flex-alc flex-jcc">
      <RegisterForm>
        <h1>注册</h1>
        <CloseIcon className="flex flex-alc" onClick={() => handleClose(false)}>
          <IoCloseOutline size={24} />
        </CloseIcon>
        <Division />
        <form className="flex-c" onSubmit={handleSubmit(handleRegisterSubmit)}>
          <input
            {...register("nickName", { required: true })}
            type="text"
            placeholder="昵称"
          />
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="邮箱"
          />
          <input
            {...register("passwd", { required: true })}
            type="password"
            placeholder="密码"
          />

          <SubmitButton type="submit">注册</SubmitButton>
        </form>
      </RegisterForm>
    </RegisterWrapper>
  )
}

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
`
const RegisterForm = styled.div`
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 20px;
  border-radius: 8px;
  position: relative;

  & form {
    gap: 10px;
  }

  & input {
    outline: none;
    border: 1px solid #ccc;
    padding: 8px;
    width: 300px;
    font-size: 17px;
    border-radius: 6px;
  }
`

const CloseIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  color: #65676b;
  cursor: pointer;
`
