// @/component/CustomerForm
import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerFormData, customerSchema } from '@/lib/schemas/customerSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import styles from '@/styles/CustomerForm.module.css'; // Assuming you have a CSS module for custom styles

const CustomerForm = ({ refetch }: { refetch: () => void }) => {
  const defaultValues = {
    customerId: '',
    name: '',
  };

  const { control, handleSubmit, formState: { errors } } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues,
  });

  const onSubmit = async (data: CustomerFormData) => {
    // Sending data to API
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Customer created successfully!');
        refetch();
      } else {
        toast.error('Failed to create customer.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the customer.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Form.Item label="Customer ID" validateStatus={errors.customerId ? 'error' : ''}>
          <Controller
            name="customerId"
            control={control}
            render={({ field }) => (
              <Input {...field} type='text' className={errors.customerId ? styles.inputError : ''} />
            )}
          />
          {errors.customerId && <span className={styles.errorText}>{errors.customerId.message}</span>}
        </Form.Item>

        <Form.Item label="Customer Name" validateStatus={errors.name ? 'error' : ''}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} type='text' className={errors.name ? styles.inputError : ''} />
            )}
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
        </Form.Item>

        <Form.Item label="Date of Birth" validateStatus={errors.dob ? 'error' : ''}>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <DatePicker {...field} className={errors.dob ? styles.inputError : ''} />
            )}
          />
          {errors.dob && <span className={styles.errorText}>{errors.dob.message}</span>}
        </Form.Item>

        <Form.Item label="Gender" validateStatus={errors.gender ? 'error' : ''}>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select {...field} className={errors.gender ? styles.inputError : ''}>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            )}
          />
          {errors.gender && <span className={styles.errorText}>{errors.gender.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button className='bg-[#5D87FF] hover:bg-[#5381fe]' htmlType="submit">Create Customer</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default CustomerForm;
