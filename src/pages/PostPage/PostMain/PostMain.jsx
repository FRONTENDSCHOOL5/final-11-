import React, { useState, useEffect, useCallback } from 'react';
// import Navbar from '../../../components/common/Navbar/Navbar';
import styled from 'styled-components';
import axios from 'axios';
import { HeaderBasicNav } from '../../../components/common/Header/Header';
import HomePost from '../../../components/HomePost/HomePost';
import CommentInput from '../../../components/common/Comment/CommentInput/Comment';
import CommentPost from '../../../components/common/Comment/CommentPost/CommentPost';
import { useLocation } from 'react-router-dom';
import { authAtom } from '../../../atom/atoms';
import { useRecoilValue } from 'recoil';

function PostMain() {
  const auth = useRecoilValue(authAtom);
  const location = useLocation();
  const [postData, setPostData] = useState(null);
  const url = 'https://api.mandarin.weniv.co.kr';
  const postId = location.state.id;
  const getData = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res);
      setPostData(res.data.post);
    } catch (error) {
      console.log('post 데이터 전송 실패');
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // getMyAccountName();
    getData();
  }, [auth, postId, getData]);

  // useEffect(() => {
  //   getMyProfilePic();
  //   if (postData) {
  //     getCommentList();
  //   }
  // }, [token, postData]);
  return (
    <PostPageWrapper>
      <HeaderBasicNav />
      <ContentSection>
        {/* 여기서 문제였음 postData, postData.id값이 계속 null 이 나왔는데 그이유는 getData가 비동기 함수 인데 
        setPostData()가 실행되기도 전에 HomePost 컴포넌트가 렌더링 되니까 여기서 조건을 추가해주는 방법사용 
        보통 이부분에서 로딩 컴포넌트를 만들어서 삼항연산자안에 postdata가 null일때 로딩컴포넌트를 보여주는 방식으로 함
         */}
        {postData !== null && <HomePost data={postData} />}
      </ContentSection>
      <hr />
      <CommentWrapper>
        <CommentPost />
        <CommentPost />
      </CommentWrapper>
      {postId !== null && <CommentInput userId={postId} />}
    </PostPageWrapper>
  );
}

const PostPageWrapper = styled.div`
  height: 80vh;
`;

const CommentWrapper = styled.section`
  margin: 20px 16px 16px;
  min-height: 300px;
`;

const ContentSection = styled.section`
  padding: 20px 12px 12px;
  & + hr {
    margin: 0;
    border: solid 0.5px #dbdbdb;
  }
`;

export default PostMain;
