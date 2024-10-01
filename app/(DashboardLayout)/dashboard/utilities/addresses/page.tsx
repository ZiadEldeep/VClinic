"use client";
import React from 'react';
import { Card, Tooltip, Spin, Col, Row, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import axios from 'axios';
import { IconHome, IconGlobe, IconMapPin } from '@tabler/icons-react';
import AddressForm from '@/components/forms/AddressForm';

// Define Address interface
interface Address {
  hospitalName: string;
  hospitalId: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
}

const fetchAddresses = async (): Promise<Address[]> => {
  const response = await axios.get('/api/addresses');
  return response.data;
};

const AddressesPage = () => {
  const { data, isLoading, isError ,refetch } = useQuery<Address[]>({
    queryKey: ['addresses'],
    queryFn: fetchAddresses,
  });

  
  
  if (isError) return <Alert message="Failed to load addresses." type="error" />;

  return (
    <div>
      <Typography variant="h4">Addresses</Typography>
      <div className=" max-sm:w-full w-3/4">

      <AddressForm refetch={refetch}/>
      </div>
      <Row gutter={[16, 16]} justify="center">
      {isLoading &&<div className="w-full h-full flex justify-center items-center">
  <Spin />
  </div>}
        {data?.map((address) => (
          <Col key={address.hospitalId} xs={24} sm={12} md={8} lg={6}>
            <Card title={<><IconHome /> {address.hospitalName}</>} hoverable>
              <p>
                <Tooltip title="Hospital ID">
                  {address.hospitalId}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="City">
                  <IconMapPin /> {address.city}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Country">
                  <IconGlobe /> {address.country}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="State">
                  {address.state}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Zip Code">
                  {address.zipCode}
                </Tooltip>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AddressesPage;
