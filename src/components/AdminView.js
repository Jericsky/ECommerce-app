import React, { useState, useEffect } from 'react';
import { Button, Table, Container, Form } from 'react-bootstrap';
import EditProducts from './EditProducts';
import ArchiveProduct from './ArchiveProduct';
import AddProducts from './AddProducts';

export default function AdminView({ productsData, fetchData }) {
  const [products, setProducts] = useState([]);
  const [filterOption, setFilterOption] = useState('none');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    let filteredProducts = [...productsData];

    if (filterOption === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterOption === 'price') {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (availabilityFilter !== 'all') {
      const isActive = availabilityFilter === 'available';
      filteredProducts = filteredProducts.filter(product => product.isActive === isActive);
    }

    const productsArray = filteredProducts.map(product => (
      <tr key={product._id}>
        <td>{product.name}</td>
        <td>{product.description}</td>
        <td>₱{product.price.toFixed(2)}</td>
        <td className={product.isActive ? "text-success" : "text-danger"}>
          {product.isActive ? "Available" : "Unavailable"}
        </td>
        <td className='text-center'>
          <EditProducts product={product} fetchData={fetchData} />
          <ArchiveProduct product={product} isActive={product.isActive} fetchData={fetchData} />
        </td>
      </tr>
    ));

    setProducts(productsArray);
  }, [productsData, filterOption, availabilityFilter]);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  return (
    <Container fluid className="mt-5 px-md-5">
      <h1 className="text-primary text-center">Admin Dashboard</h1>

      <div className="text-center mb-5">
        <Button variant="primary" onClick={openAddModal}>Add Products</Button>
        <Button variant="secondary">Order</Button>
      </div>

      {/* Filter Options */}
      <Form className="mb-4 d-flex">
        <strong className="me-2">Filter:</strong>
        <Form.Check
          inline
          label="None"
          type="radio"
          name="filterOptions"
          value="none"
          checked={filterOption === 'none'}
          onChange={() => setFilterOption('none')}
        />
        <Form.Check
          inline
          label="Name"
          type="radio"
          name="filterOptions"
          value="name"
          checked={filterOption === 'name'}
          onChange={() => setFilterOption('name')}
        />
        <Form.Check
          inline
          label="Price"
          type="radio"
          name="filterOptions"
          value="price"
          checked={filterOption === 'price'}
          onChange={() => setFilterOption('price')}
        />

        <Form.Group controlId="availabilityFilter" className="ms-4">
          <Form.Select
            size='sm'
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </Form.Select>
        </Form.Group>
      </Form>

      <div className="table-responsive">
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products}
          </tbody>
        </Table>
      </div>

      {/* AddProducts Modal */}
      <AddProducts show={showAddModal} handleClose={closeAddModal} fetchData={fetchData} />
    </Container>
  );
}
