// @/component/PhysicianForm
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PhysicianFormData, physicianSchema } from '@/lib/schemas/physicianSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import styles from '@/styles/PhysicianForm.module.css'; // Assuming you have a CSS module for custom styles

const PhysicianForm = ({ refetch }: { refetch: () => void }) => {
  const defaultValues: PhysicianFormData = {
    physicianId: '',
    name: '',
    details: '',
    hospitalName: '',
  };

  const { control, handleSubmit, formState: { errors } } = useForm<PhysicianFormData>({
    resolver: zodResolver(physicianSchema),
    defaultValues,
  });

  const onSubmit = async (data: PhysicianFormData) => {
    try {
      const response = await fetch('/api/physicians', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Physician created successfully!');
        refetch();
      } else {
        toast.error('Failed to create physician.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the physician.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Form.Item label="Physician ID" validateStatus={errors.physicianId ? 'error' : ''}>
          <Controller
            name="physicianId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.physicianId ? styles.inputError : ''} />
            )}
          />
          {errors.physicianId && <span className={styles.errorText}>{errors.physicianId.message}</span>}
        </Form.Item>

        <Form.Item label="Physician Name" validateStatus={errors.name ? 'error' : ''}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.name ? styles.inputError : ''} />
            )}
          />
          {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
        </Form.Item>

        <Form.Item label="Physician Details" validateStatus={errors.details ? 'error' : ''}>
          <Controller
            name="details"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} className={errors.details ? styles.inputError : ''} />
            )}
          />
          {errors.details && <span className={styles.errorText}>{errors.details.message}</span>}
        </Form.Item>

        <Form.Item label="Hospital Name" validateStatus={errors.hospitalName ? 'error' : ''}>
          <Controller
            name="hospitalName"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.hospitalName ? styles.inputError : ''} />
            )}
          />
          {errors.hospitalName && <span className={styles.errorText}>{errors.hospitalName.message}</span>}
        </Form.Item>

        <Form.Item>
          <Button className='bg-[#5D87FF] hover:bg-[#5381fe]' htmlType="submit">Create Physician</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default PhysicianForm;
