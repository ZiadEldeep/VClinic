// CustomerForm.tsx
"use client";
import React from 'react';
import { Form, Input, Button, DatePicker, Select, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const { Title } = Typography;

// Define validation schema
const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  gender: z.string().min(1, "Gender is required"),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  chronicDiseases: z.string().optional(), // Chronic diseases field
  emergencyContact: z.string().optional(),
});

// Define form inputs type
type CustomerFormInputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  gender: string;
  medicalHistory?: string;
  allergies?: string;
  chronicDiseases?: string; // Chronic diseases field
  emergencyContact?: string;
};

const CustomerForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CustomerFormInputs>({
    resolver: zodResolver(customerSchema),
  });

  const onSubmit = async (data: CustomerFormInputs) => {
    try {
      await axios.post('/api/customers', data);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <Title level={3} className="text-center mb-4">Add New Customer</Title>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        
        <Form.Item label="Name" required>
          <Input placeholder="Enter customer's name" {...register("name")} />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </Form.Item>

        <Form.Item label="Email" required>
          <Input placeholder="Enter customer's email" {...register("email")} />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </Form.Item>

        <Form.Item label="Phone Number" required>
          <Input placeholder="Enter customer's phone number" {...register("phone")} />
          {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
        </Form.Item>

        <Form.Item label="Address" required>
          <Input placeholder="Enter customer's address" {...register("address")} />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
        </Form.Item>

        <Form.Item label="Date of Birth" required>
          <DatePicker style={{ width: '100%' }} placeholder="Select date of birth" {...register("dob")} />
          {errors.dob && <span className="text-red-500">{errors.dob.message}</span>}
        </Form.Item>

        <Form.Item label="Gender" required>
          <Select
            placeholder="Select gender"
            {...register("gender")}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Other', label: 'Other' },
            ]}
          />
          {errors.gender && <span className="text-red-500">{errors.gender.message}</span>}
        </Form.Item>

        <Form.Item label="Medical History">
          <Input.TextArea placeholder="Enter any medical history" {...register("medicalHistory")} />
        </Form.Item>

        <Form.Item label="Allergies">
          <Input.TextArea placeholder="Enter any allergies" {...register("allergies")} />
        </Form.Item>

        <Form.Item label="Chronic Diseases">
          <Input.TextArea placeholder="Enter any chronic diseases" {...register("chronicDiseases")} />
        </Form.Item>

        <Form.Item label="Emergency Contact Information">
          <Input placeholder="Enter emergency contact info" {...register("emergencyContact")} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Add Customer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomerForm;
