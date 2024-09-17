import React from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PrescriptionItemFormData,
  prescriptionItemSchema,
} from "@/lib/schemas/prescriptionItemSchema";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const PrescriptionItemForm = () => {
  // Initialize the form with the schema for validation
  const {
    register,
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
      exit={{ opacity: 0 }}>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Prescription ID" required>
          <Input {...register("prescriptionId")} />
          {errors.prescriptionId && (
            <span style={{ color: "red" }}>
              {errors.prescriptionId.message}
            </span>
          )}
        </Form.Item>

        <Form.Item label="Drug ID" required>
          <Input {...register("drugId")} />
          {errors.drugId && (
            <span style={{ color: "red" }}>{errors.drugId.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Medicines Name" required>
          <Input {...register("medicinesName")} />
          {errors.medicinesName && (
            <span style={{ color: "red" }}>{errors.medicinesName.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Quantity" required>
          <InputNumber
            name={register("quantity").name}
            onVolumeChange={register("quantity").onChange}
            ref={register("quantity").ref}
            required={register("quantity").required}
            pattern={register("quantity").pattern}
            onBlur={register("quantity").onBlur}
            max={register("quantity").max}
            min={register("quantity").min}
            maxLength={register("quantity").maxLength}
            minLength={register("quantity").minLength}
          />
          {errors.quantity && (
            <span style={{ color: "red" }}>{errors.quantity.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Date of Expiry">
          <Input {...register("doe")} type="date" />
          {errors.doe && (
            <span style={{ color: "red" }}>{errors.doe.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Internal Tracking Code (ITC)">
          <Input {...register("itc")} />
          {errors.itc && (
            <span style={{ color: "red" }}>{errors.itc.message}</span>
          )}
        </Form.Item>

        <Form.Item label="Hospital ID" required>
          <Input {...register("hospitalId")} />
          {errors.hospitalId && (
            <span style={{ color: "red" }}>{errors.hospitalId.message}</span>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Prescription Item
          </Button>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default PrescriptionItemForm;
