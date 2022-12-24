import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { postAPI } from '../../../apis';
import { DETAIL_POST } from '../../../constant/queryKey';
import { PostTypes } from '../../../interfaces';
import Write from '../../write';

const Edit = () => {
  const router = useRouter();
  const { posturl } = router.query;
  const { data, error, status } = useQuery<PostTypes, AxiosError<ReactNode>>(
    [DETAIL_POST, posturl],
    () => postAPI.detail(posturl),
    {
      refetchOnWindowFocus: false,
      enabled: !!posturl,
    },
  );

  if (status === 'error') {
    return <span>{error?.response?.data}</span>;
  }

  return <Write modifyTitle={data?.title} modifyContent={data?.content} id={data?.id} />;
};

export default Edit;
