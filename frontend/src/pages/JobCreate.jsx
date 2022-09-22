import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import CityService from "../services/CityService";
import JobPositionService from "../services/JobCategoryService";
import WorkTimeService from "../services/WorkTimeService";
import WorkPlaceService from "../services/WorkPlaceService";
import JobAdService from "../services/JobsService";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function JobAdCreate() {

  const {authItem} = useSelector(state => state.auth)

  let jobAdService = new JobAdService();
  const JobAdvertAddSchema = Yup.object().shape({
    lastDate: Yup.date().nullable().required("This field is required"),
    description: Yup.string().required("This field is required"),
    name: Yup.string().required("This field is required"),
    jobPositionId: Yup.string().required("This field is required"),
    workTimeId: Yup.string().required("This field is required"),
    workPlaceId: Yup.string().required("This field is required"),
    openPositions: Yup.string().required("Number of positions is mandatory").min(1,"The number of positions cannot be less than 1"),
    cityId: Yup.string().required("This field is required"),
    minSalary: Yup.number().min(0,"Cannot be less than 0").required("This field is required"),
    maxSalary: Yup.number().min(0,"Cannot be less than 0").required("This field is required")
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      description: "",
      name: "",
      jobPositionId: "",
      workTimeId: "",
      workPlaceId: "",
      openPositions: "",
      cityId: "",
      minSalary: "",
      maxSalary: "",
      lastDate: "",
    },
    validationSchema: JobAdvertAddSchema,
    onSubmit: (values) => {
      values.employerId = authItem[0].user.id;
      jobAdService.add(values).then((result) => console.log(result.data.data));
      alert("Job posting has been added and will be listed after the staff's approval");
      history.push("/jobs");
    },
  });

  const [workTimes, setWorkTimes] = useState([]);
  const [workPlaces, setWorkPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let workTimeService = new WorkTimeService();
    let workPlaceService = new WorkPlaceService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workTimeService.getWorkTimes().then((result) => setWorkTimes(result.data.data));
    workPlaceService.getWorkPlaces().then((result) => setWorkPlaces(result.data.data));
    cityService.getCitys().then((result) => setCities(result.data.data));
    jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
  }, []);

  const workTimeOption = workTimes.map((workTime, index) => ({
    key: index,
    text: workTime.name,
    value: workTime.id,
  }));
  const workPlaceOption = workPlaces.map((workPlace, index) => ({
    key: index,
    text: workPlace.name,
    value: workPlace.id,
  }));
  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));
  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.name,
    value: jobPosition.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  }

  return (
    <div>
      <Card fluid>
      <Card.Content header='Job posting Add' />
      <Card.Content>
      <Form onSubmit={formik.handleSubmit}>
      <Form.Field>
              <label>Ad Name</label>
                <TextArea
                  placeholder="Ad Name"
                  style={{ minHeight: 20 }}
                  error={Boolean(formik.errors.description).toString()}
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.name}
                  </div>
                )}
              </Form.Field>
             
        <Form.Field style={{marginBottom: "1rem"}}>
          <label>Job position</label>
        <Dropdown
          clearable
          item
          placeholder="Job position"
          search
          selection
          onChange={(event, data) =>
            handleChangeSemantic(data.value, "jobPositionId")
          }
          onBlur={formik.onBlur}
          id="jobPositionId"
          value={formik.values.jobPositionId}
          options={jobPositionOption}
          />
          {formik.errors.jobPositionId && formik.touched.jobPositionId &&(
            <div className={"ui pointing red basic label"}>
              {formik.errors.jobPositionId}
            </div>
          )}
          </Form.Field>
          <Form.Field>
          <label>City</label>
            <Dropdown
              clearable
              item
              placeholder="City"
              search
              selection
              onChange={(event, data) =>
                handleChangeSemantic(data.value, "cityId")
              }
              onBlur={formik.onBlur}
              id="cityId"
              value={formik.values.cityId}
              options={cityOption}
              />
              {formik.errors.cityId && formik.touched.cityId && (
                <div className={"ui pointing red basic label"}>
                {formik.errors.cityId}
              </div>
              )}
          </Form.Field>
          <Form.Field>
          <label>workplace</label>
          <Dropdown
                  clearable
                  item
                  placeholder="workplace"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workPlaceId")
                  }
                  onBlur={formik.onBlur}
                  id="workPlaceId"
                  value={formik.values.workPlaceId}
                  options={workPlaceOption}
                />
                {formik.errors.workPlaceId && formik.touched.workPlaceId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.workPlaceId}
                  </div>
                )}
          </Form.Field>
          <Form.Field>
          <label>Operation time</label>
                <Dropdown
                  clearable
                  item
                  placeholder="Operation time"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workTimeId")
                  }
                  onBlur={formik.onBlur}
                  id="workTimeId"
                  value={formik.values.workTimeId}
                  options={workTimeOption}
                />
                {formik.errors.workTimeId && formik.touched.workTimeId && (
                  <div className={"ui pointing red basic label"}>{formik.errors.workTimeId}</div>
                )}
              </Form.Field>
              <Form.Field>
              <Grid stackable>
              <Grid.Column width={8}>
              <label style={{fontWeight: "bold"}}>Salary range MINIMUM</label>
                <Input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Salary range MINIMUM"
                  value={formik.values.minSalary}
                  name="minSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                </Input>
                {formik.errors.minSalary && formik.touched.minSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.minSalary}
                  </div>
                )}
                </Grid.Column>
                <Grid.Column width={8}>
                <label style={{fontWeight: "bold"}}>Salary range MAXIMUM</label>
                <Input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Salary range MAXIMUM"
                  value={formik.values.maxSalary}
                  name="maxSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                </Input>
                {formik.errors.maxSalary && formik.touched.maxSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.maxSalary}
                  </div>
                )}
                </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field>
              <Grid stackable>
              <Grid.Column width={8}>
              <label style={{fontWeight: "bold"}}>Number of Open Positions</label>
                <Input
                  style={{ width: "100%" }}
                  id="openPositions"
                  name="openPositions"
                  error={Boolean(formik.errors.openPositions)}
                  onChange={formik.handleChange}
                  value={formik.values.openPositions}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Number of Open Positions"
                />
                {formik.errors.openPositions && formik.touched.openPositions && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.openPositions}
                  </div>
                )}
                </Grid.Column>
                <Grid.Column width={8}>
                <label style={{fontWeight: "bold"}}>Application deadline</label>
                <Input
                  style={{ width: "100%" }}
                  type="date"
                  error={Boolean(formik.errors.lastDate)}
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "lastDate")
                  }
                  value={formik.values.lastDate}
                  onBlur={formik.handleBlur}
                  name="lastDate"
                  placeholder="Application deadline"
                />
                {formik.errors.lastDate && formik.touched.lastDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastDate}
                  </div>
                )}
                </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field>
              <label>Explanation</label>
                <TextArea
                  placeholder="Explanation"
                  style={{ minHeight: 100 }}
                  error={Boolean(formik.errors.description).toString()}
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.description}
                  </div>
                )}
              </Form.Field>
              <Button
                content="Add"
                labelPosition="right"
                icon="add"
                positive
                type="submit"
                style={{ marginLeft: "20px" }}
              />
      </Form>
      </Card.Content>
      </Card>
    </div>
  );
}
