import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LBtn, LdisabledBtn } from '../../components/common/button/Button';
import Input from '../../components/common/Input/Input';

const Wrapper = styled.div`
  height: 100vh;
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: center;
  color: var(--basic-grey);
`;

const LinkWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  color: var(--basic-grey);
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  function emailCheck(event) {
    setEmail(event.target.value);
    const testEmail = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email);

    if (testEmail) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  function passwordCheck(event) {
    setPassword(event.target.value);
    const testPassword = /^[0-9]{0,}$/;
    if (password.match(testPassword)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }

  function onhandlesubmit(event) {
    event.preventDefault();
    // 2. 회원이 맞으면 다음 컴포넌트로 넘어가도록
  }

  return (
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
            // value={email}
            onChange={event => emailCheck(event)}
          />
          <Input
            label="비밀번호"
            type="password"
            id="user-password"
            name="user-password"
            placehoder=""
            // value={password}
            onChange={event => passwordCheck(event)}
          />

          {isEmailValid && isPasswordValid ? (
            <LBtn type="submit" content="로그인" />
          ) : (
            <LdisabledBtn content="로그인" />
          )}
        </FormWrapper>
      </form>
      <LinkWrapper>
        <Link to="/join">이메일로 회원가입</Link>
      </LinkWrapper>
    </Wrapper>
  );
}

export default LoginPage;
