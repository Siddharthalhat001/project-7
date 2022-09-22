import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExperianceService from '../../../services/ExperianceService'
import { Card, Table, Button, Icon, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from 'formik';

export default function UpdateExperiance({cvId,updateCvValues}) {

    let [experiances, setExperiances] = useState([])

    let experianceService = new ExperianceService();
    useEffect(() => {
        let experianceService = new ExperianceService();
        experianceService.getByCvId(cvId).then((result) => {
            setExperiances(result.data.data)
        })
    },[cvId])

    let experianceAddSchema = Yup.object().shape({
        companyName: Yup.string().required("This field is required").min(2,"Must be at least 2 characters long"),
        position: Yup.string().required("This field is required").min(2,"Must be at least 2 characters long"),
        startDate: Yup.date().required("This field is required"),
        endDate: Yup.date(),
    })

    const formik = useFormik({
        initialValues: {
            companyName:"",
            position:"",
            startDate:"",
            endDate:"",
        },
        validationSchema: experianceAddSchema,
        onSubmit:(values)=>{
            values.cvId=cvId;
            experianceService.add(values).then((result) => {
                alert(result.data.message)
                experianceService.getByCvId(cvId).then((result) => {
                    setExperiances(result.data.data)
                })
                updateCvValues();
            }).catch((result) => {
                alert(result.response.data.message)
            })
        }
    })

    const handleDeleteExperiance = (experianceId) => {
        experianceService.delete(experianceId).then((result) => {
            alert(result.data.message);
            experianceService.getByCvId(cvId).then((result) => {
                setExperiances(result.data.data)
            })
            updateCvValues();
        }).catch((result) => {
            alert(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"black"}>
                <Card.Content header="Experiences" />
                <Table celled color={"black"}>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Company name</Table.HeaderCell>
                    <Table.HeaderCell>Position</Table.HeaderCell>
                    <Table.HeaderCell>Starting date</Table.HeaderCell>
                    <Table.HeaderCell>End Date</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {experiances?.map((experiance) => (
                        <Table.Row key={experiance.id}>
                            <Table.Cell>{experiance.companyName}</Table.Cell>
                            <Table.Cell>{experiance.position}</Table.Cell>
                            <Table.Cell>{experiance.startDate}</Table.Cell>
                            <Table.Cell>{experiance.endDate ? experiance.endDate:<p>Continues</p>}</Table.Cell>
                            <Table.Cell>
                            <Button color="red" onClick={() => handleDeleteExperiance(experiance.id)}>
                                <Icon name="x" />
                            </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                </Table>
            </Card>
            <Card fluid color={"black"}>
                <Card.Content header="Add Experience"/>
                <Card.Content>
                <Form onSubmit={formik.handleSubmit}>
                    <Grid>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Company name</b></label>
                            <Form.Input
                                fluid
                                placeholder="Company Name"
                                type="text"
                                name="companyName"
                                value={formik.values.companyName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.companyName && formik.touched.companyName && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.companyName}
                                </div>
                            )}
                            </div>
                            <label><b>Starting date</b></label>
                            <Form.Input
                                fluid
                                type="date"
                                name="startDate"
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.startDate && formik.touched.startDate && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.startDate}
                                </div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div>
                                <label><b>Position</b></label>
                                <Form.Input
                                    fluid
                                    placeholder="Position"
                                    type="text"
                                    name="position"
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.position && formik.touched.position && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.position}
                                    </div>
                                )}
                            </div>
                            <label><b>End Date</b></label>
                            <Form.Input
                                fluid
                                type="date"
                                name="endDate"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.endDate && formik.touched.endDate && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.endDate}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop:"1em"}}>
                    <Button fluid color="green" type="submit">Add</Button>
                    </div>
                </Form>
                </Card.Content>
            </Card>
        </div>
    )
}
