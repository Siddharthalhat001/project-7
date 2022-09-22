import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Table, Button } from 'semantic-ui-react'
import FavoriteService from '../services/FavoriteService';

export default function FavoriJobs() {

    const {authItem} = useSelector(state => state.auth)

    let [favoriteAds, setFavoriteAds] = useState([]);

    let favoriteService = new FavoriteService();
    useEffect(() => {
        let favoriteService = new FavoriteService();
        favoriteService.getByCandidateId(authItem[0].user.id).then((result) => {
            setFavoriteAds(result.data.data);
        })
    },[authItem])

    const handleRemoveFavorite = (favoriteId) => {
        favoriteService.removeFavorite(favoriteId).then((result) => {
            setFavoriteAds(favoriteAds.filter((favoriAd) => favoriAd.id !== favoriteId))
            alert(result.data.message)
        }).catch((result) => {
            alert(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"black"}>
                <Card.Content header="Favori İş İlanların"/>
                    <Table celled color={"black"}>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Categories</Table.HeaderCell>
                                <Table.HeaderCell>City</Table.HeaderCell>
                                <Table.HeaderCell>Salary Range</Table.HeaderCell>
                                <Table.HeaderCell>Business Hours</Table.HeaderCell>
                                <Table.HeaderCell>Job Format</Table.HeaderCell>
                                <Table.HeaderCell>Last Date</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {favoriteAds?.map((favoriteAd) => (
                                <Table.Row key={favoriteAd.id}>
                                    <Table.Cell>{favoriteAd.jobs.employer.companyName}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobs.jobCategory.name}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobs.city.name}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobs.minSalary} - {favoriteAd.jobs.maxSalary}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobs.workTime.name}</Table.Cell>
                                    <Table.Cell>{favoriteAd.jobs.workPlace.name}</Table.Cell>
                                    <Table.Cell>
                                        {(
                                        (new Date(favoriteAd.jobs.lastDate).getTime() -
                                            new Date(Date.now()).getTime()) /
                                        86400000
                                        )
                                        .toString()
                                        .split(".", 1)}{" "}
                                        day
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button as={Link} to={`/jobs/${favoriteAd.jobs.id}`}
                                            content="More"
                                            icon="right arrow"
                                            labelPosition="right"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            icon="x"
                                            color={"red"}
                                            onClick={() => handleRemoveFavorite(favoriteAd.id)}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
            </Card>
        </div>
    )
}
