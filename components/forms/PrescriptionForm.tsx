// @/component/PrescriptionForm

import React from 'react';
import { Form, Input, Button } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PrescriptionFormData, prescriptionSchema } from '@/lib/schemas/prescriptionSchema';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import styles from '@/styles/PrescriptionForm.module.css'; // Assuming you have a CSS module for custom styles

const PrescriptionForm = ({ refetch }: { refetch: () => void }) => {
  const defaultValues: PrescriptionFormData = {
    prescriptionId: '',
    customerId: '',
    physicianId: '',
  };

  const { control, handleSubmit, formState: { errors } } = useForm<PrescriptionFormData>({
    resolver: zodResolver(prescriptionSchema),
    defaultValues,
  });

  const onSubmit = async (data: PrescriptionFormData) => {
    try {
      const response = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Prescription created successfully!');
        refetch();
      } else {
        toast.error('Failed to create prescription.');
      }
    } catch (error) {
      toast.error('An error occurred while creating the prescription.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className={styles.formContainer}>
        <Form.Item label="Prescription ID" validateStatus={errors.prescriptionId ? 'error' : ''}>
          <Controller
            name="prescriptionId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.prescriptionId ? styles.inputError : ''} />
            )}
          />
          {errors.prescriptionId && <span className={styles.errorText}>{errors.prescriptionId.message}</span>}
        </Form.Item>

        <Form.Item label="Customer ID" validateStatus={errors.customerId ? 'error' : ''}>
          <Controller
            name="customerId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.customerId ? styles.inputError : ''} />
            )}
          />
          {errors.customerId && <span className={styles.errorText}>{errors.customerId.message}</span>}
        </Form.Item>

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

        <Form.Item>
          <Button className='bg-[#5D87FF] hover:bg-[#5381fe]' htmlType="submit">Create Prescription</Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default PrescriptionForm;
