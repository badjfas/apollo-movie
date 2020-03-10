import React from "react";
import {useParams} from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Footer = styled.footer`
    height:100%;
    background-image: url(${props => props.bg});
  background-size: cover;

    width:100%;
    display:flex;
    `;

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      medium_cover_image
      description_intro
    }
    suggestions(id:$id){
        id
        title
        medium_cover_image
    }
  }
`;

export default ({bg}) => {

  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id:parseInt(id) }
  });
  
  return (
    <Container>
      <Column>
        <Title>{loading ? "Loading...." : data.movie.title}</Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data?.movie?.language} · 👑{data?.movie?.rating}
            </Subtitle>
            <Description>
                {data&&data.movie.description_intro}
            </Description>
          </>
        )}
      </Column>
      {!loading && (
        <Poster bg={!loading && data.movie.medium_cover_image}></Poster>
      )}
      {!loading&&data&&data.suggestions.map(sm=><Footer  key={sm.id} bg={sm.medium_cover_image}></Footer>)}
    </Container>
  );
};