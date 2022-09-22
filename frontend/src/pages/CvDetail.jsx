import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CvService from "../services/CvService";
import { Card, Image, Table, Header, Button, Icon } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSelector } from "react-redux";
import UptadeGithub from "./modals/cvUpdate/UptadeGithub";
import UpdateLinkedin from "./modals/cvUpdate/UpdateLinkedin";
import UpdateBiography from "./modals/cvUpdate/UpdateBiography";
import UpdateSchools from "./modals/cvUpdate/UpdateSchools";
import UpdateLanguage from "./modals/cvUpdate/UpdateLanguage";
import UpdateTechnology from "./modals/cvUpdate/UpdateTechnology";
import UpdateExperiance from "./modals/cvUpdate/UpdateExperiance";
import UpdateImage from "./modals/cvUpdate/UpdateImage";
import { toast } from "react-toastify";

export default function CvDetail() {
  const { authItem } = useSelector((state) => state.auth);

  let { id } = useParams();

  let [cv, setCv] = useState({});

  let cvService = new CvService();
  useEffect(() => {
    let cvService = new CvService();
    cvService.getByEmployeeId(id).then((result) => setCv(result.data.data));
  }, [id]);

  let myProfile = false;
  if (authItem[0].loggedIn === false) {
    myProfile = false;
  } else if (authItem[0].loggedIn === true) {
    myProfile = parseInt(authItem[0].user.id) === parseInt(id);
  }

  const handleGithubDelete = (cvId) => {
    cvService
      .deleteGithub(cvId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };

  const handleLinkedinDelete = (cvId) => {
    cvService
      .deleteLinkedin(cvId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        alert(result.response.data.message);
        toast.warning(result.response.data.message);
      });
  };

  const updateCvValues = () => {
    cvService.getByEmployeeId(id).then((result) => {
      setCv(result.data.data);
    });
  };

  return (
    <div>
      <Card.Group>
        <Card fluid color={"black"}>
          <Card.Content>
            {cv.cvImgs?.map((image) => (
              <Image
                floated="left"
                size="small"
                src={image?.imageUrl}
                circular
                key={image?.id}
              />
            ))}
            {myProfile && (
              <Popup
                trigger={<button className="ui button">Upload a picture</button>}
                modal
              >
                <UpdateImage cvId={cv.id} updateCvValues={updateCvValues} />
              </Popup>
            )}

            <Card.Header style={{ marginTop: "0.3em" }}>
              {cv.employee?.firstName + " " + cv.employee?.lastName}
            </Card.Header>
            <Card.Meta>
              <strong>{cv.biography}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>user</Table.HeaderCell>
                    <Table.HeaderCell>Information</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Ad</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.employee?.firstName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Surname</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.employee?.lastName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Date of Birth</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.employee?.dateOfBirth}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Email</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.employee?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.github}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button secondary disabled={!cv.github}>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                          {myProfile && (
                            <Popup
                              trigger={
                                <button className="ui button"> Refresh </button>
                              }
                              modal
                            >
                              <UptadeGithub
                                cvId={cv.id}
                                updateCvValues={updateCvValues}
                              />
                            </Popup>
                          )}
                          {myProfile && (
                            <Button
                              color="red"
                              onClick={() => handleGithubDelete(id)}
                            >
                              <Icon name="x" />
                            </Button>
                          )}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.github}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.linkedin}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin" disabled={!cv.linkedin}>
                              <Icon name="linkedin" /> LinkedIn
                            </Button>
                          </a>
                          {myProfile && (
                            <Popup
                              trigger={
                                <button className="ui button"> Refresh </button>
                              }
                              modal
                            >
                              <UpdateLinkedin
                                cvId={cv.id}
                                updateCvValues={updateCvValues}
                              />
                            </Popup>
                          )}
                          {myProfile && (
                            <Button
                              color="red"
                              onClick={() => handleLinkedinDelete(id)}
                            >
                              <Icon name="x" />
                            </Button>
                          )}
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.linkedin}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Biography
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Refresh{" "}
                  </button>
                }
                modal
              >
                <UpdateBiography cvId={cv.id} updateCvValues={updateCvValues} />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Card.Content description={cv.biography} />
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Education
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Refresh{" "}
                  </button>
                }
                modal
              >
                <UpdateSchools cvId={cv.id} updateCvValues={updateCvValues} />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Educational Institution</Table.HeaderCell>
              <Table.HeaderCell>Specialization</Table.HeaderCell>
              <Table.HeaderCell>Commencement Date</Table.HeaderCell>
              <Table.HeaderCell>Graduation Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.cvSchools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.name}</Table.Cell>
                <Table.Cell>{school.department}</Table.Cell>
                <Table.Cell>{school.startDate}</Table.Cell>
                <Table.Cell>
                  {school.endDate ? school.endDate : <p>Studying</p>}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid>
        <Card.Content>
          <Card.Header>
          Experiments
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Refresh{" "}
                  </button>
                }
                modal
              >
                <UpdateExperiance
                  cvId={cv.id}
                  updateCvValues={updateCvValues}
                />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company</Table.HeaderCell>
              <Table.HeaderCell>Position</Table.HeaderCell>
              <Table.HeaderCell>Commencement Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {cv.cvExperiances?.map((experiance) => (
              <Table.Row key={experiance.id}>
                <Table.Cell>{experiance.companyName}</Table.Cell>
                <Table.Cell>{experiance.position}</Table.Cell>
                <Table.Cell>{experiance.startDate}</Table.Cell>
                <Table.Cell>
                  {experiance.endDate ? (
                    experiance.endDate
                  ) : (
                    <p>Continue</p>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
            Foreign languages
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Refresh{" "}
                  </button>
                }
                modal
              >
                <UpdateLanguage cvId={cv.id} updateCvValues={updateCvValues} />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Level min:1 max:5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.name}</Table.Cell>
                <Table.Cell>{language.level}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card fluid color={"black"}>
        <Card.Content>
          <Card.Header>
          Knowledge
            {myProfile && (
              <Popup
                trigger={
                  <button className="ui button" style={{ marginLeft: "1em" }}>
                    {" "}
                    Refresh{" "}
                  </button>
                }
                modal
              >
                <UpdateTechnology
                  cvId={cv.id}
                  updateCvValues={updateCvValues}
                />
              </Popup>
            )}
          </Card.Header>
        </Card.Content>
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.cvPrgSkills?.map((technology) => (
              <Table.Row key={technology.id}>
                <Table.Cell>{technology.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
