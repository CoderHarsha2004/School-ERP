 import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaculty, createFaculty, updateFaculty, deleteFaculty } from '../actions/facultyActions';
import { Container, Row, Col, Card, Button, Modal, Form, Table, Alert } from 'react-bootstrap';

const FacultyModule = () => {
  const dispatch = useDispatch();
  const { faculty, loading, error } = useSelector(state => state.faculty);
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    subjects: [],
    phone: '',
    employeeId: '',
  });

  useEffect(() => {
    dispatch(fetchFaculty());
  }, [dispatch]);

  const handleShowModal = (fac = null) => {
    setEditingFaculty(fac);
    setFormData(fac ? { ...fac, subjects: fac.subjects || [] } : {
      name: '',
      email: '',
      department: '',
      subjects: [],
      phone: '',
      employeeId: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFaculty(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingFaculty) {
      dispatch(updateFaculty(editingFaculty._id, formData));
    } else {
      dispatch(createFaculty(formData));
    }
    dispatch(fetchFaculty());
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      dispatch(deleteFaculty(id));
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
          <h2>Faculty Management</h2>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add Faculty
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
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Subjects</th>
                      <th>Employee ID</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculty.map(f => (
                      <tr key={f._id}>
                        <td>{f.name}</td>
                        <td>{f.email}</td>
                        <td>{f.department}</td>
                        <td>{f.subjects ? f.subjects.join(', ') : ''}</td>
                        <td>{f.employeeId}</td>
                        <td>{f.phone}</td>
                        <td>
                          <Button variant="info" size="sm" onClick={() => handleShowModal(f)}>
                            Edit
                          </Button>{' '}
                          <Button variant="danger" size="sm" onClick={() => handleDelete(f._id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingFaculty ? 'Edit Faculty' : 'Add Faculty'}</Modal.Title>
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
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subjects</Form.Label>
              <Form.Control
                type="text"
                name="subjects"
                value={formData.subjects.join(', ')}
                onChange={(e) => setFormData({ ...formData, subjects: e.target.value.split(',').map(s => s.trim()) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                name="employeeId"
                value={formData.employeeId}
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
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              {editingFaculty ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default FacultyModule;
