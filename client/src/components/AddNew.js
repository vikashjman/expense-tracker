import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { postExpense } from "../api";
import { useDispatch } from 'react-redux'
import { add } from '../app/expense.slice';
import { CATEGORY } from '../constants/constant';
import { v4 as uuidv4 } from "uuid";


const initialState = {
  month: "JANUARY",
  title: "",
  amount: 0,
  category: "FOOD",
};

function MydModalWithGrid(props) {

  const [expense, setExpense] = useState(initialState);
  const dispatch = useDispatch();
  const onClickHandler = async () => {
    props.onHide();
    const payload = {
      uuid: uuidv4(),
      month: expense.month,
      transaction: {
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
      },
    };

    await postExpense(payload);
    setExpense(initialState);
    dispatch(add(payload))
  };


  const handleExpenseChange = (e) => {
    const { name, value } = e.target;

    setExpense({ ...expense, [name]: value });
  };

  return (
    <Modal
      backdrop="static"
      style={{ justifyContent: "space-between" }}
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={6} md={4}>
              <select
                value={expense.category}
                name="category"
                onChange={(e) => handleExpenseChange(e)}
              >
                {Object.values(CATEGORY).map(cat => <option key={cat} value={cat}>{cat.toLowerCase}</option>)}
              </select>
            </Col>
            <Col xs={12} md={8}>
              <input
                name="title"
                value={expense.title}
                type="text"
                id="label"
                placeholder="Description"
                onChange={(e) => handleExpenseChange(e)}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={6} md={6}>
              <input
                type="number"
                id="expenses"
                placeholder="expenses ₹"
                name="amount"
                value={expense.amount}
                onChange={(e) => handleExpenseChange(e)}
              />
            </Col>
            <Col xs={6} md={4}>
              <select id="color">
                <option value="BLUE">Blue</option>
                <option value="">Red</option>
                <option value="">Purple</option>
                <option value="">Lime</option>
              </select>
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={6} md={4}>
              <select
                name="month"
                value={expense.month}
                onChange={(e) => handleExpenseChange(e)}
              >
                <option value="JANUARY">Jan</option>
                <option value="FEBRUARY">Feb</option>
                <option value="MARCH">Mar</option>
                <option value="APRIL">April</option>
                <option value="MAY">May</option>
                <option value="JUNE">June</option>
                <option value="JULY">July</option>
                <option value="AUGUST">Auguest</option>
                <option value="SEPTEMBER">September</option>
                <option value="OCTOBER">October</option>
                <option value="NOVEMBER">November</option>
                <option value="DECEMBER">December</option>
              </select>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(e) => {
            onClickHandler(e);
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export const AddNew = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        className="btn"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Add
      </Button>

      <MydModalWithGrid
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
