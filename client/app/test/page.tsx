'use client';
import { getPost, writePost } from 'api/posts.api';
import React, { useRef } from 'react';

const getTest = async () => {
  const response = await getPost();
  console.log(response);
};

export default function Test() {
  const input = useRef(null);

  const writeTest = async () => {
    const response = await writePost(input.current.value);
    console.log(response);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <button onClick={getTest}>GET</button>
      <input ref={input} type="text" placeholder="POST 값을 입력하세요" />
      <button onClick={writeTest}>POST</button>
    </div>
  );
}
