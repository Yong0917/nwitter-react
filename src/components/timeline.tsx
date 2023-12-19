import {useEffect, useState} from "react";
import styled from "styled-components";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "../firebase.tsx";
import Tweet from "./tweet.tsx";
import {Unsubscribe} from "firebase/auth"

export interface ITweet{
    id: string;
    photo?: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export default function Timeline(){
    const [tweets, setTweet] = useState<ITweet[]>([]);
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchTweets = async() => {

            // 쿼리 생성
            const tweetsQuery = query(
                collection(db,"tweets"),
                orderBy("createdAt", "desc")
            );

            // // 데이터 get
            // const snapshot = await getDocs(tweetsQuery);
            //
            // // 데이터 set
            // const tweets = snapshot.docs.map(doc => {
            //     const {tweet, createdAt, userId, username, photo} = doc.data();
            //     return{
            //         tweet,
            //         createdAt,
            //         userId,
            //         username,
            //         photo,
            //         id: doc.id
            //     }
            // });

            // 변경 사항 감지
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const {tweet, createdAt, userId, username, photo} = doc.data();
                    return {
                        tweet,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id
                    };
                });
                setTweet(tweets);
            });
        }
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        }
    }, []);
    return (
        <Wrapper>
            {tweets.map(
                tweet => <Tweet key={tweet.id} {...tweet}></Tweet>
            )}
        </Wrapper>
    );
}