"use client";
import React from 'react';
import { Card, Tooltip, Spin, Col, Row, Alert } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Typography } from '@mui/material';
import axios from 'axios';
import { IconPill, IconHash, IconCalendar, IconClipboard } from '@tabler/icons-react';
import PrescriptionItemForm from '@/components/forms/PrescriptionItemForm';

// Define PrescriptionItem interface
interface PrescriptionItem {
  prescriptionId: string;
  drugId: string;
  medicinesName: string;
  quantity: number;
  doe: string; // Date of Expiry
}

const fetchPrescriptionItems = async (): Promise<PrescriptionItem[]> => {
  const response = await axios.get('/api/prescription-item');
  return response.data;
};

const PrescriptionItemsPage = () => {
  const { data, isLoading, isError,refetch } = useQuery<PrescriptionItem[]>({
    queryKey: ['prescriptionItems'],
    queryFn: fetchPrescriptionItems,
  });

  if (isLoading) return <Spin />;
  
  if (isError) return <Alert message="Failed to load prescription items." type="error" />;

  return (
    <div>
      <Typography variant="h4">Prescription Items</Typography>
      <div className=" max-sm:w-full w-3/4">

        <PrescriptionItemForm refetch={refetch}/>
      </div>
      <Row gutter={[16, 16]} justify="center">
        {data?.map((item) => (
          <Col key={item.drugId} xs={24} sm={12} md={8} lg={6}>
            <Card title={<><IconPill /> {item.medicinesName}</>} hoverable>
              <p>
                <Tooltip title="Prescription ID">
                  <IconClipboard /> {item.prescriptionId}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Drug ID">
                  <IconHash /> {item.drugId}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Quantity">
                  {item.quantity}
                </Tooltip>
              </p>
              <p>
                <Tooltip title="Date of Expiry">
                  <IconCalendar /> {item.doe}
                </Tooltip>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PrescriptionItemsPage;
