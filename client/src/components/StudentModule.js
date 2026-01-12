import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../actions/studentActions';
import { Container, Row, Col, Card, Button, Modal, Form, Table, Alert } from 'react-bootstrap';

const StudentModule = () => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(state => state.student);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    class: '',
    section: '',
    dateOfBirth: '',
    address: '',
    parentName: '',
    parentPhone: '',
  });


  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const uniqueClasses = [...new Set(students.map(s => s.class))].sort();
  const filteredStudents = selectedClass ? students.filter(s => s.class === selectedClass) : [];

  const handleShowModal = (student = null) => {
    setEditingStudent(student);
    setFormData(student ? { ...student } : {
      name: '',
      email: '',
      phone: '',
      rollNumber: '',
      class: selectedClass || '',
      section: '',
      dateOfBirth: '',
      address: '',
      parentName: '',
      parentPhone: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingStudent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStudent) {
      dispatch(updateStudent(editingStudent._id, formData));
    } else {
      dispatch(createStudent(formData));
    }
    dispatch(fetchStudents());
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      dispatch(deleteStudent(id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Student Management</h2>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Student
          </Button>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {loading ? (
                <p>Loading...</p>
              ) : selectedClass ? (
                <div>
                  <Button variant="secondary" onClick={() => setSelectedClass(null)} className="mb-3">
                    Back to Classes
                  </Button>
                  <h4>Class {selectedClass} Students</h4>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll Number</th>
                        <th>Section</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map(s => (
                        <tr key={s._id}>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.rollNumber}</td>
                          <td>{s.section}</td>
                          <td>
                            <Button variant="info" size="sm" onClick={() => handleShowModal(s)}>
                              Edit
                            </Button>{' '}
                            <Button variant="danger" size="sm" onClick={() => handleDelete(s._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div>
                  <h4>Select a Class</h4>
                  <Row>
                    {uniqueClasses.map(cls => (
                      <Col md={3} key={cls} className="mb-3">
                        <Card className="text-center">
                          <Card.Body>
                            <Card.Title>Class {cls}</Card.Title>
                            <Button variant="primary" onClick={() => setSelectedClass(cls)}>
                              View Students
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingStudent ? 'Edit Student' : 'Add Student'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Control
                type="text"
                name="class"
                value={formData.class}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Parent Name</Form.Label>
              <Form.Control
                type="text"
                name="parentName"
                value={formData.parentName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Parent Phone</Form.Label>
              <Form.Control
                type="text"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editingStudent ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>


    </Container>
  );
};

export default StudentModule;
