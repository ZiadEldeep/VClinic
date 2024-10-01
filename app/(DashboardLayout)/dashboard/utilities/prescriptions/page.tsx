"use client";
import React from 'react';
import { Card, Tooltip, Spin, Col, Row, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import axios from 'axios';
import { IconClipboard, IconUser, IconStethoscope, IconCalendar } from '@tabler/icons-react';
import PrescriptionForm from '@/components/forms/PrescriptionForm';

// Define Prescription interface
interface Prescription {
  id: string;
  customerId: string;
  physicianId: string;
  pid: string; // Patient ID
  pfd: string; // Prescription Date
}

const fetchPrescriptions = async (): Promise<Prescription[]> => {
  const response = await axios.get('/api/prescriptions');
  return response.data;
};

const PrescriptionsPage = () => {
  const { data, isLoading, isError,refetch } = useQuery<Prescription[]>({
    queryKey: ['prescriptions'],
    queryFn: fetchPrescriptions,
  });

  
  
  if (isError) return <Alert message="Failed to load prescriptions." type="error" />;

  return (
    <div>
      <Typography variant="h4">Prescriptions</Typography>
      <div className=" max-sm:w-full w-3/4">
        <PrescriptionForm refetch={refetch}/>
      </div>
      <Row gutter={[16, 16]} justify="center">
      {isLoading &&<div className="w-full h-full flex justify-center items-center">
  <Spin />
  </div>}
        {data?.map((prescription) => (
          <Col key={prescription.id} xs={24} sm={12} md={8} lg={6}>
            <Card title={<><IconClipboard /> Prescription ID: {prescription.id}</>} hoverable>
              <p>
                <Tooltip title="Customer ID">
                  <IconUser /> {prescription.customerId}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Physician ID">
                  <IconStethoscope /> {prescription.physicianId}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="PID">
                  {prescription.pid}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Prescription Date">
                  <IconCalendar /> {prescription.pfd}
                </Tooltip>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PrescriptionsPage;
