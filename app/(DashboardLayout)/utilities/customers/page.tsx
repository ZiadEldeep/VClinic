"use client";
import React from 'react';
import { Card, Tooltip, Spin, Col, Row, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import axios from 'axios';
import { IconUser, IconIdBadge, IconCalendar, IconGenderMale } from '@tabler/icons-react';
import CustomerForm from '@/components/forms/CustomerForm';

// Define Customer interface
interface Customer {
  id: string;
  name: string;
  dop: string; // Date of Purchase
  gender: string;
}

const fetchCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get('/api/customers');
  return response.data;
};

const CustomersPage = () => {
  const { data, isLoading, isError,refetch } = useQuery<Customer[]>({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });

  if (isLoading) return <Spin />;
  
  if (isError) return <Alert message="Failed to load customers." type="error" />;

  return (
    <div>
      <Typography variant="h4">Customers</Typography>
      <div className=" max-sm:w-full w-3/4">

        <CustomerForm refetch={refetch}/>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {data?.map((customer) => (
          <Col key={customer.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={<><IconUser /> {customer.name}</>} hoverable>
              <p>
                <Tooltip title="Customer ID">
                  <IconIdBadge /> {customer.id}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Date of Purchase">
                  <IconCalendar /> {customer.dop}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Gender">
                  <IconGenderMale /> {customer.gender}
                </Tooltip>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomersPage;
