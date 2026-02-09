import { useEffect, useState } from "react";
import {
  getHospitalInfrastructureAvailabilityOptions,
  getHospitalInfrastructureList,
  getHospitalInfrastructureById,
  updateHospitalInfrastructure,
} from "../../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, message, Radio, Tag } from "antd";
import { Heading, MasterTable, ScreenWrapper } from "../../components";
import { useAuthStore } from "../../store/auth.store";
import { ColumnsType } from "antd/es/table";

const getHospitalInfrastructureListData = async () => {
  const { data } = await getHospitalInfrastructureList();
  return data;
};

const getHospitalInfrastructureAvailabilityOptionsData = async () => {
  const { data } = await getHospitalInfrastructureAvailabilityOptions();
  return data;
};

const getHospitalInfrastructureByIdData = async (id: any) => {
  const { data } = await getHospitalInfrastructureById(id);
  return data?.table;
};

const updateHospitalInfrastructureData = async (payload: any) => {
  const { data } = await updateHospitalInfrastructure(payload);
  return data;
};

const HospitalInfrastructure = () => {
  const [form] = Form.useForm();
  const { user } = useAuthStore();
  const hospitalRegNo = user?.userId;

  const {
    data: hospitalInfrastructureList,
    isFetching: hospitalInfrastructureListLoading,
    isError: hospitalInfrastructureListError,
  } = useQuery({
    queryKey: ["hospitalInfrastructureList"],
    queryFn: getHospitalInfrastructureListData,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const {
    data: hospitalInfrastructureById,
    isFetching: hospitalInfrastructureByIdLoading,
    isFetched: hospitalInfrastructureByIdFetched,
  } = useQuery({
    queryKey: ["hospitalInfrastructureById", hospitalRegNo],
    queryFn: () => getHospitalInfrastructureByIdData(hospitalRegNo),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!hospitalRegNo,
  });

  const { data: hospitalInfrastructureAvailabilityOptions } = useQuery({
    queryKey: ["hospitalInfrastructureAvailabilityOptions"],
    queryFn: getHospitalInfrastructureAvailabilityOptionsData,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  useEffect(() => {
    if (hospitalInfrastructureByIdFetched && hospitalInfrastructureById) {
      const initialValues: Record<string, any> = {};
      hospitalInfrastructureById.forEach((item: any) => {
        const key = item?.medicalInfrastructureId?.toString();
        if (key) {
          initialValues[key] = item?.infrastructureFacilitiesId;
        }
      });
      form.setFieldsValue(initialValues);
      setFormValues(initialValues);
    }
  }, [hospitalInfrastructureById, hospitalInfrastructureByIdFetched, form]);

  if (hospitalInfrastructureListError)
    message.error("Error fetching hospital infrastructure list");

  const columns: ColumnsType<any> = [
    {
      title: "Sr. No",
      align: "center",
      width: 80,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Facility",
      align: "left",
      render: (_text, record) => (
        <span className="font-semibold text-slate-700">
          {record?.name || record?.label || "--"}
        </span>
      ),
    },
    {
      title: "Availability Status",
      align: "center",
      width: 400,
      render: (_text, record) => (
        <Form.Item
          style={{ margin: 0 }}
          name={record?.value}
          rules={[
            {
              required: true,
              message: "Required",
            },
          ]}
        >
          <Radio.Group buttonStyle="solid">
            {hospitalInfrastructureAvailabilityOptions?.map((option: any) => (
              <Radio.Button
                key={option.value}
                value={parseInt(option.value)}
                className="px-4"
              >
                <Tag
                  color={
                    option.value === "1"
                      ? "green"
                      : option.value === "0"
                        ? "red"
                        : "blue"
                  }
                  className="border-none bg-transparent !text-inherit"
                >
                  {option.label?.toUpperCase()}
                </Tag>
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      ),
    },
  ];

  const {
    mutate: updateHospitalInfrastructureMutate,
    isPending: updateHospitalInfrastructureLoading,
  } = useMutation({
    mutationFn: updateHospitalInfrastructureData,
    onSuccess: (data) => {
      if (data?.status === true) {
        message.success(
          data?.message || "Hospital infrastructure updated successfully",
        );
      } else {
        message.error(
          data?.message || "Error updating hospital infrastructure",
        );
      }
    },
    onError: () => {
      message.error("Error updating hospital infrastructure");
    },
  });

  const onFinish = async (values: any) => {
    const payload = Object.entries(values).map(([key, value]) => {
      const infraItem = hospitalInfrastructureList?.find(
        (item: any) => item.value === key,
      );
      return {
        medicalInfrastructureId: key,
        infrastructureFacilitiesId: value,
        infrastructureFacilities:
          value === 1 ? "YES" : value === 0 ? "NO" : "Outsourced",
        medicalInfrastructure: infraItem?.name || "--",
      };
    });

    updateHospitalInfrastructureMutate({
      crud: 1,
      hospitalRegNo,
      bl: payload,
    });
  };

  return (
    <ScreenWrapper title="Hospital Infrastructure">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={(changedValues) => {
          setFormValues((prev) => ({
            ...prev,
            ...changedValues,
          }));
        }}
      >
        <MasterTable
          columns={columns}
          bordered
          data={hospitalInfrastructureList}
          isLoading={
            hospitalInfrastructureListLoading ||
            hospitalInfrastructureByIdLoading
          }
          rowKey="value"
          pagination={{ pageSize: 10 }}
          showExport={false}
          showSearch={true}
        />
        <div className="flex justify-center mt-8 pb-4">
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={updateHospitalInfrastructureLoading}
            className="px-16 h-12 rounded-full font-bold shadow-lg"
          >
            Update Infrastructure
          </Button>
        </div>
      </Form>
    </ScreenWrapper>
  );
};

export default HospitalInfrastructure;
