import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressFormData, addressSchema } from '@/lib/schemas/addressSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import styles from '@/styles/AddressForm.module.css';

const AddressForm = ({ refetch }: { refetch: () => void }) => {
  const defaultValues: AddressFormData = {
    hospitalName: '',
    hospitalId: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
  };

  const { control, handleSubmit, formState: { errors } } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues,
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
        refetch();
      } else {
        toast.error('Failed to create address.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the address.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={styles.container}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={styles.form}>
        <Form.Item label="Hospital Name" className={styles.formItem}>
          <Controller
            name="hospitalName"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.hospitalName ? styles.inputError : ''} />
            )}
          />
          {errors.hospitalName && <span className={styles.errorText}>{errors.hospitalName.message}</span>}
        </Form.Item>

        <Form.Item label="Hospital ID" className={styles.formItem}>
          <Controller
            name="hospitalId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.hospitalId ? styles.inputError : ''} />
            )}
          />
          {errors.hospitalId && <span className={styles.errorText}>{errors.hospitalId.message}</span>}
        </Form.Item>

        <Form.Item label="City" className={styles.formItem}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.city ? styles.inputError : ''} />
            )}
          />
          {errors.city && <span className={styles.errorText}>{errors.city.message}</span>}
        </Form.Item>

        <Form.Item label="Country" className={styles.formItem}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.country ? styles.inputError : ''} />
            )}
          />
          {errors.country && <span className={styles.errorText}>{errors.country.message}</span>}
        </Form.Item>

        <Form.Item label="State" className={styles.formItem}>
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.state ? styles.inputError : ''} />
            )}
          />
          {errors.state && <span className={styles.errorText}>{errors.state.message}</span>}
        </Form.Item>

        <Form.Item label="Zip Code" className={styles.formItem}>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.zipCode ? styles.inputError : ''} />
            )}
          />
          {errors.zipCode && <span className={styles.errorText}>{errors.zipCode.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button className={styles.submitButton} htmlType="submit">
            Create Address
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default AddressForm;
