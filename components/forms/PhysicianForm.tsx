import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhysicianFormData, physicianSchema } from '@/lib/schemas/physicianSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const PhysicianForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PhysicianFormData>({
    resolver: zodResolver(physicianSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/physicians', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Physician created successfully!');
      } else {
        toast.error('Failed to create physician.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the physician.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Physician ID">
          <Input {...register('physicianId')} />
          {errors.physicianId && <span>{errors.physicianId.message}</span>}
        </Form.Item>

        <Form.Item label="Physician Name">
          <Input {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </Form.Item>

        <Form.Item label="Physician Details">
          <Input.TextArea {...register('details')} />
          {errors.details && <span>{errors.details.message}</span>}
        </Form.Item>

        <Form.Item label="Hospital Name">
          <Input {...register('hospitalName')} />
          {errors.hospitalName && <span>{errors.hospitalName.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Create Physician</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default PhysicianForm;
