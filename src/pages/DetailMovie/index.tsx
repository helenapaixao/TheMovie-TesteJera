import React, { useState, useEffect } from "react";

import { API_BASE_IMAGE_URL, getDetail } from "../../services/client";
import { useRouteMatch } from "react-router-dom";

import Header from "../../components/Header";

import notfound from "../../assets/notfound.svg";

import {
    Container,
    Box,
    ContentAll,
    ContentCol,
    ContentText,
    About,
    ContentButton,
    ContentImg,
    MoreInfo,
    Title,
} from "./styles";

interface ItemParams {
    type: string;
    id: string;
}

interface Item {
    poster_path: string | null;
    overview: string;
    original_title: string;
    original_language: string;
    original_name: string;
    origin_country: string;
    title: string;
    popularity: number;
    vote_count: number;
    vote_avanger: number;
    first_air_date: string;
    last_episode_to_air: string;
    next_episode_to_air: string;
    release_date: string;
    name: string;
    status: string;
    id: number;
}

const Detail: React.FC = () => {
    const [mediaItem, setMediaItem] = useState<Item>();
    const [showVideo] = useState<Boolean>(false);

    const { params } = useRouteMatch<ItemParams>();

    useEffect(() => {
        async function loadDetail() {
            const detail = await getDetail(params.type, params.id);
            setMediaItem(detail);
        }

        loadDetail();
    }, [params]);

    function formatData(dataString: string) {
        return new Date(dataString);
    }

    return (
        <Container>
            <Header />
            {mediaItem && !showVideo && (
                <Box>
                    <ContentAll>
                        <ContentCol>
                            <ContentText>
                                <Title>
                                    <h1>
                                        {mediaItem.name || mediaItem.title}
                                        <span>
                                            (
                                            {formatData(
                                                mediaItem.first_air_date ||
                                                    mediaItem.release_date
                                            ).getFullYear()}
                                            )
                                        </span>
                                    </h1>
                                </Title>
                                <About>{mediaItem.overview}</About>
                                <MoreInfo>
                                    <h3>
                                        <strong>About</strong>{" "}
                                        {mediaItem.name || mediaItem.title}
                                    </h3>
                                    <ul>
                                        <li>
                                            <strong>Original title:</strong>
                                            {mediaItem.original_name ||
                                                mediaItem.title}
                                        </li>
                                        <li>
                                            <strong>Original language:</strong>
                                            {mediaItem.original_language ||
                                                "Nothing found"}
                                        </li>
                                        <li>
                                            <strong>Origin country:</strong>
                                            {mediaItem.origin_country ||
                                                "Nothing found"}
                                        </li>
                                        <li>
                                            <strong>Popularity:</strong>
                                            {mediaItem.popularity ||
                                                "Nothing found"}
                                        </li>
                                        <li>
                                            <strong>Vote count:</strong>
                                            {mediaItem.vote_count ||
                                                "Nothing found"}
                                        </li>
                                        <li>
                                            <strong>Realise:</strong>
                                            {formatData(
                                                mediaItem.first_air_date ||
                                                    mediaItem.release_date
                                            ).toLocaleDateString("en-GB") ||
                                                "Date not found"}
                                        </li>
                                        <li>
                                            <strong>Status:</strong>
                                            {mediaItem.status ||
                                                "Nothing found"}
                                        </li>
                                    </ul>
                                </MoreInfo>
                            </ContentText>
                            <ContentButton>

                            <button>Add to watch list</button>
                            </ContentButton>
                        </ContentCol>
                        <ContentImg>
                            {mediaItem.poster_path !== null ? (
                                <img
                                    src={`${API_BASE_IMAGE_URL}w342${mediaItem.poster_path}`}
                                    alt={mediaItem.title}
                                />
                            ) : (
                                <img src={notfound} alt="notfound" />
                            )}
                        </ContentImg>
                    </ContentAll>
                </Box>
            )}
        </Container>
    );
};

export default Detail;
