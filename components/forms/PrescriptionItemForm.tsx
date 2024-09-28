// @/component/PrescriptionItemForm

import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PrescriptionItemFormData,
  prescriptionItemSchema,
} from "@/lib/schemas/prescriptionItemSchema";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import styles from '@/styles/PrescriptionItemForm.module.css'; // Assuming you have a CSS module for custom styles

const PrescriptionItemForm = ({ refetch }: { refetch: () => void }) => {
  // Initialize the form with the schema for validation
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrescriptionItemFormData>({
    resolver: zodResolver(prescriptionItemSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  // Handle form submission
  const onSubmit = async (data: PrescriptionItemFormData) => {
    try {
      const response = await fetch("/api/prescription-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Prescription item created successfully!");
        refetch();
      } else {
        toast.error("Failed to create prescription item.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the prescription item.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Prescription ID" required>
          <Controller
            name="prescriptionId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.prescriptionId ? styles.inputError : ''} />
            )}
          />
          {errors.prescriptionId && (
            <span className={styles.errorText}>
              {errors.prescriptionId.message}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Drug ID" required>
          <Controller
            name="drugId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.drugId ? styles.inputError : ''} />
            )}
          />
          {errors.drugId && (
            <span className={styles.errorText}>{errors.drugId.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Medicines Name" required>
          <Controller
            name="medicinesName"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.medicinesName ? styles.inputError : ''} />
            )}
          />
          {errors.medicinesName && (
            <span className={styles.errorText}>{errors.medicinesName.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Quantity" required>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <InputNumber
                {...field}
                min={1}
                className={errors.quantity ? styles.inputError : ''}
              />
            )}
          />
          {errors.quantity && (
            <span className={styles.errorText}>{errors.quantity.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Date of Expiry">
          <Controller
            name="doe"
            control={control}
            render={({ field }) => (
              <Input {...field} type="date" className={errors.doe ? styles.inputError : ''} />
            )}
          />
          {errors.doe && (
            <span className={styles.errorText}>{errors.doe.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Internal Tracking Code (ITC)">
          <Controller
            name="itc"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.itc ? styles.inputError : ''} />
            )}
          />
          {errors.itc && (
            <span className={styles.errorText}>{errors.itc.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Hospital ID" required>
          <Controller
            name="hospitalId"
            control={control}
            render={({ field }) => (
              <Input {...field} className={errors.hospitalId ? styles.inputError : ''} />
            )}
          />
          {errors.hospitalId && (
            <span className={styles.errorText}>{errors.hospitalId.message}</span>
          )}
        </Form.Item>

        <Form.Item>
          <Button className='bg-[#5D87FF] hover:bg-[#5381fe]' htmlType="submit">
            Create Prescription Item
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default PrescriptionItemForm;
