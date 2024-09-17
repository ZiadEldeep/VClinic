// @/component/PrescriptionForm

import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrescriptionFormData, prescriptionSchema } from '@/lib/schemas/prescriptionSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PrescriptionForm = ({refetch}:{refetch:()=>void}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Prescription created successfully!');
        refetch()
      } else {
        toast.error('Failed to create prescription.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the prescription.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Prescription ID">
          <Input {...register('prescriptionId')} />
          {errors.prescriptionId && <span>{errors.prescriptionId.message}</span>}
        </Form.Item>

        <Form.Item label="Customer ID">
          <Input {...register('customerId')} />
          {errors.customerId && <span>{errors.customerId.message}</span>}
        </Form.Item>

        <Form.Item label="Physician ID">
          <Input {...register('physicianId')} />
          {errors.physicianId && <span>{errors.physicianId.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button className='bg-[#5D87FF] hover:bg-[#5381fe]' htmlType="submit">Create Prescription</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default PrescriptionForm;
