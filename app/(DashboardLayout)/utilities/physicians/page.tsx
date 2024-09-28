"use client";
import React from 'react';
import { Card, Tooltip, Spin, Col, Row, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import axios from 'axios';
import { IconStethoscope, IconBuildingHospital, IconIdBadge } from '@tabler/icons-react';
import PhysicianForm from '@/components/forms/PhysicianForm';

// Define Physician interface
interface Physician {
  id: string;
  name: string;
  details: string; // Details about the physician
  hospitalName: string;
}

const fetchPhysicians = async (): Promise<Physician[]> => {
  const response = await axios.get('/api/physicians');
  return response.data;
};

const PhysiciansPage = () => {
  const { data, isLoading, isError ,refetch} = useQuery<Physician[]>({
    queryKey: ['physicians'],
    queryFn: fetchPhysicians,
  });

  
  
  if (isError) return <Alert message="Failed to load physicians." type="error" />;

  return (
    <div>
      <Typography variant="h4">Physicians</Typography>
      <div className=" max-sm:w-full w-3/4">

        <PhysicianForm refetch={refetch}/>
      </div>
      <Row gutter={[16, 16]} justify="center">
      {isLoading &&<div className="w-full h-full flex justify-center items-center">
  <Spin />
  </div>}
        {data?.map((physician) => (
          <Col key={physician.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={<><IconStethoscope /> {physician.name}</>} hoverable>
              <p>
                <Tooltip title="Physician ID">
                  <IconIdBadge /> {physician.id}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Physician Details">
                  {physician.details}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Hospital Name">
                  <IconBuildingHospital /> {physician.hospitalName}
                </Tooltip>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PhysiciansPage;
