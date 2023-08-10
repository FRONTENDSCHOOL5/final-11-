import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import Input from '../../components/common/Input/Input';
import { followingAtom } from '../../atom/atoms';
import authAtom from '../../atom/authToken';
import accountNameAtom from '../../atom/accountName';
import MainWrapperF from '../../styles/MainGlobal';
import LoginApi from '../../api/getData/LoginApi';
import { ButtonLong } from '../../components/common/button/Button';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loginErrMessage, setLoginErrMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  const [auth, setAuth] = useRecoilState(authAtom);
  const [accountname, setAccountname] = useRecoilState(accountNameAtom);
  const [following, setFollowing] = useRecoilState(followingAtom);

  function emailCheck(event) {
    setEmail(event.target.value);
    const testEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
        event.target.value,
      );

    if (testEmail) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function passwordCheck(event) {
    setPassword(event.target.value);
    const testPassword = /^[A-Za-z0-9]{5,20}$/;
    if (password !== '' && password.match(testPassword)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }

  const url = 'https://api.mandarin.weniv.co.kr';

  async function onhandlesubmit(event) {
    event.preventDefault();
    LoginApi(
      email,
      password,
      setAuth,
      setAccountname,
      FollowingData,
      setIsCorrect,
      setLoginErrMessage,
    );
  }

  async function FollowingData(token) {
    try {
      const res = await axios.get(`${url}/user/myinfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { following } = res.data.user;
      setFollowing(following);
      if (Object.keys(following).length === 0) {
        navigate('/home');
      } else {
        navigate('/homefeed');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainWrapperF>
      <Wrapper>
        <h1>로그인</h1>
        <form onSubmit={onhandlesubmit}>
          <FormWrapper>
            <Input
              label="이메일"
              type="email"
              id="user-email"
              name="user-email"
              placeholder=""
              value={email}
              onChange={event => emailCheck(event)}
            />
            <Input
              label="비밀번호"
              type="password"
              id="user-password"
              name="user-password"
              placeholder=""
              value={password}
              onChange={event => passwordCheck(event)}
              isCorrect={isCorrect}
              errorMessage={loginErrMessage}
            />

            {/* {isEmailValid && isPasswordValid ? (
              <LBtn type="submit" content="로그인" />
            ) : (
              <LdisabledBtn content="로그인" />
            )} */}

            {isEmailValid && isPasswordValid ? (
              <ButtonLong type="submit" disabled={false}>
                로그인
              </ButtonLong>
            ) : (
              <ButtonLong
                disabled={true}
                backgroundColor={'var(--light-yellow)'}
              >
                로그인
              </ButtonLong>
            )}
          </FormWrapper>
        </form>
        <LinkWrapper>
          <Link to="/join">이메일로 회원가입</Link>
        </LinkWrapper>
      </Wrapper>
    </MainWrapperF>
  );
}

export default LoginPage;

export const Wrapper = styled.div`
  width: 80%;
  margin: 0px auto;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: center;
  color: var(--basic-grey);
`;

export const LinkWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  color: var(--basic-grey);
`;
