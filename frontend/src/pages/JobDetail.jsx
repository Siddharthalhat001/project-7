import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobAdService from "../services/JobsService";
import { Header, Icon, Table, Button, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteService from "../services/FavoriteService";

export default function JobAdDetail() {
  let { id } = useParams();

  const {authItem} = useSelector(state => state.auth)

  const [jobAd, setJobAd] = useState({});

  useEffect(() => {
    let jobAdService = new JobAdService();
    jobAdService.getByJobAdId(id).then((result) => setJobAd(result.data.data));
  }, [id]);

  const handleAddFavorites = (jobAdId) => {
    let favoriteService = new FavoriteService();
    favoriteService.addFavorite(authItem[0].user.id,jobAdId).then((result) => {
      alert(result.data.message)
    }).catch((result) => {
      alert(result.response.data.message)
    })
  }

  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Explanation" />
        <Card.Content>
            {jobAd.description}
        </Card.Content>
      </Card>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Table celled color={"black"} stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>employer</Table.HeaderCell>
                  <Table.HeaderCell>Informations</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="building" />
                        Company name
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.companyName}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="mail" />
                        Email
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.email}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="phone" />
                        Telephone
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.phoneNumber}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="world" />
                        Website
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{jobAd.employer?.webSite}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="list ul" />
                        Detail
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Button animated as={Link} to={`/employers/${jobAd.employer?.id}`}>
                      <Button.Content visible>Git details</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            {authItem[0].loggedIn && authItem[0].user.userType===1 && 
              <Button fluid color={"red"} onClick={() => handleAddFavorites(jobAd.id)}>
                <Icon name="heart" />Add the ad to your favorites
              </Button>
            }
          </Grid.Column>
          <Grid.Column width={10}>
            <Table celled fixed singleLine color={"black"}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Job advertisement</Table.HeaderCell>
                  <Table.HeaderCell>Detail</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Job Position</Table.Cell>
                  <Table.Cell>{jobAd.jobCategory?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>City</Table.Cell>
                  <Table.Cell>{jobAd.city?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Work Place</Table.Cell>
                  <Table.Cell>{jobAd.workPlace?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Working time</Table.Cell>
                  <Table.Cell>{jobAd.workTime?.name}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Minimum Salary</Table.Cell>
                  <Table.Cell>{jobAd.minSalary}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Maximum Salary</Table.Cell>
                  <Table.Cell>{jobAd.maxSalary}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Open Positions</Table.Cell>
                  <Table.Cell>{jobAd.openPositions}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Release date</Table.Cell>
                  <Table.Cell>{jobAd.createDate}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Application deadline</Table.Cell>
                  <Table.Cell>{jobAd.lastDate}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      
    </div>
  );
}
