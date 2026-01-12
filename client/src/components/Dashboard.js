import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../actions/studentActions';
import { fetchFaculty } from '../actions/facultyActions';
import { fetchFees } from '../actions/feesActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { students } = useSelector(state => state.student);
  const { faculty } = useSelector(state => state.faculty);
  const { fees } = useSelector(state => state.fees);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchFaculty());
    dispatch(fetchFees());
  }, [dispatch]);

  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const pendingFees = fees.filter(fee => fee.status === 'pending').length;
  const completedFees = fees.filter(fee => fee.status === 'paid').length;

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
        <div className="p-3">
          <h4>School ERP</h4>
        </div>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" className={`text-white ${location.pathname === '/' ? 'bg-primary' : ''}`} style={{ padding: '10px 20px' }}>
            Dashboard
          </Nav.Link>
          <Nav.Link as={Link} to="/students" className={`text-white ${location.pathname === '/students' ? 'bg-primary' : ''}`} style={{ padding: '10px 20px' }}>
            Students
          </Nav.Link>
          <Nav.Link as={Link} to="/faculty" className={`text-white ${location.pathname === '/faculty' ? 'bg-primary' : ''}`} style={{ padding: '10px 20px' }}>
            Faculty
          </Nav.Link>
          <Nav.Link as={Link} to="/fees" className={`text-white ${location.pathname === '/fees' ? 'bg-primary' : ''}`} style={{ padding: '10px 20px' }}>
            Fees
          </Nav.Link>
          <Nav.Link as={Link} to="/reports" className={`text-white ${location.pathname === '/reports' ? 'bg-primary' : ''}`} style={{ padding: '10px 20px' }}>
            Reports
          </Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <Container className="p-4">
          <Row className="mb-4">
            <Col>
              <h1>Dashboard</h1>
            </Col>
          </Row>

          {/* Stats Cards */}
          <Row className="mb-4">
            <Col md={3}>
              <Card className="text-center bg-primary text-white">
                <Card.Body>
                  <Card.Title>Total Students</Card.Title>
                  <h2>{totalStudents}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center bg-success text-white">
                <Card.Body>
                  <Card.Title>Total Faculty</Card.Title>
                  <h2>{totalFaculty}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center bg-warning text-white">
                <Card.Body>
                  <Card.Title>Pending Fees</Card.Title>
                  <h2>{pendingFees}</h2>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="text-center bg-info text-white">
                <Card.Body>
                  <Card.Title>Completed Fees</Card.Title>
                  <h2>{completedFees}</h2>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Module Cards */}
          <Row>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Students</Card.Title>
                  <Card.Text>
                    Manage student records, attendance, and academic performance.
                  </Card.Text>
                  <Link to="/students" className="btn btn-primary">Manage Students</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Faculty</Card.Title>
                  <Card.Text>
                    Manage faculty members, their subjects, and departments.
                  </Card.Text>
                  <Link to="/faculty" className="btn btn-primary">Manage Faculty</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Fees</Card.Title>
                  <Card.Text>
                    Record payments, generate reports, and send reminders.
                  </Card.Text>
                  <Link to="/fees" className="btn btn-primary">Manage Fees</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Generate Report Card */}
          <Row>
            <Col md={12}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Generate Report</Card.Title>
                  <Card.Text>
                    Generate comprehensive reports for students, faculty, and fees. Click to view and download reports.
                  </Card.Text>
                  <Link to="/reports" className="btn btn-success">Generate Report</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
