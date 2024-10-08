"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Modal, Input, Button, Form } from "antd";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";

const prescriptionSchema = z.object({
  prescriptionUrl: z.string().url("Please upload your prescription file."),
});

type PrescriptionFormInputs = {
  prescriptionUrl: string;
};

type PatientInfoFormInputs = {
  disease: string;
  notes?: string;
};



const PrescriptionUpload: React.FC = () => {
  const [prescriptionUrl, setPrescriptionUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [hexCode, setHexCode] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PrescriptionFormInputs>({
    resolver: zodResolver(prescriptionSchema),
  });

  const {
    handleSubmit: handlePatientInfoSubmit,
    register: registerPatientInfo,
  } = useForm<PatientInfoFormInputs>();

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPrescriptionUrl(fileUrl);
      setFileName(file.name);
      const arrayBuffer = await file.arrayBuffer();
      const hex = arrayBufferToHex(arrayBuffer);
      setHexCode(hex);
      try {
        const formData = new FormData();
        formData.append("prescription", file);

        const response = await axios.post(
          "/api/upload-prescription",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const uploadedUrl = response.data.url;
        setValue("prescriptionUrl", uploadedUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const arrayBufferToHex = (buffer: ArrayBuffer): string => {
    const byteArray = new Uint8Array(buffer);
    return Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "image/*": [],
    },
  });

  const onSubmit = (data: PrescriptionFormInputs) => {
    console.log("Uploaded prescription URL:", data.prescriptionUrl);
  };

  const handleAddPatientInfo = (data: PatientInfoFormInputs) => {
    console.log("New Patient Info:", data);
    setIsModalVisible(false); // Close modal after submission
  };

  return (
    <>

      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload Your Prescription
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            {...getRootProps({
              className:
                "border-dashed border-2 border-gray-300 p-6 rounded-md mb-4 cursor-pointer hover:border-[#7699ff] transition duration-200",
            })}>
            <input {...getInputProps()} />
            <p className="text-center text-gray-600">{`Drag 'n' drop your prescription here, or click to select files`}</p>
          </div>

          {errors.prescriptionUrl && (
            <p className="text-red-500">{errors.prescriptionUrl.message}</p>
          )}

          {fileName && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Uploaded File:</h3>
              <p className="mt-2">{fileName}</p>
              {prescriptionUrl && (
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Preview:</h3>
                  <img
                    src={prescriptionUrl}
                    alt="Prescription Preview"
                    className="mt-2 border rounded-md"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </div>
              )}
              <p className="mt-2">
                Uploaded Prescription URL: {prescriptionUrl}
              </p>
              {hexCode && (
                <div className="mt-2">
                  <h3 className="text-lg font-semibold">Hexadecimal Code:</h3>
                  <p>{hexCode}</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            className="bg-[#7699ff] text-white p-3 rounded-md mt-4 w-full hover:bg-blue-600 transition duration-200 shadow-md">
            Upload Prescription
          </button>
        </form>

        <button
          className="bg-green-500 text-white p-3 rounded-md mt-4 w-full hover:bg-green-600 transition duration-200 shadow-md"
          onClick={() => setIsModalVisible(true)}>
          Add New Patient Info
        </button>
      </div>

      {/* Modal for Adding Patient Info */}
      <Modal
        title="Add New Patient Info"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}>
        <Form onFinish={handlePatientInfoSubmit(handleAddPatientInfo)}>
          <Form.Item
            label="Disease"
            name="disease"
            rules={[{ required: true, message: "Please enter a disease" }]}>
            <Input {...registerPatientInfo("disease")} />
          </Form.Item>
          <Form.Item label="Notes">
            <Input.TextArea {...registerPatientInfo("notes")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Add Info
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="p-5">
        <Blog />
      </div>
    </>
  );
};

export default PrescriptionUpload;
