import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerFormData, customerSchema } from '@/lib/schemas/customerSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const CustomerForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (data: any) => {
    // إرسال البيانات إلى API
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Customer created successfully!');
      } else {
        toast.error('Failed to create customer.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the customer.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Customer ID">
          <Input {...register('customerId')} />
          {errors.customerId && <span>{errors.customerId.message}</span>}
        </Form.Item>

        <Form.Item label="Customer Name">
          <Input {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </Form.Item>

        <Form.Item label="Date of Birth">
          <DatePicker {...register('dob')} />
          {errors.dob && <span>{errors.dob.message}</span>}
        </Form.Item>

        <Form.Item label="Gender">
          <Select {...register('gender')}>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Create Customer</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default CustomerForm;
