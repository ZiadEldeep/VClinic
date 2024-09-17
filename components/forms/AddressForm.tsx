// @/component/AddressForm
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressFormData, addressSchema } from '@/lib/schemas/addressSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const AddressForm = ({refetch}:{refetch:()=>void}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit = async (data: AddressFormData) => {
    try {
      const response = await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Address created successfully!');
        refetch()
      } else {
        toast.error('Failed to create address.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the address.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Hospital Name">
          <Input {...register('hospitalName')} />
          {errors.hospitalName && <span>{errors.hospitalName.message}</span>}
        </Form.Item>

        <Form.Item label="Hospital ID">
          <Input {...register('hospitalId')} />
          {errors.hospitalId && <span>{errors.hospitalId.message}</span>}
        </Form.Item>

        <Form.Item label="City">
          <Input {...register('city')} />
          {errors.city && <span>{errors.city.message}</span>}
        </Form.Item>

        <Form.Item label="Country">
          <Input {...register('country')} />
          {errors.country && <span>{errors.country.message}</span>}
        </Form.Item>

        <Form.Item label="State">
          <Input {...register('state')} />
          {errors.state && <span>{errors.state.message}</span>}
        </Form.Item>

        <Form.Item label="Zip Code">
          <Input {...register('zipCode')} />
          {errors.zipCode && <span>{errors.zipCode.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button className='bg-[#5D87FF] hover:bg-[#5381fe]' htmlType="submit">Create Address</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default AddressForm;
